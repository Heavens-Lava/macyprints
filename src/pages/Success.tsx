import { useEffect } from "react";
import { useSearchParams, Link } from "react-router-dom";
import Filo from "../components/Filo";
import { ButtonLink } from "../components/Button";
import { useCart } from "../lib/cart";

export default function Success() {
  const [params] = useSearchParams();
  const demo = params.get("demo") === "1";
  const { clear } = useCart();

  // order placed -> empty the cart
  useEffect(() => {
    clear();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <section className="max-w-[640px] mx-auto px-7 py-20 text-center">
      <Filo className="w-[150px] mx-auto" />
      <h1 className="font-display font-bold text-[clamp(2.2rem,5vw,3.4rem)] mt-4">Order placed! 🎉</h1>
      <p className="text-[1.15rem] mt-3 opacity-80">
        Filo is warming up the nozzle. You'll get an email confirmation and tracking shortly. Each piece is printed to
        order and ships in 3–5 days.
      </p>
      {demo && (
        <p className="font-mono text-[0.78rem] mt-5 inline-block bg-sunny border-[3px] border-ink rounded-lg px-3 py-2 shadow-hard-sm">
          ⚠ DEMO checkout — no real payment was taken. Add a Stripe key to go live.
        </p>
      )}
      <div className="mt-8 flex justify-center gap-3.5">
        <ButtonLink href="/" variant="coral">Back to shop →</ButtonLink>
      </div>
      <p className="font-mono text-[0.78rem] opacity-60 mt-6">
        <Link to="/">macyprints.com</Link>
      </p>
    </section>
  );
}
