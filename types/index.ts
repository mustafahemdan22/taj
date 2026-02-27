// src/types/index.ts

// =====================
// 🔹 Product Type
// =====================
export interface Product {
  _id: string;
  id: string;
  name: string;
  nameEn?: string;
  price: number;
  image: string;
  images?: string[];       // صور إضافية للمنتج
  category: string;
  brand?: string;
  unit?: string;
  description?: string;
  descriptionEn?: string;
  stock?: number;
  compareAtPrice?: number;  // السعر قبل الخصم
  discount?: number;        // نسبة الخصم
  tags?: string[];          // ['حلال', 'عضوي']
  rating?: number;
  reviews?: number;
}

// =====================
// 🔹 Cart Types
// =====================
export interface CartItem {
  product: Product;
  quantity: number;
}

export interface CartState {
  items: CartItem[];
  total: number;
  subtotal: number;
  itemCount: number;
  discount: number;
  deliveryFee: number;
  appliedCoupon?: string;
}

// =====================
// 🔹 Sorting Enum
// =====================
export enum SortOption {
  NEWEST = "newest",
  PRICE_LOW = "price-low",
  PRICE_HIGH = "price-high",
  RATING = "rating",
}