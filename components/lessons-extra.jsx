// Additional lessons — compact views for 2 other lessons to show variety
// Lessons: "Al bar: ordinare" (dialogic) and "I numeri sino-coreani" (numeric drills)

const BarLessonPreview = ({ onBack }) => {
  const [step, setStep] = useState(0);
  const steps = [
    { kind: 'theory' },
    { kind: 'menu' },
    { kind: 'order' },
    { kind: 'done' },
  ];

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 18,
        padding: '18px 28px', borderBottom: `2px solid var(--line)`,
        background: 'rgba(255, 248, 238, 0.85)', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={onBack} className="btn ghost sm">← Percorso</button>
        <div className="progress"><div style={{ width: `${(step / (steps.length - 1)) * 100}%` }} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: '#D13A2E' }}><Heart /><span style={{ fontSize: 18 }}>5</span></div>
      </div>

      <div style={{ maxWidth: 760, margin: '0 auto', padding: '32px 24px' }}>
        {step === 0 && <BarTheory />}
        {step === 1 && <BarMenu />}
        {step === 2 && <BarOrder />}
        {step === 3 && <BarDone />}
      </div>

      <div style={{
        borderTop: '2px solid var(--line)', padding: '18px 40px',
        background: 'rgba(255,255,255,0.85)', display: 'flex', justifyContent: 'flex-end',
        position: 'sticky', bottom: 0,
      }}>
        {step > 0 && <button className="btn ghost" onClick={() => setStep(s => s - 1)} style={{ marginRight: 10 }}>Indietro</button>}
        {step < steps.length - 1 ? (
          <button className="btn mint lg" onClick={() => setStep(s => s + 1)}>Continua</button>
        ) : (
          <button className="btn lg" onClick={onBack}>Torna al percorso</button>
        )}
      </div>
    </div>
  );
};

const BarTheory = () => (
  <div>
    <div style={{ display: 'flex', gap: 20, alignItems: 'flex-end', marginBottom: 24 }}>
      <Horangi size={100} mood="wave" bounce />
      <SpeechBubble>
        <div style={{ fontSize: 14, color: 'var(--ink-3)', fontWeight: 800, letterSpacing: '0.08em', textTransform: 'uppercase' }}>Lezione 2.1</div>
        <div style={{ fontSize: 17, marginTop: 4, lineHeight: 1.45 }}>
          Ora impariamo a ordinare in un bar coreano! <span className="kr">카페에 갑시다!</span>
        </div>
      </SpeechBubble>
    </div>
    <h1 style={{ fontSize: 34, fontWeight: 900, margin: '8px 0 4px' }}>Al bar: ordinare</h1>
    <div className="kr" style={{ fontSize: 22, color: 'var(--coral-dark)', fontWeight: 700 }}>카페에서</div>

    <p style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 18, lineHeight: 1.6 }}>
      Ordinare al bar usa una frase semplice: <b>[oggetto] + 주세요</b> che significa “mi dia [oggetto] per favore”.
    </p>

    <div className="card" style={{ padding: 22, marginTop: 16 }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr auto 1fr', gap: 14 }}>
        <FormulaBox label="Bevanda" kr="커피" romaja="keopi" highlight />
        <Plus />
        <FormulaBox label="per favore" kr="주세요" romaja="juseyo" />
      </div>
      <div style={{ marginTop: 18, padding: '14px 18px', background: 'var(--cream-2)', borderRadius: 14, display: 'flex', gap: 14, alignItems: 'center', flexWrap: 'wrap' }}>
        <span className="kr" style={{ fontSize: 22, fontWeight: 700 }}>커피 주세요.</span>
        <span style={{ color: 'var(--ink-2)' }}>— Un caffè, per favore.</span>
      </div>
    </div>
  </div>
);

