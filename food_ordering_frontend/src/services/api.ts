import type { OrderPayload, Restaurant } from "@/types";

/**
 * PUBLIC_INTERFACE
 * api: client for backend REST calls. Falls back to local dummy data if backend is unavailable.
 */
export const api = {
  async getRestaurants(): Promise<Restaurant[]> {
    // Try backend (placeholder) else fallback
    try {
      const res = await fetch(
        process.env.NEXT_PUBLIC_API_BASE
          ? `${process.env.NEXT_PUBLIC_API_BASE}/restaurants`
          : "/api/restaurants", // if route exists
        { next: { revalidate: 30 } }
      );
      if (res.ok) {
        return (await res.json()) as Restaurant[];
      }
    } catch {
      // ignore
    }
    return DUMMY_RESTAURANTS;
  },

  async getRestaurant(id: string): Promise<Restaurant | null> {
    const list = await this.getRestaurants();
    return list.find((r) => r.id === id) ?? null;
  },

  async placeOrder(payload: OrderPayload): Promise<{ ok: boolean; id: string }> {
    // Simulate network latency
    await new Promise((r) => setTimeout(r, 650));
    // touch payload to satisfy no-unused-vars without introducing temps
    JSON.stringify(payload);
    // In real world, call backend:
    // const res = await fetch(`${API}/orders`, { method: 'POST', body: JSON.stringify(payload) })
    return { ok: true, id: `ord_${Math.random().toString(36).slice(2, 10)}` };
  },
};

const DUMMY_RESTAURANTS: Restaurant[] = [
  {
    id: "sea-breeze-bistro",
    name: "Sea Breeze Bistro",
    rating: 4.6,
    ratingCount: 890,
    cuisines: ["Seafood", "Mediterranean"],
    priceLevel: 3,
    etaMinutes: 35,
    deliveryFee: 2.99,
    image:
      "https://images.unsplash.com/photo-1544025162-d76694265947?q=80&w=1200&auto=format&fit=crop",
    shortDescription:
      "Fresh catches, coastal flavors, and vibrant plates inspired by the ocean.",
    menu: {
      sections: [
        {
          id: "popular",
          name: "Popular",
          items: [
            {
              id: "grilled-salmon",
              name: "Grilled Salmon",
              description: "Served with lemon butter and seasonal veggies",
              price: 18.5,
              tags: ["Gluten-free"],
            },
            {
              id: "shrimp-tacos",
              name: "Shrimp Tacos",
              description: "Three tacos with pico, slaw, and chipotle crema",
              price: 13.0,
              spicy: true,
            },
          ],
        },
        {
          id: "sides",
          name: "Sides",
          items: [
            {
              id: "garlic-fries",
              name: "Garlic Fries",
              description: "Crispy fries tossed with garlic and parsley",
              price: 5.0,
              vegetarian: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: "amber-spice-kitchen",
    name: "Amber Spice Kitchen",
    rating: 4.8,
    ratingCount: 1205,
    cuisines: ["Indian", "Vegetarian"],
    priceLevel: 2,
    etaMinutes: 25,
    deliveryFee: 1.99,
    image:
      "https://images.unsplash.com/photo-1596797038530-2c107229f494?q=80&w=1200&auto=format&fit=crop",
    shortDescription:
      "Vibrant Indian flavors with a modern twist, lots of veg options.",
    menu: {
      sections: [
        {
          id: "mains",
          name: "Mains",
          items: [
            {
              id: "butter-chicken",
              name: "Butter Chicken",
              description: "Creamy tomato gravy, tender chicken",
              price: 14.0,
            },
            {
              id: "palak-paneer",
              name: "Palak Paneer",
              description: "Spinach and cottage cheese curry",
              price: 12.0,
              vegetarian: true,
            },
          ],
        },
        {
          id: "breads",
          name: "Breads",
          items: [
            {
              id: "garlic-naan",
              name: "Garlic Naan",
              price: 3.5,
              vegetarian: true,
            },
          ],
        },
      ],
    },
  },
  {
    id: "harbor-sushi",
    name: "Harbor Sushi",
    rating: 4.4,
    ratingCount: 560,
    cuisines: ["Japanese", "Sushi"],
    priceLevel: 3,
    etaMinutes: 30,
    deliveryFee: 2.49,
    image:
      "https://images.unsplash.com/photo-1562158075-4a964160phpf?q=80&w=1200&auto=format&fit=crop",
    shortDescription: "Classic rolls and sashimi from the harbor masters.",
    menu: {
      sections: [
        {
          id: "rolls",
          name: "Rolls",
          items: [
            {
              id: "california-roll",
              name: "California Roll",
              price: 8.5,
            },
            {
              id: "spicy-tuna",
              name: "Spicy Tuna Roll",
              price: 9.5,
              spicy: true,
            },
          ],
        },
      ],
    },
  },
];
