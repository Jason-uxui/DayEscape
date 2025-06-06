"use client"

import { useState, useEffect, Suspense } from "react"
import { HotelList } from "./hotel-list"
import { MapView } from "./map-view"
import { supabase, isSupabaseInitialized } from "@/lib/supabase"
import { useSearchParams, useRouter } from "next/navigation"
import { format, parse, isValid } from "date-fns"
import { ComingSoonCard } from "./coming-soon-card"
import { Button } from "@/components/ui/button"
import { ArrowLeft, CheckCircle, Map, List } from "lucide-react"
import { Input } from "@/components/ui/input"

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

// Separated the content that uses useSearchParams
function HotelSearchResultsContent() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const locationParam = searchParams.get('location')
  const dateParam = searchParams.get('date')

  const [hotels, setHotels] = useState<Hotel[]>([])
  const [filteredHotels, setFilteredHotels] = useState<Hotel[]>([])
  const [selectedHotel, setSelectedHotel] = useState<string | null>(null)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [searchInfo, setSearchInfo] = useState<{ location: string | null; date: Date | null }>({
    location: locationParam,
    date: dateParam ? parse(dateParam, 'yyyy-MM-dd', new Date()) : null
  })
  const [isLocationOutsideBrisbane, setIsLocationOutsideBrisbane] = useState(false)
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)
  const [activeView, setActiveView] = useState<'list' | 'map'>('list') // Default to list view on mobile

  // Filter hotels based on search parameters
  useEffect(() => {
    if (hotels.length === 0) return

    let filtered = [...hotels]

    // Filter by location if provided
    if (searchInfo.location) {
      const locationLower = searchInfo.location.toLowerCase()

      // Check if location is Brisbane
      const isBrisbaneSearch = locationLower.includes('brisbane')
      setIsLocationOutsideBrisbane(!isBrisbaneSearch)

      // If not Brisbane, return empty results
      if (!isBrisbaneSearch) {
        setFilteredHotels([])
        return
      }

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
            "id, name, full_address, display_address, city, country, latitude, longitude, hotel_group, website, status, custom_note, card_image, updated_at, images",
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

  // Display Coming Soon for non-Brisbane locations
  if (isLocationOutsideBrisbane && searchInfo.location) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] p-8 bg-white">
        <div className="max-w-md w-full bg-white p-8 rounded-xl shadow-sm border border-gray-100">
          {isSuccess ? (
            <div className="text-center">
              <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
              <h3 className="text-2xl font-semibold text-[#0c363e] mb-4">Thank you!</h3>
              <p className="text-[#4f4f4f]">
                We'll notify you when new experiences are added to {searchInfo.location}.
              </p>

              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-[#4f4f4f] mb-4">
                  Want to try our available locations?
                </p>
                <Button
                  className="w-full bg-[#f6ddb8] text-[#0c363e] hover:bg-[#f6ddb8]/90"
                  onClick={() => router.push('/hotels?location=Brisbane&date=' + (dateParam || ''))}
                >
                  Explore Brisbane
                </Button>
              </div>
            </div>
          ) : (
            <>
              {/* Flodesk script trigger */}
              {/* eslint-disable-next-line react-hooks/rules-of-hooks */}
              {typeof window !== "undefined" && (
                (() => {
                  setTimeout(() => {
                    if ((window as any).fd && document.getElementById("fd-form-68076a402a2e13a96598f741")) {
                      (window as any).fd('form', {
                        formId: '68076a402a2e13a96598f741',
                        containerEl: '#fd-form-68076a402a2e13a96598f741'
                      });
                    }
                  }, 0);
                  return null;
                })()
              )}

              <h2 className="text-2xl font-bold text-[#0c363e] mb-4">
                {searchInfo.location} is coming soon!
              </h2>
              <p className="text-[#4f4f4f] mb-0">
                We're currently expanding. Leave your email to be the first to know when new experiences are added to {searchInfo.location}.
              </p>
              <div id="fd-form-68076a402a2e13a96598f741" className="mt-1"></div>
              <div className="mt-8 pt-6 border-t border-gray-100">
                <p className="text-sm text-[#4f4f4f] mb-4">
                  Want to try our available locations?
                </p>
                <Button
                  className="w-full bg-[#f6ddb8] text-[#0c363e] hover:bg-[#f6ddb8]/90"
                  onClick={() => router.push('/hotels?location=Brisbane&date=' + (dateParam || ''))}
                >
                  Explore Brisbane
                </Button>
              </div>
            </>
          )}
        </div>
      </div>
    )
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen">
      {/* Mobile View Toggle */}
      <div className="sticky top-0 z-20 flex lg:hidden bg-[#fdfaf5] p-3">
        <div className="w-full flex rounded-lg overflow-hidden bg-black/[0.03]">
          <button
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-lg ${activeView === 'list' ? 'bg-white text-[#0c363e] shadow-sm' : 'bg-transparent text-[#6B7280]'}`}
            onClick={() => setActiveView('list')}
          >
            <List className="h-4 w-4" />
            <span>List</span>
          </button>
          <button
            className={`flex-1 py-3 px-4 flex items-center justify-center gap-2 rounded-lg ${activeView === 'map' ? 'bg-white text-[#0c363e] shadow-sm' : 'bg-transparent text-[#6B7280]'}`}
            onClick={() => setActiveView('map')}
          >
            <Map className="h-4 w-4" />
            <span>Map</span>
          </button>
        </div>
      </div>

      {/* List View Content */}
      <div className={`w-full lg:w-3/5 bg-white p-0 ${activeView === 'list' ? 'block' : 'hidden lg:block'}`}>
        <HotelList
          hotels={filteredHotels.length > 0 ? filteredHotels : hotels}
          selectedHotel={selectedHotel}
          onSelectHotel={setSelectedHotel}
        />
      </div>

      {/* Map View Content */}
      <div className={`w-full lg:w-2/5 lg:h-screen lg:sticky lg:top-0 ${activeView === 'map' ? 'block' : 'hidden lg:block'}`}>
        <MapView
          hotels={filteredHotels.length > 0 ? filteredHotels : hotels}
          selectedHotel={selectedHotel}
          onSelectHotel={setSelectedHotel}
        />
      </div>
    </div>
  )
}

// Main component that wraps the content with Suspense
export function HotelSearchResults() {
  return (
    <Suspense fallback={<div className="flex justify-center items-center h-screen">Loading hotels...</div>}>
      <HotelSearchResultsContent />
    </Suspense>
  )
}
