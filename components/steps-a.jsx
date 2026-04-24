// Steps part 1: theory intro, hangul tracing, flashcards, dialog

// ================== STEP: THEORY INTRO ==================
const StepTheory = () => {
  return (
    <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', marginBottom: 24 }}>
        <Horangi size={110} mood="wave" bounce />
        <SpeechBubble>
          <div style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Benvenuto!
          </div>
          <div style={{ fontSize: 17, marginTop: 4, lineHeight: 1.45 }}>
            Oggi impariamo a <b>presentarci</b> in coreano. <span className="kr">안녕하세요!</span>
          </div>
        </SpeechBubble>
      </div>

      <h1 style={{ fontSize: 36, fontWeight: 900, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
        Saluti e presentazioni
      </h1>
      <div className="kr" style={{ fontSize: 22, color: 'var(--coral-dark)', fontWeight: 700 }}>인사와 소개</div>

      <div style={{ marginTop: 22, fontSize: 17, lineHeight: 1.65, color: 'var(--ink-2)' }}>
        <p>
          Il coreano ha <b>livelli di formalità</b> diversi a seconda di con chi parli. In questa lezione
          usiamo il registro <b>formale-gentile</b> (<span className="kr">존댓말</span>, <i>jondaetmal</i>),
          quello che useresti con uno sconosciuto, un insegnante o un adulto.
        </p>
        <p>
          Ti presenterai usando tre elementi: un <b>saluto</b>, un <b>soggetto</b> e la <b>copula</b> “essere”.
          La struttura è:
        </p>
      </div>

      {/* Formula card */}
      <div className="card pop" style={{ padding: 24, marginTop: 18 }}>
        <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr auto 1fr', gap: 14, alignItems: 'stretch' }}>
          <FormulaBox label="Io (formale)" kr="저" romaja="jeo" />
          <Plus />
          <FormulaBox label="Nome" kr="루카" romaja="Ruka" highlight />
          <Plus />
          <FormulaBox label="essere (formale)" kr="입니다" romaja="imnida" />
        </div>
        <div style={{
          marginTop: 18, padding: '14px 18px', background: 'var(--cream-2)',
          borderRadius: 14, display: 'flex', alignItems: 'center', gap: 14, flexWrap: 'wrap',
        }}>
          <span style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Risultato</span>
          <span className="kr" style={{ fontSize: 22, fontWeight: 700 }}>저는 루카입니다.</span>
          <span style={{ fontSize: 15, color: 'var(--ink-2)' }}>— Io sono Luca.</span>
        </div>
      </div>

      <div style={{ marginTop: 22, display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 14 }}>
        <InfoCard color="sky" title="Lo sapevi?" body="Il coreano usa una particella del tema (은/는) dopo il soggetto, qualcosa che l'italiano non ha." />
        <InfoCard color="plum" title="Obiettivo" body="Alla fine della lezione saprai presentarti e rispondere a una presentazione." />
      </div>
    </div>
  );
};

const SpeechBubble = ({ children }) => (
  <div style={{
    position: 'relative', background: 'white', border: '2px solid var(--line)',
    borderRadius: 18, padding: '14px 18px', flex: 1, boxShadow: 'var(--shadow-card)',
  }}>
    {children}
    <div style={{
      position: 'absolute', left: -10, bottom: 18, width: 18, height: 18,
      background: 'white', borderLeft: '2px solid var(--line)', borderBottom: '2px solid var(--line)',
      transform: 'rotate(45deg)',
    }} />
  </div>
);

const FormulaBox = ({ label, kr, romaja, highlight }) => (
  <div style={{
    padding: '14px 10px', borderRadius: 14, textAlign: 'center',
    background: highlight ? 'var(--sun-soft)' : 'var(--cream-2)',
    border: `2px solid ${highlight ? '#F5D678' : 'var(--line-strong)'}`,
  }}>
    <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
    <div className="kr" style={{ fontSize: 26, fontWeight: 800, margin: '4px 0' }}>{kr}</div>
    <div style={{ fontSize: 12, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{romaja}</div>
  </div>
);

const Plus = () => (
  <div style={{ display: 'grid', placeItems: 'center', color: 'var(--ink-3)', fontWeight: 900, fontSize: 22 }}>+</div>
);

const InfoCard = ({ color, title, body }) => {
  const bg = { sky: 'var(--sky-soft)', plum: 'var(--plum-soft)', mint: 'var(--mint-soft)' }[color];
  const fg = { sky: 'var(--sky-dark)', plum: '#5C3EBA', mint: 'var(--mint-dark)' }[color];
  return (
    <div style={{ padding: 16, borderRadius: 16, background: bg }}>
      <div style={{ fontSize: 12, fontWeight: 900, color: fg, letterSpacing: '0.1em', textTransform: 'uppercase' }}>{title}</div>
      <div style={{ marginTop: 6, fontSize: 14, color: 'var(--ink-2)', lineHeight: 1.5 }}>{body}</div>
    </div>
  );
};

// ================== STEP: HANGUL TRACING ==================
const StepHangul = () => {
  const letters = window.HANGUL;
  const [active, setActive] = useState(0);
  const [traced, setTraced] = useState({}); // { [i]: true }
  const current = letters[active];
  const canAdvance = Object.keys(traced).length >= letters.length;

  return (
    <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 8 }}>
        <Horangi size={70} mood="think" />
        <div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>
            Alfabeto · Hangul 한글
          </div>
          <h2 style={{ fontSize: 28, fontWeight: 900, margin: 0 }}>Tre lettere per iniziare</h2>
        </div>
      </div>
      <p style={{ color: 'var(--ink-2)', maxWidth: 600 }}>
        Tocca l'ordine dei tratti e ripeti tracciando con il mouse. Completa tutte e tre le lettere per continuare.
      </p>

      {/* Letter tabs */}
      <div style={{ display: 'flex', gap: 12, marginTop: 20 }}>
        {letters.map((l, i) => (
          <button
            key={l.jamo}
            onClick={() => setActive(i)}
            style={{
              padding: '10px 18px', borderRadius: 14, minWidth: 80,
              background: i === active ? 'white' : 'transparent',
              border: `2px solid ${i === active ? 'var(--coral)' : 'var(--line)'}`,
              boxShadow: i === active ? '0 4px 0 var(--coral-dark)' : 'none',
              position: 'relative',
            }}
          >
            <div className="kr" style={{ fontSize: 28, fontWeight: 900, color: 'var(--ink)' }}>{l.jamo}</div>
            <div style={{ fontSize: 11, color: 'var(--ink-3)', fontWeight: 700 }}>{l.name}</div>
            {traced[i] && (
              <div style={{
                position: 'absolute', top: -8, right: -8, width: 22, height: 22, borderRadius: 999,
                background: 'var(--mint)', color: 'white', fontSize: 13, fontWeight: 900,
                display: 'grid', placeItems: 'center', border: '2px solid white',
              }}>✓</div>
            )}
          </button>
        ))}
      </div>

      {/* Tracing area */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 320px', gap: 20, marginTop: 20 }}>
        <TracingCanvas
          key={active}
          paths={current.paths}
          onComplete={() => setTraced(t => ({ ...t, [active]: true }))}
        />
        <div>
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Suono</div>
            <div style={{ fontSize: 16, marginTop: 6, lineHeight: 1.4 }}>{current.sound}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>Tratti</div>
            <div style={{ fontSize: 16, marginTop: 6 }}>{current.strokes}</div>
            <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginTop: 16 }}>Esempio</div>
            <div style={{ display: 'flex', alignItems: 'baseline', gap: 10, marginTop: 6 }}>
              <span className="kr" style={{ fontSize: 26, fontWeight: 800 }}>{current.example.kr}</span>
              <span style={{ fontFamily: 'var(--font-mono)', color: 'var(--ink-3)', fontSize: 13 }}>{current.example.romaja}</span>
            </div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 4 }}>→ {current.example.it}</div>
          </div>
          {canAdvance && (
            <div className="rise" style={{
              marginTop: 14, padding: 14, borderRadius: 14, background: 'var(--mint-soft)',
              color: 'var(--mint-dark)', fontWeight: 800, fontSize: 14, display: 'flex', gap: 10, alignItems: 'center',
            }}>
              <Sparkle color="#2FA882" /> Ottimo! Puoi continuare.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

const TracingCanvas = ({ paths, onComplete }) => {
  const svgRef = useRef(null);
  const [drawn, setDrawn] = useState([]); // array of point-arrays
  const [current, setCurrent] = useState(null);
  const [drawingStroke, setDrawingStroke] = useState(false);

  const done = drawn.length >= paths.length;

  useEffect(() => { setDrawn([]); setCurrent(null); }, [paths]);

  const pt = (e) => {
    const rect = svgRef.current.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 200;
    const y = ((e.clientY - rect.top) / rect.height) * 200;
    return [x, y];
  };

  const onDown = (e) => { setDrawingStroke(true); setCurrent([pt(e)]); };
  const onMove = (e) => { if (drawingStroke) setCurrent(c => [...c, pt(e)]); };
  const onUp = () => {
    if (current && current.length > 5) {
      const next = [...drawn, current];
      setDrawn(next);
      if (next.length >= paths.length) setTimeout(() => onComplete?.(), 200);
    }
    setCurrent(null); setDrawingStroke(false);
  };

  const toPath = (pts) => pts.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p[0].toFixed(1)},${p[1].toFixed(1)}`).join(' ');

  return (
    <div style={{
      background: 'white', borderRadius: 20, border: '2px solid var(--line)',
      padding: 20, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 12,
    }}>
      <svg
        ref={svgRef}
        viewBox="0 0 200 200"
        style={{ width: '100%', maxWidth: 360, aspectRatio: '1', touchAction: 'none', cursor: 'crosshair' }}
        onMouseDown={onDown} onMouseMove={onMove} onMouseUp={onUp} onMouseLeave={onUp}
      >
        {/* Grid */}
        <line x1="100" y1="0" x2="100" y2="200" stroke="#F0E3CB" strokeWidth="1" strokeDasharray="4 6" />
        <line x1="0" y1="100" x2="200" y2="100" stroke="#F0E3CB" strokeWidth="1" strokeDasharray="4 6" />
        <rect x="10" y="10" width="180" height="180" fill="none" stroke="#EFE3CF" strokeWidth="2" rx="12" />
        {/* Ghost paths to trace over */}
        {paths.map((p, i) => (
          <g key={i}>
            <path d={p} stroke="#F0E3CB" strokeWidth="22" fill="none" strokeLinecap="round" strokeLinejoin="round" />
            <path d={p} stroke="#E0D0B3" strokeWidth="2" fill="none" strokeDasharray="4 4" strokeLinecap="round" />
            <text x={p.startsWith('M 100,60') ? 105 : (p.match(/M (\d+)/)?.[1] || 0) - 14} y={p.startsWith('M 100,60') ? 56 : (p.match(/M \d+,(\d+)/)?.[1] || 0) - 6} fontSize="12" fontWeight="800" fill="#FF6B5E">{i + 1}</text>
          </g>
        ))}
        {/* Drawn strokes */}
        {drawn.map((s, i) => (
          <path key={i} d={toPath(s)} stroke="#FF6B5E" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" />
        ))}
        {current && <path d={toPath(current)} stroke="#FF6B5E" strokeWidth="10" fill="none" strokeLinecap="round" strokeLinejoin="round" opacity="0.9" />}
      </svg>
      <div style={{ display: 'flex', gap: 10, width: '100%' }}>
        <button className="btn ghost sm" onClick={() => setDrawn([])} style={{ flex: 1 }}>Cancella</button>
        <div style={{ flex: 1, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 8, fontWeight: 800, color: done ? 'var(--mint-dark)' : 'var(--ink-3)' }}>
          {done ? '✓ Lettera completa' : `${drawn.length}/${paths.length} tratti`}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { StepTheory, StepHangul, SpeechBubble, InfoCard });
