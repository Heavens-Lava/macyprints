import type { CartLine } from "./cart";

export type CheckoutResult = { demo: true } | { url: string };

/**
 * Asks the API to create a Stripe Checkout Session.
 *
 * Returns:
 *  - { url }   -> redirect the browser to Stripe (real checkout)
 *  - { demo }  -> no backend / no Stripe key; caller should route to /success?demo=1
 *
 * On a static host like GitHub Pages there is no API, so the request 404s or
 * fails at the network layer — we treat that as DEMO so the live page still
 * completes the flow as a showcase.
 */
export async function startCheckout(lines: CartLine[]): Promise<CheckoutResult> {
  let res: Response;
  try {
    res = await fetch("/api/create-checkout-session", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ lines }),
    });
  } catch {
    // network error -> no backend reachable (e.g. static hosting)
    return { demo: true };
  }

  // No API deployed (static host) commonly returns 404/405 -> demo fallback
  if (res.status === 404 || res.status === 405) {
    return { demo: true };
  }
  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Checkout failed (${res.status}). ${msg}`);
  }

  const data: { url?: string; demo?: boolean } = await res.json().catch(() => ({}));
  if (data.demo) return { demo: true };
  if (data.url) return { url: data.url };
  // API responded but gave us nothing usable -> demo so the user isn't stuck
  return { demo: true };
}
