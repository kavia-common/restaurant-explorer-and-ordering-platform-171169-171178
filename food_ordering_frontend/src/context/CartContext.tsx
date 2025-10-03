"use client";

import { createContext, useContext, useMemo, useState } from "react";
import type { CartItem, MenuItem } from "@/types";

interface CartState {
  items: CartItem[];
  add: (restaurantId: string, item: MenuItem, qty?: number) => void;
  remove: (id: string) => void;
  updateQty: (id: string, qty: number) => void;
  clear: () => void;
  total: number;
}

const CartContext = createContext<CartState | null>(null);

/**
 * PUBLIC_INTERFACE
 * CartProvider: application-wide cart state with helpers to mutate items.
 */
export function CartProvider({ children }: { children: React.ReactNode }) {
  const [items, setItems] = useState<CartItem[]>([]);

  const total = useMemo(
    () => items.reduce((sum, c) => sum + c.item.price * c.qty, 0),
    [items]
  );

  const add = (restaurantId: string, item: MenuItem, qty: number = 1) => {
    setItems((prev) => {
      const existing = prev.find((p) => p.item.id === item.id);
      if (existing) {
        return prev.map((p) =>
          p.item.id === item.id ? { ...p, qty: p.qty + qty } : p
        );
      }
      return [...prev, { restaurantId, item, qty }];
    });
  };

  const remove = (id: string) => {
    setItems((prev) => prev.filter((p) => p.item.id !== id));
  };

  const updateQty = (id: string, qty: number) => {
    setItems((prev) =>
      prev
        .map((p) => (p.item.id === id ? { ...p, qty } : p))
        .filter((p) => p.qty > 0)
    );
  };

  const clear = () => setItems([]);

  const value = useMemo(
    () => ({ items, add, remove, updateQty, clear, total }),
    [items, total]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

/**
 * PUBLIC_INTERFACE
 * useCart: hook to access cart state.
 */
export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) {
    throw new Error("useCart must be used within CartProvider");
  }
  return ctx;
}
