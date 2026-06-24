import { createContext, useCallback, useContext, useEffect, useState, type ReactNode } from "react";
import { fetchProducts, type Product } from "../data/products";

interface CatalogCtx {
  products: Product[];
  loading: boolean;
  getProduct: (id: string) => Product | undefined;
  reload: () => Promise<void>;
}

const Ctx = createContext<CatalogCtx | null>(null);

export function CatalogProvider({ children }: { children: ReactNode }) {
  const [products, setProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);

  const reload = useCallback(async () => {
    setLoading(true);
    const list = await fetchProducts();
    setProducts(list);
    setLoading(false);
  }, []);

  useEffect(() => {
    reload();
  }, [reload]);

  const getProduct = useCallback((id: string) => products.find((p) => p.id === id), [products]);

  return <Ctx.Provider value={{ products, loading, getProduct, reload }}>{children}</Ctx.Provider>;
}

export function useCatalog() {
  const ctx = useContext(Ctx);
  if (!ctx) throw new Error("useCatalog must be used within CatalogProvider");
  return ctx;
}
