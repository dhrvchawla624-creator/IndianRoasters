export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  price?: number;
  currency?: string;
  weight?: string;
  roastLevel?: string;
  origin?: string;
  process?: string;
  tastingNotes?: string[];
  image?: string;
  url: string;
  inStock?: boolean;
}
export interface ShopifyProduct {
  id: number;
  title: string;
  tags: string[];
  images: { src: string }[];
  handle: string;
  body_html?: string;
  variants: ShopifyVariant[];
}
export interface ShopifyVariant {
  price: string;
  available: boolean;
  title: string;
}