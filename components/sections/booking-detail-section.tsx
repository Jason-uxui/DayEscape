"use client"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"
import { useRouter } from "next/navigation"
import { useToast } from "@/components/ui/use-toast"
import AmenitiesList from "@/components/amenities-list"
import LocationSection from "@/components/location-section"
import KeyInfoSection from "@/components/key-info-section"
import { HelpCenterSection } from "@/components/help-center-section"
import { ContactUsSection } from "@/components/contact-us-section"
import { CancelBookingDialog } from "@/components/cancel-booking-dialog"
import { useSearchParams } from "next/navigation"

interface BookingDetailSectionProps {
  bookingId: string
}

interface BookingDetails {
  id: string
  hotelName: string
  hotelImage: string
  hotelAddress: string
  checkInDate: Date
  checkOutDate: Date
  checkInTime: string
  checkOutTime: string
  guestCount: {
    adults: number
    children: number
    infants: number
  }
  roomType: string
  status: "upcoming" | "completed" | "cancelled"
  totalPrice: number
  latitude: number | null
  longitude: number | null
  products: Array<{
    type: string
    base_price: number
  }>
  facilityHours: {
    pool?: string
    restaurant?: {
      breakfast?: string
      lunch?: string
      dinner?: string
    }
  } | null
  customNote: string | null
}

