import type { ButtonHTMLAttributes, AnchorHTMLAttributes, ReactNode } from "react";

type Variant = "ink" | "coral" | "ghost";
type Size = "md" | "sm";

const base =
  "inline-flex items-center gap-2 font-display font-semibold no-underline cursor-pointer rounded-full border-[3px] border-ink transition-transform duration-75 active:translate-x-[3px] active:translate-y-[3px]";

const variants: Record<Variant, string> = {
  ink: "bg-ink text-paper hover:-translate-x-0.5 hover:-translate-y-0.5",
  coral: "bg-coral text-ink hover:-translate-x-0.5 hover:-translate-y-0.5",
  ghost: "bg-paper text-ink hover:-translate-x-0.5 hover:-translate-y-0.5",
};

const sizes: Record<Size, string> = {
  md: "text-[1.05rem] px-5 py-2.5 shadow-hard active:shadow-hard-sm",
  sm: "text-[0.95rem] px-4 py-2 shadow-hard-sm",
};

function cls(variant: Variant, size: Size, extra?: string) {
  return `${base} ${variants[variant]} ${sizes[size]} ${extra ?? ""}`.trim();
}

export function Button({
  variant = "ink",
  size = "md",
  className,
  children,
  ...rest
}: { variant?: Variant; size?: Size; children: ReactNode } & ButtonHTMLAttributes<HTMLButtonElement>) {
  return (
    <button className={cls(variant, size, className)} {...rest}>
      {children}
    </button>
  );
}

export function ButtonLink({
  variant = "ink",
  size = "md",
  className,
  children,
  ...rest
}: { variant?: Variant; size?: Size; children: ReactNode } & AnchorHTMLAttributes<HTMLAnchorElement>) {
  return (
    <a className={cls(variant, size, className)} {...rest}>
      {children}
    </a>
  );
}
