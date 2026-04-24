// Lesson shell — top bar with hearts/xp/progress, sidebar with steps, footer with continue/check

const { useState, useEffect, useRef, useMemo } = React;

// =======================================================
// TOP BAR
// =======================================================
const LessonTopBar = ({ progress, hearts, onExit }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 18,
    padding: '18px 28px', borderBottom: `2px solid var(--line)`,
    background: 'rgba(255, 248, 238, 0.8)', backdropFilter: 'blur(8px)',
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <button
      onClick={onExit}
      aria-label="Esci"
      style={{
        width: 40, height: 40, borderRadius: 12, display: 'grid', placeItems: 'center',
        background: 'white', border: '2px solid var(--line)', boxShadow: 'var(--shadow-sm)',
      }}
    >
      <svg width="18" height="18" viewBox="0 0 24 24" fill="none"><path d="M6 6 L18 18 M18 6 L6 18" stroke="#5A4A3B" strokeWidth="3" strokeLinecap="round"/></svg>
    </button>
    <div className="progress"><div style={{ width: `${progress}%` }} /></div>
    <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: '#D13A2E' }}>
      <Heart /> <span style={{ fontSize: 18 }}>{hearts}</span>
    </div>
  </div>
);

// =======================================================
// SIDEBAR with step list
// =======================================================
const Sidebar = ({ steps, currentIdx, completedSet }) => {
  const L = window.LESSON;
  return (
    <aside style={{
      width: 280, padding: '24px 20px', borderRight: '2px solid var(--line)',
      background: 'rgba(255,255,255,0.5)', flexShrink: 0,
      height: 'calc(100vh - 76px)', position: 'sticky', top: 76, overflowY: 'auto',
    }}>
      <div style={{ fontSize: 12, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.12em', textTransform: 'uppercase' }}>
        {L.unit}
      </div>
      <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6, lineHeight: 1.1 }}>
        {L.title}
      </div>
      <div className="kr" style={{ fontSize: 16, color: 'var(--ink-2)', marginTop: 2 }}>{L.titleKr}</div>

      <div style={{ display: 'flex', gap: 8, marginTop: 14, flexWrap: 'wrap' }}>
        <Pill color="coral">{L.level}</Pill>
        <Pill color="mint">{L.minutes} min</Pill>
        <Pill color="sun">+{L.xp} XP</Pill>
      </div>

      <div style={{
        height: 2, background: 'var(--line)', margin: '22px -20px 14px', 
      }} />

      <div style={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
        {steps.map((s, i) => {
          const isCurrent = i === currentIdx;
          const isDone = completedSet.has(i);
          return (
            <div
              key={s.id}
              style={{
                display: 'flex', alignItems: 'center', gap: 12,
                padding: '10px 12px', borderRadius: 12,
                background: isCurrent ? 'var(--coral-soft)' : 'transparent',
                color: isCurrent ? 'var(--coral-dark)' : (isDone ? 'var(--mint-dark)' : 'var(--ink-2)'),
                fontWeight: isCurrent ? 800 : 600, fontSize: 14,
                border: isCurrent ? '2px solid #FFCFC8' : '2px solid transparent',
              }}
            >
              <div style={{
                width: 28, height: 28, borderRadius: 8, display: 'grid', placeItems: 'center',
                background: isDone ? 'var(--mint)' : (isCurrent ? 'var(--coral)' : '#F0E3CB'),
                color: 'white', fontSize: 14, flexShrink: 0,
              }}>
                {isDone ? '✓' : (i + 1)}
              </div>
              <div style={{ flex: 1, minWidth: 0 }}>
                <div style={{ overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{s.label}</div>
              </div>
              <div style={{ fontSize: 16, opacity: 0.6 }}>{s.icon}</div>
            </div>
          );
        })}
      </div>
    </aside>
  );
};

const Pill = ({ children, color = 'coral' }) => {
  const bg = { coral: 'var(--coral-soft)', mint: 'var(--mint-soft)', sun: 'var(--sun-soft)', sky: 'var(--sky-soft)', plum: 'var(--plum-soft)' }[color];
  const fg = { coral: 'var(--coral-dark)', mint: 'var(--mint-dark)', sun: 'var(--sun-dark)', sky: 'var(--sky-dark)', plum: '#5C3EBA' }[color];
  return <span style={{
    display: 'inline-flex', alignItems: 'center', gap: 4,
    background: bg, color: fg, fontWeight: 800, fontSize: 12,
    padding: '4px 10px', borderRadius: 999,
  }}>{children}</span>;
};

// =======================================================
// FOOTER with Continue / Check
// =======================================================
const LessonFooter = ({ mode, onContinue, onCheck, onSkip, disabled, feedback }) => {
  // feedback: null | { ok: bool, text?: string }
  const bg = feedback ? (feedback.ok ? 'var(--mint-soft)' : 'var(--coral-soft)') : 'rgba(255,255,255,0.85)';
  const border = feedback ? (feedback.ok ? '#AAE3CF' : '#FFC4BC') : 'var(--line)';
  return (
    <div style={{
      borderTop: `2px solid ${border}`,
      background: bg,
      padding: '20px 40px',
      display: 'flex', alignItems: 'center', gap: 20,
      transition: 'background 180ms',
    }}>
      <div style={{ flex: 1, minWidth: 0 }}>
        {feedback ? (
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
            <div style={{
              width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center',
              background: feedback.ok ? 'var(--mint)' : 'var(--coral)', color: 'white', fontSize: 22, fontWeight: 900,
            }}>{feedback.ok ? '✓' : '✕'}</div>
            <div>
              <div style={{ fontWeight: 900, fontSize: 18, color: feedback.ok ? 'var(--mint-dark)' : 'var(--coral-dark)' }}>
                {feedback.ok ? 'Fantastico!' : 'Non è corretto'}
              </div>
              {feedback.text && <div style={{ fontSize: 14, color: 'var(--ink-2)', marginTop: 2 }}>{feedback.text}</div>}
              {feedback && !feedback.ok && window.AskHorangiInline && (
                <AskHorangiInline
                  context={`Esercizio di coreano. ${feedback.text || ''}`}
                  prompt="Spiegami perché la mia risposta è sbagliata e come ricordare la regola corretta."
                />
              )}
            </div>
          </div>
        ) : (
          onSkip && <button className="btn ghost sm" onClick={onSkip}>Salta</button>
        )}
      </div>

      {mode === 'check' ? (
        <button className="btn lg" onClick={onCheck} disabled={disabled}>Controlla</button>
      ) : (
        <button className="btn mint lg" onClick={onContinue} disabled={disabled}>Continua</button>
      )}
    </div>
  );
};

Object.assign(window, { LessonTopBar, Sidebar, LessonFooter, Pill });