export function BookingDetailSection({ bookingId }: BookingDetailSectionProps) {
  const router = useRouter()
  const { toast } = useToast()
  const [booking, setBooking] = useState<BookingDetails | null>(null)
  const [isCancelDialogOpen, setIsCancelDialogOpen] = useState(false)
  const searchParams = useSearchParams()
  const status = (searchParams.get("status") as "upcoming" | "completed" | "cancelled") || "upcoming"

  useEffect(() => {
    // In a real application, you would fetch the booking details from an API
    // For this example, we'll use mock data
    const mockBooking: BookingDetails = {
      id: bookingId,
      hotelName: "Luxury Resort & Spa",
      hotelImage: "/placeholder.svg?height=300&width=400",
      hotelAddress: "123 Luxury Lane, Brisbane, QLD 4000",
      checkInDate: new Date(2024, 8, 15),
      checkOutDate: new Date(2024, 8, 18),
      checkInTime: "12:00 PM",
      checkOutTime: "1:00 PM",
      guestCount: {
        adults: 2,
        children: 1,
        infants: 0,
      },
      roomType: "Deluxe Suite",
      status: status, // Set this based on the actual status
      totalPrice: 299.99,
      latitude: -27.4698,
      longitude: 153.0251,
      products: [
        { type: "Day Pass", base_price: 40 },
        { type: "Cabana", base_price: 100 },
      ],
      facilityHours: {
        pool: "6:00 AM - 10:00 PM",
        restaurant: {
          breakfast: "6:30 AM - 10:30 AM",
          lunch: "12:00 PM - 2:30 PM",
          dinner: "6:00 PM - 10:00 PM",
        },
      },
      customNote:
        "Please note that our spa facilities will be undergoing renovations from September 1st to September 30th.",
    }

    setBooking(mockBooking)
  }, [bookingId, status])

  if (!booking) {
    return <div>Loading...</div>
  }

  const onCancel = () => {
    setIsCancelDialogOpen(true)
  }

  const onUpdate = () => {
    const queryParams = new URLSearchParams({
      updateBooking: "true",
      checkInDate: booking.checkInDate.toISOString(),
      adults: booking.guestCount.adults.toString(),
      children: booking.guestCount.children.toString(),
      infants: booking.guestCount.infants.toString(),
      productType: booking.roomType,
    }).toString()

    router.push(`/hotels/${encodeURIComponent(booking.id)}?${queryParams}`)
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Link href="/users/my-bookings" className="inline-flex items-center text-[#0f373d] hover:text-[#0f373d]/80 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Bookings
      </Link>

      <div className="grid lg:grid-cols-[1fr,400px] gap-8">
        {/* Left Column - Main Content */}
        <div className="bg-white rounded-lg p-6">
          <h2 className="text-2xl font-bold text-[#0f373d] mb-6">Booking Details</h2>

          <div className="flex gap-6 items-start mb-8">
            <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
              <Image
                src={booking.hotelImage || "/placeholder.svg"}
                alt={booking.hotelName}
                fill
                className="object-cover"
              />
            </div>
            <div className="flex-1">
              <div className="flex items-start justify-between">
                <div>
                  <h3 className="text-2xl font-semibold text-[#0f373d]">{booking.hotelName}</h3>
                  <p className="text-[#4f4f4f] mt-1">Brisbane CBD</p>
                  <p className="text-[#4f4f4f] mt-1">Booked: {format(booking.checkInDate, "MMM dd, yyyy")}</p>
                </div>
                <div className="flex flex-col items-end">
                  <div
                    className={`px-3 py-1 rounded-full ${
                      booking.status === "upcoming"
                        ? "bg-[#ebfaf3] text-[#16a34a]"
                        : booking.status === "completed"
                          ? "bg-[#e5e7eb] text-[#4b5563]"
                          : "bg-[#fee2e2] text-[#dc2626]"
                    } text-sm font-medium`}
                  >
                    {booking.status === "upcoming"
                      ? "Upcoming"
                      : booking.status === "completed"
                        ? "Completed"
                        : "Cancelled"}
                  </div>
                  <p className="text-base text-[#4f4f4f] mt-1">{format(booking.checkInDate, "EEE, MMM d, yyyy")}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Products */}
          <div className="space-y-4 mb-8">
            <div className="flex justify-between items-center">
              <span className="text-[#0f373d]">Day Pass - 2 adult, 1 child</span>
              <span className="font-medium text-[#0f373d]">$200</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#0f373d]">Poolside Bed - 1 adult</span>
              <span className="font-medium text-[#0f373d]">$55</span>
            </div>
          </div>

          {/* Action Buttons */}
          {booking.status === "upcoming" && (
            <div className="flex gap-4 mb-8">
              <Button
                onClick={onCancel}
                variant="outline"
                className="flex-1 border-gray-300 text-red-500 hover:bg-white hover:border-red-500 hover:text-red-500"
              >
                Cancel Booking
              </Button>
              <Button
                onClick={onUpdate}
                variant="secondary"
                className="flex-1 bg-[#f6ddb8] text-[#0f373d] hover:bg-[#f6ddb8]/90"
              >
                Update Booking
              </Button>
            </div>
          )}
          {booking.status === "completed" && (
            <div className="flex gap-4 mb-8">
              <Button
                onClick={() => router.push(`/hotels/${booking.id}`)}
                variant="secondary"
                className="flex-1 bg-[#f6ddb8] text-[#0f373d] hover:bg-[#f6ddb8]/90"
              >
                Book Again
              </Button>
            </div>
          )}

          {/* Booking Details */}
          <div className="space-y-4 text-[#4f4f4f]">
            <div className="flex justify-between items-start">
              <span>Booking ID</span>
              <div className="flex flex-col items-end">
                <span className="text-[#0f373d]">bcff9b63-09fc-4205-9adf-dd30447b7a07</span>
                <Button
                  variant="link"
                  className="text-[#0f373d] p-0 h-auto underline"
                  onClick={() => {
                    toast({
                      variant: "success",
                      title: "Booking details sent to your email",
                      className: "rounded-full",
                    })
                  }}
                >
                  resend to my email
                </Button>
              </div>
            </div>
            <div className="flex justify-between items-center">
              <span>Check-in</span>
              <span className="text-[#0f373d]">12:00 PM</span>
            </div>
            <div className="flex justify-between items-center">
              <span>Check-out</span>
              <span className="text-[#0f373d]">1:00 PM</span>
            </div>
          </div>

          {/* Amenities List */}
          <div className="mt-8">
            <AmenitiesList />
          </div>

          {/* Location Section */}
          <div className="mt-8">
            <LocationSection
              displayAddress={booking.hotelAddress || "Address not available"}
              latitude={booking.latitude || null}
              longitude={booking.longitude || null}
              products={booking.products || []}
            />
          </div>

          {/* Key Info Section */}
          <div className="mt-8">
            <KeyInfoSection
              hotelInfo={{
                check_in: booking.checkInTime || null,
                check_out: booking.checkOutTime || null,
                facility_hours: booking.facilityHours || null,
                custom_note: booking.customNote || null,
              }}
            />
          </div>

          {/* Help Center Section */}
          <div className="mt-8">
            <HelpCenterSection />
          </div>

          {/* Contact Us Section */}
          <div className="mt-8">
            <ContactUsSection />
          </div>
        </div>

        {/* Right Column - Summary Card */}
        <div className="bg-white rounded-lg p-6 h-fit">
          <h2 className="text-xl font-semibold text-[#0f373d] mb-6">Summary</h2>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-[#4f4f4f]">Subtotal</span>
              <span className="font-medium">$40.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4f4f4f]">Platform Fee</span>
              <span className="font-medium">-$0.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4f4f4f]">Tax</span>
              <span className="font-medium">$4.00</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-[#4f4f4f]">Discount</span>
              <span className="font-medium">-$0.00</span>
            </div>
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0f373d]">Total due</span>
                <span className="text-2xl font-bold text-[#0f373d]">$44.00</span>
              </div>
            </div>
          </div>
        </div>
      </div>
      <CancelBookingDialog
        open={isCancelDialogOpen}
        onOpenChange={setIsCancelDialogOpen}
        onCancel={() => setIsCancelDialogOpen(false)}
        onSubmit={(reason, details) => {
          // Handle submit logic here
          console.log("Cancel booking request submitted. Reason:", reason, "Details:", details)
          toast({
            title: "Your cancel request has been submitted",
            className: "rounded-full",
          })
        }}
      />
    </div>
  )
}

