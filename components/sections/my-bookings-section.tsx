"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { CheckInDialog } from "@/components/check-in-dialog"
import { supabase } from "@/lib/supabase"
import { useRouter } from "next/navigation"
import { ArrowRight } from "lucide-react"
import { AccountLayout } from "@/components/account-layout"
import { useAuth } from "@/contexts/AuthContext"
import { format } from "date-fns"

const TABS = ["Ongoing", "Completed", "Canceled"]

interface Booking {
  id: string
  hotel_id: string
  user_id: string
  check_in_date: string
  status: "ongoing" | "completed" | "canceled"
  hotel?: {
    name: string
    card_image: string
    display_address: string
  }
}

export function MyBookingsSection() {
  const router = useRouter()
  const { user } = useAuth()
  const [activeTab, setActiveTab] = useState("Ongoing")
  const [isCheckInDialogOpen, setIsCheckInDialogOpen] = useState(false)
  const [bookings, setBookings] = useState<Booking[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchBookings() {
      if (!user) {
        setLoading(false);
        return;
      }

      try {
        setLoading(true);
        setError(null);

        let status: string;
        switch (activeTab) {
          case "Ongoing":
            status = "ongoing";
            break;
          case "Completed":
            status = "completed";
            break;
          case "Canceled":
            status = "canceled";
            break;
          default:
            status = "ongoing";
        }

        const { data: bookingsData, error: bookingsError } = await supabase
          .from("bookings")
          .select("*")
          .eq("user_id", user.id)
          .eq("status", status);

        if (bookingsError) {
          console.error("Supabase bookings error:", bookingsError);
          throw new Error(bookingsError.message || "Failed to fetch bookings");
        }

        if (!bookingsData || bookingsData.length === 0) {
          // Không có bookings, trả về mảng rỗng
          setBookings([]);
          return;
        }

        const bookingsWithHotels = await Promise.all(
          bookingsData.map(async (booking) => {
            try {
              const { data: hotelData, error: hotelError } = await supabase
                .from("hotels")
                .select("name, card_image, display_address")
                .eq("id", booking.hotel_id)
                .single();

              if (hotelError) {
                console.error("Error fetching hotel data:", hotelError);
                return booking;
              }

              return { ...booking, hotel: hotelData };
            } catch (err) {
              console.error("Error processing hotel data for booking:", err);
              return booking;
            }
          })
        );

        setBookings(bookingsWithHotels || []);
      } catch (error: any) {
        console.error("Error fetching bookings:", error);
        setError(error.message || "Failed to load bookings");
      } finally {
        setLoading(false);
      }
    }

    fetchBookings();
  }, [user, activeTab]);

  const renderBookingCard = (booking: Booking) => (
    <div key={booking.id} className="bg-white rounded-lg p-6 border">
      <div className="flex gap-6">
        {/* Hotel Image */}
        <div className="relative h-32 w-48 flex-shrink-0 overflow-hidden rounded-lg">
          <Image
            src={booking.hotel?.card_image || "/placeholder.svg?height=300&width=400"}
            alt={booking.hotel?.name || "Hotel"}
            fill
            className="object-cover"
          />
        </div>

        {/* Hotel Details */}
        <div className="flex-1">
          <div className="flex items-start justify-between">
            <div>
              <h3 className="text-xl font-semibold text-[#0f373d]">{booking.hotel?.name || "Unknown Hotel"}</h3>
              <p className="text-[#4f4f4f]">{booking.hotel?.display_address || "Address not available"}</p>
            </div>
            <div className="flex flex-col items-end">
              <div
                className={cn(
                  "px-3 py-1 rounded-full text-sm font-medium",
                  booking.status === "ongoing"
                    ? "bg-[#ebfaf3] text-[#16a34a]"
                    : booking.status === "completed"
                      ? "bg-[#e5e7eb] text-[#4b5563]"
                      : "bg-[#fee2e2] text-[#dc2626]",
                )}
              >
                {booking.status.charAt(0).toUpperCase() + booking.status.slice(1)}
              </div>
              <div className="text-sm text-[#4f4f4f] mt-1">
                {format(new Date(booking.check_in_date), "EEE, MMM d, yyyy")}
              </div>
            </div>
          </div>

          <div className="mt-6 flex gap-4">
            <Button
              variant="secondary"
              size="lg"
              onClick={() => router.push(`/users/bookings/${booking.id}?status=${booking.status}`)}
              className="bg-[#f6ddb8] text-[#0f373d] hover:bg-[#f6ddb8]/90"
            >
              View Details
            </Button>
            {booking.status === "completed" && (
              <Button
                variant="default"
                size="lg"
                onClick={() => router.push(`/hotels/${booking.hotel_id}`)}
                className="bg-[#0C363E] hover:bg-[#0C363E]/90 text-white"
              >
                Rebook
                <ArrowRight className="ml-2 h-4 w-4" />
              </Button>
            )}
          </div>
        </div>
      </div>
    </div>
  )

  return (
    <AccountLayout currentPage="/users/my-bookings">
      <h2 className="text-2xl font-semibold text-[#0f373d]">My Bookings</h2>

      {/* Tabs */}
      <div className="flex gap-4 border-b">
        {TABS.map((tab) => (
          <button
            key={tab}
            onClick={() => setActiveTab(tab)}
            className={cn(
              "px-4 py-2 text-[#4f4f4f] border-b-2 border-transparent",
              tab === activeTab && "border-[#0f373d] text-[#0f373d] font-medium",
            )}
          >
            {tab}
          </button>
        ))}
      </div>

      {/* Booking Cards */}
      <div className="space-y-4 mt-4">
        {loading ? (
          <p>Loading bookings...</p>
        ) : error ? (
          <p className="text-red-500">Error: {error}</p>
        ) : bookings.length > 0 ? (
          bookings.map((booking) => renderBookingCard(booking))
        ) : (
          <p>You have no bookings in this category.</p>
        )}
      </div>

      <CheckInDialog
        open={isCheckInDialogOpen}
        onOpenChange={setIsCheckInDialogOpen}
        bookingId={bookings[0]?.id || ""}
      />
    </AccountLayout>
  )
}

