"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { BookingDetailSection } from "@/components/sections/booking-detail-section"

export default function BookingDetailPage({ params }: { params: { id: string } }) {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <BookingDetailSection bookingId={params.id} />
      </main>
      <SiteFooter />
    </div>
  )
}

