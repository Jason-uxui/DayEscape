export interface Amenity {
  id: string;
  name: string;
  icon: string;
  created_at: string | null;
  description: string | null;
}

export interface HotelAmenity {
  id: string;
  hotel_id: string;
  amenity_id: string;
  order: number;
}
