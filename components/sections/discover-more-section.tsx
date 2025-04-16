"use client"

import { useState, useEffect } from "react"
import { Bookmark, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { supabase } from "@/lib/supabase"
import Link from "next/link"
import { useRouter } from "next/navigation"

interface Hotel {
  id: string
  name: string
  display_address: string
  card_image: string
  latitude: number
  longitude: number
  products?: Array<{
    id: string
    type: string
    base_price: number
  }>
  calculatedPrices?: {
    dayPass?: number;
    cabana?: number;
    dayRoom?: number;
  }
}

interface DiscoverMoreSectionProps {
  currentHotelId?: string
  currentLatitude?: number
  currentLongitude?: number
  currentCity?: string
}

export function DiscoverMoreSection({
  currentHotelId,
  currentLatitude,
  currentLongitude,
  currentCity
}: DiscoverMoreSectionProps) {
  const [nearbyHotels, setNearbyHotels] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  // Helper function to calculate distance between two coordinates
  const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number) => {
    if (!lat1 || !lon1 || !lat2 || !lon2) return Infinity

    const R = 6371 // Radius of the earth in km
    const dLat = (lat2 - lat1) * Math.PI / 180
    const dLon = (lon2 - lon1) * Math.PI / 180
    const a =
      Math.sin(dLat / 2) * Math.sin(dLat / 2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
      Math.sin(dLon / 2) * Math.sin(dLon / 2)
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a))
    const d = R * c // Distance in km
    return d
  }

  useEffect(() => {
    async function fetchNearbyHotels() {
      setLoading(true)
      try {
        // Kiểm tra currentHotelId
        if (!currentHotelId) {
          console.warn("Missing currentHotelId for nearby hotels fetch");
        }

        // Approach 1: Get by city if currentCity is available
        if (currentCity) {
          console.log("Fetching by city:", currentCity);
          const { data, error } = await supabase
            .from("hotels")
            .select(`
              id, 
              name, 
              display_address, 
              card_image,
              latitude,
              longitude,
              products(id, type, base_price)
            `)
            .ilike('display_address', `%${currentCity}%`)
            .neq('id', currentHotelId || '')
            .limit(4)

          if (error) {
            console.error("Supabase error fetching by city:", error.message, error.details, error.hint);
            throw error;
          }

          if (data && data.length > 0) {
            console.log(`Found ${data.length} hotels in same city`);
            const hotelsWithPrices = calculateProductPrices(data);
            setNearbyHotels(hotelsWithPrices)
            setLoading(false)
            return
          }
        }

        // Approach 2: Get all hotels and sort by distance
        if (currentLatitude && currentLongitude) {
          console.log("Fetching by coordinates:", currentLatitude, currentLongitude);
          const { data, error } = await supabase
            .from("hotels")
            .select(`
              id, 
              name, 
              display_address, 
              card_image,
              latitude,
              longitude,
              products(id, type, base_price)
            `)
            .neq('id', currentHotelId || '')
            .limit(8)

          if (error) {
            console.error("Supabase error fetching by distance:", error.message, error.details, error.hint);
            throw error;
          }

          // Sort by distance if coordinates are available
          if (data && data.length > 0) {
            const hotelsWithCoordinates = data.filter(hotel =>
              hotel.latitude && hotel.longitude &&
              !isNaN(hotel.latitude) && !isNaN(hotel.longitude)
            );

            if (hotelsWithCoordinates.length === 0) {
              console.warn("No hotels found with valid coordinates");
            }

            const sortedData = hotelsWithCoordinates
              .map(hotel => ({
                ...hotel,
                distance: calculateDistance(
                  currentLatitude,
                  currentLongitude,
                  hotel.latitude,
                  hotel.longitude
                )
              }))
              .sort((a, b) => a.distance - b.distance)
              .slice(0, 4)

            console.log(`Found ${sortedData.length} hotels by distance`);
            const hotelsWithPrices = calculateProductPrices(sortedData);
            setNearbyHotels(hotelsWithPrices)
            setLoading(false)
            return
          }
        }

        // Fallback: Just get random hotels
        console.log("Using fallback: random hotels");
        const { data, error } = await supabase
          .from("hotels")
          .select(`
            id, 
            name, 
            display_address, 
            card_image,
            latitude,
            longitude,
            products(id, type, base_price)
          `)
          .neq('id', currentHotelId || '')
          .limit(4)

        if (error) {
          console.error("Supabase error fetching random hotels:", error.message, error.details, error.hint);
          throw error;
        }

        if (!data || data.length === 0) {
          console.warn("No hotels found in fallback query");
        } else {
          console.log(`Found ${data.length} random hotels`);
        }

        const hotelsWithPrices = calculateProductPrices(data || []);
        setNearbyHotels(hotelsWithPrices)
      } catch (error) {
        const errorMessage = error instanceof Error ? error.message : 'Unknown error';
        const errorStack = error instanceof Error ? error.stack : '';
        console.error("Error fetching nearby hotels:", {
          message: errorMessage,
          stack: errorStack,
          error: JSON.stringify(error, null, 2)
        });
        setNearbyHotels([])
      } finally {
        setLoading(false)
      }
    }

    fetchNearbyHotels()
  }, [currentHotelId, currentLatitude, currentLongitude, currentCity])

  const handleViewHotel = (hotelId: string) => {
    router.push(`/hotels/${hotelId}`)
  }

  if (loading) {
    return (
      <section className="py-10 bg-[#FDFAF5]">
        <div className="mx-auto max-w-6xl px-4">
          <div>
            <h2 className="text-3xl font-bold text-[#0c363e]">Discover more escapes nearby</h2>
            <p className="mt-2 text-[#4b5563]">Loading nearby options...</p>
          </div>
        </div>
      </section>
    )
  }

  if (nearbyHotels.length === 0) {
    return null
  }

  return (
    <section className="py-10 bg-[#FDFAF5]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#0c363e]">Discover more escapes nearby</h2>
            <p className="mt-2 text-[#4b5563]">Let's go on an adventure</p>
          </div>
          <Link href="/hotels">
            <Button
              variant="secondary"
              className="rounded-full bg-[#F6DDB8] text-[#0F373D] hover:bg-[#F6DDB8]/90 border-none shadow-sm"
            >
              Search more <ArrowRight className="ml-2 h-4 w-4" />
            </Button>
          </Link>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {nearbyHotels.map((hotel) => (
            <div
              key={hotel.id}
              className="group overflow-hidden rounded-xl bg-white cursor-pointer"
              onClick={() => handleViewHotel(hotel.id)}
            >
              <div className="relative">
                <button
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
                  aria-label="Add to favorites"
                  onClick={(e) => {
                    e.stopPropagation();
                    // Add favorite logic here
                  }}
                >
                  <Bookmark className="h-5 w-5 text-[#0c363e]" />
                </button>
                <img
                  src={hotel.card_image || "/placeholder.svg"}
                  alt={hotel.name}
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
                  {hotel.calculatedPrices?.dayPass && (
                    <div>
                      <div className="text-xs text-[#4b5563]">DAY PASS</div>
                      <div className="font-semibold text-[#0c363e]">${hotel.calculatedPrices.dayPass}</div>
                    </div>
                  )}
                  {hotel.calculatedPrices?.cabana && (
                    <div>
                      <div className="text-xs text-[#4b5563]">CABANA</div>
                      <div className="font-semibold text-[#0c363e]">${hotel.calculatedPrices.cabana}</div>
                    </div>
                  )}
                  {hotel.calculatedPrices?.dayRoom && (
                    <div>
                      <div className="text-xs text-[#4b5563]">DAY ROOM</div>
                      <div className="font-semibold text-[#0c363e]">${hotel.calculatedPrices.dayRoom}</div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

// Thêm hàm tính giá trung bình cho từng loại sản phẩm
const calculateProductPrices = (hotels: any[]) => {
  return hotels.map(hotel => {
    const calculatedPrices: {
      dayPass?: number;
      cabana?: number;
      dayRoom?: number;
    } = {};

    if (hotel.products && hotel.products.length > 0) {
      // Nhóm sản phẩm theo loại
      const productsByType: { [key: string]: number[] } = {};

      hotel.products.forEach((product: any) => {
        const type = product.type.toLowerCase();
        if (!productsByType[type]) {
          productsByType[type] = [];
        }
        productsByType[type].push(product.base_price);
      });

      // Tính giá trung bình cho mỗi loại
      if (productsByType['day pass'] && productsByType['day pass'].length > 0) {
        calculatedPrices.dayPass = Math.min(...productsByType['day pass']);
      }

      if (productsByType['cabana'] && productsByType['cabana'].length > 0) {
        calculatedPrices.cabana = Math.min(...productsByType['cabana']);
      }

      if (productsByType['day room'] && productsByType['day room'].length > 0) {
        calculatedPrices.dayRoom = Math.min(...productsByType['day room']);
      }
    }

    return {
      ...hotel,
      calculatedPrices
    };
  });
};

