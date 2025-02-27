"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { AccountDetailsSection } from "@/components/sections/account-details-section"

export default function AccountDetailsPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <AccountDetailsSection />
      </main>
      <SiteFooter />
    </div>
  )
}

