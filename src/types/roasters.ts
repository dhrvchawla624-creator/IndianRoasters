export interface RoasterData {
  name: string;
  city: string;
  state: string;
  website: string;
  collections: string[];
  description: string;
  specialties: string[];
  established: string;
}

export interface LocationData {
  state: string;
  cities: string[];
  roasterCount: number;
}
