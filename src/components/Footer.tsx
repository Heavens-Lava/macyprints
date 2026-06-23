import Logo from "./Logo";

export default function Footer() {
  return (
    <footer className="bg-ink text-paper border-t-[3px] border-ink mt-8">
      <div className="max-w-[1180px] mx-auto px-7 pt-12 pb-9 grid grid-cols-1 sm:grid-cols-[1.4fr_1fr_1fr] gap-8">
        <div>
          <a href="/" className="font-display font-bold text-2xl no-underline text-paper flex items-center gap-3 mb-3.5">
            <Logo className="w-[34px] h-[34px]" color="#FFF6E9" />
            MACYPRINTS
          </a>
          <p className="opacity-80 max-w-[34ch]">
            Original 3D prints, made to order with care. Designed &amp; printed by Macy — with help from Filo.
          </p>
        </div>
        <FooterCol title="Shop" links={["All prints", "New drops", "Custom commissions", "Gift cards"]} />
        <FooterCol title="Info" links={["Shipping & returns", "Materials & care", "Contact", "Instagram"]} />
      </div>
      <div className="border-t border-white/15">
        <div className="max-w-[1180px] mx-auto px-7 py-[18px] flex justify-between gap-3.5 font-mono text-[0.78rem] opacity-60">
          <span>© 2026 MACYPRINTS · macyprints.com</span>
          <span>Checkout secured by Stripe</span>
        </div>
      </div>
    </footer>
  );
}

function FooterCol({ title, links }: { title: string; links: string[] }) {
  return (
    <div>
      <h4 className="font-mono text-[0.78rem] tracking-[0.14em] uppercase opacity-60 mb-3.5">{title}</h4>
      {links.map((l) => (
        <a key={l} href="#" className="block no-underline opacity-90 py-1 hover:text-sunny">
          {l}
        </a>
      ))}
    </div>
  );
}
