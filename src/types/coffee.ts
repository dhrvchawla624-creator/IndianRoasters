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