"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { HelpSupportSection } from "@/components/sections/help-support-section"

export default function HelpSupportPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <HelpSupportSection />
      </main>
      <SiteFooter />
    </div>
  )
}

