// Type definitions for coffee beans and API responses

export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  price: number;
  weight?: number;
  roastLevel?: string;
  origin?: string;
  process?: string;
  tastingNotes?: string[];
  image?: string;
  url: string;
  inStock: boolean;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html?: string;
  tags: string[];
  images: { src: string }[];
  variants: {
    id: number;
    title: string;
    price: string;
    available: boolean;
  }[];
}

export type SortOption = 'name' | 'price-low' | 'price-high' | 'roaster' | 'newest';
