// Steps part 3: choice, match, speak, quiz, done

// ================== STEP: CHOICE ==================
const StepChoice = ({ onResult }) => {
  const q = window.LESSON.choice;
  const [picked, setPicked] = useState(null);
  const [checked, setChecked] = useState(false);

  useEffect(() => {
    // Expose check handler to footer
    window.__stepCheck = () => {
      if (picked == null) return;
      const ok = q.options[picked].correct;
      const why = q.options[picked].why;
      setChecked(true);
      onResult({ ok, text: ok ? `“${q.options[picked].kr}” — corretto!` : why });
    };
    window.__stepCanCheck = picked != null && !checked;
    return () => { window.__stepCheck = null; };
  }, [picked, checked]);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Horangi size={64} mood="think" />
        <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Esercizio · scelta multipla
        </div>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 22px' }}>{q.prompt}</h2>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
        {q.options.map((opt, i) => {
          const isPicked = picked === i;
          const showCorrect = checked && opt.correct;
          const showWrong = checked && isPicked && !opt.correct;
          return (
            <button
              key={i}
              onClick={() => !checked && setPicked(i)}
              style={{
                textAlign: 'left', padding: '16px 18px', borderRadius: 16,
                background: showCorrect ? 'var(--mint-soft)' : (showWrong ? 'var(--coral-soft)' : (isPicked ? '#FFF2CE' : 'white')),
                border: `2px solid ${showCorrect ? '#7ED9B7' : (showWrong ? '#FFA599' : (isPicked ? '#F5D678' : 'var(--line)'))}`,
                boxShadow: isPicked ? '0 4px 0 #E0C660' : '0 4px 0 var(--line-strong)',
                display: 'flex', alignItems: 'center', gap: 16,
              }}
            >
              <div style={{
                width: 30, height: 30, borderRadius: 8, display: 'grid', placeItems: 'center',
                background: isPicked ? 'var(--sun)' : 'white',
                border: `2px solid ${isPicked ? 'var(--sun-dark)' : 'var(--line-strong)'}`,
                fontWeight: 900, fontSize: 14, color: isPicked ? 'white' : 'var(--ink-3)',
                flexShrink: 0,
              }}>{String.fromCharCode(65 + i)}</div>
              <div>
                <div className="kr" style={{ fontSize: 20, fontWeight: 700 }}>{opt.kr}</div>
                <div style={{ fontFamily: 'var(--font-mono)', fontSize: 12, color: 'var(--ink-3)', marginTop: 2 }}>{opt.it}</div>
              </div>
              {showCorrect && <div style={{ marginLeft: 'auto', color: 'var(--mint-dark)', fontWeight: 900, fontSize: 20 }}>✓</div>}
              {showWrong && <div style={{ marginLeft: 'auto', color: 'var(--coral-dark)', fontWeight: 900, fontSize: 20 }}>✕</div>}
            </button>
          );
        })}
      </div>
    </div>
  );
};

