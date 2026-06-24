import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";
import { useCatalog } from "./catalog";
import type { Product } from "../data/products";

export interface CartLine {
  id: string;
  qty: number;
}

interface CartCtx {
  lines: CartLine[];
  count: number;
  add: (id: string, qty?: number) => void;
  remove: (id: string) => void;
  setQty: (id: string, qty: number) => void;
  clear: () => void;
  open: boolean;
  setOpen: (v: boolean) => void;
}

const Ctx = createContext<CartCtx | null>(null);
const STORAGE_KEY = "macyprints.cart";

export function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>(() => {
    try {
      return JSON.parse(localStorage.getItem(STORAGE_KEY) ?? "[]");
    } catch {
      return [];
    }
  });
  const [open, setOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
  }, [lines]);

  function add(id: string, qty = 1) {
    setLines((prev) => {
      const found = prev.find((l) => l.id === id);
      if (found) return prev.map((l) => (l.id === id ? { ...l, qty: l.qty + qty } : l));
      return [...prev, { id, qty }];
    });
    setOpen(true);
  }
  function remove(id: string) {
    setLines((prev) => prev.filter((l) => l.id !== id));
  }
  function setQty(id: string, qty: number) {
    if (qty <= 0) return remove(id);
    setLines((prev) => prev.map((l) => (l.id === id ? { ...l, qty } : l)));
  }
  function clear() {
    setLines([]);
  }

  const count = lines.reduce((n, l) => n + l.qty, 0);

  return (
    <Ctx.Provider value={{ lines, count, add, remove, setQty, clear, open, setOpen }}>
      {children}
    </Ctx.Provider>
  );
}

export function useCart() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCart must be used within CartProvider");
  return ctx;
}

/** Resolves cart lines against the live catalog -> line items + subtotal. */
export function useCartDetails(): { items: { product: Product; qty: number }[]; totalCents: number } {
  const { lines } = useCart();
  const { getProduct } = useCatalog();
  return useMemo(() => {
    const items = lines
      .map((l) => {
        const product = getProduct(l.id);
        return product ? { product, qty: l.qty } : null;
      })
      .filter((x): x is { product: Product; qty: number } => x !== null);
    const totalCents = items.reduce((n, i) => n + i.product.priceCents * i.qty, 0);
    return { items, totalCents };
  }, [lines, getProduct]);
}
