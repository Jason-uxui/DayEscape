"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { cn } from "@/lib/utils"
import { ChevronDown } from "lucide-react"

const NAVIGATION_ITEMS = [
  { label: "My Bookings", href: "/users/my-bookings" },
  { label: "My Favourite", href: "/users/favorites" },
  { label: "Account Details", href: "/users/account" },
  { label: "Payment Details", href: "/users/payment-details" },
  { label: "Change Passwords", href: "/users/change-password" },
  { label: "Help & Support", href: "/users/help-support" },
]

interface AccountLayoutProps {
  children: React.ReactNode
  currentPage: string
}

export function AccountLayout({ children, currentPage }: AccountLayoutProps) {
  const router = useRouter()
  const { user } = useAuth()
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isMobile, setIsMobile] = useState(false)

  useEffect(() => {
    // Chỉ redirect khi đang ở client-side và chắc chắn user là null
    if (typeof window !== 'undefined' && user === null) {
      router.push("/login")
    }
  }, [user, router])

  // Check if mobile for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 768) // md breakpoint
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  const getCurrentPageLabel = () => {
    const currentItem = NAVIGATION_ITEMS.find(item => item.href === currentPage)
    return currentItem?.label || "Menu"
  }

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8 pb-20 md:pb-8">
      {/* User Email */}
      <div className="mb-8">
        <h2 className="text-sm text-[#4f4f4f]">Your account</h2>
        <p className="text-xl font-semibold text-[#0f373d]">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8">
        {/* Mobile Dropdown Menu */}
        {isMobile && (
          <div className="mb-4 relative z-20">
            <button
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="flex items-center justify-between w-full px-4 py-3 bg-[#FFF1E0] text-[#0f373d] font-medium rounded-md"
            >
              <span>{getCurrentPageLabel()}</span>
              <ChevronDown className={`h-5 w-5 transition-transform ${isMobileMenuOpen ? 'rotate-180' : ''}`} />
            </button>

            {isMobileMenuOpen && (
              <div className="absolute top-full left-0 right-0 mt-1 bg-white border border-gray-200 rounded-md shadow-lg">
                {NAVIGATION_ITEMS.map((item) => (
                  <Link
                    key={item.label}
                    href={item.href}
                    className={cn(
                      "block px-4 py-3 text-[#4f4f4f] hover:bg-[#f6ddb8]/10 hover:text-[#0f373d]",
                      item.href === currentPage && "bg-[#FFF1E0] text-[#0f373d] font-medium",
                    )}
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    {item.label}
                  </Link>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Desktop Sidebar Navigation */}
        {!isMobile && (
          <nav className="space-y-1">
            {NAVIGATION_ITEMS.map((item) => (
              <Link
                key={item.label}
                href={item.href}
                className={cn(
                  "block px-4 py-2 rounded-md text-[#4f4f4f] hover:bg-[#f6ddb8]/10 hover:text-[#0f373d]",
                  item.href === currentPage && "bg-[#FFF1E0] text-[#0f373d] font-medium",
                )}
              >
                {item.label}
              </Link>
            ))}
          </nav>
        )}

        {/* Main Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

