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
      profiles: {
        Row: {
          id: string
          first_name: string | null
          last_name: string | null
          phone_number: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          first_name?: string | null
          last_name?: string | null
          phone_number?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
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
          booking_date: string
          guest_count: {
            adults: number
            children: number
            infants: number
          }
          status: "upcoming" | "ongoing" | "completed" | "canceled"
          total_price: number
          check_in_code: string | null
          notes: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          hotel_id: string
          user_id: string
          product_id: string
          booking_date: string
          guest_count: {
            adults: number
            children: number
            infants: number
          }
          status: "upcoming" | "ongoing" | "completed" | "canceled"
          total_price?: number
          check_in_code?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          hotel_id?: string
          user_id?: string
          product_id?: string
          booking_date?: string
          guest_count?: {
            adults: number
            children: number
            infants: number
          }
          status?: "upcoming" | "ongoing" | "completed" | "canceled"
          total_price?: number
          check_in_code?: string | null
          notes?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      hotels: {
        Row: {
          id: string
          name: string
          description: string
          display_address: string
          city: string | null
          country: string
          latitude: number | null
          longitude: number | null
          contact_email: string | null
          contact_phone: string | null
          created_at: string
          updated_at: string
          amenities: any | null
          status: "active" | "inactive" | "pending" | string
          check_in: string | null
          check_out: string | null
          cancellation: string | null
          images: string[] | null
          facility_hours: any | null
          hotel_group: string | null
          full_address: string | null
          website: string | null
          custom_note: string | null
          card_image: string
        }
        Insert: {
          id?: string
          name: string
          description?: string
          display_address: string
          city?: string | null
          country?: string
          latitude?: number | null
          longitude?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
          amenities?: any | null
          status?: "active" | "inactive" | "pending" | string
          check_in?: string | null
          check_out?: string | null
          cancellation?: string | null
          images?: string[] | null
          facility_hours?: any | null
          hotel_group?: string | null
          full_address?: string | null
          website?: string | null
          custom_note?: string | null
          card_image: string
        }
        Update: {
          id?: string
          name?: string
          description?: string
          display_address?: string
          city?: string | null
          country?: string
          latitude?: number | null
          longitude?: number | null
          contact_email?: string | null
          contact_phone?: string | null
          created_at?: string
          updated_at?: string
          amenities?: any | null
          status?: "active" | "inactive" | "pending" | string
          check_in?: string | null
          check_out?: string | null
          cancellation?: string | null
          images?: string[] | null
          facility_hours?: any | null
          hotel_group?: string | null
          full_address?: string | null
          website?: string | null
          custom_note?: string | null
          card_image?: string
        }
      }
      products: {
        Row: {
          id: string
          name: string
          description: string | null
          type: string
          base_price: number
          max_capacity: number
          status: string
          hotel_id: string
          inclusions: any | null
          base_currency: string | null
          images: string[] | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          description?: string | null
          type: string
          base_price: number
          max_capacity: number
          status?: string
          hotel_id: string
          inclusions?: any | null
          base_currency?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          description?: string | null
          type?: string
          base_price?: number
          max_capacity?: number
          status?: string
          hotel_id?: string
          inclusions?: any | null
          base_currency?: string | null
          images?: string[] | null
          created_at?: string
          updated_at?: string
        }
      }
      availability: {
        Row: {
          id: string
          product_id: string
          date: string
          capacity: number
          price: number
          is_blocked: boolean | null
          status: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          date: string
          capacity: number
          price: number
          is_blocked?: boolean | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          date?: string
          capacity?: number
          price?: number
          is_blocked?: boolean | null
          status?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      cart_items: {
        Row: {
          id: string
          user_id: string
          product_id: string
          quantity: number
          total_price: number
          selected_date: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          product_id: string
          quantity: number
          total_price: number
          selected_date: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          product_id?: string
          quantity?: number
          total_price?: number
          selected_date?: string
          created_at?: string
          updated_at?: string
        }
      }
      product_pricing: {
        Row: {
          id: string
          product_id: string
          price_adult: number
          price_child: number
          price_infant: number
          discount_percentage: number | null
          currency: string | null
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          product_id: string
          price_adult: number
          price_child: number
          price_infant: number
          discount_percentage?: number | null
          currency?: string | null
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          product_id?: string
          price_adult?: number
          price_child?: number
          price_infant?: number
          discount_percentage?: number | null
          currency?: string | null
          created_at?: string
          updated_at?: string
        }
      }
      payments: {
        Row: {
          id: string
          user_id: string
          booking_id: string
          stripe_payment_id: string | null
          status: string
          amount: number
          currency: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          user_id: string
          booking_id: string
          stripe_payment_id?: string | null
          status?: string
          amount: number
          currency: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          user_id?: string
          booking_id?: string
          stripe_payment_id?: string | null
          status?: string
          amount?: number
          currency?: string
          created_at?: string
          updated_at?: string
        }
      }
    }
  }
}

