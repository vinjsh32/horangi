// Vocabulary & Leaderboard views — simpler

const VocabView = ({ onBack, onNav }) => {
  const [filter, setFilter] = useState('all');
  const words = [
    { kr: '안녕하세요', r: 'annyeonghaseyo', it: 'Buongiorno',      cat: 'saluti',  mastery: 0.9 },
    { kr: '안녕',       r: 'annyeong',       it: 'Ciao',            cat: 'saluti',  mastery: 1.0 },
    { kr: '저',         r: 'jeo',            it: 'Io (formale)',    cat: 'pronomi', mastery: 0.75 },
    { kr: '나',         r: 'na',             it: 'Io (informale)',  cat: 'pronomi', mastery: 0.6 },
    { kr: '이름',       r: 'ireum',          it: 'Nome',            cat: 'base',    mastery: 0.85 },
    { kr: '입니다',     r: 'imnida',         it: 'essere (form.)',  cat: 'verbi',   mastery: 0.7 },
    { kr: '만나다',     r: 'mannada',        it: 'incontrare',      cat: 'verbi',   mastery: 0.4 },
    { kr: '반갑다',     r: 'bangapda',       it: 'essere lieto',    cat: 'verbi',   mastery: 0.3 },
    { kr: '학생',       r: 'haksaeng',       it: 'studente',        cat: 'persone', mastery: 0.55 },
    { kr: '선생님',     r: 'seonsaengnim',   it: 'insegnante',      cat: 'persone', mastery: 0.65 },
    { kr: '한국',       r: 'hanguk',         it: 'Corea',           cat: 'luoghi',  mastery: 0.9 },
    { kr: '사람',       r: 'saram',          it: 'persona',         cat: 'persone', mastery: 0.5 },
  ];
  const cats = ['all', 'saluti', 'pronomi', 'verbi', 'persone', 'luoghi', 'base'];
  const visible = filter === 'all' ? words : words.filter(w => w.cat === filter);
  const dueToday = words.filter(w => w.mastery < 0.7).length;

  return (
    <div style={{ minHeight: '100vh' }}>
      <TopNav active="vocab" onNav={(v) => onNav ? onNav(v) : (v === 'home' ? onBack() : null)} />
      <div style={{ maxWidth: 980, margin: '0 auto', padding: '32px 28px' }}>
        <div style={{ display: 'flex', gap: 20, alignItems: 'center' }}>
          <Horangi size={80} mood="happy" />
          <div>
            <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Vocabolario · 어휘</div>
            <h1 style={{ fontSize: 34, fontWeight: 900, margin: '4px 0' }}>La tua raccolta</h1>
            <div style={{ color: 'var(--ink-2)' }}>Hai imparato <b>{words.length}</b> parole. <b style={{ color: 'var(--coral-dark)' }}>{dueToday}</b> da ripassare oggi.</div>
          </div>
        </div>

        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 14, marginTop: 24 }}>
          <div className="card" style={{ padding: 18, background: 'var(--coral-soft)', borderColor: '#FFCFC8', cursor: 'pointer' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--coral-dark)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Revisione SRS</div>
            <div style={{ fontSize: 22, fontWeight: 900, marginTop: 6 }}>{dueToday} parole</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)', marginTop: 2 }}>~ 5 minuti</div>
            <button className="btn sm" style={{ marginTop: 12 }}>Inizia</button>
          </div>
          <div className="card" style={{ padding: 18, background: 'var(--sky-soft)', borderColor: '#B4DBFF', cursor: 'pointer' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--sky-dark)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Ricerca rapida</div>
            <input placeholder="Cerca una parola…" style={{ marginTop: 8, width: '100%', padding: '10px 12px', borderRadius: 10, border: '2px solid #B4DBFF', background: 'white' }} />
          </div>
          <div className="card" style={{ padding: 18, background: 'var(--sun-soft)', borderColor: '#F5D678', cursor: 'pointer' }}>
            <div style={{ fontSize: 13, fontWeight: 900, color: 'var(--sun-dark)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Parola del giorno</div>
            <div className="kr" style={{ fontSize: 28, fontWeight: 800, marginTop: 6 }}>행복</div>
            <div style={{ fontSize: 13, color: 'var(--ink-2)' }}>haengbok — felicità</div>
          </div>
        </div>

        <div style={{ display: 'flex', gap: 8, marginTop: 32, flexWrap: 'wrap' }}>
          {cats.map(c => (
            <button key={c} onClick={() => setFilter(c)} style={{
              padding: '8px 14px', borderRadius: 999, fontWeight: 800, fontSize: 13,
              background: filter === c ? 'var(--coral)' : 'white',
              color: filter === c ? 'white' : 'var(--ink-2)',
              border: `2px solid ${filter === c ? 'var(--coral-dark)' : 'var(--line)'}`,
              textTransform: 'capitalize',
            }}>{c === 'all' ? 'Tutte' : c}</button>
          ))}
        </div>

        <div className="card" style={{ padding: 0, marginTop: 16, overflow: 'hidden' }}>
          {visible.map((w, i) => (
            <div key={w.kr} style={{
              display: 'grid', gridTemplateColumns: '1fr 1fr 1fr auto', gap: 16, alignItems: 'center',
              padding: '14px 20px', borderTop: i > 0 ? '1px solid var(--line)' : 'none',
            }}>
              <div className="kr" style={{ fontSize: 20, fontWeight: 700 }}>{w.kr}</div>
              <div style={{ fontFamily: 'var(--font-mono)', fontSize: 13, color: 'var(--ink-3)' }}>{w.r}</div>
              <div style={{ color: 'var(--ink-2)' }}>{w.it}</div>
              <div style={{ width: 100 }}>
                <div style={{ height: 6, background: '#F0E3CB', borderRadius: 999, overflow: 'hidden' }}>
                  <div style={{ width: `${w.mastery * 100}%`, height: '100%', background: w.mastery > 0.75 ? 'var(--mint)' : w.mastery > 0.5 ? 'var(--sun)' : 'var(--coral)' }} />
                </div>
                <div style={{ fontSize: 10, color: 'var(--ink-3)', marginTop: 3, textAlign: 'right', fontWeight: 700 }}>{Math.round(w.mastery * 100)}%</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

const LeaderboardView = ({ onBack, onNav }) => {
  const players = [
    { rank: 1, name: 'Seo-yeon', xp: 2340, country: '🇰🇷', streak: 48 },
    { rank: 2, name: 'Giulia',    xp: 2110, country: '🇮🇹', streak: 32 },
    { rank: 3, name: 'Tom',       xp: 1880, country: '🇬🇧', streak: 21 },
    { rank: 4, name: 'Pablo',     xp: 1670, country: '🇪🇸', streak: 15 },
    { rank: 5, name: 'Chiara',    xp: 1420, country: '🇮🇹', streak: 18 },
    { rank: 6, name: 'Marco',     xp: 1310, country: '🇮🇹', streak: 11 },
    { rank: 7, name: 'Luca',      xp: 1240, country: '🇮🇹', streak: 12, me: true },
    { rank: 8, name: 'Anna',      xp: 1180, country: '🇮🇹', streak: 9 },
    { rank: 9, name: 'Kenji',     xp: 1020, country: '🇯🇵', streak: 7 },
    { rank: 10, name: 'Sofia',    xp: 890,  country: '🇮🇹', streak: 5 },
  ];
  return (
    <div style={{ minHeight: '100vh' }}>
      <TopNav active="leaderboard" onNav={(v) => onNav ? onNav(v) : (v === 'home' ? onBack() : null)} />
      <div style={{ maxWidth: 720, margin: '0 auto', padding: '32px 28px' }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{ fontSize: 56 }}>💎</div>
          <div style={{ fontSize: 13, fontWeight: 800, color: 'var(--ink-3)', letterSpacing: '0.1em', textTransform: 'uppercase' }}>Lega attuale</div>
          <h1 style={{ fontSize: 36, fontWeight: 900, margin: '4px 0' }}>Smeraldo</h1>
          <div style={{ color: 'var(--ink-2)' }}>Primi 3 avanzano · ultimi 3 retrocedono · <b>4 giorni rimasti</b></div>
        </div>
        <div className="card" style={{ padding: 0, marginTop: 24, overflow: 'hidden' }}>
          {players.map((p, i) => {
            const tier = p.rank <= 3 ? 'up' : p.rank >= 8 ? 'down' : 'mid';
            return (
              <div key={p.rank} style={{
                display: 'flex', alignItems: 'center', gap: 14,
                padding: '14px 20px', borderTop: i > 0 ? '1px solid var(--line)' : 'none',
                background: p.me ? 'var(--coral-soft)' : 'transparent',
              }}>
                <div style={{
                  width: 36, height: 36, borderRadius: 999, display: 'grid', placeItems: 'center',
                  background: p.rank === 1 ? '#FFD24D' : p.rank === 2 ? '#D7DDE0' : p.rank === 3 ? '#E0A877' : '#F0E3CB',
                  color: p.rank <= 3 ? 'white' : 'var(--ink-3)', fontWeight: 900,
                }}>{p.rank}</div>
                <div style={{
                  width: 40, height: 40, borderRadius: 999, fontSize: 20,
                  background: 'white', border: '2px solid var(--line)', display: 'grid', placeItems: 'center',
                }}>{p.country}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontWeight: 900, fontSize: 15 }}>{p.name}{p.me ? ' (tu)' : ''}</div>
                  <div style={{ fontSize: 12, color: 'var(--ink-3)', fontWeight: 700, display: 'flex', gap: 4, alignItems: 'center' }}>
                    <Flame size={14} /> {p.streak} giorni
                  </div>
                </div>
                <div style={{ textAlign: 'right' }}>
                  <div style={{ fontWeight: 900 }}>{p.xp} XP</div>
                  <div style={{ fontSize: 11, fontWeight: 800,
                    color: tier === 'up' ? 'var(--mint-dark)' : tier === 'down' ? 'var(--coral-dark)' : 'var(--ink-3)',
                  }}>{tier === 'up' ? '↑ sale' : tier === 'down' ? '↓ scende' : '— resta'}</div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

Object.assign(window, { VocabView, LeaderboardView });
