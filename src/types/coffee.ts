export type SortOption = 'newest' | 'name' | 'price-low' | 'price-high' | 'roaster';

export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  origin?: string;
  price: number;
  weight?: number;
  roastLevel?: string;
  process?: string;
  tastingNotes: string[];
  image?: string;
  url: string;
  inStock: boolean;
}

export interface CoffeeApiResponse {
  data: CoffeeBean[];
  lastUpdate: string;
}

export interface ShopifyProduct {
  id: number;
  title: string;
  handle: string;
  body_html: string;
  tags: string[] | string;
  variants: {
    id: number;
    price: string;
    available: boolean;
    title: string;
  }[];
  images: {
    src: string;
  }[];
}