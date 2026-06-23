import { useState } from "react";
import { useCart } from "../lib/cart";
import { formatPrice } from "../data/products";
import { Button } from "./Button";
import { startCheckout } from "../lib/checkout";

export default function CartDrawer() {
  const { open, setOpen, items, lines, totalCents, setQty, clear } = useCart();
  const [busy, setBusy] = useState(false);
  const [err, setErr] = useState<string | null>(null);

  async function checkout() {
    setErr(null);
    setBusy(true);
    try {
      await startCheckout(lines);
    } catch (e) {
      setErr(e instanceof Error ? e.message : "Something went wrong.");
      setBusy(false);
    }
  }

  return (
    <>
      {/* backdrop */}
      <div
        onClick={() => setOpen(false)}
        className={`fixed inset-0 bg-ink/40 z-[60] transition-opacity ${open ? "opacity-100" : "opacity-0 pointer-events-none"}`}
      />
      {/* drawer */}
      <aside
        className={`fixed top-0 right-0 h-full w-full max-w-[420px] bg-paper border-l-[3px] border-ink z-[70] flex flex-col transition-transform duration-200 ${open ? "translate-x-0" : "translate-x-full"}`}
        aria-hidden={!open}
      >
        <div className="flex items-center justify-between px-5 h-[72px] border-b-[3px] border-ink">
          <h2 className="font-display font-bold text-xl">Your cart</h2>
          <button onClick={() => setOpen(false)} className="font-mono text-sm border-[3px] border-ink rounded-full px-3 py-1 bg-white shadow-hard-sm">
            CLOSE ✕
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-5 flex flex-col gap-3">
          {items.length === 0 && (
            <p className="font-mono text-sm opacity-70 mt-6 text-center">
              Your cart is empty.
              <br />
              Filo is waiting to print something ✦
            </p>
          )}
          {items.map(({ product, qty }) => (
            <div key={product.id} className="flex gap-3 items-center border-[3px] border-ink rounded-[14px] bg-white p-3 shadow-hard-sm">
              <div className="w-12 h-12 rounded-lg border-2 border-ink flex-none" style={{ background: product.tint }} />
              <div className="flex-1 min-w-0">
                <div className="font-display font-bold leading-tight truncate">{product.name}</div>
                <div className="font-mono text-[0.72rem] opacity-70">{formatPrice(product.priceCents, product.currency)}</div>
              </div>
              <div className="flex items-center gap-2 font-mono">
                <button onClick={() => setQty(product.id, qty - 1)} className="w-6 h-6 border-2 border-ink rounded-md leading-none">−</button>
                <span className="w-5 text-center">{qty}</span>
                <button onClick={() => setQty(product.id, qty + 1)} className="w-6 h-6 border-2 border-ink rounded-md leading-none">+</button>
              </div>
            </div>
          ))}
        </div>

        <div className="border-t-[3px] border-ink p-5 flex flex-col gap-3">
          <div className="flex justify-between font-display font-bold text-lg">
            <span>Subtotal</span>
            <span>{formatPrice(totalCents)}</span>
          </div>
          {err && <p className="font-mono text-[0.72rem] text-coral">{err}</p>}
          <Button variant="coral" disabled={items.length === 0 || busy} onClick={checkout} className="justify-center disabled:opacity-50">
            {busy ? "Taking you to checkout…" : "Checkout securely →"}
          </Button>
          <div className="flex justify-between items-center">
            <button onClick={clear} className="font-mono text-[0.72rem] opacity-60 underline disabled:opacity-30" disabled={items.length === 0}>
              clear cart
            </button>
            <span className="font-mono text-[0.7rem] opacity-60">Secured by Stripe</span>
          </div>
        </div>
      </aside>
    </>
  );
}
