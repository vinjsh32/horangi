// Root app — navigation wrapper across Home, Path, Lessons, Vocab, Leaderboard

const LessonView = ({ onExit }) => {
  const L = window.LESSON;
  const [stepIdx, setStepIdx] = useState(() => {
    const saved = parseInt(localStorage.getItem('horangi:step') || '0', 10);
    return isNaN(saved) ? 0 : Math.min(saved, L.steps.length - 1);
  });
  const [hearts, setHearts] = useState(5);
  const [completed, setCompleted] = useState(new Set());
  const [feedback, setFeedback] = useState(null);
  const [, setTick] = useState(0);

  useEffect(() => { localStorage.setItem('horangi:step', String(stepIdx)); }, [stepIdx]);
  useEffect(() => { const t = setInterval(() => setTick(v => v + 1), 200); return () => clearInterval(t); }, []);

  const step = L.steps[stepIdx];
  const progress = Math.round((stepIdx / (L.steps.length - 1)) * 100);

  const goNext = () => {
    setCompleted(c => new Set(c).add(stepIdx));
    setFeedback(null);
    window.__stepCheck = null; window.__stepCanCheck = false;
    setStepIdx(i => Math.min(i + 1, L.steps.length - 1));
  };
  const onCheck = () => { if (window.__stepCheck) window.__stepCheck(); };
  const onResult = (res) => { setFeedback(res); if (!res.ok) setHearts(h => Math.max(0, h - 1)); };
  const onRestart = () => { setStepIdx(0); setCompleted(new Set()); setHearts(5); setFeedback(null); };

  const isExerciseStep = ['choice', 'match', 'speak', 'quiz', 'translate', 'converse'].includes(step.kind);
  const mode = isExerciseStep && !feedback ? 'check' : 'continue';

  const renderStep = () => {
    switch (step.kind) {
      case 'theory':  return <StepTheory />;
      case 'hangul':  return <StepHangul />;
      case 'flash':   return <StepFlash />;
      case 'dialog':  return <StepDialog />;
      case 'grammar': return <StepGrammar />;
      case 'choice':  return <StepChoice onResult={onResult} />;
      case 'match':   return <StepMatch onResult={onResult} />;
      case 'translate': return <StepTranslate onResult={onResult} />;
      case 'speak':   return <StepSpeak onResult={onResult} />;
      case 'converse': return <StepConverse onResult={onResult} />;
      case 'quiz':    return <StepQuiz onResult={onResult} />;
      case 'done':    return <StepDone heartsLeft={hearts} onRestart={onRestart} />;
      default:        return null;
    }
  };

  const canCheck = !!window.__stepCanCheck;

  return (
    <div style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <LessonTopBar progress={progress} hearts={hearts} onExit={onExit} />
      <div style={{ display: 'flex', flex: 1, minHeight: 0 }}>
        <Sidebar steps={L.steps} currentIdx={stepIdx} completedSet={completed} />
        <main style={{ flex: 1, display: 'flex', flexDirection: 'column', minWidth: 0 }} data-screen-label={`${String(stepIdx+1).padStart(2,'0')} ${step.label}`}>
          <div style={{ flex: 1, overflowY: 'auto' }} key={stepIdx}>{renderStep()}</div>
          {step.kind !== 'done' && (
            <LessonFooter
              mode={mode}
              onContinue={goNext}
              onCheck={onCheck}
              disabled={mode === 'check' ? !canCheck : false}
              feedback={feedback}
            />
          )}
        </main>
      </div>
    </div>
  );
};

// Root router
const App = () => {
  const [view, setView] = useState(() => localStorage.getItem('horangi:view') || 'home');
  useEffect(() => { localStorage.setItem('horangi:view', view); }, [view]);

  // Make navigation globally available so TopNav's onNav always works
  window.__nav = setView;

  return (
    <div data-screen-label={`00 ${view}`}>
      {view === 'home' && (
        <Home
          onOpenLesson={() => setView('lesson')}
          onOpenPath={() => setView('path')}
          onNav={setView}
        />
      )}
      {view === 'path' && (
        <PathView
          onOpenHome={() => setView('home')}
          onOpenLesson={() => setView('lesson')}
          onNav={setView}
        />
      )}
      {view === 'lesson' && (
        <LessonView onExit={() => setView('home')} />
      )}
      {view === 'bar' && <BarLessonPreview onBack={() => setView('path')} />}
      {view === 'numbers' && <NumbersLessonPreview onBack={() => setView('path')} />}
      {view === 'vocab' && <VocabView onBack={() => setView('home')} onNav={setView} />}
      {view === 'leaderboard' && <LeaderboardView onBack={() => setView('home')} onNav={setView} />}

      {/* Floating view switcher for quick demo navigation */}
      <ViewSwitcher view={view} setView={setView} />

      {/* AI Tutor chat widget — always accessible */}
      <AIChatWidget />
    </div>
  );
};

const ViewSwitcher = ({ view, setView }) => {
  const [open, setOpen] = useState(false);
  const items = [
    { id: 'home',        label: 'Home',            icon: '🏠' },
    { id: 'path',        label: 'Percorso TOPIK',  icon: '🗺️' },
    { id: 'lesson',      label: 'Lezione: Saluti', icon: '💬' },
    { id: 'bar',         label: 'Lezione: Al bar', icon: '☕' },
    { id: 'numbers',     label: 'Lezione: Numeri', icon: '🔢' },
    { id: 'vocab',       label: 'Vocabolario',     icon: '📚' },
    { id: 'leaderboard', label: 'Lega Smeraldo',   icon: '💎' },
  ];
  return (
    <div style={{ position: 'fixed', bottom: 20, right: 20, zIndex: 50 }}>
      {open && (
        <div className="card rise" style={{
          padding: 8, marginBottom: 10, minWidth: 240,
          background: 'white', boxShadow: '0 12px 32px rgba(43,33,24,0.18)',
        }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase', padding: '8px 10px' }}>
            Demo · salta a
          </div>
          {items.map(i => (
            <button key={i.id} onClick={() => { setView(i.id); setOpen(false); }} style={{
              display: 'flex', alignItems: 'center', gap: 10, width: '100%',
              padding: '10px 10px', borderRadius: 10,
              background: view === i.id ? 'var(--coral-soft)' : 'transparent',
              color: view === i.id ? 'var(--coral-dark)' : 'var(--ink-2)',
              fontWeight: view === i.id ? 800 : 600, fontSize: 14, textAlign: 'left',
            }}>
              <span style={{ fontSize: 18 }}>{i.icon}</span> {i.label}
            </button>
          ))}
        </div>
      )}
      <button onClick={() => setOpen(o => !o)} style={{
        width: 56, height: 56, borderRadius: 999,
        background: 'var(--coral)', color: 'white',
        boxShadow: '0 4px 0 var(--coral-dark), 0 8px 20px rgba(43,33,24,0.18)',
        display: 'grid', placeItems: 'center', fontSize: 26,
        border: 'none',
      }}>
        {open ? '✕' : '☰'}
      </button>
    </div>
  );
};

ReactDOM.createRoot(document.getElementById('root')).render(<App />);
