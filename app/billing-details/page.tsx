"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { BillingDetailsSection } from "@/components/sections/billing-details-section"

export default function BillingDetailsPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <BillingDetailsSection />
      </main>
      <SiteFooter />
    </div>
  )
}

