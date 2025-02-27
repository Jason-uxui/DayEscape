"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { ChangePasswordSection } from "@/components/sections/change-password-section"

export default function ChangePasswordPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <ChangePasswordSection />
      </main>
      <SiteFooter />
    </div>
  )
}

