"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import Link from "next/link"
import { Bookmark, MapPin } from "lucide-react"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import { AccountLayout } from "@/components/account-layout"

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

export function MyFavouritesSection() {
  const [favourites, setFavourites] = useState<Hotel[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const { toast } = useToast()
  //const userEmail = "duongdaikhanh2502@gmail.com" // This should be dynamically set based on the logged-in user

  useEffect(() => {
    fetchFavourites()
  }, [])

  const fetchFavourites = async () => {
    try {
      setLoading(true)
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

      if (error) throw error

      setFavourites(data)
    } catch (error: any) {
      console.error("Error fetching favourites:", error)
      setError(error.message)
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
    return <div>Loading your favourites...</div>
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <AccountLayout currentPage="/users/favorites">
      <h2 className="text-2xl font-semibold text-[#0f373d]">My Favourites</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
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
            <Link href={`/hotels/${encodeURIComponent(hotel.name.replace(/ /g, "-").toLowerCase())}`} className="block">
              <div className="relative">
                <div className="absolute left-4 top-4 z-10 rounded bg-[#b91c1c] px-2 py-1 text-sm font-medium text-white">
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
                <h3 className="text-xl font-semibold text-[#0c363e]">{hotel.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-sm text-[#4b5563]">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.display_address}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
                  {["day pass", "cabana", "day room"].map((type) => {
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
                          <div className="font-semibold text-[#0c363e]">${Math.round(product.base_price)}</div>
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
    </AccountLayout>
  )
}

