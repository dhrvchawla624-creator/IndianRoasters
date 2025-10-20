export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  price: number;
  currency: string;
  weight: string;
  roastLevel?: string;
  origin?: string;
  process?: string;
  tastingNotes?: string[];
  image: string;
  url: string;
  inStock: boolean;
}

export type SortOption = 'name' | 'price-low' | 'price-high' | 'roaster';
