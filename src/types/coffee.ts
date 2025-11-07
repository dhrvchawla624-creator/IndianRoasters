// Type definitions for coffee beans and API responses

export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  price: number; // Price should be a required number as it's parsed in the fetcher
  weight?: number;
  roastLevel?: string;
  origin?: string;
  process?: string;
  tastingNotes?: string[];  // Made optional to match API
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
