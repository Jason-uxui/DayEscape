"use client"

import Link from "next/link"
import Image from "next/image"
import { Menu, ShoppingCart } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { SiteNavigation } from "./site-navigation"
import { useAuth } from "@/contexts/AuthContext"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"

export function SiteHeader() {
  const [isNavOpen, setIsNavOpen] = useState(false)
  const { user, signOut } = useAuth()
  const { items } = useCart()
  const router = useRouter()

  const totalItems = items.reduce((total, item) => total + item.quantity, 0)

  const handleCartClick = () => {
    if (totalItems > 0) {
      router.push("/checkout-confirmation")
    }
  }

  return (
    <header className="sticky top-0 z-50 w-full border-b border-[#F1E9DF] bg-[#FDFAF5]">
      <div className="container flex h-16 items-center px-4">
        {/* Left section - Menu and mobile logo */}
        <div className="flex items-center gap-2">
          <button
            className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100"
            onClick={() => setIsNavOpen(!isNavOpen)}
            aria-label="Open navigation menu"
            aria-expanded={isNavOpen}
          >
            <Menu className="h-6 w-6" />
          </button>

          {/* Mobile Logo - only visible on mobile */}
          <Link href="/" className="md:hidden">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-bKGMGzLORzYLaKr6UcGZqfRhgoIgNL.png"
              alt="DayEscape"
              width={80}
              height={20}
              className="h-6 w-auto"
            />
          </Link>
        </div>

        {/* Center Logo - hidden on mobile, visible on md and up */}
        <div className="hidden md:flex flex-1 justify-center">
          <Link href="/" className="flex items-center space-x-2">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-bKGMGzLORzYLaKr6UcGZqfRhgoIgNL.png"
              alt="DayEscape"
              width={130}
              height={32}
              className="h-8 w-auto"
            />
          </Link>
        </div>

        {/* Right section with auth buttons and cart */}
        <div className="flex-1 flex justify-end items-center gap-4">
          {user ? (
            <Button variant="ghost" size="sm" onClick={() => signOut()}>
              Sign out
            </Button>
          ) : (
            <>
              <Link href="/signup" className="hidden sm:block">
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
            className="flex items-center justify-center rounded-md p-2 hover:bg-gray-100 relative"
            aria-label="View shopping cart"
            onClick={handleCartClick}
            disabled={totalItems === 0}
            style={{ opacity: totalItems === 0 ? 0.5 : 1, cursor: totalItems === 0 ? 'not-allowed' : 'pointer' }}
          >
            <ShoppingCart className="h-6 w-6" />
            {totalItems > 0 && (
              <span className="absolute -top-1 -right-1 bg-[#0c363e] text-white text-xs rounded-full w-5 h-5 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </button>
        </div>
      </div>
      <SiteNavigation isOpen={isNavOpen} onClose={() => setIsNavOpen(false)} />
    </header>
  )
}

