"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { MyFavouritesSection } from "@/components/sections/my-favourites-section"

export default function FavoritesPage() {
  return (
    <div className="flex min-h-screen flex-col">
      <SiteHeader />
      <main className="flex-1">
        <MyFavouritesSection />
      </main>
      <SiteFooter />
    </div>
  )
}

