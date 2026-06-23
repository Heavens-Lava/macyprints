import { Button } from "./Button";
import { formatPrice, type Product } from "../data/products";
import { useCart } from "../lib/cart";

/** Build a horizontal "print layer" stripe pattern from a base tint. */
function layerBg(tint: string): string {
  return `repeating-linear-gradient(0deg, ${tint} 0 9px, ${shade(tint, -10)} 9px 18px)`;
}
// darken a hex by pct (negative) for the alternating stripe
function shade(hex: string, pct: number): string {
  const n = parseInt(hex.slice(1), 16);
  const r = Math.max(0, Math.min(255, ((n >> 16) & 255) + Math.round(255 * (pct / 100))));
  const g = Math.max(0, Math.min(255, ((n >> 8) & 255) + Math.round(255 * (pct / 100))));
  const b = Math.max(0, Math.min(255, (n & 255) + Math.round(255 * (pct / 100))));
  return `rgb(${r}, ${g}, ${b})`;
}

export default function ProductCard({ product }: { product: Product }) {
  const { add } = useCart();
  return (
    <article className="bg-white border-[3px] border-ink rounded-[18px] shadow-hard overflow-hidden flex flex-col transition-transform duration-100 hover:-translate-x-[3px] hover:-translate-y-[3px] hover:shadow-hard-lg">
      <div
        className="aspect-square flex items-center justify-center border-b-[3px] border-ink relative text-center font-mono font-bold text-[0.8rem]"
        style={product.image ? undefined : { background: layerBg(product.tint) }}
      >
        {product.image ? (
          <img src={product.image} alt={product.name} className="w-full h-full object-cover" />
        ) : (
          <span className="opacity-70">PRODUCT PHOTO</span>
        )}
        {product.badge && (
          <span className="absolute top-3 left-3 bg-ink text-paper font-mono text-[0.68rem] px-2 py-1 rounded-full tracking-[0.06em]">
            {product.badge}
          </span>
        )}
      </div>
      <div className="p-4 pb-[18px] flex flex-col gap-1.5 flex-1">
        <h3 className="text-[1.3rem] font-display font-bold">{product.name}</h3>
        <span className="font-mono text-[0.78rem] opacity-70">
          {product.material} · {product.size}
        </span>
        <p className="text-[0.95rem] leading-snug opacity-80">{product.blurb}</p>
        <div className="flex gap-1.5 mt-1">
          {product.colorChips.map((c) => (
            <span key={c} className="w-4 h-4 rounded-full border-2 border-ink" style={{ background: c }} />
          ))}
        </div>
        <div className="flex items-center justify-between mt-auto pt-2.5">
          <span className="font-display font-bold text-[1.5rem]">{formatPrice(product.priceCents, product.currency)}</span>
          <Button variant="coral" size="sm" onClick={() => add(product.id)}>
            Add to cart
          </Button>
        </div>
      </div>
    </article>
  );
}
