"use client"

import { useState, useEffect } from "react"
import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { Search } from "@/components/search"
import { HotelSearchResults } from "@/components/hotel-search-results"
import { supabase, isSupabaseInitialized } from "@/lib/supabase"
import { useSearchParams } from "next/navigation"
import { LoadingScreen } from "@/components/ui/loading-spinner"

export default function HotelsPage() {
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const searchParams = useSearchParams()

  useEffect(() => {
    const checkSupabaseInitialization = async () => {
      if (!isSupabaseInitialized()) {
        setError("Supabase client is not initialized. Check your environment variables.")
        setIsLoading(false)
        return
      }

      try {
        const { data, error } = await supabase.from("hotels").select("id").limit(1)
        if (error) throw error
        setIsLoading(false)
      } catch (err) {
        console.error("Error connecting to Supabase:", err)
        setError("Failed to connect to the database. Please try again later.")
        setIsLoading(false)
      }
    }

    checkSupabaseInitialization()
  }, [])

  if (isLoading) {
    return <LoadingScreen />
  }

  if (error) {
    return <div>Error: {error}</div>
  }

  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <SiteHeader />
      <main>
        <div className="container mx-auto px-4 py-8">
          <div className="mb-8">
            <h1 className="text-3xl font-bold text-[#0c363e]">Find your perfect escape</h1>
            <p className="mt-2 text-[#4f4f4f]">Discover and book amazing day experiences at hotels near you</p>
          </div>
          <Search />
        </div>
        <HotelSearchResults />
      </main>
      <SiteFooter />
    </div>
  )
}

