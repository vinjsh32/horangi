// Home dashboard — landing view with streak, XP, daily goal, CTA to current lesson

const Home = ({ onOpenPath, onOpenLesson, onNav }) => {
  const U = window.USER;
  const C = window.COURSE;

  // Find current lesson
  let current = null, currentUnit = null, currentLevel = null;
  for (const lv of C.levels) for (const u of lv.units) for (const l of u.lessons) {
    if (l.current) { current = l; currentUnit = u; currentLevel = lv; }
  }

  const days = ['L', 'M', 'M', 'G', 'V', 'S', 'D'];

  return (
    <div style={{ minHeight: '100vh', paddingBottom: 60 }}>
      <TopNav active="home" onNav={(v) => onNav ? onNav(v) : (v === 'path' ? onOpenPath() : null)} />

      <div style={{ maxWidth: 1100, margin: '0 auto', padding: '32px 28px 0', display: 'grid', gridTemplateColumns: '1fr 340px', gap: 28 }}>
        {/* LEFT */}
        <div>
          {/* Hero greeting */}
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}>
            <Horangi size={110} mood="wave" bounce />
            <div>
              <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
                Bentornato
              </div>
              <h1 style={{ fontSize: 38, fontWeight: 900, margin: '4px 0 2px', letterSpacing: '-0.01em' }}>
                Ciao, {U.name}! <span className="kr" style={{ color: 'var(--coral-dark)' }}>안녕!</span>
              </h1>
              <div style={{ color: 'var(--ink-2)', fontSize: 15 }}>
                Sei al giorno <b>{U.streak}</b> della tua striscia. Continua così! 🔥
              </div>
            </div>
          </div>

          {/* CTA: continue current lesson */}
          <div
            className="card pop"
            onClick={onOpenLesson}
            style={{
              marginTop: 26, padding: 28, cursor: 'pointer',
              background: 'linear-gradient(130deg, #FFF5E6 0%, #FFE4E0 100%)',
              border: '2px solid #FFCFC8', position: 'relative', overflow: 'hidden',
            }}
          >
            <div style={{
              position: 'absolute', right: -20, bottom: -20, opacity: 0.7,
              transform: 'rotate(-8deg)',
            }}>
              <Horangi size={140} mood="cheer" />
            </div>

            <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--coral-dark)', letterSpacing: '0.14em', textTransform: 'uppercase' }}>
              Continua la lezione · {currentUnit.title}
            </div>
            <h2 style={{ fontSize: 30, fontWeight: 900, margin: '8px 0 4px', letterSpacing: '-0.01em' }}>
              {current.title}
            </h2>
            <div className="kr" style={{ fontSize: 18, color: 'var(--coral-dark)', fontWeight: 700 }}>{current.titleKr}</div>

            <div style={{ display: 'flex', gap: 10, marginTop: 16 }}>
              <Pill color="coral">{current.duration} min</Pill>
              <Pill color="sun">+{current.xp} XP</Pill>
              <Pill color="mint">10 step</Pill>
            </div>

            <div style={{ display: 'flex', alignItems: 'center', gap: 14, marginTop: 20, zIndex: 1, position: 'relative' }}>
              <button className="btn lg" onClick={(e) => { e.stopPropagation(); onOpenLesson(); }}>
                Riprendi lezione
                <svg width="16" height="16" viewBox="0 0 24 24"><path d="M5,12 L19,12 M13,6 L19,12 L13,18" stroke="white" strokeWidth="3" fill="none" strokeLinecap="round" strokeLinejoin="round"/></svg>
              </button>
              <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>
                <div style={{ fontWeight: 700 }}>Al 30% — step 3 di 10</div>
                <div style={{ height: 6, width: 180, background: '#F0E3CB', borderRadius: 999, marginTop: 4, overflow: 'hidden' }}>
                  <div style={{ width: '30%', height: '100%', background: 'var(--coral)' }} />
                </div>
              </div>
            </div>
          </div>

          {/* Your path preview */}
          <div style={{ marginTop: 32, display: 'flex', alignItems: 'baseline', justifyContent: 'space-between' }}>
            <h3 style={{ fontSize: 22, fontWeight: 900, margin: 0 }}>Il tuo percorso</h3>
            <button onClick={onOpenPath} style={{ color: 'var(--coral-dark)', fontWeight: 800, fontSize: 14 }}>Vedi tutto →</button>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 14 }}>
            {C.levels[0].units.map((u, i) => (
              <UnitTile key={u.id} unit={u} num={u.num} />
            ))}
          </div>

          {/* Daily exercises */}
          <h3 style={{ fontSize: 22, fontWeight: 900, margin: '36px 0 14px' }}>Allenamento giornaliero</h3>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14 }}>
            <DailyCard icon="🃏" color="sky"  title="Flashcard" sub="8 parole da rivedere" />
            <DailyCard icon="✍️" color="plum" title="Hangul"    sub="5 lettere da tracciare" />
            <DailyCard icon="🎧" color="sun"  title="Ascolto"   sub="2 dialoghi nuovi" />
          </div>
        </div>

        {/* RIGHT RAIL */}
        <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
          {/* Stats */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
              <MiniStat icon={<Flame size={22} />} value={U.streak} label="Streak" color="sun" />
              <MiniStat icon={<Gem size={22} />}   value={U.gems}   label="Gemme"  color="sky" />
              <MiniStat icon={<Sparkle size={20} color="#FFC83D" />} value={U.totalXp} label="XP totali" color="plum" />
              <MiniStat icon={<span style={{ fontSize: 18 }}>🏆</span>} value={`Lv ${U.level}`} label="Livello" color="coral" />
            </div>
          </div>

          {/* Weekly goal */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Obiettivo settimanale
            </div>
            <div style={{ fontSize: 16, marginTop: 6 }}>
              <b>{U.weekProgress.filter(Boolean).length}</b> / {U.weeklyGoal} giorni
            </div>
            <div style={{ display: 'flex', gap: 6, marginTop: 12, justifyContent: 'space-between' }}>
              {U.weekProgress.map((done, i) => (
                <div key={i} style={{ textAlign: 'center', flex: 1 }}>
                  <div style={{
                    height: 32, display: 'grid', placeItems: 'center', borderRadius: 10,
                    background: done ? 'var(--mint)' : '#F0E3CB', color: 'white',
                    fontWeight: 900, fontSize: 14,
                  }}>{done ? '✓' : ''}</div>
                  <div style={{ fontSize: 11, fontWeight: 700, color: 'var(--ink-3)', marginTop: 4 }}>{days[i]}</div>
                </div>
              ))}
            </div>
          </div>

          {/* Level progress */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{
                width: 44, height: 44, borderRadius: 12, display: 'grid', placeItems: 'center',
                background: 'var(--coral)', color: 'white', fontWeight: 900, fontSize: 18,
              }}>{U.level}</div>
              <div style={{ flex: 1 }}>
                <div style={{ fontWeight: 900, fontSize: 15 }}>Livello {U.level}</div>
                <div style={{ fontSize: 12, color: 'var(--ink-3)' }}>320 XP al livello {U.level + 1}</div>
              </div>
            </div>
            <div className="progress" style={{ marginTop: 12, height: 12 }}>
              <div style={{ width: `${U.levelProgress * 100}%` }} />
            </div>
          </div>

          {/* Leaderboard snippet */}
          <div className="card" style={{ padding: 18 }}>
            <div style={{ fontSize: 12, fontWeight: 900, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
              Lega Smeraldo · posizione 7
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 8, marginTop: 12 }}>
              {[
                { rank: 5, name: 'Chiara', xp: 1420, me: false },
                { rank: 6, name: 'Marco',  xp: 1310, me: false },
                { rank: 7, name: 'Luca',   xp: 1240, me: true },
                { rank: 8, name: 'Anna',   xp: 1180, me: false },
              ].map(row => (
                <div key={row.rank} style={{
                  display: 'flex', alignItems: 'center', gap: 10,
                  padding: '8px 10px', borderRadius: 10,
                  background: row.me ? 'var(--coral-soft)' : 'transparent',
                  fontWeight: row.me ? 800 : 600, fontSize: 14,
                }}>
                  <div style={{ width: 22, color: 'var(--ink-3)', fontSize: 12 }}>{row.rank}</div>
                  <div style={{ flex: 1 }}>{row.name}{row.me ? ' (tu)' : ''}</div>
                  <div style={{ color: 'var(--ink-3)', fontSize: 13 }}>{row.xp} XP</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

const UnitTile = ({ unit, num }) => {
  const done = unit.lessons.filter(l => l.done).length;
  const total = unit.lessons.length;
  const pct = Math.round(done / total * 100);
  const colors = {
    coral: { bg: 'var(--coral-soft)', fg: 'var(--coral-dark)', border: '#FFCFC8' },
    sun:   { bg: 'var(--sun-soft)',   fg: 'var(--sun-dark)',   border: '#F5D678' },
    sky:   { bg: 'var(--sky-soft)',   fg: 'var(--sky-dark)',   border: '#B4DBFF' },
    mint:  { bg: 'var(--mint-soft)',  fg: 'var(--mint-dark)',  border: '#7ED9B7' },
    plum:  { bg: 'var(--plum-soft)',  fg: '#5C3EBA',           border: '#D4C3FF' },
  }[unit.color];
  return (
    <div className="card" style={{ padding: 18, borderColor: colors.border }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
        <div style={{
          width: 44, height: 44, borderRadius: 12, background: colors.bg,
          display: 'grid', placeItems: 'center', fontSize: 22,
        }}>{unit.icon}</div>
        <div>
          <div style={{ fontSize: 11, fontWeight: 800, color: colors.fg, letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Unità {num}
          </div>
          <div style={{ fontWeight: 900, fontSize: 15 }}>{unit.title}</div>
        </div>
      </div>
      <div className="progress" style={{ marginTop: 14, height: 10 }}>
        <div style={{ width: `${pct}%` }} />
      </div>
      <div style={{ marginTop: 8, fontSize: 12, color: 'var(--ink-3)', fontWeight: 700 }}>
        {done}/{total} lezioni
      </div>
    </div>
  );
};

const DailyCard = ({ icon, title, sub, color }) => {
  const bgs = {
    sky:  { bg: 'var(--sky-soft)',  fg: 'var(--sky-dark)',  border: '#B4DBFF' },
    plum: { bg: 'var(--plum-soft)', fg: '#5C3EBA',          border: '#D4C3FF' },
    sun:  { bg: 'var(--sun-soft)',  fg: 'var(--sun-dark)',  border: '#F5D678' },
  }[color];
  return (
    <button className="card" style={{
      padding: 18, textAlign: 'left', cursor: 'pointer', borderColor: bgs.border,
    }}>
      <div style={{
        width: 46, height: 46, borderRadius: 12, background: bgs.bg,
        display: 'grid', placeItems: 'center', fontSize: 24,
      }}>{icon}</div>
      <div style={{ fontWeight: 900, fontSize: 15, marginTop: 12 }}>{title}</div>
      <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>{sub}</div>
    </button>
  );
};

const MiniStat = ({ icon, value, label, color }) => {
  const bgs = {
    sun: 'var(--sun-soft)', sky: 'var(--sky-soft)', plum: 'var(--plum-soft)', coral: 'var(--coral-soft)',
  }[color];
  return (
    <div style={{ padding: 10, borderRadius: 12, background: bgs, display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{ flexShrink: 0 }}>{icon}</div>
      <div style={{ minWidth: 0 }}>
        <div style={{ fontWeight: 900, fontSize: 15, whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>{value}</div>
        <div style={{ fontSize: 10, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>{label}</div>
      </div>
    </div>
  );
};

// Shared top nav
const TopNav = ({ active, onNav }) => (
  <div style={{
    display: 'flex', alignItems: 'center', gap: 18,
    padding: '18px 28px', borderBottom: `2px solid var(--line)`,
    background: 'rgba(255, 248, 238, 0.85)', backdropFilter: 'blur(10px)',
    position: 'sticky', top: 0, zIndex: 10,
  }}>
    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
      <div style={{
        width: 38, height: 38, borderRadius: 12,
        background: 'linear-gradient(135deg, #FFB85C, #FF6B5E)',
        display: 'grid', placeItems: 'center', fontSize: 20,
      }}>🐯</div>
      <div style={{ fontWeight: 900, fontSize: 20, letterSpacing: '-0.01em' }}>Horangi</div>
    </div>
    <div style={{ display: 'flex', gap: 4, marginLeft: 24 }}>
      {[
        { id: 'home', label: 'Home' },
        { id: 'path', label: 'Percorso' },
        { id: 'vocab', label: 'Vocabolario' },
        { id: 'leaderboard', label: 'Lega' },
      ].map(item => (
        <button
          key={item.id}
          onClick={() => onNav?.(item.id)}
          style={{
            padding: '8px 16px', borderRadius: 10, fontWeight: 800, fontSize: 14,
            color: active === item.id ? 'var(--coral-dark)' : 'var(--ink-2)',
            background: active === item.id ? 'var(--coral-soft)' : 'transparent',
          }}
        >{item.label}</button>
      ))}
    </div>
    <div style={{ flex: 1 }} />
    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: '#E0A81E' }}>
        <Flame /> {window.USER.streak}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: 'var(--sky-dark)' }}>
        <Gem /> {window.USER.gems}
      </div>
      <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontWeight: 800, color: 'var(--coral-dark)' }}>
        <Heart /> 5
      </div>
      <div style={{
        width: 36, height: 36, borderRadius: 999,
        background: 'linear-gradient(135deg, #58A7FF, #8B5CF6)',
        color: 'white', fontWeight: 900, fontSize: 14,
        display: 'grid', placeItems: 'center',
      }}>{window.USER.name[0]}</div>
    </div>
  </div>
);

Object.assign(window, { Home, TopNav });
