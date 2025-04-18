"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bookmark, MapPin, Search } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { AccountLayout } from "@/components/account-layout"
import { Button } from "@/components/ui/button"
import { useRouter } from "next/navigation"

interface Product {
  id: string
  name: string
  base_price: number
  type: string
}

interface Hotel {
  id: string
  name: string
  display_address: string
  card_image: string
  products: Product[]
}

// Dữ liệu giả cho trường hợp lỗi
const MOCK_HOTELS: Hotel[] = [
  {
    id: "mock-hotel-1",
    name: "Hyatt Regency Brisbane",
    display_address: "123 Example St, Brisbane QLD",
    card_image: "https://images.unsplash.com/photo-1566073771259-6a8506099945?q=80&w=1000",
    products: [
      {
        id: "mock-product-1",
        name: "Day Pass",
        base_price: 89,
        type: "day pass"
      },
      {
        id: "mock-product-2",
        name: "Cabana",
        base_price: 199,
        type: "cabana"
      },
      {
        id: "mock-product-3",
        name: "Day Room",
        base_price: 179,
        type: "day room"
      }
    ]
  },
  {
    id: "mock-hotel-2",
    name: "Marriott Brisbane",
    display_address: "456 Sample Ave, Brisbane QLD",
    card_image: "https://images.unsplash.com/photo-1551882547-ff40c63fe5fa?q=80&w=1000",
    products: [
      {
        id: "mock-product-4",
        name: "Day Pass",
        base_price: 75,
        type: "day pass"
      },
      {
        id: "mock-product-5",
        name: "Cabana",
        base_price: 250,
        type: "cabana"
      },
      {
        id: "mock-product-6",
        name: "Day Room",
        base_price: 150,
        type: "day room"
      }
    ]
  }
];

export function MyFavouritesSection() {
  const [favourites, setFavourites] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  const router = useRouter()

  useEffect(() => {
    fetchFavourites()
  }, [])

  const fetchFavourites = async () => {
    try {
      setLoading(true)
      setError(null)

      try {
        console.log("Fetching favourites data from Supabase");

        const { data, error } = await supabase
          .from("hotels")
          .select(`
            id, 
            name, 
            display_address, 
            card_image,
            products (id, name, base_price, type)
          `)
          .limit(10)

        if (error) {
          console.error("Supabase hotels fetch error:", error);

          // Sử dụng dữ liệu giả trong trường hợp lỗi
          console.warn("Using mock hotels data due to API error");
          setFavourites(MOCK_HOTELS);
          return;
        }

        console.log("Hotels data received:", data);
        setFavourites(data || []);
      } catch (dbError) {
        console.error("Database connection error:", dbError);

        // Sử dụng dữ liệu giả cho môi trường phát triển
        console.warn("Using mock favourites data due to connection error");
        setFavourites(MOCK_HOTELS);
      }
    } catch (error: any) {
      console.error("General error fetching favourites:", error);
      setError("Không thể tải danh sách yêu thích. Vui lòng thử lại sau.");

      // Vẫn hiển thị dữ liệu giả để người dùng có thể thấy giao diện
      setFavourites(MOCK_HOTELS);
    } finally {
      setLoading(false)
    }
  }

  const removeFromFavourites = async (hotelId: string) => {
    try {
      // In a real application, you would remove the hotel from the user's favorites
      // For now, we'll just remove it from the local state
      setFavourites(favourites.filter((hotel) => hotel.id !== hotelId))
      toast({
        title: "Removed from favourites",
        description: "The hotel has been removed from your favourites.",
        className: "rounded-full",
      })
    } catch (error: any) {
      console.error("Error removing from favourites:", error)
      toast({
        title: "Error",
        description: "Failed to remove the hotel from favourites. Please try again.",
        variant: "destructive",
        className: "rounded-full",
      })
    }
  }

  if (loading) {
    return (
      <AccountLayout currentPage="/users/favorites">
        <div className="flex justify-center py-12">
          <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f373d]"></div>
        </div>
      </AccountLayout>
    )
  }

  if (error) {
    return (
      <AccountLayout currentPage="/users/favorites">
        <div className="bg-white rounded-lg p-6 text-center border">
          <p className="text-red-500 mb-4">{error}</p>
          <Button
            onClick={() => fetchFavourites()}
            className="mt-4 bg-[#0f373d] hover:bg-[#0f373d]/90"
          >
            Thử lại
          </Button>
        </div>
      </AccountLayout>
    )
  }

  return (
    <AccountLayout currentPage="/users/favorites">
      <h2 className="text-xl sm:text-2xl font-semibold text-[#0f373d]">My Favourites</h2>

      {favourites.length === 0 ? (
        <div className="bg-white rounded-lg p-8 text-center border mt-4">
          <div className="flex justify-center mb-4">
            <div className="h-16 w-16 bg-[#FFF1E0] rounded-full flex items-center justify-center">
              <Bookmark className="h-8 w-8 text-[#0f373d]" />
            </div>
          </div>
          <h3 className="text-lg font-medium text-[#0f373d] mb-2">No favourites saved yet</h3>
          <p className="text-[#4f4f4f] mb-6">Start exploring hotels and save your favourites for easy access later.</p>
          <Button
            onClick={() => router.push('/')}
            className="bg-[#0f373d] hover:bg-[#0f373d]/90"
          >
            <Search className="mr-2 h-4 w-4" />
            Explore Hotels
          </Button>
        </div>
      ) : (
        <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 mt-4">
          {favourites.map((hotel) => (
            <div key={hotel.id} className="group overflow-hidden rounded-xl bg-white border">
              <button
                onClick={(e) => {
                  e.preventDefault()
                  removeFromFavourites(hotel.id)
                }}
                className="absolute right-4 top-4 z-20 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
                aria-label="Remove from favorites"
              >
                <Bookmark className="h-5 w-5 text-[#0c363e] fill-[#0c363e]" />
              </button>
              <Link href={`/hotels/${hotel.id}`} className="block">
                <div className="relative">
                  <div className="absolute left-4 top-4 z-10 rounded bg-[#b91c1c] px-2 py-1 text-xs sm:text-sm font-medium text-white">
                    -10% today
                  </div>
                  <Image
                    src={hotel.card_image || "/placeholder.svg?height=300&width=400"}
                    alt={hotel.name}
                    width={400}
                    height={300}
                    className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                  />
                </div>

                <div className="p-4">
                  <h3 className="text-lg sm:text-xl font-semibold text-[#0c363e]">{hotel.name}</h3>
                  <div className="mt-2 flex items-center gap-1 text-xs sm:text-sm text-[#4b5563]">
                    <MapPin className="h-3 w-3 sm:h-4 sm:w-4" />
                    <span className="line-clamp-1">{hotel.display_address}</span>
                  </div>

                  <div className="mt-4 flex items-center justify-between gap-2 border-t pt-3">
                    {["day pass", "cabana", "day room"].map((type) => {
                      const product = hotel.products.find(
                        (p) =>
                          (p.type.toLowerCase().includes(type) || p.name.toLowerCase().includes(type)) &&
                          p.base_price != null &&
                          p.base_price > 0,
                      )
                      if (product) {
                        return (
                          <div key={type} className="flex-1 text-center">
                            <div className="text-[10px] sm:text-xs text-[#4b5563]">{type.toUpperCase()}</div>
                            <div className="text-xs sm:text-sm font-semibold text-[#0c363e]">${Math.round(product.base_price)}</div>
                          </div>
                        )
                      }
                      return null
                    })}
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      )}
    </AccountLayout>
  )
}

