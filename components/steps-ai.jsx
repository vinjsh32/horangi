// AI-powered lesson steps — real-time conversation & translation with correction

// ==================== STEP: TRANSLATE (free writing with AI correction) ====================
const StepTranslate = ({ onResult }) => {
  const prompts = [
    { it: 'Io sono Marco.',            target: '저는 마르코입니다.' },
    { it: 'Piacere di conoscerti.',    target: '만나서 반갑습니다.' },
    { it: 'Buongiorno!',               target: '안녕하세요!' },
  ];
  const [idx] = useState(() => Math.floor(Math.random() * prompts.length));
  const task = prompts[idx];
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState(null);

  const check = async () => {
    if (!answer.trim() || loading) return;
    setLoading(true);
    const prompt = `Sei Horangi, tutor di coreano. Uno studente italiano A1 ha tradotto in coreano la frase italiana "${task.it}". La traduzione attesa è "${task.target}".
Risposta dello studente: "${answer}"

Valuta la risposta e rispondi in JSON puro (nessun testo intorno):
{"ok": true/false, "score": 0-100, "feedback": "spiegazione breve in italiano max 2 frasi", "correction": "versione corretta in hangul"}`;
    try {
      const res = await window.claude.complete(prompt);
      const match = res.match(/\{[\s\S]*\}/);
      const data = match ? JSON.parse(match[0]) : null;
      if (data) {
        setFeedback(data);
        onResult?.({ ok: data.ok, text: data.feedback });
      } else {
        setFeedback({ ok: false, feedback: res, correction: task.target });
        onResult?.({ ok: false, text: res });
      }
    } catch (e) {
      setFeedback({ ok: false, feedback: 'Errore nel controllo.', correction: task.target });
    }
    setLoading(false);
  };

  useEffect(() => {
    window.__stepCanCheck = answer.trim().length > 0 && !feedback && !loading;
    window.__stepCheck = () => { if (!feedback) check(); else onResult?.({ ok: feedback.ok, text: feedback.feedback }); };
    return () => { window.__stepCheck = null; };
  }, [answer, feedback, loading]);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Horangi size={64} mood="think" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ✨ Traduci con AI · 번역
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0' }}>Scrivi in coreano</h2>
        </div>
      </div>

      <div className="card" style={{ padding: 22 }}>
        <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Frase da tradurre</div>
        <div style={{ fontSize: 22, fontWeight: 700, marginTop: 6 }}>"{task.it}"</div>
        <textarea
          className="kr"
          value={answer}
          onChange={e => !feedback && setAnswer(e.target.value)}
          placeholder="Scrivi qui in hangul…"
          style={{
            width: '100%', marginTop: 16, padding: 14, fontSize: 22,
            border: '2px solid var(--line)', borderRadius: 12, outline: 'none',
            fontWeight: 700, background: 'var(--cream-2)', minHeight: 80, resize: 'vertical',
          }}
          disabled={!!feedback}
        />
        {feedback && (
          <div className="rise" style={{
            marginTop: 14, padding: 14, borderRadius: 12,
            background: feedback.ok ? 'var(--mint-soft)' : 'var(--coral-soft)',
            border: `2px solid ${feedback.ok ? '#7ED9B7' : '#FFA599'}`,
            display: 'flex', gap: 12,
          }}>
            <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
              <Horangi size={48} mood={feedback.ok ? 'cheer' : 'think'} />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, color: feedback.ok ? 'var(--mint-dark)' : 'var(--coral-dark)' }}>
                {feedback.ok ? '✓ Ottimo!' : '✗ Non proprio'} {feedback.score != null && `· ${feedback.score}/100`}
              </div>
              <div style={{ fontSize: 14, marginTop: 4, lineHeight: 1.5 }}>{renderMd ? renderMd(feedback.feedback) : feedback.feedback}</div>
              {!feedback.ok && feedback.correction && (
                <div style={{ marginTop: 8, padding: '8px 12px', background: 'white', borderRadius: 10 }}>
                  <span style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Corretto</span>
                  <div className="kr" style={{ fontSize: 18, fontWeight: 700, marginTop: 2 }}>{feedback.correction}</div>
                </div>
              )}
            </div>
          </div>
        )}
        {loading && (
          <div style={{ marginTop: 14, padding: 14, borderRadius: 12, background: 'var(--cream-2)', display: 'flex', alignItems: 'center', gap: 10 }}>
            <Horangi size={32} mood="think" />
            <span style={{ fontSize: 14, color: 'var(--ink-2)' }}>Horangi sta controllando…</span>
          </div>
        )}
      </div>
    </div>
  );
};

