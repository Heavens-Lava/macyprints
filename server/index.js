// MACYPRINTS API — Stripe Checkout (test mode).
//
// The server is the source of truth for prices: it looks up each line's price
// from shared/products.json by id, so the client can never tamper with amounts.
//
// If STRIPE_SECRET_KEY is unset, the server runs in DEMO mode and returns
// { demo: true } so the whole flow is testable without a Stripe account.

import express from "express";
import cors from "cors";
import { readFileSync } from "node:fs";
import { fileURLToPath } from "node:url";
import { dirname, join } from "node:path";
import "dotenv/config";

const __dirname = dirname(fileURLToPath(import.meta.url));
const PORT = process.env.PORT || 3001;
const PUBLIC_URL = process.env.PUBLIC_URL || `http://localhost:5173`;
const SECRET = process.env.STRIPE_SECRET_KEY;

// load catalog (server-authoritative)
const PRODUCTS = JSON.parse(readFileSync(join(__dirname, "../shared/products.json"), "utf8"));
const byId = new Map(PRODUCTS.map((p) => [p.id, p]));

// lazy Stripe client (only when a key is configured)
let stripe = null;
if (SECRET) {
  const Stripe = (await import("stripe")).default;
  stripe = new Stripe(SECRET);
  console.log("[macyprints] Stripe LIVE/TEST mode — key detected.");
} else {
  console.log("[macyprints] DEMO mode — no STRIPE_SECRET_KEY. Checkout is simulated.");
}

const app = express();
app.use(cors());
app.use(express.json());

app.get("/api/health", (_req, res) => {
  res.json({ ok: true, mode: stripe ? "stripe" : "demo", products: PRODUCTS.length });
});

app.post("/api/create-checkout-session", async (req, res) => {
  try {
    const lines = Array.isArray(req.body?.lines) ? req.body.lines : [];
    const valid = lines
      .map((l) => ({ product: byId.get(l.id), qty: Math.max(1, Math.min(99, parseInt(l.qty, 10) || 1)) }))
      .filter((x) => x.product);

    if (valid.length === 0) {
      return res.status(400).json({ error: "Cart is empty or has no valid items." });
    }

    // DEMO mode: skip Stripe, tell the client to show the success page.
    if (!stripe) {
      return res.json({ demo: true });
    }

    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items: valid.map(({ product, qty }) => ({
        quantity: qty,
        price_data: {
          currency: product.currency || "usd",
          unit_amount: product.priceCents,
          product_data: {
            name: product.name,
            description: `${product.material} · ${product.size}`,
          },
        },
      })),
      shipping_address_collection: { allowed_countries: ["US", "CA", "GB", "AU"] },
      success_url: `${PUBLIC_URL}/success?session_id={CHECKOUT_SESSION_ID}`,
      cancel_url: `${PUBLIC_URL}/cancel`,
    });

    res.json({ url: session.url });
  } catch (err) {
    console.error("[macyprints] checkout error:", err);
    res.status(500).json({ error: "Could not start checkout." });
  }
});

app.listen(PORT, () => {
  console.log(`[macyprints] API listening on http://localhost:${PORT}`);
});
