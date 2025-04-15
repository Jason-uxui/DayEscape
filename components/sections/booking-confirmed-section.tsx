"use client"

import Image from "next/image"
import Link from "next/link"
import { Check, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export function BookingConfirmedSection() {
  const { items, getHotelInfo } = useCart()
  const router = useRouter()
  const totalGuests = items.reduce((total, item) => {
    return total + (item.options?.adults || 0) + (item.options?.children || 0)
  }, 0)

  const bookingId = "14151613561" // In a real app, this would come from the backend

  const hotelInfo = getHotelInfo()

  if (!hotelInfo) {
    return <div>No hotel information available</div>
  }

  return (
    <div className="container max-w-xl mx-auto px-4 py-16 text-center">
      {/* Confirmation Icon */}
      <div className="flex justify-center mb-6">
        <div className="rounded-full bg-[#238699] p-4 relative">
          <Check className="h-8 w-8 text-white" />
          <div className="absolute -inset-1 bg-[#238699] opacity-20 rounded-full blur-sm" />
        </div>
      </div>

      {/* Header */}
      <h1 className="text-4xl font-serif font-semibold text-[#0f373d] mb-2">Booking confirmed.</h1>
      <p className="text-[#4f4f4f] text-lg mb-8">Your booking is complete. Enjoy!</p>

      {/* Booking Details Card */}
      <div className="bg-white rounded-lg shadow-sm p-6 mb-8">
        {/* Hotel Info */}
        <div className="flex items-start gap-4 mb-8 text-left">
          <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={hotelInfo.image} alt={hotelInfo.name} fill className="object-cover" />
          </div>
          <div>
            <h2 className="font-semibold text-[#0f373d] text-xl">{hotelInfo.name}</h2>
            <p className="text-[#4f4f4f]">{hotelInfo.address}</p>
          </div>
        </div>

        {/* Booking Details */}
        <div className="space-y-4 text-left">
          <div className="flex justify-between items-center py-2">
            <span className="text-[#4f4f4f]">Check-in</span>
            <span className="font-medium text-[#0f373d]">Wed Sep 11, 2024</span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[#4f4f4f]">Who's coming</span>
            <span className="font-medium text-[#0f373d]">
              {totalGuests} {totalGuests === 1 ? "Adult" : "Adults"}
            </span>
          </div>
          <div className="flex justify-between items-center py-2">
            <span className="text-[#4f4f4f]">Booking ID</span>
            <span className="font-medium text-[#0f373d]">{bookingId}</span>
          </div>
        </div>
      </div>

      {/* What to Do Next */}
      <div className="space-y-4">
        <p className="text-[#0f373d] font-medium">What to do next:</p>
        <Button
          variant="secondary"
          size="lg"
          className="w-full"
          onClick={() => router.push("/users/my-bookings")}
        >
          Review My Booking <ArrowRight className="w-4 h-4 ml-1" />
        </Button>
        <div>
          <Link href="/hotels" className="text-[#0f373d] hover:text-[#0f373d]/80 font-medium">
            Explore More Hotels
          </Link>
        </div>
      </div>
    </div>
  )
}

