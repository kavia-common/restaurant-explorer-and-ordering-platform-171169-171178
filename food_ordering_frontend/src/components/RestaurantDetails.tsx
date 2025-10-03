"use client";

import { useMemo, useState } from "react";
import type { Restaurant } from "@/types";
import { useCart } from "@/context/CartContext";
import { useUI } from "@/context/UIContext";
import { api } from "@/services/api";

export function RestaurantDetails({ restaurant }: { restaurant: Restaurant | null }) {
  const { add, items, clear } = useCart();
  const { placingOrder, setPlacingOrder, showToast } = useUI();
  const [notes, setNotes] = useState<Record<string, string>>({});

  const restaurantItems = useMemo(
    () => items.filter((i) => i.restaurantId === (restaurant?.id ?? "")),
    [items, restaurant?.id]
  );

  if (!restaurant) {
    return (
      <div className="card p-6">
        <p className="text-gray-500">Select a restaurant to view details.</p>
      </div>
    );
  }

  const handlePlaceOrder = async () => {
    if (restaurantItems.length === 0) {
      showToast({ type: "error", message: "Add items to place an order." });
      return;
    }
    setPlacingOrder(true);
    try {
      const payload = {
        restaurantId: restaurant.id,
        items: restaurantItems.map((i) => ({
          id: i.item.id,
          qty: i.qty,
          notes: i.notes,
        })),
      };
      const res = await api.placeOrder(payload);
      if (res.ok) {
        clear();
        showToast({ type: "success", message: `Order placed: #${res.id}` });
      } else {
        showToast({ type: "error", message: "Failed to place order." });
      }
    } catch {
      showToast({ type: "error", message: "Network error placing order." });
    } finally {
      setPlacingOrder(false);
    }
  };

  return (
    <div className="space-y-4">
      <div className="card overflow-hidden">
        {restaurant.image && (
          <div
            className="h-40 w-full bg-cover bg-center"
            style={{ backgroundImage: `url(${restaurant.image})` }}
          />
        )}
        <div className="p-5 space-y-1">
          <h2 className="text-xl font-bold">{restaurant.name}</h2>
          <p className="text-sm text-gray-600">
            {restaurant.cuisines.join(" • ")} • {"$".repeat(restaurant.priceLevel)}
          </p>
          <div className="text-sm text-gray-600">
            ⭐ {restaurant.rating.toFixed(1)} ({restaurant.ratingCount}) • {restaurant.etaMinutes} min • $
            {restaurant.deliveryFee.toFixed(2)} fee
          </div>
        </div>
      </div>

      <div className="space-y-3">
        {restaurant.menu.sections.map((s) => (
          <div key={s.id} className="card">
            <div className="p-4 border-b border-gray-100">
              <h3 className="font-semibold">{s.name}</h3>
            </div>

            <ul className="divide-y divide-gray-100">
              {s.items.map((it) => (
                <li key={it.id} className="p-4 flex gap-3">
                  <div className="flex-1">
                    <div className="flex items-center gap-2">
                      <span className="font-medium">{it.name}</span>
                      {it.spicy && (
                        <span className="badge text-red-600 border-red-200 bg-red-50">Spicy</span>
                      )}
                      {it.vegetarian && (
                        <span className="badge text-green-700 border-green-200 bg-green-50">
                          Veg
                        </span>
                      )}
                    </div>
                    {it.description && (
                      <p className="text-sm text-gray-600 mt-1">{it.description}</p>
                    )}
                    <div className="mt-2 text-[var(--color-primary)] font-semibold">
                      ${it.price.toFixed(2)}
                    </div>
                    <div className="mt-2">
                      <input
                        placeholder="Add notes (optional)"
                        className="input"
                        value={notes[it.id] ?? ""}
                        onChange={(e) =>
                          setNotes((prev) => ({ ...prev, [it.id]: e.target.value }))
                        }
                      />
                    </div>
                  </div>
                  <div className="w-28 flex items-center justify-end">
                    <button
                      className="btn btn-primary"
                      onClick={() => add(restaurant.id, { ...it }, 1)}
                    >
                      Add
                    </button>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>

      <div className="card p-4">
        <div className="flex items-center justify-between">
          <div className="text-sm text-gray-600">
            Items in cart: <span className="font-semibold">{restaurantItems.length}</span>
          </div>
          <button
            className="btn btn-secondary"
            onClick={handlePlaceOrder}
            disabled={placingOrder}
          >
            {placingOrder ? "Placing..." : "Place Order"}
          </button>
        </div>
      </div>
    </div>
  );
}
