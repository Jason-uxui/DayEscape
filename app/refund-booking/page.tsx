"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { RefundBookingSection } from "@/components/sections/refund-booking-section"

export default function RefundBookingPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <RefundBookingSection />
      </main>
      <SiteFooter />
    </div>
  )
}

