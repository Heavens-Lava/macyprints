/**
 * MACYPRINTS logo — a printer nozzle extruding a stacked-layer tower.
 * `color` drives the build-plate + nozzle (currentColor); the layer bars stay
 * brand-colored so it reads on both light and dark backgrounds.
 */
export default function Logo({ className = "", color = "#18130F" }: { className?: string; color?: string }) {
  return (
    <svg
      viewBox="0 0 40 40"
      className={className}
      style={{ color }}
      role="img"
      aria-label="MACYPRINTS logo"
      xmlns="http://www.w3.org/2000/svg"
    >
      <rect x="3" y="32" width="34" height="5" rx="2.5" fill="currentColor" />
      <rect x="12" y="26" width="16" height="4.5" rx="2.2" fill="#FF5436" stroke="currentColor" strokeWidth="2" />
      <rect x="11" y="21" width="18" height="4.5" rx="2.2" fill="#FFC93C" stroke="currentColor" strokeWidth="2" />
      <rect x="13" y="16" width="14" height="4.5" rx="2.2" fill="#2D5BFF" stroke="currentColor" strokeWidth="2" />
      <path d="M14 3 h12 v5 l-3 4 h-6 l-3 -4 z" fill="currentColor" />
      <circle cx="20" cy="14.5" r="1.6" fill="#FF5436" />
    </svg>
  );
}
