import { ButtonLink } from "../components/Button";

export default function Cancel() {
  return (
    <section className="max-w-[640px] mx-auto px-7 py-20 text-center">
      <div className="text-6xl">🛒</div>
      <h1 className="font-display font-bold text-[clamp(2.2rem,5vw,3.4rem)] mt-4">Checkout cancelled</h1>
      <p className="text-[1.15rem] mt-3 opacity-80">
        No worries — your cart is still saved. Pick up right where you left off whenever you're ready.
      </p>
      <div className="mt-8 flex justify-center gap-3.5">
        <ButtonLink href="/" variant="coral">Back to shop →</ButtonLink>
      </div>
    </section>
  );
}