// ==================== STEP: AI CONVERSATION ====================
const StepConverse = ({ onResult }) => {
  const [messages, setMessages] = useState([
    { role: 'ai', kr: '안녕하세요! 저는 호랑이입니다. 이름이 뭐예요?', it: 'Buongiorno! Io sono Horangi. Come ti chiami?' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const [turns, setTurns] = useState(0);
  const scrollRef = useRef(null);
  const targetTurns = 3;

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  useEffect(() => {
    window.__stepCanCheck = turns >= targetTurns;
    window.__stepCheck = () => onResult?.({ ok: true, text: `Conversazione completata! Hai scambiato ${turns} battute con Horangi.` });
    return () => { window.__stepCheck = null; };
  }, [turns]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setMessages(m => [...m, { role: 'user', kr: q }]);
    setInput('');
    setLoading(true);
    const history = messages.map(m => `${m.role === 'ai' ? 'Horangi' : 'Studente'}: ${m.kr}`).join('\n');
    const prompt = `Sei Horangi, tutor di coreano per principianti. Stai facendo una pratica di conversazione sul tema "presentazioni" con uno studente italiano A1.
Conversazione fino a qui:
${history}
Studente: ${q}

Rispondi come Horangi. Regole:
- Rispondi SEMPRE in coreano semplice (livello A1), 1-2 frasi brevi
- Usa solo vocabolario di base: 안녕하세요, 저는, 이름, 입니다, 반갑습니다, 한국, 이탈리아, 학생
- Se lo studente ha fatto errori grammaticali, correggili brevemente aggiungendo una nota in italiano tra parentesi alla fine
- Mantieni la conversazione viva facendo una domanda

Formato JSON puro:
{"kr": "tua risposta in hangul", "it": "traduzione italiana", "correction": "nota di correzione in italiano se necessaria, altrimenti null"}`;
    try {
      const res = await window.claude.complete(prompt);
      const match = res.match(/\{[\s\S]*\}/);
      const data = match ? JSON.parse(match[0]) : null;
      if (data) {
        setMessages(m => [...m, { role: 'ai', kr: data.kr, it: data.it, correction: data.correction }]);
      } else {
        setMessages(m => [...m, { role: 'ai', kr: '네, 좋아요!', it: 'Sì, bene!' }]);
      }
    } catch (e) {
      setMessages(m => [...m, { role: 'ai', kr: '죄송해요.', it: 'Scusa, riprova.' }]);
    }
    setTurns(t => t + 1);
    setLoading(false);
  };

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Horangi size={64} mood="wave" bounce />
        <div style={{ flex: 1 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            ✨ Conversazione con AI · 대화
          </div>
          <h2 style={{ fontSize: 24, fontWeight: 900, margin: '4px 0 0' }}>Presentati ad Horangi</h2>
          <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>Scambia almeno {targetTurns} battute · {turns}/{targetTurns} completate</div>
        </div>
      </div>

      <div className="card" style={{ padding: 0, overflow: 'hidden' }}>
        <div ref={scrollRef} style={{ height: 340, overflowY: 'auto', padding: 18, display: 'flex', flexDirection: 'column', gap: 14, background: 'var(--cream-2)' }}>
          {messages.map((m, i) => (
            <div key={i} style={{ display: 'flex', gap: 10, flexDirection: m.role === 'user' ? 'row-reverse' : 'row' }}>
              {m.role === 'ai' && (
                <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
                  <Horangi size={48} mood="happy" />
                </div>
              )}
              <div style={{
                maxWidth: '78%',
                background: m.role === 'user' ? 'var(--coral)' : 'white',
                color: m.role === 'user' ? 'white' : 'var(--ink)',
                padding: '10px 14px', borderRadius: 16,
                borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                borderBottomLeftRadius: m.role === 'ai' ? 4 : 16,
              }}>
                <div className="kr" style={{ fontSize: 17, fontWeight: 700 }}>{m.kr}</div>
                {m.it && <div style={{ fontSize: 12, opacity: 0.75, marginTop: 4, fontStyle: 'italic' }}>{m.it}</div>}
                {m.correction && (
                  <div style={{
                    fontSize: 12, marginTop: 8, padding: '6px 10px', borderRadius: 8,
                    background: 'var(--sun-soft)', color: 'var(--sun-dark)', border: '1px solid #F5D678',
                  }}>
                    💡 {m.correction}
                  </div>
                )}
              </div>
            </div>
          ))}
          {loading && (
            <div style={{ display: 'flex', gap: 10 }}>
              <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', display: 'grid', placeItems: 'center' }}>
                <Horangi size={48} mood="think" />
              </div>
              <div style={{ background: 'white', padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: 4, display: 'flex', gap: 4 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--ink-3)', animation: `floaty 1s ease-in-out ${i*0.15}s infinite` }}/>)}
              </div>
            </div>
          )}
        </div>
        <div style={{ padding: 12, borderTop: '2px solid var(--line)', display: 'flex', gap: 8 }}>
          <input
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === 'Enter') send(); }}
            placeholder="Rispondi in coreano…"
            className="kr"
            style={{
              flex: 1, padding: '12px 14px', borderRadius: 12,
              border: '2px solid var(--line)', outline: 'none', fontSize: 16, fontWeight: 600,
            }}
            disabled={loading}
          />
          <button onClick={send} disabled={!input.trim() || loading} style={{
            width: 48, height: 48, borderRadius: 12,
            background: input.trim() && !loading ? 'var(--coral)' : '#E8DDCA',
            boxShadow: input.trim() && !loading ? '0 3px 0 var(--coral-dark)' : '0 3px 0 #CEBFA6',
            display: 'grid', placeItems: 'center', flexShrink: 0,
          }}>
            <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3,12 L21,3 L18,12 L21,21 Z" fill="white"/></svg>
          </button>
        </div>
      </div>

      {/* Quick reply hints */}
      <div style={{ display: 'flex', gap: 8, marginTop: 12, flexWrap: 'wrap' }}>
        {['저는 루카입니다.', '이탈리아 사람입니다.', '만나서 반갑습니다.'].map(s => (
          <button key={s} onClick={() => setInput(s)} className="kr" style={{
            fontSize: 14, fontWeight: 700, padding: '6px 12px', borderRadius: 999,
            background: 'var(--sky-soft)', color: 'var(--sky-dark)', border: '1px solid #B4DBFF',
          }}>{s}</button>
        ))}
      </div>
    </div>
  );
};

Object.assign(window, { StepTranslate, StepConverse });
