"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { MyBookingsSection } from "@/components/sections/my-bookings-section"

export default function MyBookingsPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <MyBookingsSection />
      </main>
      <SiteFooter />
    </div>
  )
}

