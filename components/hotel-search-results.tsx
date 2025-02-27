"use client"

import { useState, useEffect } from "react"
import { HotelList } from "./hotel-list"
import { MapView } from "./map-view"
import { supabase, isSupabaseInitialized } from "@/lib/supabase"

interface Product {
  id: string
  name: string
  base_price: number
  type: string
}

interface Hotel {
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

export function HotelSearchResults() {
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchHotels() {
      try {
        setLoading(true)
        console.log("Fetching hotels...")

        if (!isSupabaseInitialized) {
          throw new Error("Supabase client is not initialized. Check your environment variables.")
        }

        const { data: hotelsData, error: hotelsError } = await supabase
          .from("hotels")
          .select(
            "id, name, full_address, display_address, city, country, latitude, longitude, hotel_group, website, status, custom_note, card_image, updated_at",
          )
          .eq("status", "active")

        if (hotelsError) throw hotelsError

        const { data: productsData, error: productsError } = await supabase
          .from("products")
          .select("id, name, base_price, type, hotel_id")

        if (productsError) throw productsError

        const hotelsWithProducts = hotelsData
          .map((hotel: any) => {
            const hotelProducts = productsData.filter((product: any) => product.hotel_id === hotel.id)
            return {
              ...hotel,
              products: hotelProducts,
            }
          })
          .sort((a: any, b: any) => {
            return new Date(b.updated_at).getTime() - new Date(a.updated_at).getTime()
          })

        setHotels(hotelsWithProducts)
      } catch (error: any) {
        console.error("Error fetching hotels:", error)
        setError(error.message || "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchHotels()
  }, [])

  if (loading) {
    return <div className="flex justify-center items-center h-screen">Loading hotels...</div>
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center h-screen">
        <p className="text-red-500 mb-4">Error: {error}</p>
        <p className="text-sm text-gray-500">Please check the browser console for more details.</p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 bg-white overflow-y-auto">
        <HotelList hotels={hotels} selectedHotel={selectedHotel} onSelectHotel={setSelectedHotel} />
      </div>
      <div className="w-full lg:w-1/2 h-[500px] lg:h-screen sticky top-0">
        <MapView hotels={hotels} selectedHotel={selectedHotel} onSelectHotel={setSelectedHotel} />
      </div>
    </div>
  )
}

