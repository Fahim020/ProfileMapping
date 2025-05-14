export interface Profile {
  id: number;
  name: string;
  photo: string;
  description: string;
  address: string;
  coordinates: {
    lat: number;
    lng: number;
  };
  contactInfo?: {
    email?: string;
    phone?: string;
    website?: string;
  };
  interests?: string[];
}

export interface MapPosition {
  lat: number;
  lng: number;
}

export interface SearchFilters {
  name?: string;
  location?: string;
  interests?: string[];
} 