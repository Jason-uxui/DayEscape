"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { MyFavouritesSection } from "@/components/sections/my-favourites-section"

export default function MyFavouritesPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <main className="flex-grow">
        <MyFavouritesSection />
      </main>
      <SiteFooter />
    </div>
  )
}

