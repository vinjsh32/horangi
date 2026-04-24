// Horangi AI — tutor chat widget + reusable AI helpers

// Tiny markdown: **bold**, `code`, newlines
const renderMd = (text) => {
  if (!text) return null;
  const parts = text.split(/(\*\*[^*]+\*\*|`[^`]+`|\n)/g);
  return parts.map((p, i) => {
    if (p === '\n') return <br key={i} />;
    if (p.startsWith('**') && p.endsWith('**')) return <b key={i}>{p.slice(2, -2)}</b>;
    if (p.startsWith('`') && p.endsWith('`')) return <code key={i} style={{
      fontFamily: 'var(--font-mono)', background: 'var(--cream-2)', padding: '1px 5px', borderRadius: 4, fontSize: '0.92em',
    }}>{p.slice(1, -1)}</code>;
    return <span key={i}>{p}</span>;
  });
};

const systemPrompt = `Sei Horangi, un tutor coreano amichevole e paziente per studenti italiani che stanno imparando il coreano dal livello principiante al TOPIK II livello 2. Rispondi SEMPRE in italiano, ma includi sempre le parole coreane in Hangul con la trascrizione (romaja) tra parentesi. Sii conciso (max 4-5 frasi), incoraggiante, usa esempi concreti. Se l'utente chiede una spiegazione grammaticale, dai: 1) regola, 2) 1-2 esempi, 3) tip mnemonico. Usa **grassetto** per i concetti chiave.`;

const askHorangi = async (userMsg, context = '') => {
  const prompt = context ? `${systemPrompt}\n\nContesto della lezione: ${context}\n\nDomanda dello studente: ${userMsg}` : `${systemPrompt}\n\nDomanda: ${userMsg}`;
  try {
    const res = await window.claude.complete(prompt);
    return res;
  } catch (e) {
    return 'Oops, qualcosa è andato storto. Riprova!';
  }
};

// ==================== AI CHAT WIDGET ====================
const AIChatWidget = () => {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'ai', text: 'Ciao! Sono **Horangi** 🐯, il tuo tutor di coreano. Chiedimi qualsiasi cosa: grammatica, vocabolario, cultura, traduzioni… Prova:\n\n· *"Qual è la differenza tra 은/는 e 이/가?"*\n· *"Come si dice buonanotte?"*\n· *"Spiegami i livelli di formalità"*' },
  ]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, loading]);

  const send = async () => {
    const q = input.trim();
    if (!q || loading) return;
    setMessages(m => [...m, { role: 'user', text: q }]);
    setInput('');
    setLoading(true);
    const answer = await askHorangi(q);
    setMessages(m => [...m, { role: 'ai', text: answer }]);
    setLoading(false);
  };

  const suggestions = [
    'Spiega 은/는',
    'Come ordinare un caffè?',
    '10 verbi comuni',
    'Differenza 이에요/예요',
  ];

  return (
    <div style={{ position: 'fixed', bottom: 20, left: 20, zIndex: 60 }}>
      {open && (
        <div className="rise" style={{
          position: 'absolute', bottom: 76, left: 0, width: 400, height: 560,
          background: 'white', borderRadius: 24, border: '2px solid var(--line)',
          boxShadow: '0 16px 48px rgba(43,33,24,0.22)',
          display: 'flex', flexDirection: 'column', overflow: 'hidden',
        }}>
          {/* Header */}
          <div style={{
            display: 'flex', alignItems: 'center', gap: 12, padding: '14px 18px',
            background: 'linear-gradient(135deg, #FFF5E6, #FFE4E0)',
            borderBottom: '2px solid var(--line)',
          }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, overflow: 'hidden',
              background: 'white', display: 'grid', placeItems: 'center',
            }}>
              <Horangi size={52} mood="wave" />
            </div>
            <div style={{ flex: 1 }}>
              <div style={{ fontWeight: 900, fontSize: 16 }}>Horangi AI</div>
              <div style={{ fontSize: 12, color: 'var(--mint-dark)', fontWeight: 800, display: 'flex', alignItems: 'center', gap: 6 }}>
                <span style={{ width: 8, height: 8, borderRadius: 999, background: 'var(--mint)' }} /> Il tuo tutor · online
              </div>
            </div>
            <button onClick={() => setOpen(false)} style={{ padding: 6, color: 'var(--ink-3)' }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M6 6 L18 18 M18 6 L6 18" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/></svg>
            </button>
          </div>

          {/* Messages */}
          <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 16, display: 'flex', flexDirection: 'column', gap: 12 }}>
            {messages.map((m, i) => (
              <div key={i} style={{
                display: 'flex', gap: 8, flexDirection: m.role === 'user' ? 'row-reverse' : 'row',
              }}>
                {m.role === 'ai' && (
                  <div style={{
                    width: 32, height: 32, borderRadius: 10, overflow: 'hidden',
                    background: 'var(--coral-soft)', flexShrink: 0, display: 'grid', placeItems: 'center',
                  }}>
                    <Horangi size={42} mood="happy" />
                  </div>
                )}
                <div style={{
                  maxWidth: '78%',
                  background: m.role === 'user' ? 'var(--coral)' : 'var(--cream-2)',
                  color: m.role === 'user' ? 'white' : 'var(--ink)',
                  padding: '10px 14px', borderRadius: 16,
                  borderBottomRightRadius: m.role === 'user' ? 4 : 16,
                  borderBottomLeftRadius: m.role === 'ai' ? 4 : 16,
                  fontSize: 14, lineHeight: 1.5,
                }}>
                  {renderMd(m.text)}
                </div>
              </div>
            ))}
            {loading && (
              <div style={{ display: 'flex', gap: 8 }}>
                <div style={{ width: 32, height: 32, borderRadius: 10, background: 'var(--coral-soft)', display: 'grid', placeItems: 'center' }}>
                  <Horangi size={42} mood="think" />
                </div>
                <div style={{
                  background: 'var(--cream-2)', padding: '12px 16px', borderRadius: 16, borderBottomLeftRadius: 4,
                  display: 'flex', gap: 4,
                }}>
                  {[0, 1, 2].map(i => (
                    <div key={i} style={{
                      width: 7, height: 7, borderRadius: 999, background: 'var(--ink-3)',
                      animation: `floaty 1s ease-in-out ${i * 0.15}s infinite`,
                    }} />
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Suggestions */}
          {messages.length <= 1 && !loading && (
            <div style={{ padding: '0 16px 10px', display: 'flex', flexWrap: 'wrap', gap: 6 }}>
              {suggestions.map(s => (
                <button key={s} onClick={() => { setInput(s); setTimeout(send, 50); }} style={{
                  fontSize: 12, fontWeight: 700, padding: '6px 10px', borderRadius: 999,
                  background: 'var(--sky-soft)', color: 'var(--sky-dark)', border: '1px solid #B4DBFF',
                }}>{s}</button>
              ))}
            </div>
          )}

          {/* Input */}
          <div style={{ padding: 12, borderTop: '2px solid var(--line)', display: 'flex', gap: 8 }}>
            <input
              value={input}
              onChange={e => setInput(e.target.value)}
              onKeyDown={e => { if (e.key === 'Enter') send(); }}
              placeholder="Chiedi qualcosa in italiano o coreano…"
              style={{
                flex: 1, padding: '11px 14px', borderRadius: 12,
                border: '2px solid var(--line)', outline: 'none', fontSize: 14,
              }}
            />
            <button onClick={send} disabled={!input.trim() || loading} style={{
              width: 44, height: 44, borderRadius: 12,
              background: input.trim() && !loading ? 'var(--coral)' : '#E8DDCA',
              color: 'white', display: 'grid', placeItems: 'center',
              boxShadow: input.trim() && !loading ? '0 3px 0 var(--coral-dark)' : '0 3px 0 #CEBFA6',
              flexShrink: 0,
            }}>
              <svg width="18" height="18" viewBox="0 0 24 24"><path d="M3,12 L21,3 L18,12 L21,21 Z" fill="white"/></svg>
            </button>
          </div>
        </div>
      )}

      <button onClick={() => setOpen(o => !o)} style={{
        width: 64, height: 64, borderRadius: 999,
        background: 'linear-gradient(135deg, #FFB85C, #FF6B5E)',
        boxShadow: '0 6px 0 var(--coral-dark), 0 10px 24px rgba(43,33,24,0.22)',
        display: 'grid', placeItems: 'center', border: '3px solid white',
        position: 'relative',
      }}>
        <Horangi size={58} mood={open ? 'think' : 'wave'} />
        {!open && (
          <div style={{
            position: 'absolute', top: -4, right: -4, width: 22, height: 22, borderRadius: 999,
            background: 'var(--mint)', color: 'white', fontSize: 12, fontWeight: 900,
            display: 'grid', placeItems: 'center', border: '2px solid white',
          }}>AI</div>
        )}
      </button>
    </div>
  );
};

// ==================== ASK HORANGI INLINE BUTTON ====================
// Used in feedback panels to get a personalized explanation
const AskHorangiInline = ({ context, prompt, color = 'coral' }) => {
  const [open, setOpen] = useState(false);
  const [answer, setAnswer] = useState('');
  const [loading, setLoading] = useState(false);

  const ask = async () => {
    setOpen(true);
    if (answer || loading) return;
    setLoading(true);
    const res = await askHorangi(prompt, context);
    setAnswer(res);
    setLoading(false);
  };

  const fg = color === 'coral' ? 'var(--coral-dark)' : 'var(--sky-dark)';
  const bg = color === 'coral' ? 'var(--coral-soft)' : 'var(--sky-soft)';
  const border = color === 'coral' ? '#FFCFC8' : '#B4DBFF';

  return (
    <div style={{ marginTop: 10 }}>
      {!open ? (
        <button onClick={ask} style={{
          display: 'inline-flex', alignItems: 'center', gap: 8,
          padding: '8px 14px', borderRadius: 999,
          background: 'white', border: `2px solid ${border}`,
          color: fg, fontWeight: 800, fontSize: 13,
        }}>
          <span style={{ fontSize: 14 }}>✨</span>
          Chiedi ad Horangi di spiegare
        </button>
      ) : (
        <div style={{
          padding: 14, borderRadius: 14, background: bg, border: `2px solid ${border}`,
          display: 'flex', gap: 12,
        }}>
          <div style={{ width: 36, height: 36, borderRadius: 10, background: 'white', flexShrink: 0, display: 'grid', placeItems: 'center' }}>
            <Horangi size={48} mood="think" />
          </div>
          <div style={{ flex: 1, fontSize: 14, lineHeight: 1.55, color: 'var(--ink)' }}>
            {loading ? (
              <div style={{ display: 'flex', gap: 4, paddingTop: 8 }}>
                {[0,1,2].map(i => <div key={i} style={{ width: 7, height: 7, borderRadius: 999, background: 'var(--ink-3)', animation: `floaty 1s ease-in-out ${i*0.15}s infinite` }}/>)}
              </div>
            ) : renderMd(answer)}
          </div>
        </div>
      )}
    </div>
  );
};

Object.assign(window, { AIChatWidget, AskHorangiInline, askHorangi, renderMd });
