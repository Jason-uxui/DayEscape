"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { CheckoutConfirmationSection } from "@/components/sections/checkout-confirmation-section"

export default function CheckoutConfirmationPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <CheckoutConfirmationSection />
      </main>
      <SiteFooter />
    </div>
  )
}

