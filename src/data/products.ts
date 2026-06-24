import raw from "../../shared/products.json";
import { supabase } from "../lib/supabase";

export interface Product {
  /** stable slug — used as the cart id and Stripe lookup key */
  id: string;
  name: string;
  blurb: string;
  priceCents: number;
  currency: string;
  badge?: string;
  material: string;
  size: string;
  /** base tint for the layer-line placeholder until a real photo exists */
  tint: string;
  colorChips: string[];
  /** real photo URL; empty = show placeholder */
  image: string;
  /** units available to sell */
  stockQty: number;
  active: boolean;
}

/** Local seed used as a fallback when Supabase is unreachable / not configured. */
export const SEED_PRODUCTS: Product[] = (raw as Omit<Product, "stockQty" | "active">[]).map((p) => ({
  ...p,
  stockQty: 99,
  active: true,
}));

/** Maps a row from macyprints.products to the client Product shape. */
function rowToProduct(r: Record<string, unknown>): Product {
  return {
    id: String(r.slug),
    name: String(r.name),
    blurb: String(r.blurb ?? ""),
    priceCents: Number(r.price_cents ?? 0),
    currency: String(r.currency ?? "usd"),
    badge: (r.badge as string) || undefined,
    material: String(r.material ?? ""),
    size: String(r.size ?? ""),
    tint: String(r.tint ?? "#FFD49A"),
    colorChips: Array.isArray(r.color_chips) ? (r.color_chips as string[]) : [],
    image: String(r.image ?? ""),
    stockQty: Number(r.stock_qty ?? 0),
    active: Boolean(r.active),
  };
}

/** Loads the live catalog from Supabase; falls back to the seed on any failure. */
export async function fetchProducts(): Promise<Product[]> {
  if (!supabase) return SEED_PRODUCTS;
  const { data, error } = await supabase
    .from("products")
    .select("*")
    .eq("active", true)
    .order("sort", { ascending: true });
  if (error || !data) {
    console.warn("[macyprints] catalog fetch failed, using seed:", error?.message);
    return SEED_PRODUCTS;
  }
  return data.map(rowToProduct);
}

/** "$24" / "$24.50" from cents */
export function formatPrice(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
