"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { BookingDetailSection } from "@/components/sections/booking-detail-section"
import { useParams } from "next/navigation"

export default function BookingDetailPage() {
  const params = useParams()
  const bookingId = params.id as string

  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <BookingDetailSection bookingId={bookingId} />
      </main>
      <SiteFooter />
    </div>
  )
}

