// Horangi — our tiger-cub mascot. Original design, geometric shapes only.
// Korean folklore tiger (호랑이 = horangi). Friendly cub with big eyes.

const Horangi = ({ size = 120, mood = 'happy', bounce = false }) => {
  // mood: happy | cheer | think | sad | wave | wink
  const eyeOpen = mood !== 'sad' && mood !== 'wink';
  const mouthHappy = mood === 'happy' || mood === 'cheer' || mood === 'wave';
  const blush = mood === 'cheer' || mood === 'wave';
  const brow = mood === 'think' ? -2 : 0;

  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      style={{ animation: bounce ? 'floaty 2.4s ease-in-out infinite' : undefined, display: 'block' }}
    >
      {/* Ears */}
      <ellipse cx="55" cy="55" rx="20" ry="22" fill="#F5A742" />
      <ellipse cx="55" cy="58" rx="10" ry="11" fill="#FFD9A0" />
      <ellipse cx="145" cy="55" rx="20" ry="22" fill="#F5A742" />
      <ellipse cx="145" cy="58" rx="10" ry="11" fill="#FFD9A0" />
      {/* Head */}
      <ellipse cx="100" cy="110" rx="72" ry="66" fill="#FFB85C" />
      {/* Stripes */}
      <path d="M40,85 Q50,80 55,95" stroke="#2B2118" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M35,110 Q45,108 48,122" stroke="#2B2118" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M160,85 Q150,80 145,95" stroke="#2B2118" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M165,110 Q155,108 152,122" stroke="#2B2118" strokeWidth="5" fill="none" strokeLinecap="round" />
      <path d="M95,50 Q100,60 105,50" stroke="#2B2118" strokeWidth="5" fill="none" strokeLinecap="round" />
      {/* Face (lighter) */}
      <ellipse cx="100" cy="125" rx="52" ry="42" fill="#FFE6C2" />
      {/* Brows */}
      <rect x="62" y={86 + brow} width="18" height="5" rx="2.5" fill="#2B2118" transform={`rotate(${brow * 2} 71 ${88+brow})`} />
      <rect x="120" y={86 + brow} width="18" height="5" rx="2.5" fill="#2B2118" transform={`rotate(${-brow * 2} 129 ${88+brow})`} />
      {/* Eyes */}
      {eyeOpen ? (
        <>
          <circle cx="72" cy="108" r="9" fill="#2B2118" />
          <circle cx="128" cy="108" r="9" fill="#2B2118" />
          <circle cx="75" cy="105" r="3" fill="white" />
          <circle cx="131" cy="105" r="3" fill="white" />
        </>
      ) : mood === 'wink' ? (
        <>
          <path d="M63,108 Q72,112 81,108" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
          <circle cx="128" cy="108" r="9" fill="#2B2118" />
          <circle cx="131" cy="105" r="3" fill="white" />
        </>
      ) : (
        <>
          <path d="M63,110 Q72,104 81,110" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
          <path d="M119,110 Q128,104 137,110" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
        </>
      )}
      {/* Blush */}
      {blush && (
        <>
          <ellipse cx="62" cy="130" rx="9" ry="5" fill="#FF8F80" opacity="0.75" />
          <ellipse cx="138" cy="130" rx="9" ry="5" fill="#FF8F80" opacity="0.75" />
        </>
      )}
      {/* Nose */}
      <path d="M96,128 L104,128 L100,134 Z" fill="#2B2118" />
      {/* Mouth */}
      {mouthHappy ? (
        <path d="M85,142 Q100,158 115,142" stroke="#2B2118" strokeWidth="4" fill="#FF6B5E" strokeLinejoin="round" />
      ) : mood === 'think' ? (
        <circle cx="100" cy="148" r="4" fill="#2B2118" />
      ) : (
        <path d="M88,150 Q100,142 112,150" stroke="#2B2118" strokeWidth="4" fill="none" strokeLinecap="round" />
      )}
    </svg>
  );
};

// Small icons
const Heart = ({ filled = true, size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path
      d="M12 21s-7-4.5-9.3-9C1 8.5 3 4.5 6.8 4.5c2 0 3.6 1.2 4.4 2.8.8-1.6 2.4-2.8 4.4-2.8C19.4 4.5 21.4 8.5 20.2 12c-2.3 4.5-8.2 9-8.2 9z"
      fill={filled ? '#FF5A4F' : '#E8DDCA'}
      stroke={filled ? '#D13A2E' : '#CEBFA6'}
      strokeWidth="1.5"
      strokeLinejoin="round"
    />
  </svg>
);

const Flame = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2s5 4 5 9c0 3-2 5-5 5s-5-2-5-5c0-2 1-3 1-4 0-1-1-2-1-2s3 0 5-3z" fill="#FF9331" stroke="#D96A12" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M12 10s2 2 2 4-1 3-2 3-2-1-2-3 2-4 2-4z" fill="#FFD24D"/>
  </svg>
);

const Gem = ({ size = 22 }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 3 L20 10 L12 21 L4 10 Z" fill="#58A7FF" stroke="#2F7FDB" strokeWidth="1.5" strokeLinejoin="round"/>
    <path d="M4 10 L20 10 M12 3 L8 10 L12 21 M12 3 L16 10 L12 21" stroke="#2F7FDB" strokeWidth="1.2" fill="none"/>
  </svg>
);

const Sparkle = ({ size = 18, color = '#FFC83D' }) => (
  <svg viewBox="0 0 24 24" width={size} height={size}>
    <path d="M12 2 L13.5 10.5 L22 12 L13.5 13.5 L12 22 L10.5 13.5 L2 12 L10.5 10.5 Z" fill={color}/>
  </svg>
);

Object.assign(window, { Horangi, Heart, Flame, Gem, Sparkle });
