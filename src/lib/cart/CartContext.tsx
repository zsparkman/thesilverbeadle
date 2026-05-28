"use client";

import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";
import type { Product } from "@/data/products";

const STORAGE_KEY = "tsb_cart_v1";

export type CartLine = {
  slug: string;
  name: string;
  price: number;
  image: string;
  stone: string;
  quantity: number;
};

type CartState = {
  lines: CartLine[];
  isHydrated: boolean;
};

type CartActions = {
  addProduct: (p: Product, quantity?: number) => void;
  remove: (slug: string) => void;
  setQuantity: (slug: string, quantity: number) => void;
  clear: () => void;
};

type CartDerived = {
  count: number;
  subtotal: number;
};

const Ctx = createContext<(CartState & CartActions & CartDerived) | null>(null);

function readStored(): CartLine[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed.filter(
      (l): l is CartLine =>
        l && typeof l.slug === "string" && typeof l.quantity === "number",
    );
  } catch {
    return [];
  }
}

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [isHydrated, setIsHydrated] = useState(false);

  // Hydrate once from localStorage on the client.
  useEffect(() => {
    setLines(readStored());
    setIsHydrated(true);
  }, []);

  // Persist any time lines change post-hydration.
  useEffect(() => {
    if (!isHydrated) return;
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(lines));
    } catch {
      /* quota or private mode — ignore */
    }
  }, [lines, isHydrated]);

  const addProduct = useCallback((p: Product, quantity = 1) => {
    if (p.price == null || p.status === "sold") return;
    setLines((prev) => {
      const existing = prev.find((l) => l.slug === p.slug);
      if (existing) {
        // Every piece is one-of-a-kind — quantity is capped at 1.
        return prev;
      }
      return [
        ...prev,
        {
          slug: p.slug,
          name: p.name,
          price: p.price as number,
          image: p.image,
          stone: p.stone,
          quantity: Math.max(1, quantity),
        },
      ];
    });
  }, []);

  const remove = useCallback((slug: string) => {
    setLines((prev) => prev.filter((l) => l.slug !== slug));
  }, []);

  const setQuantity = useCallback((slug: string, quantity: number) => {
    setLines((prev) =>
      quantity <= 0
        ? prev.filter((l) => l.slug !== slug)
        : prev.map((l) => (l.slug === slug ? { ...l, quantity } : l)),
    );
  }, []);

  const clear = useCallback(() => setLines([]), []);

  const derived = useMemo<CartDerived>(() => {
    const count = lines.reduce((acc, l) => acc + l.quantity, 0);
    const subtotal = lines.reduce((acc, l) => acc + l.price * l.quantity, 0);
    return { count, subtotal };
  }, [lines]);

  const value = useMemo(
    () => ({
      lines,
      isHydrated,
      addProduct,
      remove,
      setQuantity,
      clear,
      ...derived,
    }),
    [lines, isHydrated, addProduct, remove, setQuantity, clear, derived],
  );

  return <Ctx.Provider value={value}>{children}</Ctx.Provider>;
}

export function useCart() {
  const v = useContext(Ctx);
  if (!v) throw new Error("useCart must be used within <CartProvider>");
  return v;
}
