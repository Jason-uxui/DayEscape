"use client"

import { ArrowLeft, X, ChevronUp, ChevronDown } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/contexts/CartContext"
import { useState, useEffect } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

export function CheckoutConfirmationSection() {
  const { items, removeFromCart, total, getHotelInfo } = useCart()
  const [showDiscountInput, setShowDiscountInput] = useState(false)
  const router = useRouter()
  const [isMobile, setIsMobile] = useState(false)
  const [expandSummary, setExpandSummary] = useState(false)

  const hotelInfo = getHotelInfo()

  const subtotal = total
  const platformFee = 0
  const tax = Math.round(subtotal * 0.1)
  const discount = 0
  const totalDue = subtotal + platformFee + tax - discount

  // Check if mobile for responsive layout
  useEffect(() => {
    const checkMobile = () => {
      setIsMobile(window.innerWidth < 1024)
    }

    // Initial check
    checkMobile()

    // Add event listener
    window.addEventListener('resize', checkMobile)

    // Cleanup
    return () => window.removeEventListener('resize', checkMobile)
  }, [])

  if (!hotelInfo) {
    return <div>No hotel information available</div>
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8 pb-[240px] lg:pb-8">
      <Link
        href={`/hotels/${hotelInfo.id}`}
        className="inline-flex items-center text-[#0f373d] hover:text-[#0f373d]/80 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {hotelInfo.name}
      </Link>

      <div className="grid lg:grid-cols-[1fr,400px] gap-10">
        {/* Review Card Component */}
        <div className="bg-white rounded-lg p-4 md:p-6 w-full">
          <div>
            <h2 className="text-xl font-bold text-[#0f373d] mb-6">Cart</h2>
            {/* Hotel Card - Responsive layout */}
            <div className="flex flex-col sm:flex-row gap-4 items-start mb-8 pb-4 border-b border-gray-100">
              <div className="relative h-32 sm:h-24 w-full sm:w-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image src={hotelInfo.image} alt={hotelInfo.name} fill className="object-cover" />
              </div>
              <div className="w-full">
                <h3 className="text-xl font-semibold text-[#0f373d]">{hotelInfo.name}</h3>
                <p className="text-[#4f4f4f] mt-1 text-sm">{hotelInfo.address}</p>
                <p className="text-[#4f4f4f] mt-1 text-sm">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
              </div>
            </div>
          </div>

          {/* Product Items - Optimized for mobile */}
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex flex-col sm:flex-row sm:items-center justify-between py-4 px-2 border-b last:border-b-0 rounded-md hover:bg-gray-50">
                <div className="flex items-start gap-3 mb-2 sm:mb-0">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="mt-1 rounded-full border p-1.5 sm:p-2 text-[#4f4f4f] hover:text-[#333333] hover:border-[#333333]"
                  >
                    <X className="h-3 w-3 sm:h-4 sm:w-4" />
                  </button>
                  <div className="flex flex-col">
                    <span className="text-[#0f373d] font-medium">{item.name}</span>
                    <span className="text-[#4f4f4f] text-sm">
                      {item.options?.adults} adult, {item.options?.children} child
                      {item.options?.infants && item.options.infants > 0 && `, ${item.options.infants} infant`}
                    </span>
                    {item.options?.date && (
                      <span className="text-[#4f4f4f] text-sm mt-1">
                        {format(new Date(item.options.date), "MMM d, yyyy")}
                      </span>
                    )}
                  </div>
                </div>
                <span className="font-medium text-[#0f373d] ml-9 sm:ml-0">${item.price}</span>
              </div>
            ))}
          </div>

          <div className="mt-8 space-y-6">
            <button
              className="text-[#0f373d] hover:text-[#0f373d]/80 text-lg font-medium"
              onClick={() => setShowDiscountInput(!showDiscountInput)}
            >
              Apply Coupon
            </button>
            {showDiscountInput && (
              <div className="flex gap-2 flex-col sm:flex-row">
                <input type="text" placeholder="Enter coupon code" className="flex-grow rounded-md border px-3 py-2" />
                <Button variant="outline" className="mt-2 sm:mt-0">Apply</Button>
              </div>
            )}

            <div className="flex items-start sm:items-center gap-3">
              <Checkbox id="updates" className="mt-1 sm:mt-0" />
              <label htmlFor="updates" className="text-[#4f4f4f] leading-tight sm:leading-none">
                Keep me updated with special offers and exciting news
              </label>
            </div>
          </div>
        </div>

        {/* Summary Checkout Component - Fixed on mobile with collapsible details */}
        <div className={`${isMobile ? 'fixed bottom-0 left-0 right-0 z-40' : ''}`}>
          <div className={`bg-white ${isMobile ? 'rounded-t-lg border-t shadow-[0_-4px_12px_rgba(0,0,0,0.1)]' : 'rounded-lg'} p-4 md:p-6 w-full lg:max-w-[400px]`}>

            {/* Mobile collapsed view - only show total */}
            {isMobile && !expandSummary ? (
              <div className="flex justify-between items-center mb-0">
                <div className="flex items-center gap-2">
                  <button
                    onClick={() => setExpandSummary(!expandSummary)}
                    className="text-[#0f373d] p-1 rounded-full border border-gray-200"
                  >
                    <ChevronUp className="h-4 w-4" />
                  </button>
                  <span className="text-sm font-medium text-[#0f373d]">Total due</span>
                </div>
                <span className="text-lg font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
              </div>
            ) : (
              <>
                {isMobile && (
                  <div className="flex justify-between items-center mb-0">
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => setExpandSummary(!expandSummary)}
                        className="text-[#0f373d] p-1 rounded-full border border-gray-200"
                      >
                        <ChevronDown className="h-4 w-4" />
                      </button>
                      <span className="text-sm font-medium text-[#0f373d]">Total due</span>
                    </div>
                    <span className="text-lg font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
                  </div>
                )}

                {!isMobile && (
                  <h2 className="text-xl font-bold text-[#0f373d] mb-4">Summary</h2>
                )}

                {/* Expanded view - show all details */}
                <div className="space-y-3 mt-4">
                  <div className="flex justify-between">
                    <span className="text-xs text-[#4f4f4f]">Subtotal</span>
                    <span className="text-xs font-medium">${subtotal.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-[#4f4f4f]">Platform Fee</span>
                    <span className="text-xs font-medium">-${platformFee.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-[#4f4f4f]">Tax</span>
                    <span className="text-xs font-medium">${tax.toFixed(2)}</span>
                  </div>

                  <div className="flex justify-between">
                    <span className="text-xs text-[#4f4f4f]">Discount</span>
                    <span className="text-xs font-medium">-${discount.toFixed(2)}</span>
                  </div>

                  {!isMobile && (
                    <div className="pt-3 border-t">
                      <div className="flex justify-between">
                        <span className="text-sm font-medium text-[#0f373d]">Total due</span>
                        <span className="text-lg font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
                      </div>
                    </div>
                  )}
                </div>
              </>
            )}

            <Button
              className="w-full mt-4 bg-[#0f373d] hover:bg-[#0f373d]/90 rounded-full py-3"
              onClick={() => router.push("/billing-details")}
            >
              Checkout
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}

