"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { AccountDetailsSection } from "@/components/sections/account-details-section"
import { Suspense } from "react"

export default function AccountDetailsPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <Suspense fallback={<div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f373d] mx-auto mb-4"></div>
            <p className="text-[#4f4f4f]">Loading account details...</p>
          </div>
        </div>}>
          <AccountDetailsSection />
        </Suspense>
      </main>
      <SiteFooter />
    </div>
  )
}

