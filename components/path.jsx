// TOPIK path — table-of-contents style, book-like chapters

const PathView = ({ onOpenHome, onOpenLesson, onNav }) => {
  const C = window.COURSE;

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <TopNav active="path" onNav={(v) => onNav ? onNav(v) : (v === 'home' ? onOpenHome() : null)} />

      <div style={{ maxWidth: 980, margin: '0 auto', padding: '36px 28px' }}>
        {/* Header */}
        <div style={{ display: 'flex', alignItems: 'center', gap: 22 }}>
          <Horangi size={96} mood="think" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Il tuo percorso · 학습 과정
            </div>
            <h1 style={{ fontSize: 40, fontWeight: 900, margin: '4px 0 4px', letterSpacing: '-0.01em' }}>
              Dall'alfabeto al TOPIK II
            </h1>
            <div style={{ color: 'var(--ink-2)', fontSize: 15 }}>
              Sei a <b>2 lezioni su 31</b>. Continua ogni giorno per arrivare al livello 2!
            </div>
          </div>
        </div>

        {/* Global progress bar */}
        <div className="card" style={{ padding: 18, marginTop: 24, display: 'flex', alignItems: 'center', gap: 20 }}>
          <div style={{ fontSize: 14, fontWeight: 900, color: 'var(--ink-2)', minWidth: 100 }}>
            Progresso totale
          </div>
          <div className="progress" style={{ flex: 1 }}>
            <div style={{ width: '6.5%' }} />
          </div>
          <div style={{ fontWeight: 900, color: 'var(--mint-dark)', fontSize: 14 }}>6%</div>
        </div>

        {/* Levels */}
        {C.levels.map((level, li) => (
          <LevelBlock key={level.id} level={level} onOpenLesson={onOpenLesson} />
        ))}

        {/* Final badge */}
        <div style={{
          marginTop: 44, padding: 32, borderRadius: 28, textAlign: 'center',
          background: 'linear-gradient(135deg, #E0EEFF 0%, #EDE5FF 100%)',
          border: '2px dashed #B4DBFF',
        }}>
          <div style={{ fontSize: 52 }}>🏆</div>
          <div style={{ fontSize: 24, fontWeight: 900, marginTop: 8 }}>TOPIK II · Livello 2 sbloccato</div>
          <div className="kr" style={{ fontSize: 18, color: 'var(--sky-dark)', fontWeight: 700 }}>토픽 2급 달성!</div>
          <div style={{ color: 'var(--ink-2)', fontSize: 14, marginTop: 8, maxWidth: 460, margin: '8px auto 0' }}>
            Alla fine del percorso potrai leggere articoli brevi, tenere conversazioni quotidiane e affrontare l'esame ufficiale TOPIK II (livello 2).
          </div>
        </div>
      </div>
    </div>
  );
};

const LevelBlock = ({ level, onOpenLesson }) => {
  const colors = {
    coral: { bg: 'var(--coral-soft)', fg: 'var(--coral-dark)', border: '#FFCFC8' },
    mint:  { bg: 'var(--mint-soft)',  fg: 'var(--mint-dark)',  border: '#7ED9B7' },
  }[level.color];
  return (
    <div style={{ marginTop: 40 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginBottom: 14 }}>
        <div style={{
          width: 56, height: 56, borderRadius: 16, background: colors.bg,
          display: 'grid', placeItems: 'center', border: `2px solid ${colors.border}`,
          fontWeight: 900, color: colors.fg, fontSize: 18,
        }}>{level.id}</div>
        <div style={{ flex: 1 }}>
          <h2 style={{ fontSize: 26, fontWeight: 900, margin: 0, letterSpacing: '-0.01em' }}>{level.name}</h2>
          <div style={{ fontSize: 14, color: 'var(--ink-2)' }}>{level.subtitle} · {level.description}</div>
        </div>
      </div>

      <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
        {level.units.map(u => <UnitBlock key={u.id} unit={u} onOpenLesson={onOpenLesson} />)}
      </div>
    </div>
  );
};

