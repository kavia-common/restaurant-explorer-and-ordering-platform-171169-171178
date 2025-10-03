"use client";

import { CartProvider } from "@/context/CartContext";
import { UIProvider } from "@/context/UIContext";

/**
 * PUBLIC_INTERFACE
 * ClientProviders: Wraps client-side context providers.
 */
export function ClientProviders({ children }: { children: React.ReactNode }) {
  return (
    <UIProvider>
      <CartProvider>{children}</CartProvider>
    </UIProvider>
  );
}
