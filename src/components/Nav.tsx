import { Link } from "react-router-dom";
import Logo from "./Logo";
import { useCart } from "../lib/cart";

export default function Nav() {
  const { count, setOpen } = useCart();
  return (
    <nav className="sticky top-0 z-50 bg-paper border-b-[3px] border-ink">
      <div className="max-w-[1180px] mx-auto px-7 flex items-center gap-4 h-[72px]">
        <Link to="/" className="font-display font-bold text-2xl tracking-tight no-underline text-ink flex items-center gap-3">
          <Logo className="w-[34px] h-[34px]" />
          MACYPRINTS
        </Link>
        <div className="flex gap-6 ml-auto items-center">
          <a href="/#drops" className="no-underline font-medium hidden sm:block hover:text-coral">Shop</a>
          <a href="/#custom" className="no-underline font-medium hidden sm:block hover:text-coral">Custom</a>
          <a href="/#how" className="no-underline font-medium hidden sm:block hover:text-coral">How it works</a>
          <button
            onClick={() => setOpen(true)}
            className="border-[3px] border-ink rounded-full px-3.5 py-1.5 font-mono font-bold text-[0.9rem] bg-sunny shadow-hard-sm cursor-pointer"
          >
            CART · {count}
          </button>
        </div>
      </div>
    </nav>
  );
}