const UnitBlock = ({ unit, onOpenLesson }) => {
  const colors = {
    coral: { bg: 'var(--coral-soft)', fg: 'var(--coral-dark)', border: '#FFCFC8' },
    sun:   { bg: 'var(--sun-soft)',   fg: 'var(--sun-dark)',   border: '#F5D678' },
    sky:   { bg: 'var(--sky-soft)',   fg: 'var(--sky-dark)',   border: '#B4DBFF' },
    mint:  { bg: 'var(--mint-soft)',  fg: 'var(--mint-dark)',  border: '#7ED9B7' },
    plum:  { bg: 'var(--plum-soft)',  fg: '#5C3EBA',           border: '#D4C3FF' },
  }[unit.color];

  return (
    <div className="card" style={{ padding: 0, overflow: 'hidden', borderColor: colors.border }}>
      {/* Unit header */}
      <div style={{
        padding: '18px 22px', background: colors.bg, display: 'flex', alignItems: 'center', gap: 16,
        borderBottom: `2px solid ${colors.border}`,
      }}>
        <div style={{
          width: 52, height: 52, borderRadius: 14, background: 'white',
          display: 'grid', placeItems: 'center', fontSize: 26, flexShrink: 0,
        }}>{unit.icon}</div>
        <div style={{ flex: 1, minWidth: 0 }}>
          <div style={{ fontSize: 11, fontWeight: 900, color: colors.fg, letterSpacing: '0.14em', textTransform: 'uppercase' }}>
            Unità {unit.num}
          </div>
          <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.01em' }}>{unit.title}</div>
          <div className="kr" style={{ fontSize: 14, color: 'var(--ink-2)', fontWeight: 700 }}>{unit.titleKr}</div>
        </div>
        <div style={{ fontSize: 13, fontWeight: 800, color: colors.fg }}>
          {unit.lessons.filter(l => l.done).length} / {unit.lessons.length}
        </div>
      </div>

      {/* Lessons table */}
      <div>
        {unit.lessons.map((l, i) => (
          <LessonRow
            key={l.id}
            lesson={l}
            num={i + 1}
            isLast={i === unit.lessons.length - 1}
            onOpen={l.current ? onOpenLesson : null}
            unitColor={colors}
          />
        ))}
      </div>
    </div>
  );
};

const LessonRow = ({ lesson, num, isLast, onOpen, unitColor }) => {
  const state = lesson.done ? 'done' : (lesson.current ? 'current' : (lesson.locked ? 'locked' : 'next'));
  const clickable = !!onOpen;
  return (
    <div
      onClick={clickable ? onOpen : undefined}
      style={{
        display: 'flex', alignItems: 'center', gap: 16,
        padding: '16px 22px',
        borderTop: isLast ? 'none' : '1px solid var(--line)',
        background: state === 'current' ? 'var(--coral-soft)' : 'transparent',
        cursor: clickable ? 'pointer' : 'default',
        opacity: state === 'locked' ? 0.55 : 1,
      }}
    >
      {/* Number / status */}
      <div style={{
        width: 38, height: 38, borderRadius: 10, display: 'grid', placeItems: 'center',
        background: state === 'done' ? 'var(--mint)' :
                   state === 'current' ? 'var(--coral)' :
                   state === 'locked' ? '#F0E3CB' : 'white',
        color: state === 'locked' ? 'var(--ink-3)' : 'white',
        border: state === 'next' ? '2px solid var(--line-strong)' : 'none',
        fontWeight: 900, fontSize: 14, flexShrink: 0,
      }}>
        {state === 'done' ? '✓' : state === 'locked' ? '🔒' : num}
      </div>

      {/* Title */}
      <div style={{ flex: 1, minWidth: 0 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
          <div style={{ fontWeight: 800, fontSize: 15 }}>{lesson.title}</div>
          {lesson.review && <Pill color="sky">Ripasso</Pill>}
          {lesson.exam && <Pill color="plum">Simulazione</Pill>}
          {state === 'current' && <Pill color="coral">In corso</Pill>}
        </div>
        <div className="kr" style={{ fontSize: 13, color: 'var(--ink-2)', fontWeight: 600, marginTop: 2 }}>{lesson.titleKr}</div>
      </div>

      {/* Meta */}
      <div style={{ display: 'flex', alignItems: 'center', gap: 16, fontSize: 13, color: 'var(--ink-3)', fontWeight: 700 }}>
        <div>⏱ {lesson.duration} min</div>
        <div style={{ color: 'var(--sun-dark)' }}>+{lesson.xp} XP</div>
      </div>

      {/* CTA */}
      {state === 'current' && (
        <button className="btn sm" onClick={(e) => { e.stopPropagation(); onOpen(); }}>Riprendi</button>
      )}
      {state === 'next' && (
        <div style={{ fontSize: 13, color: 'var(--ink-3)', fontWeight: 700 }}>Prossimo</div>
      )}
    </div>
  );
};

Object.assign(window, { PathView });
