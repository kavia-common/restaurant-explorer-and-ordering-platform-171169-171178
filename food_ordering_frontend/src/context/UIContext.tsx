"use client";

import { createContext, useContext, useState } from "react";

interface UIState {
  placingOrder: boolean;
  setPlacingOrder: (v: boolean) => void;
  toast: { type: "success" | "error"; message: string } | null;
  showToast: (t: UIState["toast"]) => void;
  hideToast: () => void;
}

const UIContext = createContext<UIState | null>(null);

/**
 * PUBLIC_INTERFACE
 * UIProvider: Basic UI state (order progress and lightweight toast).
 */
export function UIProvider({ children }: { children: React.ReactNode }) {
  const [placingOrder, setPlacingOrder] = useState(false);
  const [toast, setToast] = useState<UIState["toast"]>(null);

  const showToast: UIState["showToast"] = (t) => {
    setToast(t);
    setTimeout(() => setToast(null), 2400);
  };

  const hideToast = () => setToast(null);

  return (
    <UIContext.Provider
      value={{ placingOrder, setPlacingOrder, toast, showToast, hideToast }}
    >
      {children}
      {toast && (
        <div className="fixed bottom-4 left-1/2 -translate-x-1/2 z-50">
          <div
            className="card px-4 py-3 text-sm"
            style={{
              borderColor:
                toast.type === "success" ? "rgba(34,197,94,.3)" : "rgba(239,68,68,.3)",
            }}
          >
            <span
              className={
                toast.type === "success"
                  ? "text-green-600 font-medium"
                  : "text-red-600 font-medium"
              }
            >
              {toast.message}
            </span>
          </div>
        </div>
      )}
    </UIContext.Provider>
  );
}

/**
 * PUBLIC_INTERFACE
 * useUI: hook to access UI state.
 */
export function useUI() {
  const ctx = useContext(UIContext);
  if (!ctx) {
    throw new Error("useUI must be used within UIProvider");
  }
  return ctx;
}
