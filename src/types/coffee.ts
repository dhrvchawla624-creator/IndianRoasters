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
  fetchDate?: string; // ISO timestamp of when bean was fetched by our system
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
  published_at?: string; // ISO timestamp of when product was published
  created_at?: string; // ISO timestamp of when product was created
}

export type SortOption = 'name' | 'price-low' | 'price-high' | 'roaster' | 'newest';
