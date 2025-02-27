"use client"

import type React from "react"

import { useEffect } from "react"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import Link from "next/link"
import { cn } from "@/lib/utils"

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

  useEffect(() => {
    if (!user) {
      router.push("/login")
    }
  }, [user, router])

  if (!user) {
    return null // or a loading spinner
  }

  return (
    <div className="container mx-auto max-w-6xl px-4 py-8">
      {/* User Email */}
      <div className="mb-8">
        <h2 className="text-sm text-[#4f4f4f]">Your account</h2>
        <p className="text-xl font-semibold text-[#0f373d]">{user.email}</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-[240px,1fr] gap-8">
        {/* Sidebar Navigation */}
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

        {/* Main Content */}
        <div className="space-y-6">{children}</div>
      </div>
    </div>
  )
}

