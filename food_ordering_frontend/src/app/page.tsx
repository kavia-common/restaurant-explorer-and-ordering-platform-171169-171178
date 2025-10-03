"use client";

import { useEffect, useMemo, useState } from "react";
import { RestaurantCard } from "@/components/RestaurantCard";
import { SidebarFilters } from "@/components/SidebarFilters";
import { RestaurantDetails } from "@/components/RestaurantDetails";
import { CartBar } from "@/components/CartBar";
import { useCart } from "@/context/CartContext";
import { api } from "@/services/api";
import type { Restaurant } from "@/types";

export default function Home() {
  const { items } = useCart();
  const [restaurants, setRestaurants] = useState<Restaurant[]>([]);
  const [loading, setLoading] = useState(true);
  const [active, setActive] = useState<Restaurant | null>(null);
  const [query, setQuery] = useState("");
  const [cuisines, setCuisines] = useState<string[]>([]);
  const [rating, setRating] = useState<number>(0);
  const [priceLevel, setPriceLevel] = useState<number | null>(null);

  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const data = await api.getRestaurants();
        if (mounted) {
          setRestaurants(data);
          setActive(data[0] ?? null);
        }
      } finally {
        setLoading(false);
      }
    })();
    return () => {
      mounted = false;
    };
  }, []);

  const allCuisines = useMemo(() => {
    const s = new Set<string>();
    restaurants.forEach((r) => r.cuisines.forEach((c) => s.add(c)));
    return Array.from(s).sort();
  }, [restaurants]);

  const filtered = useMemo(() => {
    return restaurants.filter((r) => {
      const matchQuery =
        !query ||
        r.name.toLowerCase().includes(query.toLowerCase()) ||
        r.cuisines.some((c) => c.toLowerCase().includes(query.toLowerCase()));
      const matchCuisine =
        cuisines.length === 0 ||
        cuisines.every((c) => r.cuisines.includes(c));
      const matchRating = !rating || r.rating >= rating;
      const matchPrice =
        priceLevel == null || r.priceLevel === priceLevel;
      return matchQuery && matchCuisine && matchRating && matchPrice;
    });
  }, [restaurants, query, cuisines, rating, priceLevel]);

  return (
    <main className="container px-4 py-6 grid grid-cols-1 lg:grid-cols-12 gap-6">
      <aside className="lg:col-span-3 sidebar">
        <SidebarFilters
          allCuisines={allCuisines}
          selectedCuisines={cuisines}
          onCuisineChange={setCuisines}
          query={query}
          onQueryChange={setQuery}
          rating={rating}
          onRatingChange={setRating}
          priceLevel={priceLevel}
          onPriceChange={setPriceLevel}
        />
      </aside>

      <section className="lg:col-span-5 space-y-4" id="restaurants">
        <div className="flex items-end justify-between">
          <div>
            <h1 className="text-2xl font-bold tracking-tight">
              Nearby Restaurants
            </h1>
            <p className="text-sm text-gray-500">
              Explore our curated list and start your order.
            </p>
          </div>
          <div className="hidden md:flex items-center gap-2">
            <span className="badge">{filtered.length} results</span>
          </div>
        </div>

        {loading ? (
          <div className="card p-6">
            <p className="text-gray-500">Loading restaurants...</p>
          </div>
        ) : filtered.length === 0 ? (
          <div className="card p-6">
            <p className="text-gray-500">
              No restaurants match your filters. Try adjusting them.
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {filtered.map((r) => (
              <RestaurantCard
                key={r.id}
                restaurant={r}
                active={active?.id === r.id}
                onClick={() => setActive(r)}
              />
            ))}
          </div>
        )}
      </section>

      <section className="lg:col-span-4 space-y-4" id="order">
        <RestaurantDetails restaurant={active} />
      </section>

      <div className="lg:col-span-12">
        <CartBar itemCount={items.length} />
      </div>
    </main>
  );
}
