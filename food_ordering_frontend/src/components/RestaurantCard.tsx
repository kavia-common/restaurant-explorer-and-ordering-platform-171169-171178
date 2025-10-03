"use client";

import type { Restaurant } from "@/types";

export function RestaurantCard({
  restaurant,
  onClick,
  active,
}: {
  restaurant: Restaurant;
  onClick: () => void;
  active?: boolean;
}) {
  return (
    <button
      onClick={onClick}
      className={`card text-left overflow-hidden hover:shadow-md transition ${active ? "ring-2 ring-[var(--color-primary)]" : ""}`}
    >
      {restaurant.image && (
        <div
          className="h-36 w-full bg-cover bg-center"
          style={{ backgroundImage: `url(${restaurant.image})` }}
          role="img"
          aria-label={`${restaurant.name} cover`}
        />
      )}
      <div className="p-4 space-y-2">
        <div className="flex items-start justify-between">
          <div>
            <h3 className="font-semibold text-lg">{restaurant.name}</h3>
            <p className="text-sm text-gray-500">
              {restaurant.cuisines.join(" • ")}
            </p>
          </div>
          <span className="badge" aria-label={`Rating ${restaurant.rating}`}>
            ⭐ {restaurant.rating.toFixed(1)}
          </span>
        </div>
        <div className="flex items-center gap-3 text-sm text-gray-600">
          <span>{"$".repeat(restaurant.priceLevel)}</span>
          <span>•</span>
          <span>{restaurant.etaMinutes} min</span>
          <span>•</span>
          <span>${restaurant.deliveryFee.toFixed(2)} fee</span>
        </div>
        {restaurant.shortDescription && (
          <p className="text-sm text-gray-600 line-clamp-2">
            {restaurant.shortDescription}
          </p>
        )}
      </div>
    </button>
  );
}
