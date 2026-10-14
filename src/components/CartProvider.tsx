"use client";

import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

export type CartLine = { key: string; name: string; price: number; qty: number };

type Ctx = {
  lines: CartLine[];
  count: number;
  total: number;
  open: boolean;
  setOpen: (v: boolean) => void;
  add: (name: string, price: number) => void;
  inc: (key: string) => void;
  dec: (key: string) => void;
  clear: () => void;
};

const CartCtx = createContext<Ctx | null>(null);

export function useCart() {
  const c = useContext(CartCtx);
  if (!c) throw new Error("useCart must be used inside CartProvider");
  return c;
}

export default function CartProvider({ children }: { children: ReactNode }) {
  const [lines, setLines] = useState<CartLine[]>([]);
  const [open, setOpen] = useState(false);

  const value = useMemo<Ctx>(() => {
    const add = (name: string, price: number) => {
      const key = `${name}|${price}`;
      setLines((ls) =>
        ls.some((l) => l.key === key)
          ? ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l))
          : [...ls, { key, name, price, qty: 1 }]
      );
    };
    const inc = (key: string) =>
      setLines((ls) => ls.map((l) => (l.key === key ? { ...l, qty: l.qty + 1 } : l)));
    const dec = (key: string) => {
      const next = lines
        .map((l) => (l.key === key ? { ...l, qty: l.qty - 1 } : l))
        .filter((l) => l.qty > 0);
      setLines(next);
      if (next.length === 0) setOpen(false);
    };
    const clear = () => {
      setLines([]);
      setOpen(false);
    };
    return {
      lines,
      count: lines.reduce((n, l) => n + l.qty, 0),
      total: lines.reduce((n, l) => n + l.qty * l.price, 0),
      open,
      setOpen,
      add,
      inc,
      dec,
      clear,
    };
  }, [lines, open]);

  return <CartCtx.Provider value={value}>{children}</CartCtx.Provider>;
}