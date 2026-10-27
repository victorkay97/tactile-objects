/**
 * A single handmade paper plane, with two tiny paper details at the margins.
 * Decorative only: never captures pointers or affects keyboard navigation.
 * CSS animation is transform/opacity-based and stops for reduced-motion users.
 */
export function AmbientPaperScene() {
  return (
    <div className="ambient-paper" aria-hidden="true">
      <div className="ambient-paper__flight">
        <svg viewBox="0 0 150 95" width="150" height="95" role="presentation">
          <defs>
            <linearGradient id="paper-plane-wing" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#fffefb" />
              <stop offset="1" stopColor="#dedcf2" />
            </linearGradient>
            <linearGradient id="paper-plane-fold" x1="0" x2="1" y1="0" y2="1">
              <stop offset="0" stopColor="#e2e0f6" />
              <stop offset="1" stopColor="#a9a2d8" />
            </linearGradient>
            <filter id="paper-plane-shadow" x="-30%" y="-60%" width="170%" height="220%">
              <feDropShadow dx="3" dy="6" stdDeviation="4" floodColor="#463c72" floodOpacity=".13" />
            </filter>
          </defs>
          <path d="M6 74 Q21 61 40 63" fill="none" stroke="#b9b1d5" strokeWidth="1.6" strokeDasharray="2 7" strokeLinecap="round" opacity=".8" />
          <circle cx="46" cy="61" r="1.6" fill="#b5aed9" />
          <g filter="url(#paper-plane-shadow)" transform="translate(47 7) rotate(-7 51 37)">
            <path d="M2 28 L101 3 L53 76 L40 49 Z" fill="url(#paper-plane-wing)" stroke="#bdb6d4" strokeWidth="1.3" strokeLinejoin="round" />
            <path d="M2 28 L101 3 L40 49 Z" fill="#fffdf7" stroke="#cac6d9" strokeWidth="1" strokeLinejoin="round" />
            <path d="M40 49 L53 76 L59 42 L101 3 Z" fill="url(#paper-plane-fold)" opacity=".92" stroke="#ada6ce" strokeWidth="1" strokeLinejoin="round" />
            <path d="M2 28 L59 42 L101 3" fill="none" stroke="#c8c2da" strokeWidth="1.2" />
            <path d="M40 49 L59 42" fill="none" stroke="#aba2d0" strokeWidth="1" />
          </g>
        </svg>
      </div>
      <div className="ambient-paper__scrap ambient-paper__scrap--left">
        <span className="ambient-paper__scrap-inner">
          <i className="ambient-paper__scrap-fold" />
          <i className="ambient-paper__scrap-line" />
          <i className="ambient-paper__scrap-line ambient-paper__scrap-line--short" />
        </span>
      </div>
      <div className="ambient-paper__scrap ambient-paper__scrap--right">
        <span className="ambient-paper__scrap-inner ambient-paper__scrap-inner--right">
          <i className="ambient-paper__scrap-mark" />
          <i className="ambient-paper__scrap-line" />
        </span>
      </div>
      <span className="ambient-paper__pin ambient-paper__pin--one" />
      <span className="ambient-paper__pin ambient-paper__pin--two" />
    </div>
  );
}
