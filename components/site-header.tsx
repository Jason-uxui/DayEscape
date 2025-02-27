"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SiteNavigation } from "./site-navigation"
import { useAuth } from "@/contexts/AuthContext"

export function SiteHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { user, signOut } = useAuth()

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F1E9DF] bg-[#FDFAF5]">
      <div className="container flex h-16 items-center justify-between px-4">
        <button
          className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
          onClick={() => setIsNavOpen(!isNavOpen)}
          aria-label="Open navigation menu"
          aria-expanded={isNavOpen}
        >
          <Menu className="h-6 w-6" />
        </button>

        <Link href="/" className="flex items-center space-x-2">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-bKGMGzLORzYLaKr6UcGZqfRhgoIgNL.png"
            alt="DayEscape"
            width={130}
            height={32}
            className="h-8 w-auto"
          />
        </Link>

        <div className="flex items-center gap-4">
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <>
              <Link href="/signup">
                <Button variant="default" className="bg-[#0c363e] text-white hover:bg-[#0c363e]/90 rounded-full">
                  Sign up
                </Button>
              </Link>
              <Link href="/login">
                <Button variant="ghost" size="sm">
                  Log in
                </Button>
              </Link>
            </>
          )}
          <button
            className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
            aria-label="View shopping cart"
          >
            <ShoppingCart className="h-6 w-6" />
          </button>
        </div>
      </div>
      <SiteNavigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </header>
  )
}

