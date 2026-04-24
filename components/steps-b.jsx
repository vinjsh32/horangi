// Steps part 2: flashcards SRS, dialog audio, grammar sidebar

// ================== STEP: FLASHCARDS ==================
const StepFlash = () => {
  const cards = window.LESSON.vocab;
  const [idx, setIdx] = useState(0);
  const [flipped, setFlipped] = useState(false);
  const [seen, setSeen] = useState(new Set());

  const card = cards[idx];
  const canAdvance = seen.size >= cards.length;

  const mark = (difficulty) => {
    setSeen(s => new Set(s).add(idx));
    setFlipped(false);
    setTimeout(() => setIdx(i => Math.min(i + 1, cards.length - 1)), 180);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 12 }}>
        <Horangi size={72} mood="cheer" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Vocabolario · SRS
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>Memorizza con le flashcard</h2>
          <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>Clicca per girare la carta. Valuta quanto ti ricordi.</div>
        </div>
      </div>

      {/* Counter */}
      <div style={{ display: 'flex', gap: 6, marginTop: 18 }}>
        {cards.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 5, borderRadius: 999,
            background: seen.has(i) ? 'var(--mint)' : (i === idx ? 'var(--coral)' : '#F0E3CB'),
          }} />
        ))}
      </div>

      {/* Card */}
      <div
        className="pop"
        key={idx}
        onClick={() => setFlipped(f => !f)}
        style={{
          marginTop: 22, height: 320, perspective: 1200, cursor: 'pointer',
        }}
      >
        <div style={{
          position: 'relative', width: '100%', height: '100%',
          transformStyle: 'preserve-3d',
          transform: flipped ? 'rotateY(180deg)' : 'rotateY(0)',
          transition: 'transform 520ms cubic-bezier(.2,.9,.3,1.05)',
        }}>
          {/* Front */}
          <div className="card" style={{
            position: 'absolute', inset: 0, padding: 28, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden',
            background: 'linear-gradient(160deg, #FFFFFF, #FFF8EE)',
          }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Coreano</div>
            <div className="kr" style={{ fontSize: 64, fontWeight: 800, margin: '12px 0 8px', textAlign: 'center' }}>{card.kr}</div>
            <div style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', fontSize: 14 }}>{card.romaja}</div>
            <div onClick={(e) => e.stopPropagation()} style={{ marginTop: 14 }}>
              <SpeakerButton text={card.kr} size={42}/>
            </div>
            <div style={{ marginTop: 'auto', fontSize: 12, color: 'var(--ink-3)', fontWeight: 700 }}>Clicca per vedere il significato</div>
          </div>
          {/* Back */}
          <div className="card" style={{
            position: 'absolute', inset: 0, padding: 28, display: 'flex', flexDirection: 'column',
            alignItems: 'center', justifyContent: 'center', backfaceVisibility: 'hidden',
            transform: 'rotateY(180deg)',
            background: 'linear-gradient(160deg, var(--coral-soft), #FFF8EE)',
            border: '2px solid #FFCFC8',
          }}>
            <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--coral-dark)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>Italiano</div>
            <div style={{ fontSize: 32, fontWeight: 900, margin: '12px 0 8px', textAlign: 'center' }}>{card.it}</div>
            {card.note && (
              <div style={{
                fontSize: 13, color: 'var(--ink-2)', textAlign: 'center', lineHeight: 1.5,
                maxWidth: 440, background: 'rgba(255,255,255,0.65)', padding: '10px 14px', borderRadius: 12,
              }}>
                💡 {card.note}
              </div>
            )}
          </div>
        </div>
      </div>

      {/* SRS buttons */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 10, marginTop: 20 }}>
        <SrsBtn color="coral" label="Difficile" sub="tra 1 min" disabled={!flipped} onClick={() => mark('hard')} />
        <SrsBtn color="sun"   label="Bene"     sub="tra 10 min" disabled={!flipped} onClick={() => mark('good')} />
        <SrsBtn color="mint"  label="Facile"   sub="tra 1 giorno" disabled={!flipped} onClick={() => mark('easy')} />
      </div>

      {canAdvance && (
        <div className="rise" style={{
          marginTop: 16, padding: 14, borderRadius: 14, background: 'var(--mint-soft)',
          color: 'var(--mint-dark)', fontWeight: 800, fontSize: 14, display: 'flex', gap: 10, alignItems: 'center', justifyContent: 'center',
        }}>
          <Sparkle color="#2FA882" /> Tutte le flashcard viste! Puoi continuare.
        </div>
      )}
    </div>
  );
};

