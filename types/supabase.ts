export interface Database {
  public: {
    Tables: {
      user_profiles: {
        Row: {
          id: string
          user_id: string
          first_name: string | null
          last_name: string | null
          phone_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      bookings: {
        Row: {
          id: string
          hotel_id: string
          user_id: string
          product_id: string
          check_in_date: string
          status: "upcoming" | "ongoing" | "completed" | "canceled"
          guest_count: {
            adults: number
            children: number
            infants: number
          }
          created_at: string
        }
        Insert: {
          id?: string
          hotel_id: string
          user_id: string
          product_id: string
          check_in_date: string
          status: "upcoming" | "ongoing" | "completed" | "canceled"
          guest_count: {
            adults: number
            children: number
            infants: number
          }
          created_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string
          user_id?: string
          product_id?: string
          check_in_date?: string
          status?: "upcoming" | "ongoing" | "completed" | "canceled"
          guest_count?: {
            adults: number
            children: number
            infants: number
          }
          created_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          name: string
          card_image: string
          display_address: string
        }
        Insert: {
          id?: string
          name: string
          card_image: string
          display_address: string
        }
        Update: {
          id?: string
          name?: string
          card_image?: string
          display_address?: string
        }
      }
    }
  }
}

