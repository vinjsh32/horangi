// Korean TTS (Web Speech API) + on-screen Hangul keyboard
// ==========================================================

// -------- TTS --------
let __koVoice = null;
const pickKoreanVoice = () => {
  const voices = window.speechSynthesis?.getVoices?.() || [];
  __koVoice = voices.find(v => v.lang === 'ko-KR') || voices.find(v => v.lang?.startsWith('ko')) || null;
  return __koVoice;
};
if (typeof window !== 'undefined' && window.speechSynthesis) {
  pickKoreanVoice();
  window.speechSynthesis.onvoiceschanged = pickKoreanVoice;
}

const speakKo = (text, { rate = 0.9, pitch = 1.0 } = {}) => {
  if (!text || !window.speechSynthesis) return;
  try {
    window.speechSynthesis.cancel();
    const u = new SpeechSynthesisUtterance(text);
    u.lang = 'ko-KR';
    u.rate = rate;
    u.pitch = pitch;
    const v = __koVoice || pickKoreanVoice();
    if (v) u.voice = v;
    window.speechSynthesis.speak(u);
  } catch (e) { console.warn('TTS error', e); }
};

// Reusable speaker button
const SpeakerButton = ({ text, size = 36, rate = 0.9, label, style = {} }) => {
  const [playing, setPlaying] = useState(false);
  const handle = (e) => {
    e?.stopPropagation?.();
    setPlaying(true);
    speakKo(text, { rate });
    setTimeout(() => setPlaying(false), Math.max(800, text.length * 180));
  };
  return (
    <button onClick={handle} aria-label={label || `Pronuncia ${text}`} style={{
      width: size, height: size, borderRadius: size / 2.6,
      background: playing ? 'var(--sky)' : 'var(--sky-soft)',
      display: 'grid', placeItems: 'center', flexShrink: 0,
      boxShadow: playing ? '0 2px 0 var(--sky-dark)' : '0 2px 0 #B4DBFF',
      transition: 'transform 0.1s',
      transform: playing ? 'scale(0.95)' : 'scale(1)',
      ...style,
    }}>
      <svg width={size * 0.5} height={size * 0.5} viewBox="0 0 24 24" fill={playing ? 'white' : 'var(--sky-dark)'}>
        <path d="M3,10 L3,14 L7,14 L12,19 L12,5 L7,10 Z"/>
        {playing && <path d="M14.5,12 Q17,12 17,9 M14.5,12 Q17,12 17,15 M16.5,12 Q20,12 20,7 M16.5,12 Q20,12 20,17" stroke="white" strokeWidth="1.6" fill="none" strokeLinecap="round"/>}
        {!playing && <path d="M14.5,8 Q17,10 17,12 Q17,14 14.5,16 M16.5,6 Q20,9 20,12 Q20,15 16.5,18" stroke="var(--sky-dark)" strokeWidth="1.6" fill="none" strokeLinecap="round"/>}
      </svg>
    </button>
  );
};