const SrsBtn = ({ color, label, sub, disabled, onClick }) => {
  const styles = {
    coral: { bg: 'var(--coral)', dark: 'var(--coral-dark)' },
    sun:   { bg: 'var(--sun)',   dark: 'var(--sun-dark)' },
    mint:  { bg: 'var(--mint)',  dark: 'var(--mint-dark)' },
  }[color];
  return (
    <button
      onClick={onClick} disabled={disabled}
      className="btn"
      style={{
        flexDirection: 'column', gap: 2, padding: '14px 8px',
        background: disabled ? '#E8DDCA' : styles.bg,
        boxShadow: disabled ? '0 4px 0 #CEBFA6' : `0 4px 0 ${styles.dark}`,
      }}
    >
      <span style={{ fontSize: 15 }}>{label}</span>
      <span style={{ fontSize: 11, fontWeight: 700, opacity: 0.85, textTransform: 'none', letterSpacing: 0 }}>{sub}</span>
    </button>
  );
};

// ================== STEP: DIALOG ==================
const StepDialog = () => {
  const lines = window.LESSON.dialog;
  const [playing, setPlaying] = useState(null);
  const [revealed, setRevealed] = useState(new Set([0]));

  const reveal = (i) => {
    setRevealed(r => new Set(r).add(i));
  };
  const play = (i) => {
    reveal(i);
    setPlaying(i);
    window.speakKo?.(lines[i].kr, { rate: 0.85 });
    setTimeout(() => setPlaying(null), Math.max(1600, lines[i].kr.length * 220));
  };

  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 18 }}>
        <Horangi size={70} mood="happy" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Dialogo · 대화
          </div>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0 }}>Minji incontra Luca</h2>
          <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>Ascolta ogni battuta, poi rivela la traduzione.</div>
        </div>
      </div>

      <div className="card" style={{ padding: 26 }}>
        {lines.map((line, i) => {
          const isMinji = line.who === 'Minji';
          return (
            <div key={i} className="rise" style={{
              display: 'flex', gap: 14, marginBottom: i < lines.length - 1 ? 22 : 0,
              flexDirection: isMinji ? 'row' : 'row-reverse',
              animationDelay: `${i * 80}ms`,
            }}>
              <Avatar name={line.who} />
              <div style={{ flex: 1, display: 'flex', flexDirection: 'column', alignItems: isMinji ? 'flex-start' : 'flex-end' }}>
                <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', marginBottom: 4 }}>{line.who}</div>
                <div
                  onClick={() => play(i)}
                  style={{
                    background: isMinji ? 'var(--sky-soft)' : 'var(--coral-soft)',
                    border: `2px solid ${isMinji ? '#B4DBFF' : '#FFCFC8'}`,
                    borderRadius: 18, padding: '14px 18px', maxWidth: 480, cursor: 'pointer',
                    position: 'relative',
                    transform: playing === i ? 'scale(1.02)' : 'scale(1)',
                    transition: 'transform 180ms',
                  }}
                >
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <PlayIcon playing={playing === i} color={isMinji ? 'var(--sky-dark)' : 'var(--coral-dark)'} />
                    <div className="kr" style={{ fontSize: 20, fontWeight: 700 }}>{line.kr}</div>
                  </div>
                  <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', marginTop: 6 }}>{line.romaja}</div>
                  {revealed.has(i) ? (
                    <div className="rise" style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 8, fontStyle: 'italic' }}>→ {line.it}</div>
                  ) : (
                    <button
                      onClick={(e) => { e.stopPropagation(); reveal(i); }}
                      style={{ fontSize: 12, fontWeight: 800, color: isMinji ? 'var(--sky-dark)' : 'var(--coral-dark)', marginTop: 8, padding: 0 }}
                    >
                      Mostra traduzione ▸
                    </button>
                  )}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

const Avatar = ({ name }) => {
  const isMinji = name === 'Minji';
  return (
    <div style={{
      width: 52, height: 52, borderRadius: 999, flexShrink: 0,
      background: isMinji ? 'linear-gradient(160deg, #B4DBFF, #58A7FF)' : 'linear-gradient(160deg, #FFCFC8, #FF6B5E)',
      display: 'grid', placeItems: 'center', color: 'white', fontWeight: 900, fontSize: 20,
      border: '3px solid white', boxShadow: 'var(--shadow-sm)',
    }}>
      {name[0]}
    </div>
  );
};

const PlayIcon = ({ playing, color }) => (
  <div style={{
    width: 34, height: 34, borderRadius: 999, background: color,
    display: 'grid', placeItems: 'center', flexShrink: 0,
    animation: playing ? 'wiggle 380ms' : undefined,
  }}>
    {playing ? (
      <div style={{ display: 'flex', gap: 2, alignItems: 'flex-end' }}>
        {[0, 1, 2].map(b => (
          <div key={b} style={{
            width: 3, height: 10 + (b % 2) * 6, background: 'white', borderRadius: 2,
            animation: `wiggle 400ms ${b * 90}ms infinite`,
          }} />
        ))}
      </div>
    ) : (
      <svg width="12" height="14" viewBox="0 0 12 14"><path d="M0,0 L12,7 L0,14 Z" fill="white" /></svg>
    )}
  </div>
);

// ================== STEP: GRAMMAR ==================
const StepGrammar = () => {
  return (
    <div style={{ maxWidth: 820, margin: '0 auto', padding: '32px 24px 24px' }}>      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 14 }}>
        <Horangi size={70} mood="think" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Grammatica · 문법
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>La particella del tema <span className="kr">은 / 는</span></h2>
        </div>
      </div>

      <p style={{ fontSize: 16, lineHeight: 1.6, color: 'var(--ink-2)', maxWidth: 640 }}>
        Dopo il soggetto della frase, il coreano aggiunge una <b>particella</b> che segna il tema.
        Si sceglie in base all'ultima sillaba della parola.
      </p>

      {/* Rule cards */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16, marginTop: 8 }}>
        <RuleCard
          color="coral"
          particle="은"
          when="Dopo consonante finale (batchim)"
          example={{ kr: '선생님은', romaja: 'seonsaengnim-eun', it: 'L\'insegnante…' }}
        />
        <RuleCard
          color="sky"
          particle="는"
          when="Dopo vocale finale (senza batchim)"
          example={{ kr: '저는', romaja: 'jeo-neun', it: 'Io…' }}
        />
      </div>

      {/* Comparison table */}
      <div className="card" style={{ padding: 0, marginTop: 22, overflow: 'hidden' }}>
        <div style={{
          padding: '14px 20px', background: 'var(--cream-2)', fontWeight: 900, fontSize: 13,
          letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--ink-2)',
          borderBottom: '2px solid var(--line)',
        }}>Confronto italiano ↔ coreano</div>
        <div>
          {[
            { it: 'Io sono Luca.', kr: '저는 루카입니다.', note: '저 + 는 (vocale)' },
            { it: 'L\'insegnante è Coreana.', kr: '선생님은 한국 사람입니다.', note: '선생님 + 은 (batchim ㅁ)' },
            { it: 'Il libro è nuovo.', kr: '책은 새 책입니다.', note: '책 + 은 (batchim ㄱ)' },
          ].map((row, i) => (
            <div key={i} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr auto', gap: 18, padding: '14px 20px',
              borderTop: i > 0 ? '1px solid var(--line)' : 'none', alignItems: 'center',
            }}>
              <div style={{ color: 'var(--ink-2)' }}>{row.it}</div>
              <div className="kr" style={{ fontWeight: 700, fontSize: 17 }}>
                {row.kr.split('').map((ch, j) => {
                  const isPart = ch === '은' || ch === '는';
                  return <span key={j} style={{ color: isPart ? 'var(--coral-dark)' : 'inherit', background: isPart ? 'var(--coral-soft)' : 'none', padding: isPart ? '0 2px' : 0, borderRadius: 4 }}>{ch}</span>;
                })}
              </div>
              <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{row.note}</div>
            </div>
          ))}
        </div>
      </div>

      <div style={{ marginTop: 20, display: 'flex', gap: 14, alignItems: 'flex-start', padding: 16, background: 'var(--sun-soft)', borderRadius: 16 }}>
        <div style={{ fontSize: 28 }}>💡</div>
        <div style={{ flex: 1 }}>
          <div style={{ fontWeight: 900, color: 'var(--sun-dark)' }}>Suggerimento</div>
          <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 4, lineHeight: 1.5 }}>
            La particella del tema <b>non si traduce</b> in italiano: è un segnale che dice <i>“di questo sto parlando”</i>.
            Nelle prossime lezioni imparerai anche 이/가 (soggetto) ed 을/를 (oggetto).
          </div>
          <AskHorangiInline
            context="Lezione sulla particella del tema 은/는 in coreano, livello A1. Lo studente italiano ha appena letto la regola base."
            prompt="Spiegami con parole semplici la differenza tra 은/는 e 이/가, con un esempio che posso ricordare facilmente."
          />
        </div>
      </div>
    </div>
  );
};

const RuleCard = ({ color, particle, when, example }) => {
  const bgs = {
    coral: { bg: 'var(--coral-soft)', border: '#FFCFC8', fg: 'var(--coral-dark)' },
    sky:   { bg: 'var(--sky-soft)',   border: '#B4DBFF', fg: 'var(--sky-dark)' },
  }[color];
  return (
    <div style={{ padding: 20, borderRadius: 20, background: bgs.bg, border: `2px solid ${bgs.border}` }}>
      <div className="kr" style={{ fontSize: 56, fontWeight: 900, color: bgs.fg, lineHeight: 1 }}>{particle}</div>
      <div style={{ marginTop: 10, fontSize: 14, fontWeight: 700, color: 'var(--ink-2)' }}>{when}</div>
      <div style={{ marginTop: 12, padding: '10px 12px', background: 'white', borderRadius: 12 }}>
        <div className="kr" style={{ fontSize: 18, fontWeight: 700 }}>{example.kr}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 11, color: 'var(--ink-3)' }}>{example.romaja}</div>
        <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>{example.it}</div>
      </div>
    </div>
  );
};

Object.assign(window, { StepFlash, StepDialog, StepGrammar });
