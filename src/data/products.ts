import raw from "../../shared/products.json";

export interface Product {
  id: string;
  name: string;
  blurb: string;
  priceCents: number;
  currency: string;
  badge?: string;
  material: string;
  size: string;
  /** base tint used to render the layer-line placeholder until a real photo exists */
  tint: string;
  colorChips: string[];
  /** real photo URL (e.g. /products/wobble-cat.jpg). Empty = show placeholder. */
  image: string;
}

export const PRODUCTS: Product[] = raw as Product[];

export function getProduct(id: string): Product | undefined {
  return PRODUCTS.find((p) => p.id === id);
}

/** "$24.00" from cents */
export function formatPrice(cents: number, currency = "usd"): string {
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: currency.toUpperCase(),
    minimumFractionDigits: cents % 100 === 0 ? 0 : 2,
  }).format(cents / 100);
}
