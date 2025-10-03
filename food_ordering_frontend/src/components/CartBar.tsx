"use client";

import { useCart } from "@/context/CartContext";

export function CartBar({ itemCount }: { itemCount: number }) {
  const { items, total, updateQty, remove, clear } = useCart();

  return (
    <div className="cart-bar card rounded-none px-4 py-3">
      <div className="container flex flex-col md:flex-row md:items-center gap-3">
        <div className="flex-1 text-sm text-gray-600">
          <span className="font-semibold">{itemCount}</span> item{itemCount === 1 ? "" : "s"} in
          cart • <span className="font-semibold">${total.toFixed(2)}</span> total
        </div>

        <div className="flex-1 overflow-x-auto">
          <div className="flex gap-3 min-w-max">
            {items.map((c) => (
              <div key={c.item.id} className="card px-3 py-2 flex items-center gap-3">
                <span className="text-sm font-medium">{c.item.name}</span>
                <div className="flex items-center gap-2">
                  <button
                    className="btn btn-ghost border border-gray-200"
                    onClick={() => updateQty(c.item.id, c.qty - 1)}
                    aria-label={`Decrease ${c.item.name}`}
                  >
                    −
                  </button>
                  <input
                    aria-label={`${c.item.name} quantity`}
                    className="input w-14 text-center"
                    type="number"
                    value={c.qty}
                    onChange={(e) => {
                      const v = parseInt(e.target.value || "0", 10);
                      updateQty(c.item.id, Number.isFinite(v) ? v : c.qty);
                    }}
                    min={0}
                  />
                  <button
                    className="btn btn-ghost border border-gray-200"
                    onClick={() => updateQty(c.item.id, c.qty + 1)}
                    aria-label={`Increase ${c.item.name}`}
                  >
                    +
                  </button>
                </div>
                <button
                  className="text-xs text-red-600"
                  onClick={() => remove(c.item.id)}
                >
                  Remove
                </button>
              </div>
            ))}
          </div>
        </div>

        <div className="flex items-center gap-2">
          <button className="btn btn-ghost border border-gray-200" onClick={clear}>
            Clear
          </button>
          <a className="btn btn-primary" href="#order">
            Checkout
          </a>
        </div>
      </div>
    </div>
  );
}
