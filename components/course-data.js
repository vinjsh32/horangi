// Complete TOPIK 1–2 curriculum outline
// Full program from absolute beginner to TOPIK II level 2

window.COURSE = {
  levels: [
    {
      id: 'L1',
      name: 'TOPIK I — Livello 1',
      subtitle: 'Principiante · A1',
      color: 'coral',
      description: 'Alfabeto Hangul, saluti, presentazioni, numeri, frasi basilari.',
      units: [
        {
          id: 'U1', num: 1, title: 'Primi passi',
          titleKr: '첫걸음',
          color: 'coral',
          icon: '🌱',
          lessons: [
            { id: 'L1U1C1', title: 'Hangul: vocali base',       titleKr: '기본 모음',     duration: 10, xp: 15, done: true },
            { id: 'L1U1C2', title: 'Hangul: consonanti base',   titleKr: '기본 자음',     duration: 12, xp: 15, done: true },
            { id: 'L1U1C3', title: 'Saluti e presentazioni',    titleKr: '인사와 소개',   duration: 12, xp: 20, done: false, current: true },
            { id: 'L1U1C4', title: 'I numeri sino-coreani',     titleKr: '한자 숫자',     duration: 10, xp: 15, locked: true },
            { id: 'L1U1C5', title: 'I numeri puri coreani',     titleKr: '고유 숫자',     duration: 10, xp: 15, locked: true },
            { id: 'L1U1C6', title: 'Ripasso e quiz',            titleKr: '복습',         duration: 8,  xp: 30, locked: true, review: true },
          ],
        },
        {
          id: 'U2', num: 2, title: 'Vita quotidiana',
          titleKr: '일상생활',
          color: 'sun',
          icon: '☕',
          lessons: [
            { id: 'L1U2C1', title: 'Al bar: ordinare',          titleKr: '카페에서',     duration: 14, xp: 20, locked: true },
            { id: 'L1U2C2', title: 'La famiglia',               titleKr: '가족',         duration: 12, xp: 20, locked: true },
            { id: 'L1U2C3', title: 'I giorni della settimana',  titleKr: '요일',         duration: 10, xp: 15, locked: true },
            { id: 'L1U2C4', title: 'Che ore sono?',             titleKr: '몇 시예요?',   duration: 12, xp: 20, locked: true },
            { id: 'L1U2C5', title: 'Al ristorante',             titleKr: '식당에서',     duration: 14, xp: 20, locked: true },
            { id: 'L1U2C6', title: 'Ripasso e quiz',            titleKr: '복습',         duration: 8,  xp: 30, locked: true, review: true },
          ],
        },
        {
          id: 'U3', num: 3, title: 'Spostarsi in città',
          titleKr: '도시에서',
          color: 'sky',
          icon: '🚇',
          lessons: [
            { id: 'L1U3C1', title: 'Chiedere indicazioni',      titleKr: '길 묻기',       duration: 12, xp: 20, locked: true },
            { id: 'L1U3C2', title: 'Mezzi pubblici',            titleKr: '교통수단',     duration: 14, xp: 20, locked: true },
            { id: 'L1U3C3', title: 'Posti in città',            titleKr: '장소',         duration: 12, xp: 20, locked: true },
            { id: 'L1U3C4', title: 'Le particelle 에 / 에서',   titleKr: '조사 에/에서', duration: 12, xp: 25, locked: true },
            { id: 'L1U3C5', title: 'Ripasso e quiz',            titleKr: '복습',         duration: 8,  xp: 30, locked: true, review: true },
          ],
        },
      ],
    },
    {
      id: 'L2',
      name: 'TOPIK I — Livello 2',
      subtitle: 'Elementare · A2',
      color: 'mint',
      description: 'Passato, futuro, modali, lettura di testi brevi, dialoghi lunghi.',
      units: [
        {
          id: 'U4', num: 4, title: 'Il tempo verbale',
          titleKr: '시제',
          color: 'mint',
          icon: '⏱',
          lessons: [
            { id: 'L2U4C1', title: 'Presente formale 아요/어요', titleKr: '현재형',       duration: 14, xp: 25, locked: true },
            { id: 'L2U4C2', title: 'Passato -았/었어요',          titleKr: '과거형',       duration: 14, xp: 25, locked: true },
            { id: 'L2U4C3', title: 'Futuro -(으)ㄹ 거예요',       titleKr: '미래형',       duration: 14, xp: 25, locked: true },
            { id: 'L2U4C4', title: 'Ripasso e quiz',             titleKr: '복습',         duration: 10, xp: 35, locked: true, review: true },
          ],
        },
        {
          id: 'U5', num: 5, title: 'Esprimere volontà',
          titleKr: '의사 표현',
          color: 'plum',
          icon: '💭',
          lessons: [
            { id: 'L2U5C1', title: '-고 싶다 (volere)',           titleKr: '-고 싶다',     duration: 12, xp: 25, locked: true },
            { id: 'L2U5C2', title: '-(으)세요 (per favore)',      titleKr: '-(으)세요',    duration: 12, xp: 25, locked: true },
            { id: 'L2U5C3', title: 'Invitare e rifiutare',        titleKr: '초대/거절',    duration: 14, xp: 25, locked: true },
            { id: 'L2U5C4', title: 'Ripasso e quiz',              titleKr: '복습',         duration: 10, xp: 35, locked: true, review: true },
          ],
        },
        {
          id: 'U6', num: 6, title: 'Descrivere il mondo',
          titleKr: '묘사',
          color: 'coral',
          icon: '🎨',
          lessons: [
            { id: 'L2U6C1', title: 'Aggettivi e stato',           titleKr: '형용사',       duration: 14, xp: 25, locked: true },
            { id: 'L2U6C2', title: 'Connettori -고, -지만',       titleKr: '연결 어미',    duration: 14, xp: 25, locked: true },
            { id: 'L2U6C3', title: 'Lettura: racconto breve',     titleKr: '짧은 글',      duration: 16, xp: 30, locked: true },
            { id: 'L2U6C4', title: 'Prova simulata TOPIK II-2',   titleKr: '모의고사',     duration: 25, xp: 80, locked: true, exam: true },
          ],
        },
      ],
    },
  ],
};

// User state
window.USER = {
  name: 'Luca',
  streak: 12,
  totalXp: 1240,
  gems: 340,
  weeklyGoal: 5,
  weekProgress: [true, true, true, true, false, false, false], // lun..dom
  level: 8,
  levelProgress: 0.65,
};
