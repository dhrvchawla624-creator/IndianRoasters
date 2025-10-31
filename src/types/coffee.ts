export type SortOption = 'name' | 'price-low' | 'price-high' | 'roaster' | 'newest';

export interface CoffeeBean {
  id: string;
  name: string;
  roaster: string;
  origin?: string;
  roastLevel?: string;
  process?: string;
  tastingNotes?: string[];
  price: number;
  weight: number;
  imageUrl: string;
  productUrl: string;
  inStock: boolean;
  description?: string;
}