// ==========================================================
// -------- Hangul Keyboard --------
// ==========================================================
// Build syllables from jamo using Unicode composition:
//   syllable = 0xAC00 + (L * 21 + V) * 28 + T
const LEAD = ['ㄱ','ㄲ','ㄴ','ㄷ','ㄸ','ㄹ','ㅁ','ㅂ','ㅃ','ㅅ','ㅆ','ㅇ','ㅈ','ㅉ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];
const VOWEL = ['ㅏ','ㅐ','ㅑ','ㅒ','ㅓ','ㅔ','ㅕ','ㅖ','ㅗ','ㅘ','ㅙ','ㅚ','ㅛ','ㅜ','ㅝ','ㅞ','ㅟ','ㅠ','ㅡ','ㅢ','ㅣ'];
const TAIL = ['','ㄱ','ㄲ','ㄳ','ㄴ','ㄵ','ㄶ','ㄷ','ㄹ','ㄺ','ㄻ','ㄼ','ㄽ','ㄾ','ㄿ','ㅀ','ㅁ','ㅂ','ㅄ','ㅅ','ㅆ','ㅇ','ㅈ','ㅊ','ㅋ','ㅌ','ㅍ','ㅎ'];

// Combine a jamo into the current text, applying Hangul composition rules
const composeHangul = (current, jamo) => {
  if (!current) return jamo;
  const last = current.charCodeAt(current.length - 1);
  const isSyl = last >= 0xAC00 && last <= 0xD7A3;

  const leadIdx = LEAD.indexOf(jamo);
  const vowelIdx = VOWEL.indexOf(jamo);
  const tailIdx = TAIL.indexOf(jamo);

  if (isSyl) {
    const base = last - 0xAC00;
    const L = Math.floor(base / (21 * 28));
    const V = Math.floor((base % (21 * 28)) / 28);
    const T = base % 28;
    // add vowel → if no tail, convert to composite? If we already have a tail, move last-consonant to new syllable lead
    if (vowelIdx >= 0) {
      if (T === 0) {
        // cannot add vowel after a full LV syllable — start new syllable (the vowel alone doesn't syllabify, so emit raw jamo)
        return current + jamo;
      } else {
        // split: last tail becomes lead of new syllable
        const tailJamo = TAIL[T];
        const newL = LEAD.indexOf(tailJamo);
        if (newL < 0) return current + jamo;
        const prevSyl = 0xAC00 + (L * 21 + V) * 28; // T=0
        const newSyl = 0xAC00 + (newL * 21 + vowelIdx) * 28;
        return current.slice(0, -1) + String.fromCharCode(prevSyl) + String.fromCharCode(newSyl);
      }
    }
    // add tail consonant
    if (tailIdx > 0 && T === 0) {
      return current.slice(0, -1) + String.fromCharCode(last + tailIdx);
    }
  }

  // Lead + vowel next char: append lead jamo raw (will combine on next vowel)
  if (leadIdx >= 0) return current + jamo;
  return current + jamo;
};

// Compose when we have a raw lead jamo followed by a vowel
const composeHangulSmart = (current, jamo) => {
  if (!current) return jamo;
  const last = current[current.length - 1];
  const lastCode = last.charCodeAt(0);

  // Case: last char is raw lead jamo + we're adding a vowel → form LV syllable
  if (LEAD.includes(last) && VOWEL.indexOf(jamo) >= 0) {
    const L = LEAD.indexOf(last);
    const V = VOWEL.indexOf(jamo);
    const syl = 0xAC00 + (L * 21 + V) * 28;
    return current.slice(0, -1) + String.fromCharCode(syl);
  }
  return composeHangul(current, jamo);
};

const HangulKeyboard = ({ value, onChange, onClose, onSubmit }) => {
  const add = (j) => onChange(composeHangulSmart(value, j));
  const backspace = () => {
    if (!value) return;
    const last = value.charCodeAt(value.length - 1);
    if (last >= 0xAC00 && last <= 0xD7A3) {
      const base = last - 0xAC00;
      const L = Math.floor(base / (21 * 28));
      const V = Math.floor((base % (21 * 28)) / 28);
      const T = base % 28;
      if (T > 0) {
        const s = 0xAC00 + (L * 21 + V) * 28;
        onChange(value.slice(0, -1) + String.fromCharCode(s));
      } else {
        // Decompose LV → L only
        onChange(value.slice(0, -1) + LEAD[L]);
      }
    } else {
      onChange(value.slice(0, -1));
    }
  };

  const rows = [
    ['ㅂ','ㅈ','ㄷ','ㄱ','ㅅ','ㅛ','ㅕ','ㅑ','ㅐ','ㅔ'],
    ['ㅁ','ㄴ','ㅇ','ㄹ','ㅎ','ㅗ','ㅓ','ㅏ','ㅣ'],
    ['ㅋ','ㅌ','ㅊ','ㅍ','ㅠ','ㅜ','ㅡ'],
  ];

  const Key = ({ ch, wide, onClick, bg = 'white', color = 'var(--ink)' }) => (
    <button onClick={onClick || (() => add(ch))} className="kr" style={{
      minWidth: wide ? 60 : 36, height: 44, padding: '0 10px',
      fontSize: 17, fontWeight: 700, color,
      background: bg, border: '1.5px solid var(--line)', borderRadius: 10,
      boxShadow: '0 2px 0 rgba(0,0,0,0.08)',
    }}>{ch}</button>
  );

  return (
    <div style={{
      background: 'var(--cream-2)', borderTop: '2px solid var(--line)',
      padding: 10, display: 'flex', flexDirection: 'column', gap: 6,
    }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '4px 6px' }}>
        <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Tastiera 한글
        </div>
        <div style={{ flex: 1 }}/>
        {onClose && <button onClick={onClose} style={{
          fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', padding: '4px 10px', borderRadius: 8,
        }}>Chiudi ✕</button>}
      </div>
      {rows.map((row, i) => (
        <div key={i} style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
          {i === 2 && <Key ch="⇧" wide onClick={() => {}} bg="var(--cream)" color="var(--ink-3)"/>}
          {row.map(ch => <Key key={ch} ch={ch}/>)}
          {i === 2 && <Key ch="⌫" wide onClick={backspace} bg="var(--coral-soft)" color="var(--coral-dark)"/>}
        </div>
      ))}
      <div style={{ display: 'flex', gap: 5, justifyContent: 'center' }}>
        <Key ch="스페이스" wide onClick={() => onChange(value + ' ')} bg="white"/>
        {onSubmit && <Key ch="Invia ↵" wide onClick={onSubmit} bg="var(--mint)" color="white"/>}
      </div>
    </div>
  );
};

Object.assign(window, { speakKo, SpeakerButton, HangulKeyboard, composeHangulSmart });
