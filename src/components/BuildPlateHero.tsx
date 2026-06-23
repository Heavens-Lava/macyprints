import Filo from "./Filo";

/**
 * The build-plate hero art: a print bed (grid) with Filo standing center,
 * two product placeholder stickers behind, a speech bubble, and a live
 * "now printing" progress bar. Signature MACYPRINTS visual.
 */
export default function BuildPlateHero() {
  const plateBg = [
    "linear-gradient(0deg, rgba(45,91,255,.05), rgba(45,91,255,.05))",
    "repeating-linear-gradient(0deg, transparent 0 27px, rgba(24,19,15,.09) 27px 28px)",
    "repeating-linear-gradient(90deg, transparent 0 27px, rgba(24,19,15,.09) 27px 28px)",
    "#fff",
  ].join(", ");

  return (
    <div
      className="relative h-[460px] border-[3px] border-ink rounded-[20px] shadow-hard-lg overflow-hidden"
      style={{ background: plateBg }}
      aria-label="Print bed with Filo and featured prints (placeholders)"
    >
      <span className="absolute top-3 left-3.5 z-[6] font-mono text-[0.68rem] tracking-[0.08em] bg-ink text-paper px-2 py-1 rounded-full">
        ▤ BUILD PLATE · 220 × 220
      </span>

      <div className="absolute left-1/2 -translate-x-1/2 rotate-[-3deg] top-[30px] z-[6] font-display font-semibold text-[0.95rem] bg-white border-[3px] border-ink rounded-[14px] px-3.5 py-[7px] shadow-hard">
        layer by layer ✦
      </div>

      {/* placeholder stickers */}
      <Sticker className="w-2/5 h-[38%] left-[8%] top-[16%] bg-sunny rotate-[-7deg] z-[2]" tag="DROP 01" />
      <Sticker className="w-[36%] h-[34%] right-[7%] top-[20%] bg-candy rotate-[8deg] z-[2]" tag="NEW" />

      {/* Filo, center stage */}
      <Filo className="absolute left-1/2 -translate-x-1/2 bottom-12 z-[5] w-[210px]" />

      {/* now-printing bar */}
      <div className="absolute left-3.5 right-3.5 bottom-3.5 z-[6]">
        <div className="font-mono text-[0.7rem] tracking-[0.06em] flex justify-between mb-1.5">
          <span>NOW PRINTING · drop 03</span>
          <span>68%</span>
        </div>
        <div className="h-3.5 border-[3px] border-ink rounded-full bg-white overflow-hidden">
          <div
            className="h-full w-[68%]"
            style={{ background: "repeating-linear-gradient(90deg, #FF5436 0 8px, #FF7A5C 8px 16px)" }}
          />
        </div>
      </div>
    </div>
  );
}

function Sticker({ className, tag }: { className: string; tag: string }) {
  return (
    <div
      className={`absolute border-[3px] border-ink rounded-[16px] shadow-hard flex items-center justify-center text-center font-mono font-bold text-[0.78rem] p-2.5 ${className}`}
    >
      <span className="absolute -top-3 left-3 bg-ink text-paper text-[0.66rem] px-2 py-0.5 rounded-full tracking-[0.06em]">
        {tag}
      </span>
      PRODUCT
      <br />
      PHOTO
    </div>
  );
}