// ================== STEP: MATCH ==================
const StepMatch = ({ onResult }) => {
  const pairs = window.LESSON.match.pairs;
  const [leftPick, setLeftPick] = useState(null);
  const [rightPick, setRightPick] = useState(null);
  const [matched, setMatched] = useState({}); // krIdx -> itIdx
  const [wrongBlink, setWrongBlink] = useState(null);

  // Shuffled right column order, stable per mount
  const rightOrder = useMemo(() => {
    const indices = pairs.map((_, i) => i);
    for (let i = indices.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [indices[i], indices[j]] = [indices[j], indices[i]];
    }
    return indices;
  }, []);

  useEffect(() => {
    if (leftPick != null && rightPick != null) {
      if (leftPick === rightPick) {
        setMatched(m => ({ ...m, [leftPick]: rightPick }));
        setLeftPick(null); setRightPick(null);
      } else {
        setWrongBlink({ l: leftPick, r: rightPick });
        setTimeout(() => { setLeftPick(null); setRightPick(null); setWrongBlink(null); }, 500);
      }
    }
  }, [leftPick, rightPick]);

  const allMatched = Object.keys(matched).length === pairs.length;

  useEffect(() => {
    window.__stepCanCheck = allMatched;
    window.__stepCheck = () => { onResult({ ok: true, text: 'Tutti gli abbinamenti sono corretti!' }); };
    return () => { window.__stepCheck = null; };
  }, [allMatched]);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Horangi size={64} mood="cheer" />
        <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Esercizio · abbinamento
        </div>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 22px' }}>{window.LESSON.match.prompt}</h2>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {pairs.map((p, i) => {
            const done = matched[i] != null;
            const active = leftPick === i;
            const wrong = wrongBlink?.l === i;
            return (
              <button
                key={i}
                onClick={() => !done && setLeftPick(i)}
                disabled={done}
                className={wrong ? 'shake' : ''}
                style={{
                  padding: '16px 18px', borderRadius: 14, textAlign: 'left',
                  background: done ? 'var(--mint-soft)' : (active ? 'var(--coral-soft)' : 'white'),
                  border: `2px solid ${done ? '#7ED9B7' : (active ? '#FFA599' : 'var(--line-strong)')}`,
                  boxShadow: active ? '0 4px 0 var(--coral-dark)' : '0 4px 0 var(--line-strong)',
                  opacity: done ? 0.6 : 1,
                }}
              >
                <div className="kr" style={{ fontSize: 22, fontWeight: 700 }}>{p.kr}</div>
              </button>
            );
          })}
        </div>
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {rightOrder.map((origIdx, slot) => {
            const done = matched[origIdx] != null;
            const active = rightPick === origIdx;
            const wrong = wrongBlink?.r === origIdx;
            return (
              <button
                key={slot}
                onClick={() => !done && setRightPick(origIdx)}
                disabled={done}
                className={wrong ? 'shake' : ''}
                style={{
                  padding: '16px 18px', borderRadius: 14, textAlign: 'left',
                  background: done ? 'var(--mint-soft)' : (active ? 'var(--sky-soft)' : 'white'),
                  border: `2px solid ${done ? '#7ED9B7' : (active ? '#B4DBFF' : 'var(--line-strong)')}`,
                  boxShadow: active ? '0 4px 0 var(--sky-dark)' : '0 4px 0 var(--line-strong)',
                  opacity: done ? 0.6 : 1,
                }}
              >
                <div style={{ fontSize: 16, fontWeight: 700 }}>{pairs[origIdx].it}</div>
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
};

// ================== STEP: SPEAK ==================
const StepSpeak = ({ onResult }) => {
  const q = window.LESSON.speak;
  const [recording, setRecording] = useState(false);
  const [done, setDone] = useState(false);
  const [levels, setLevels] = useState(Array(14).fill(0));

  useEffect(() => {
    if (!recording) return;
    const t = setInterval(() => {
      setLevels(ls => ls.map(() => 0.2 + Math.random() * 0.8));
    }, 90);
    return () => clearInterval(t);
  }, [recording]);

  const start = () => {
    setRecording(true); setDone(false);
    setTimeout(() => { setRecording(false); setDone(true); }, 2400);
  };

  useEffect(() => {
    window.__stepCanCheck = done;
    window.__stepCheck = () => { onResult({ ok: true, text: 'Ottima pronuncia! 95% di corrispondenza.' }); };
    return () => { window.__stepCheck = null; };
  }, [done]);

  return (
    <div style={{ maxWidth: 640, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Horangi size={64} mood={recording ? 'cheer' : 'happy'} />
        <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
          Pronuncia · 발음
        </div>
      </div>
      <h2 style={{ fontSize: 24, fontWeight: 900, margin: '0 0 22px' }}>{q.prompt}</h2>

      <div className="card" style={{ padding: 32, textAlign: 'center' }}>
        <div className="kr" style={{ fontSize: 44, fontWeight: 800 }}>{q.kr}</div>
        <div style={{ fontFamily: 'var(--font-mono)', fontSize: 14, color: 'var(--ink-3)', marginTop: 6 }}>{q.romaja}</div>
        <div style={{ fontSize: 15, color: 'var(--ink-2)', marginTop: 4 }}>{q.it}</div>

        {/* Waveform viz */}
        <div style={{
          marginTop: 26, height: 80, display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 4,
        }}>
          {levels.map((l, i) => (
            <div key={i} style={{
              width: 6, height: `${Math.max(8, l * 70)}px`, borderRadius: 3,
              background: done ? 'var(--mint)' : (recording ? 'var(--coral)' : 'var(--line-strong)'),
              transition: 'height 90ms',
            }} />
          ))}
        </div>

        <button
          onClick={start} disabled={recording}
          style={{
            marginTop: 16, width: 84, height: 84, borderRadius: 999,
            background: recording ? 'var(--coral-dark)' : 'var(--coral)',
            boxShadow: `0 4px 0 ${recording ? '#B02F23' : 'var(--coral-dark)'}`,
            display: 'grid', placeItems: 'center', color: 'white', border: 'none',
            transform: recording ? 'scale(1.05)' : 'scale(1)',
            transition: 'transform 180ms',
          }}
        >
          <svg width="32" height="38" viewBox="0 0 24 28" fill="none">
            <rect x="8" y="2" width="8" height="16" rx="4" fill="white" />
            <path d="M4 14 Q4 22 12 22 Q20 22 20 14 M12 22 L12 26 M8 26 L16 26" stroke="white" strokeWidth="2.5" fill="none" strokeLinecap="round"/>
          </svg>
        </button>
        <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-3)', fontWeight: 700 }}>
          {recording ? 'In ascolto…' : (done ? '✓ Registrato' : 'Tocca per parlare')}
        </div>
      </div>
    </div>
  );
};

// ================== STEP: QUIZ ==================
const StepQuiz = ({ onResult }) => {
  const quiz = window.LESSON.quiz;
  const [idx, setIdx] = useState(0);
  const [answers, setAnswers] = useState({});
  const [fillText, setFillText] = useState('');

  const q = quiz[idx];
  const isLast = idx === quiz.length - 1;
  const currentAnswered = answers[idx] != null;

  const submitAnswer = (val) => {
    setAnswers(a => ({ ...a, [idx]: val }));
  };

  const next = () => {
    if (isLast) {
      const correct = Object.entries(answers).filter(([i, a]) => {
        const qq = quiz[i];
        if (qq.kind === 'choice') return qq.options[a]?.correct;
        if (qq.kind === 'fillin') return String(a).trim() === qq.answer;
        return false;
      }).length;
      onResult({ ok: correct === quiz.length, text: `${correct}/${quiz.length} risposte corrette` });
    } else {
      setIdx(i => i + 1);
      setFillText('');
    }
  };

  useEffect(() => {
    window.__stepCanCheck = currentAnswered;
    window.__stepCheck = next;
    return () => { window.__stepCheck = null; };
  }, [currentAnswered, idx, answers]);

  return (
    <div style={{ maxWidth: 680, margin: '0 auto', padding: '32px 24px 24px' }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 18 }}>
        <Horangi size={64} mood="cheer" bounce />
        <div>
          <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Quiz finale · 퀴즈
          </div>
          <div style={{ fontSize: 15, color: 'var(--ink-2)' }}>Domanda {idx + 1} di {quiz.length}</div>
        </div>
      </div>

      {/* Mini progress dots */}
      <div style={{ display: 'flex', gap: 6, marginBottom: 24 }}>
        {quiz.map((_, i) => (
          <div key={i} style={{
            flex: 1, height: 6, borderRadius: 999,
            background: i < idx ? 'var(--mint)' : (i === idx ? 'var(--coral)' : '#F0E3CB'),
          }} />
        ))}
      </div>

      <h2 key={idx} className="rise" style={{ fontSize: 24, fontWeight: 900, margin: '0 0 20px' }}>{q.prompt}</h2>

      {q.kind === 'choice' && (
        <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
          {q.options.map((o, i) => {
            const picked = answers[idx] === i;
            return (
              <button
                key={i}
                onClick={() => submitAnswer(i)}
                style={{
                  textAlign: 'left', padding: '16px 18px', borderRadius: 14,
                  background: picked ? 'var(--sun-soft)' : 'white',
                  border: `2px solid ${picked ? '#F5D678' : 'var(--line)'}`,
                  boxShadow: picked ? '0 4px 0 #E0C660' : '0 4px 0 var(--line-strong)',
                }}
              >
                <div className="kr" style={{ fontSize: 22, fontWeight: 700 }}>{o.kr}</div>
              </button>
            );
          })}
        </div>
      )}

      {q.kind === 'fillin' && (
        <div className="card" style={{ padding: 24 }}>
          <input
            value={fillText}
            onChange={(e) => { setFillText(e.target.value); submitAnswer(e.target.value); }}
            className="kr"
            placeholder="…"
            style={{
              width: '100%', fontSize: 32, padding: '14px 18px', textAlign: 'center',
              border: '2px solid var(--line)', borderRadius: 14, outline: 'none',
              fontWeight: 700, background: 'var(--cream-2)',
            }}
          />
          <div style={{ marginTop: 10, fontSize: 13, color: 'var(--ink-3)', textAlign: 'center' }}>
            💡 {q.hint}
          </div>
        </div>
      )}
    </div>
  );
};

// ================== STEP: DONE ==================
const StepDone = ({ heartsLeft, onRestart }) => {
  return (
    <div style={{ maxWidth: 560, margin: '0 auto', padding: '40px 24px 24px', textAlign: 'center' }}>
      <div className="pop">
        <Horangi size={180} mood="cheer" bounce />
      </div>
      <h1 style={{ fontSize: 42, fontWeight: 900, margin: '12px 0 6px', letterSpacing: '-0.02em' }}>
        Lezione completata!
      </h1>
      <div className="kr" style={{ fontSize: 22, color: 'var(--coral-dark)', fontWeight: 700 }}>잘했어요! 🎉</div>
      <div style={{ marginTop: 8, fontSize: 16, color: 'var(--ink-2)' }}>
        Hai imparato a presentarti in coreano formale.
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 14, marginTop: 28 }}>
        <StatTile icon={<Gem size={28} />} label="XP guadagnati" value={`+${window.LESSON.xp}`} color="sky" />
        <StatTile icon={<Flame size={28} />} label="Streak" value="12 gg" color="sun" />
        <StatTile icon={<Heart size={28} />} label="Cuori rimasti" value={`${heartsLeft}/5`} color="coral" />
      </div>

      <div className="card" style={{ padding: 20, marginTop: 22, textAlign: 'left' }}>
        <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', marginBottom: 10 }}>
          Prossima lezione
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
          <div style={{
            width: 48, height: 48, borderRadius: 14, background: 'var(--plum-soft)',
            display: 'grid', placeItems: 'center', fontSize: 22,
          }}>🗓️</div>
          <div style={{ flex: 1 }}>
            <div style={{ fontWeight: 900 }}>Capitolo 4 · I numeri sino-coreani</div>
            <div className="kr" style={{ fontSize: 14, color: 'var(--ink-2)' }}>숫자 1 — 10</div>
          </div>
          <button className="btn sm">Inizia</button>
        </div>
      </div>

      <div style={{ display: 'flex', gap: 12, marginTop: 24, justifyContent: 'center' }}>
        <button className="btn ghost" onClick={onRestart}>Rifai la lezione</button>
        <button className="btn mint">Torna al percorso</button>
      </div>
    </div>
  );
};

const StatTile = ({ icon, label, value, color }) => {
  const bgs = {
    sky: 'var(--sky-soft)', sun: 'var(--sun-soft)', coral: 'var(--coral-soft)',
  }[color];
  return (
    <div style={{ padding: 16, borderRadius: 16, background: bgs, textAlign: 'center' }}>
      <div style={{ display: 'flex', justifyContent: 'center' }}>{icon}</div>
      <div style={{ fontSize: 24, fontWeight: 900, marginTop: 6 }}>{value}</div>
      <div style={{ fontSize: 11, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.08em', textTransform: 'uppercase' }}>{label}</div>
    </div>
  );
};

Object.assign(window, { StepChoice, StepMatch, StepSpeak, StepQuiz, StepDone });