const BarMenu = () => {
  const items = [
    { kr: '커피',       romaja: 'keopi',       it: 'Caffè',          price: 4500, emoji: '☕' },
    { kr: '녹차',       romaja: 'nokcha',      it: 'Tè verde',       price: 4000, emoji: '🍵' },
    { kr: '아이스크림', romaja: 'aiseukeurim',  it: 'Gelato',         price: 3500, emoji: '🍨' },
    { kr: '케이크',     romaja: 'keikeu',      it: 'Torta',          price: 5500, emoji: '🍰' },
    { kr: '물',         romaja: 'mul',         it: 'Acqua',          price: 1000, emoji: '💧' },
    { kr: '샌드위치',   romaja: 'saendeuwichi', it: 'Panino',         price: 6000, emoji: '🥪' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 6px' }}>Il menù · 메뉴</h2>
      <p style={{ color: 'var(--ink-2)', marginTop: 0 }}>Tocca ogni voce per ascoltare e memorizzare.</p>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12, marginTop: 16 }}>
        {items.map(i => (
          <div key={i.kr} className="card" style={{ padding: 14, display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer' }}>
            <div style={{ width: 48, height: 48, borderRadius: 12, background: 'var(--cream-2)', display: 'grid', placeItems: 'center', fontSize: 24 }}>{i.emoji}</div>
            <div style={{ flex: 1, minWidth: 0 }}>
              <div className="kr" style={{ fontSize: 18, fontWeight: 700 }}>{i.kr}</div>
              <div style={{ fontSize: 13, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{i.romaja}</div>
              <div style={{ fontSize: 12, color: 'var(--ink-2)' }}>{i.it}</div>
            </div>
            <div style={{ fontWeight: 900, color: 'var(--coral-dark)', fontSize: 14 }}>₩{i.price.toLocaleString()}</div>
          </div>
        ))}
      </div>
    </div>
  );
};

const BarOrder = () => {
  const [cart, setCart] = useState([]);
  const options = [
    { kr: '커피', emoji: '☕' }, { kr: '녹차', emoji: '🍵' }, { kr: '케이크', emoji: '🍰' }, { kr: '물', emoji: '💧' },
  ];
  return (
    <div>
      <h2 style={{ fontSize: 26, fontWeight: 900, margin: '0 0 6px' }}>Prova: ordina tu!</h2>
      <p style={{ color: 'var(--ink-2)' }}>Costruisci la tua frase. Tocca gli oggetti che vuoi ordinare.</p>

      <div className="card" style={{ padding: 20, marginTop: 16, minHeight: 100, background: 'var(--cream-2)' }}>
        <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>La tua ordinazione</div>
        {cart.length === 0 ? (
          <div style={{ color: 'var(--ink-3)', marginTop: 10, fontStyle: 'italic' }}>Nessun ordine ancora…</div>
        ) : (
          <div className="kr" style={{ fontSize: 24, fontWeight: 700, marginTop: 10 }}>
            {cart.map((c, i) => <span key={i}>{i > 0 ? '하고 ' : ''}{c.kr} </span>)}
            <span style={{ color: 'var(--coral-dark)' }}>주세요.</span>
          </div>
        )}
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 10, marginTop: 16 }}>
        {options.map(o => (
          <button key={o.kr} onClick={() => setCart(c => [...c, o])} className="card" style={{ padding: 14, textAlign: 'center', cursor: 'pointer' }}>
            <div style={{ fontSize: 32 }}>{o.emoji}</div>
            <div className="kr" style={{ fontWeight: 700, marginTop: 6 }}>{o.kr}</div>
          </button>
        ))}
      </div>
      {cart.length > 0 && (
        <button className="btn ghost sm" onClick={() => setCart([])} style={{ marginTop: 12 }}>Svuota</button>
      )}
    </div>
  );
};

const BarDone = () => (
  <div style={{ textAlign: 'center', paddingTop: 40 }}>
    <Horangi size={160} mood="cheer" bounce />
    <h1 style={{ fontSize: 36, fontWeight: 900, margin: '12px 0 6px' }}>Lezione completata!</h1>
    <div className="kr" style={{ fontSize: 20, color: 'var(--coral-dark)', fontWeight: 700 }}>카페 마스터! ☕</div>
    <div style={{ color: 'var(--ink-2)', marginTop: 8 }}>Sai ordinare in un bar coreano. +20 XP</div>
  </div>
);

// =======================================================
// Numbers lesson preview
// =======================================================
const NumbersLessonPreview = ({ onBack }) => {
  const numbers = [
    { n: 1, kr: '일', r: 'il' }, { n: 2, kr: '이', r: 'i' }, { n: 3, kr: '삼', r: 'sam' },
    { n: 4, kr: '사', r: 'sa' }, { n: 5, kr: '오', r: 'o' }, { n: 6, kr: '육', r: 'yuk' },
    { n: 7, kr: '칠', r: 'chil' }, { n: 8, kr: '팔', r: 'pal' }, { n: 9, kr: '구', r: 'gu' },
    { n: 10, kr: '십', r: 'sip' },
  ];
  const [active, setActive] = useState(null);

  return (
    <div style={{ minHeight: '100vh' }}>
      <div style={{
        display: 'flex', alignItems: 'center', gap: 18,
        padding: '18px 28px', borderBottom: '2px solid var(--line)',
        background: 'rgba(255, 248, 238, 0.85)', position: 'sticky', top: 0, zIndex: 10,
      }}>
        <button onClick={onBack} className="btn ghost sm">← Percorso</button>
        <div className="progress"><div style={{ width: '30%' }} /></div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: '#D13A2E' }}><Heart /><span style={{ fontSize: 18 }}>5</span></div>
      </div>

      <div style={{ maxWidth: 860, margin: '0 auto', padding: '32px 24px' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
          <Horangi size={80} mood="think" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>Unità 1 · Cap. 4</div>
            <h1 style={{ fontSize: 32, fontWeight: 900, margin: '4px 0 2px' }}>I numeri sino-coreani</h1>
            <div className="kr" style={{ fontSize: 20, color: 'var(--coral-dark)', fontWeight: 700 }}>한자 숫자</div>
          </div>
        </div>

        <p style={{ color: 'var(--ink-2)', marginTop: 18, fontSize: 16, lineHeight: 1.6 }}>
          Il coreano ha <b>due sistemi numerici</b>: i <b>sino-coreani</b> (di origine cinese, per date, soldi, numeri di telefono) e i <b>puri coreani</b> (per età, oggetti contati).
          Oggi impariamo i sino-coreani da 1 a 10.
        </p>

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(5, 1fr)', gap: 12, marginTop: 22 }}>
          {numbers.map(n => (
            <button
              key={n.n}
              onClick={() => setActive(n.n)}
              className="card"
              style={{
                padding: '20px 10px', textAlign: 'center', cursor: 'pointer',
                background: active === n.n ? 'var(--coral-soft)' : 'white',
                border: `2px solid ${active === n.n ? '#FFCFC8' : 'var(--line)'}`,
                boxShadow: active === n.n ? '0 4px 0 var(--coral-dark)' : '0 2px 0 rgba(43,33,24,0.08)',
              }}
            >
              <div style={{ fontSize: 28, fontWeight: 900, color: 'var(--coral-dark)' }}>{n.n}</div>
              <div className="kr" style={{ fontSize: 28, fontWeight: 800, marginTop: 4 }}>{n.kr}</div>
              <div style={{ fontSize: 11, color: 'var(--ink-3)', fontFamily: 'var(--font-mono)' }}>{n.r}</div>
            </button>
          ))}
        </div>

        {/* Composition */}
        <div className="card" style={{ padding: 22, marginTop: 24 }}>
          <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Composizione — numeri oltre il 10
          </div>
          <p style={{ color: 'var(--ink-2)', marginTop: 8 }}>
            I numeri più grandi si compongono combinando le cifre. Esempio:
          </p>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 10 }}>
            <CompositionTile num={15} composition={['십', '오']} />
            <CompositionTile num={23} composition={['이', '십', '삼']} />
            <CompositionTile num={100} composition={['백']} label="cento = 백" />
          </div>
        </div>

        <div style={{ marginTop: 20, display: 'flex', gap: 14, padding: 16, background: 'var(--sun-soft)', borderRadius: 16 }}>
          <div style={{ fontSize: 28 }}>💡</div>
          <div>
            <div style={{ fontWeight: 900, color: 'var(--sun-dark)' }}>Quando si usano?</div>
            <div style={{ color: 'var(--ink-2)', marginTop: 4, fontSize: 14, lineHeight: 1.5 }}>
              <b>Sino-coreani</b>: date, mesi, minuti, numeri di telefono, soldi, numeri di stanza. <br/>
              <b>Puri coreani</b> (하나, 둘, 셋…): età, ore (solo l'ora), oggetti contati.
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const CompositionTile = ({ num, composition, label }) => (
  <div style={{ padding: 14, borderRadius: 14, background: 'var(--cream-2)', textAlign: 'center' }}>
    <div style={{ fontSize: 26, fontWeight: 900, color: 'var(--coral-dark)' }}>{num}</div>
    <div className="kr" style={{ fontSize: 22, fontWeight: 700, marginTop: 4 }}>{composition.join('')}</div>
    <div style={{ fontSize: 11, color: 'var(--ink-3)', marginTop: 4 }}>{label || composition.join(' + ')}</div>
  </div>
);

Object.assign(window, { BarLessonPreview, NumbersLessonPreview });
