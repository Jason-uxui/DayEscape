"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { BookingConfirmedSection } from "@/components/sections/booking-confirmed-section"

export default function BookingConfirmedPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <BookingConfirmedSection />
      </main>
      <SiteFooter />
    </div>
  )
}

