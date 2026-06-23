/**
 * Filo — the MACYPRINTS mascot: a friendly extruder nozzle.
 * Arms are drawn BEFORE the body so the body overlaps the joints (seamless
 * connection), each with a black outline + rounded mitten-hand.
 */
export default function Filo({
  className = "",
  title = "Filo, the MACYPRINTS mascot",
}: {
  className?: string;
  title?: string;
}) {
  return (
    <svg
      viewBox="0 0 200 240"
      className={className}
      role="img"
      aria-label={title}
      xmlns="http://www.w3.org/2000/svg"
    >
      {/* left waving arm — outline then coral fill, rooted behind the body */}
      <path d="M78 96 C 52 90 42 68 52 56" fill="none" stroke="#18130F" strokeWidth="16" strokeLinecap="round" />
      <path d="M78 96 C 52 90 42 68 52 56" fill="none" stroke="#FF5436" strokeWidth="10" strokeLinecap="round" />
      {/* right resting arm */}
      <path d="M122 108 C 150 112 158 132 150 146" fill="none" stroke="#18130F" strokeWidth="16" strokeLinecap="round" />
      <path d="M122 108 C 150 112 158 132 150 146" fill="none" stroke="#FF5436" strokeWidth="10" strokeLinecap="round" />
      {/* cap */}
      <rect x="70" y="34" width="60" height="22" rx="9" fill="#18130F" />
      {/* body (covers the arm roots) */}
      <path
        d="M60 56 L140 56 L120 150 Q100 162 80 150 Z"
        fill="#FF5436"
        stroke="#18130F"
        strokeWidth="5"
        strokeLinejoin="round"
      />
      {/* nozzle tip */}
      <path d="M82 150 L118 150 L108 170 L92 170 Z" fill="#18130F" />
      {/* eyes */}
      <ellipse cx="85" cy="92" rx="11" ry="13" fill="#fff" stroke="#18130F" strokeWidth="3" />
      <ellipse cx="115" cy="92" rx="11" ry="13" fill="#fff" stroke="#18130F" strokeWidth="3" />
      <circle cx="87" cy="95" r="5" fill="#18130F" />
      <circle cx="117" cy="95" r="5" fill="#18130F" />
      {/* cheeks */}
      <circle cx="72" cy="112" r="5" fill="#FF7DB0" />
      <circle cx="128" cy="112" r="5" fill="#FF7DB0" />
      {/* smile */}
      <path d="M88 118 Q100 130 112 118" fill="none" stroke="#18130F" strokeWidth="4" strokeLinecap="round" />
      {/* filament squiggle leaving the tip */}
      <path
        d="M100 170 C100 188 132 188 132 204 C132 218 96 214 110 230"
        fill="none"
        stroke="#FF5436"
        strokeWidth="6"
        strokeLinecap="round"
      />
    </svg>
  );
}
