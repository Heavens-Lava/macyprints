import type { ReactNode } from "react";
import Marquee from "../components/Marquee";
import BuildPlateHero from "../components/BuildPlateHero";
import ProductCard from "../components/ProductCard";
import Filo from "../components/Filo";
import { Button, ButtonLink } from "../components/Button";
import { PRODUCTS } from "../data/products";

export default function Home() {
  return (
    <>
      <Marquee />

      {/* HERO */}
      <header className="pt-[60px] pb-7">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 lg:grid-cols-[1.05fr_0.95fr] gap-10 items-center">
          <div>
            <span className="inline-flex items-center gap-2 font-mono font-bold text-[0.78rem] tracking-[0.12em] uppercase bg-lime border-[3px] border-ink rounded-full px-3.5 py-1.5 shadow-hard-sm mb-5">
              ▤ Handmade · made-to-order
            </span>
            <h1 className="font-display font-bold text-[clamp(2.6rem,5.4vw,4.4rem)] leading-[1.04]">
              <span className="block font-mono text-[0.42em] font-semibold tracking-[0.02em] text-coral uppercase mb-1.5">
                // Hi, I'm Filo —
              </span>
              let's make something <span className="layered-text">fun</span> &amp; wonderful.
            </h1>
            <p className="text-[1.18rem] max-w-[33ch] my-6">
              Original 3D prints for your desk, shelf &amp; soul. Printed to order in bright, durable PLA — by a real human
              and one friendly nozzle.
            </p>
            <div className="flex gap-3.5 flex-wrap items-center">
              <ButtonLink href="#drops" variant="coral">Shop the drops →</ButtonLink>
              <ButtonLink href="#custom" variant="ghost">Commission a print</ButtonLink>
            </div>
            <p className="font-mono text-[0.8rem] opacity-70 mt-4">// Secure checkout via Stripe · ships in 3–5 days</p>
          </div>
          <BuildPlateHero />
        </div>
      </header>

      <hr className="layer-divider border-0 m-0" />

      {/* DROPS */}
      <section id="drops" className="py-[54px]">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="flex items-end justify-between gap-5 mb-[34px] flex-wrap">
            <div>
              <Kicker>This week's drops</Kicker>
              <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)]">Shop the collection</h2>
            </div>
            <ButtonLink href="#drops" variant="ghost" size="sm">View all →</ButtonLink>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-[26px]">
            {PRODUCTS.map((p) => (
              <ProductCard key={p.id} product={p} />
            ))}
          </div>
        </div>
      </section>

      {/* CUSTOM */}
      <section id="custom" className="bg-coral text-ink border-y-[3px] border-ink">
        <div className="max-w-[1180px] mx-auto px-7 grid grid-cols-1 md:grid-cols-2 gap-10 items-center py-12">
          <div>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)]">Got an idea? Filo &amp; I will print it.</h2>
            <p className="text-[1.15rem] max-w-[40ch] my-4">
              Send a sketch, an STL, or just a vibe. I'll model it, print it, and ship it — one of one, just for you.
            </p>
            <Button variant="ink">Start a commission →</Button>
          </div>
          <div className="flex items-center gap-[22px]">
            <Filo className="w-[150px] flex-none" />
            <div className="flex-1 bg-paper border-[3px] border-ink rounded-[18px] shadow-hard-lg p-6">
              <ol className="list-none p-0 m-0 flex flex-col gap-3.5">
                <Step n={1} title="Tell us the idea." sub="Sketch, photo, STL, or vibe." />
                <Step n={2} title="Approve the model + quote." sub="You see a preview before printing." />
                <Step n={3} title="Pay & we print it." sub="Secure Stripe checkout, ships to your door." />
              </ol>
            </div>
          </div>
        </div>
      </section>

      {/* HOW */}
      <section id="how" className="py-[54px]">
        <div className="max-w-[1180px] mx-auto px-7">
          <div className="mb-[34px]">
            <Kicker>The process</Kicker>
            <h2 className="font-display font-bold text-[clamp(2rem,4vw,3rem)]">How it works</h2>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <HowStep n="01" title="Pick your print" body="Browse the drops or start a custom commission. Choose size, color, and finish." />
            <HowStep n="02" title="Checkout securely" body="Pay with card via Stripe. You'll get an order confirmation + tracking right away." />
            <HowStep n="03" title="Printed & shipped" body="Each piece is printed to order, hand-finished, packed, and mailed in 3–5 days." />
          </div>
        </div>
      </section>
    </>
  );
}

function Kicker({ children }: { children: ReactNode }) {
  return (
    <span className="font-mono text-[0.8rem] tracking-[0.12em] uppercase text-coral inline-flex items-center gap-2 mb-2 before:content-[''] before:w-[22px] before:h-2.5 before:[background:repeating-linear-gradient(0deg,#FF5436_0_2px,transparent_2px_4px)]">
      {children}
    </span>
  );
}

function Step({ n, title, sub }: { n: number; title: string; sub: string }) {
  return (
    <li className="flex gap-3 items-start">
      <span className="flex-none w-[30px] h-[30px] bg-electric text-white border-[3px] border-ink rounded-lg flex items-center justify-center font-display font-bold rotate-[-6deg]">
        {n}
      </span>
      <div>
        <strong>{title}</strong>
        <br />
        {sub}
      </div>
    </li>
  );
}

function HowStep({ n, title, body }: { n: string; title: string; body: string }) {
  return (
    <div className="border-[3px] border-ink rounded-[18px] p-6 bg-white shadow-hard">
      <div className="font-mono font-bold text-[0.9rem] bg-sunny border-[3px] border-ink rounded-full w-[42px] h-[42px] flex items-center justify-center mb-3.5">
        {n}
      </div>
      <h3 className="font-display font-bold text-[1.3rem] mb-2">{title}</h3>
      <p>{body}</p>
    </div>
  );
}
