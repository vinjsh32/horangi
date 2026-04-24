// Lesson data — "Saluti e presentazioni" (TOPIK 1, Unit 1, Lesson 3)
// Rich content, italiano + coreano affiancati

window.LESSON = {
  unit: 'Unità 1 · Primi passi',
  chapter: 'Capitolo 3',
  title: 'Saluti e presentazioni',
  titleKr: '인사와 소개',
  level: 'TOPIK 1 — A1',
  minutes: 12,
  xp: 20,
  // Ordered step list drives the top progress bar + sidebar
  steps: [
    { id: 'intro',      kind: 'theory',   label: 'Introduzione',          icon: '📖' },
    { id: 'hangul',     kind: 'hangul',   label: 'Hangul: ㅇ ㅏ ㄴ',       icon: '✍️' },
    { id: 'vocab',      kind: 'flash',    label: 'Vocabolario',           icon: '🃏' },
    { id: 'dialog',     kind: 'dialog',   label: 'Dialogo',               icon: '💬' },
    { id: 'grammar',    kind: 'grammar',  label: 'Grammatica: 은/는',      icon: '📐' },
    { id: 'choice',     kind: 'choice',   label: 'Esercizio: scelta',      icon: '✦' },
    { id: 'match',      kind: 'match',    label: 'Esercizio: abbinamento', icon: '✦' },
    { id: 'translate',  kind: 'translate',label: 'Traduci con AI',         icon: '✨' },
    { id: 'speak',      kind: 'speak',    label: 'Pronuncia',              icon: '🎤' },
    { id: 'converse',   kind: 'converse', label: 'Parla con Horangi',      icon: '🤖' },
    { id: 'quiz',       kind: 'quiz',     label: 'Quiz finale',            icon: '🎯' },
    { id: 'done',       kind: 'done',     label: 'Completato!',            icon: '🏆' },
  ],

  vocab: [
    { kr: '안녕하세요', romaja: 'annyeonghaseyo', it: 'Buongiorno / Salve', note: 'Saluto formale gentile, si usa in quasi ogni contesto.' },
    { kr: '안녕', romaja: 'annyeong', it: 'Ciao', note: 'Informale, tra amici o coetanei.' },
    { kr: '저는', romaja: 'jeoneun', it: 'Io (formale)', note: '저 = io (umile) + 는 = particella del tema.' },
    { kr: '이름', romaja: 'ireum', it: 'Nome' },
    { kr: '입니다', romaja: 'imnida', it: 'essere (formale)', note: 'Copula formale — come “sono/è” in italiano formale.' },
    { kr: '만나서 반갑습니다', romaja: 'mannaseo bangapseumnida', it: 'Piacere di conoscerti', note: 'Letteralmente: “incontrandoti sono felice”.' },
  ],

  dialog: [
    { who: 'Minji',  kr: '안녕하세요!', romaja: 'Annyeonghaseyo!', it: 'Buongiorno!' },
    { who: 'Luca',   kr: '안녕하세요. 저는 루카입니다.', romaja: 'Annyeonghaseyo. Jeoneun Ruka-imnida.', it: 'Buongiorno. Io sono Luca.' },
    { who: 'Minji',  kr: '저는 민지입니다. 만나서 반갑습니다.', romaja: 'Jeoneun Minji-imnida. Mannaseo bangapseumnida.', it: 'Io sono Minji. Piacere di conoscerti.' },
    { who: 'Luca',   kr: '반갑습니다!', romaja: 'Bangapseumnida!', it: 'Piacere!' },
  ],

  // A choice exercise
  choice: {
    prompt: 'Come si dice “Io sono Luca” in modo formale?',
    kr: null,
    options: [
      { kr: '저는 루카입니다.',  it: 'Jeoneun Ruka-imnida.',    correct: true },
      { kr: '나는 루카예요.',    it: 'Naneun Ruka-yeyo.',        correct: false, why: 'Questa forma è colloquiale (나 + 예요), non formale.' },
      { kr: '루카 만나요.',      it: 'Ruka mannayo.',            correct: false, why: '만나요 significa “incontrare”, non “essere”.' },
      { kr: '안녕 루카.',        it: 'Annyeong Ruka.',           correct: false, why: 'Questo è solo un saluto informale + nome.' },
    ],
  },

  // Matching exercise
  match: {
    prompt: 'Abbina ogni parola al suo significato',
    pairs: [
      { kr: '안녕하세요', it: 'Buongiorno' },
      { kr: '이름',      it: 'Nome' },
      { kr: '저',        it: 'Io (formale)' },
      { kr: '입니다',    it: 'essere (formale)' },
    ],
  },

  // Speak exercise
  speak: {
    prompt: 'Pronuncia questa frase',
    kr: '만나서 반갑습니다',
    romaja: 'mannaseo bangapseumnida',
    it: 'Piacere di conoscerti',
  },

  // Final quiz
  quiz: [
    {
      kind: 'choice',
      prompt: 'Qual è il saluto formale più comune?',
      options: [
        { kr: '안녕하세요', correct: true },
        { kr: '안녕' },
        { kr: '반갑습니다' },
      ],
    },
    {
      kind: 'fillin',
      prompt: 'Completa: “저___ 루카입니다.”',
      answer: '는',
      hint: 'Particella del tema dopo una vocale/consonante con batchim?',
    },
    {
      kind: 'choice',
      prompt: '“입니다” significa…',
      options: [
        { kr: 'piacere' },
        { kr: 'essere (formale)', correct: true },
        { kr: 'nome' },
      ],
    },
  ],
};

// Hangul data for the tracing step — just 3 letters today
window.HANGUL = [
  {
    jamo: 'ㅇ',
    name: 'ieung',
    sound: 'silenzioso all’inizio / “-ng” in finale',
    example: { kr: '아', romaja: 'a', it: 'suono “a”' },
    strokes: 1,
    // simplified stroke path for tracing
    paths: ['M 100,60 a 40,40 0 1,1 -0.1,0'],
  },
  {
    jamo: 'ㅏ',
    name: 'a',
    sound: '“a” come in “casa”',
    example: { kr: '아', romaja: 'a', it: 'ah' },
    strokes: 2,
    paths: [ 'M 80,40 L 80,160', 'M 80,100 L 130,100' ],
  },
  {
    jamo: 'ㄴ',
    name: 'nieun',
    sound: '“n” come in “nonno”',
    example: { kr: '나', romaja: 'na', it: 'io (informale)' },
    strokes: 2,
    paths: [ 'M 60,50 L 60,150', 'M 60,150 L 150,150' ],
  },
];
