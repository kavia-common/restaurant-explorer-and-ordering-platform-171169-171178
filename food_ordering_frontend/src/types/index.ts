export type PriceLevel = 1 | 2 | 3 | 4;

export interface MenuItem {
  id: string;
  name: string;
  description?: string;
  price: number;
  spicy?: boolean;
  vegetarian?: boolean;
  image?: string;
  tags?: string[];
}

export interface Restaurant {
  id: string;
  name: string;
  rating: number; // 0-5
  ratingCount: number;
  cuisines: string[];
  priceLevel: PriceLevel; // number of $ signs
  etaMinutes: number;
  deliveryFee: number;
  image?: string;
  shortDescription?: string;
  menu: {
    sections: {
      id: string;
      name: string;
      items: MenuItem[];
    }[];
  };
}

export interface CartItem {
  restaurantId: string;
  item: MenuItem;
  qty: number;
  notes?: string;
}

export interface OrderPayload {
  restaurantId: string;
  items: { id: string; qty: number; notes?: string }[];
  address?: string;
  paymentMethod?: "card" | "cod";
}
