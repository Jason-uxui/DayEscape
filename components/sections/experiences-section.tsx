"use client"

import { useEffect, useState } from "react"
import { Bookmark, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { supabase } from "@/lib/supabase"
import Image from "next/image"
import { ComingSoonCard } from "@/components/coming-soon-card"
import { useRouter } from "next/navigation"
import Link from "next/link"

interface Hotel {
  id: string
  name: string
  display_address: string
  card_image: string
  city: string
  products: {
    id: string
    name: string
    base_price: number
    type: string
  }[]
}

export function ExperiencesSection() {
  const [cities, setCities] = useState<string[]>([])
  const [hotels, setHotels] = useState<Hotel[]>([])
  const [selectedCity, setSelectedCity] = useState<string>("")
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const router = useRouter()

  useEffect(() => {
    async function fetchData() {
      setLoading(true)
      setError(null)
      try {
        // Fetch unique cities
        const { data: citiesData, error: citiesError } = await supabase
          .from("hotels")
          .select("city")
          .not("city", "is", null)
          .order("city")

        if (citiesError) {
          console.error("Error fetching cities:", citiesError)
          setError("Không thể tải dữ liệu thành phố. Vui lòng thử lại sau.")
          setLoading(false)
          return
        }

        // Filter out null values and get unique cities
        const validCities = citiesData
          .filter(item => item.city !== null)
          .map(item => item.city as string)
        const uniqueCities = Array.from(new Set(validCities))
        setCities(uniqueCities)

        // Fetch hotels with their products
        const { data: hotelsData, error: hotelsError } = await supabase
          .from("hotels")
          .select(`
            id, 
            name, 
            display_address, 
            card_image, 
            city,
            products (id, name, base_price, type)
          `)
          .eq("status", "active")

        if (hotelsError) {
          console.error("Error fetching hotels:", hotelsError)
          setError("Không thể tải dữ liệu khách sạn. Vui lòng thử lại sau.")
          setLoading(false)
          return
        }

        // Ensure all hotels have the required fields
        const validHotels = hotelsData
          .filter(hotel => hotel.name && hotel.display_address && hotel.city)
          .map(hotel => ({
            ...hotel,
            products: hotel.products || []
          })) as Hotel[]

        setHotels(validHotels)

        // Set default city to first city with hotels or first city
        if (uniqueCities.length > 0) {
          const cityWithHotels = uniqueCities.find(
            (city) => validHotels.some((hotel) => hotel.city === city)
          )
          setSelectedCity(cityWithHotels || uniqueCities[0])
        }
      } catch (error) {
        console.error("Error fetching data:", error)
        setError("Đã xảy ra lỗi khi tải dữ liệu. Vui lòng thử lại sau.")
      } finally {
        setLoading(false)
      }
    }

    fetchData()
  }, [])

  const filteredHotels = selectedCity
    ? selectedCity === "Other"
      ? hotels.filter((hotel) => !cities.includes(hotel.city))
      : hotels.filter((hotel) => hotel.city === selectedCity)
    : []

  const handleHotelClick = (hotelId: string) => {
    router.push(`/hotels/${hotelId}`);
  };

  if (loading) {
    return (
      <section className="py-10 bg-[#FDFAF5]">
        <div className="container mx-auto px-4 text-center py-20">
          <div className="animate-pulse">Đang tải dữ liệu...</div>
        </div>
      </section>
    )
  }

  if (error) {
    return (
      <section className="py-10 bg-[#FDFAF5]">
        <div className="container mx-auto px-4 text-center py-20">
          <div className="text-red-500">{error}</div>
          <Button
            onClick={() => window.location.reload()}
            className="mt-4"
          >
            Thử lại
          </Button>
        </div>
      </section>
    )
  }

  if (cities.length === 0 || hotels.length === 0) {
    return (
      <section className="py-10 bg-[#FDFAF5]">
        <div className="container mx-auto px-4">
          <div className="flex items-end justify-between">
            <div>
              <h2 className="text-3xl font-bold text-[#0c363e]">Experiences around you</h2>
              <p className="mt-2 text-[#4b5563]">Popular places to stay that we recommend for you</p>
            </div>
          </div>
          <div className="mt-8 max-w-md mx-auto">
            <ComingSoonCard locationName="your area" />
          </div>
        </div>
      </section>
    )
  }

  return (
    <section className="py-10 bg-[#FDFAF5]">
      <div className="container mx-auto px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#0c363e]">Experiences around you</h2>
            <p className="mt-2 text-[#4b5563]">Popular places to stay that we recommend for you</p>
          </div>
          <Button
            variant="secondary"
            className="rounded-full bg-[#F6DDB8] text-[#0F373D] hover:bg-[#F6DDB8]/90 border-none shadow-sm"
          >
            Search more <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <Tabs value={selectedCity} onValueChange={setSelectedCity} className="mt-6">
          <div className="w-full overflow-x-auto">
            <TabsList className="bg-transparent flex flex-wrap justify-start min-w-max">
              {cities.map((city) => (
                <TabsTrigger
                  key={city}
                  value={city}
                  className="rounded-full px-4 py-2 mr-2 mb-2 data-[state=active]:bg-[#0c363e] data-[state=active]:text-white"
                >
                  {city}
                </TabsTrigger>
              ))}
              <TabsTrigger
                value="Other"
                className="rounded-full px-4 py-2 mr-2 mb-2 data-[state=active]:bg-[#0c363e] data-[state=active]:text-white"
              >
                Other
              </TabsTrigger>
            </TabsList>
          </div>
          <TabsContent value={selectedCity}>
            {filteredHotels.length > 0 ? (
              <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {filteredHotels.map((hotel) => (
                  <div
                    key={hotel.id}
                    className="group overflow-hidden rounded-xl bg-white cursor-pointer hover:shadow-md transition-shadow"
                    onClick={() => handleHotelClick(hotel.id)}
                  >
                    <div className="relative">
                      <div className="absolute left-4 top-4 z-10 rounded bg-[#b91c1c] px-2 py-1 text-sm font-medium text-white">
                        -10% today
                      </div>
                      <button
                        className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
                        aria-label="Add to favorites"
                        onClick={(e) => {
                          e.stopPropagation(); // Ngăn chặn sự kiện click lan tỏa lên parent
                          // Xử lý logic thêm vào yêu thích
                        }}
                      >
                        <Bookmark className="h-5 w-5 text-[#0c363e]" />
                      </button>
                      <Image
                        src={hotel.card_image || "/placeholder.svg?height=300&width=400"}
                        alt={hotel.name}
                        width={400}
                        height={300}
                        className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                      />
                    </div>

                    <div className="p-4">
                      <h3 className="text-xl font-semibold text-[#0c363e]">{hotel.name}</h3>
                      <div className="mt-2 flex items-center gap-1 text-sm text-[#4b5563]">
                        <MapPin className="h-4 w-4" />
                        <span>{hotel.display_address}</span>
                      </div>

                      <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
                        {["day pass", "cabana", "day room"]
                          .map((type) => {
                            const product = hotel.products.find(
                              (p) =>
                                (p.type.toLowerCase().includes(type) || p.name.toLowerCase().includes(type)) &&
                                p.base_price != null &&
                                p.base_price > 0,
                            )
                            if (product) {
                              return (
                                <div key={type} className="flex-1">
                                  <div className="text-xs text-[#4b5563]">{type.toUpperCase()}</div>
                                  <div className="font-semibold text-[#0c363e]">${product.base_price}</div>
                                </div>
                              )
                            }
                            return null
                          })
                          .filter(Boolean)}
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="mt-8 max-w-md mx-auto">
                <ComingSoonCard locationName={selectedCity} />
              </div>
            )}
          </TabsContent>
        </Tabs>
      </div>
    </section>
  )
}

