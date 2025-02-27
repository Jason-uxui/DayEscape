"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { PaymentDetailsSection } from "@/components/sections/payment-details-section"

export default function PaymentDetailsPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <PaymentDetailsSection />
      </main>
      <SiteFooter />
    </div>
  )
}

