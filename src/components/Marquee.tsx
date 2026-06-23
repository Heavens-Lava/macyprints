const ITEMS = [
  "FRESH PRINTS DROPPED WEEKLY",
  "FREE SHIPPING OVER $50",
  "SAY HI TO FILO",
  "PRINTED + PACKED BY HAND",
];

export default function Marquee() {
  // doubled list so the -50% translate loops seamlessly
  const loop = [...ITEMS, ...ITEMS];
  return (
    <div className="bg-ink text-paper overflow-hidden border-b-[3px] border-ink whitespace-nowrap" aria-hidden="true">
      <div className="inline-block py-2.5 font-mono text-[0.9rem] tracking-[0.08em] animate-marquee">
        {loop.map((item, i) => (
          <span key={i} className="px-7">
            <span className="text-coral">▤</span>
            <span className="px-7">{item}</span>
          </span>
        ))}
      </div>
    </div>
  );
}
