export interface FacilityHours {
  pool?: string
  restaurant?: {
    breakfast?: string
    lunch?: string
    dinner?: string
  }
  [key: string]: any
}

export interface HotelKeyInfo {
  check_in: string
  check_out: string
  facility_hours: FacilityHours
  cancellation_policy: string
  custom_note?: string
}

export interface Product {
  id: string
  name: string
  base_price: number
  type: string
}

export interface Hotel {
  id: string
  name: string
  full_address: string
  display_address: string
  city: string
  country: string
  latitude: number
  longitude: number
  hotel_group?: string
  website?: string
  status: string
  custom_note?: string
  card_image?: string
  updated_at: string
  products: Product[]
}

