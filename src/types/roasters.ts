export interface RoasterData {
  name: string;
  city: string;
  state: string;
  website: string;
  established?: number;
  specialties?: string[];
  collections: string[];
  description?: string;
}

export interface LocationData {
  state: string;
  cities: string[];
  roasterCount: number;
}