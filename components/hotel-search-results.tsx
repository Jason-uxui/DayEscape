"use client"

import { useState, useEffect } from "react"
import { HotelList } from "./hotel-list"
import { MapView } from "./map-view"
import { supabase, isSupabaseInitialized } from "@/lib/supabase"
import { useSearchParams } from "next/navigation"
import { format, parse, isValid } from "date-fns"

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
  const searchParams = useSearchParams()
  const locationParam = searchParams.get('location')
  const dateParam = searchParams.get('date')
  
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchInfo, setSearchInfo] = useState<{location: string | null; date: Date | null}>({
    location: locationParam,
    date: dateParam ? parse(dateParam, 'yyyy-MM-dd', new Date()) : null
  })

  // Filter hotels based on search parameters
  useEffect(() => {
    if (hotels.length === 0) return
    
    let filtered = [...hotels]
    
    // Filter by location if provided
    if (searchInfo.location) {
      const locationLower = searchInfo.location.toLowerCase()
      filtered = filtered.filter(hotel => 
        hotel.city.toLowerCase().includes(locationLower) || 
        hotel.country.toLowerCase().includes(locationLower) ||
        hotel.full_address.toLowerCase().includes(locationLower) ||
        hotel.display_address.toLowerCase().includes(locationLower)
      )
    }
    
    // Could add date filtering logic here if needed
    // Currently we just store the date for display purposes
    
    setFilteredHotels(filtered)
  }, [hotels, searchInfo])

  // Update search info when URL changes
  useEffect(() => {
    const newLocation = searchParams.get('location')
    const newDateStr = searchParams.get('date')
    let newDate: Date | null = null
    
    if (newDateStr) {
      const parsedDate = parse(newDateStr, 'yyyy-MM-dd', new Date())
      if (isValid(parsedDate)) {
        newDate = parsedDate
      }
    }
    
    setSearchInfo({
      location: newLocation,
      date: newDate
    })
  }, [searchParams])

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

  // Display search info if available
  const renderSearchInfo = () => {
    if (!searchInfo.location && !searchInfo.date) return null
    
    return (
      <div className="bg-[#f0f9ff] p-4 mb-4 rounded-lg">
        <h2 className="text-lg font-medium text-[#0c363e] mb-2">Search Results</h2>
        {searchInfo.location && (
          <p className="text-[#4f4f4f]">
            <span className="font-medium">Location:</span> {searchInfo.location}
          </p>
        )}
        {searchInfo.date && (
          <p className="text-[#4f4f4f]">
            <span className="font-medium">Date:</span> {format(searchInfo.date, 'dd/MM/yyyy')}
          </p>
        )}
        <p className="mt-2 text-sm text-[#4f4f4f]">
          Found {filteredHotels.length} matching hotels
        </p>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      <div className="w-full lg:w-1/2 bg-white overflow-y-auto p-4">
        {renderSearchInfo()}
        <HotelList 
          hotels={filteredHotels.length > 0 ? filteredHotels : hotels} 
          selectedHotel={selectedHotel} 
          onSelectHotel={setSelectedHotel} 
        />
      </div>
      <div className="w-full lg:w-1/2 h-[500px] lg:h-screen sticky top-0">
        <MapView 
          hotels={filteredHotels.length > 0 ? filteredHotels : hotels} 
          selectedHotel={selectedHotel} 
          onSelectHotel={setSelectedHotel} 
        />
      </div>
    </div>
  )
}

