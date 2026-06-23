import type { CartLine } from "./cart";

/**
 * Kicks off checkout. Posts the cart to our API, which creates a Stripe
 * Checkout Session and returns a redirect URL.
 *
 * In DEMO mode (no STRIPE_SECRET_KEY on the server), the API returns
 * { demo: true } and we route to a local success page so the flow is testable
 * end-to-end without a Stripe account.
 */
export async function startCheckout(lines: CartLine[]): Promise<void> {
  const res = await fetch("/api/create-checkout-session", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ lines }),
  });

  if (!res.ok) {
    const msg = await res.text().catch(() => "");
    throw new Error(`Checkout failed (${res.status}). ${msg}`);
  }

  const data: { url?: string; demo?: boolean } = await res.json();

  if (data.demo) {
    window.location.assign("/success?demo=1");
    return;
  }
  if (data.url) {
    window.location.assign(data.url);
    return;
  }
  throw new Error("Checkout did not return a redirect URL.");
}
