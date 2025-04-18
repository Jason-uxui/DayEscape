"use client"

import { useState, useEffect } from "react"
import Image from "next/image"
import { ChevronDown, ChevronUp } from "lucide-react"
import { useCart } from "@/contexts/CartContext"
import { Button } from "@/components/ui/button"
import { format } from "date-fns"

interface SummaryComponentProps {
  onSubmit: () => void
  hotelInfo: {
    id: string
    name: string
    image: string
    address: string
  }
  isSubmitting?: boolean
}

export function SummaryComponent({ onSubmit, hotelInfo, isSubmitting }: SummaryComponentProps) {
  const [isDetailsOpen, setIsDetailsOpen] = useState(false)
  const { items, total } = useCart()
  const [isMobile, setIsMobile] = useState(false)

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

  return (
    <div className={`bg-white rounded-lg p-6 w-full max-w-[400px] ${isMobile ? 'fixed bottom-0 left-0 right-0 z-40 rounded-t-lg border-t shadow-[0_-4px_12px_rgba(0,0,0,0.1)]' : ''}`}>
      {!isMobile && <h2 className="text-xl font-bold text-[#0f373d] mb-6">Summary</h2>}

      {/* Hotel Details */}
      {!isMobile && (
        <div className="flex gap-4 items-start mb-6">
          <div className="relative h-16 w-20 flex-shrink-0 overflow-hidden rounded-lg">
            <Image src={hotelInfo.image || "/placeholder.svg"} alt={hotelInfo.name} fill className="object-cover" />
          </div>
          <div>
            <h3 className="font-semibold text-[#0f373d]">{hotelInfo.name}</h3>
            <p className="text-sm text-[#4f4f4f]">{hotelInfo.address}</p>
            <p className="text-sm text-[#4f4f4f]">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
          </div>
        </div>
      )}

      {/* Simplified Mobile View with Toggle */}
      {isMobile && !isDetailsOpen ? (
        <div className="flex justify-between items-center mb-0">
          <div className="flex items-center gap-2">
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
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
                  onClick={() => setIsDetailsOpen(!isDetailsOpen)}
                  className="text-[#0f373d] p-1 rounded-full border border-gray-200"
                >
                  <ChevronDown className="h-4 w-4" />
                </button>
                <span className="text-sm font-medium text-[#0f373d]">Total due</span>
              </div>
              <span className="text-lg font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
            </div>
          )}

          {/* Itemized List - Hide on Mobile when collapsed */}
          <div className={`space-y-4 ${isMobile ? 'mt-4 border-b pb-4' : 'mb-6 border-b pb-4'} ${isMobile && !isDetailsOpen ? 'hidden' : 'block'}`}>
            {items.map((item) => (
              <div key={item.id} className="flex justify-between items-start">
                <div className={`${isMobile ? 'text-sm' : 'text-lg'} text-[#333333]`}>
                  {item.name} - {item.options?.adults} adult
                  {item.options?.children && item.options.children > 0 && `, ${item.options.children} child`}
                  {item.options?.infants && item.options.infants > 0 && `, ${item.options.infants} infant`}
                  <span className="text-[#4f4f4f]"> (${item.price})</span>
                </div>
                <div className={`${isMobile ? 'text-sm' : 'text-lg'} font-medium text-[#333333]`}>${item.price}</div>
              </div>
            ))}
          </div>

          {/* Details Toggle - Only show in desktop */}
          {!isMobile && (
            <button
              onClick={() => setIsDetailsOpen(!isDetailsOpen)}
              className="flex items-center gap-2 text-[#0f373d] hover:text-[#0f373d]/80 w-full mb-4"
            >
              <span className="font-medium">Details</span>
              {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </button>
          )}

          {/* Collapsible Details - Always visible on mobile when expanded */}
          {(isDetailsOpen || isMobile) && (
            <div className={`space-y-3 ${isMobile ? 'mt-4' : 'mb-6'}`}>
              <div className="flex justify-between">
                <span className={`${isMobile ? 'text-xs' : ''} text-[#4f4f4f]`}>Subtotal</span>
                <span className={`${isMobile ? 'text-xs' : ''} font-medium`}>${subtotal.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className={`${isMobile ? 'text-xs' : ''} text-[#4f4f4f]`}>Platform Fee</span>
                <span className={`${isMobile ? 'text-xs' : ''} font-medium`}>-${platformFee.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className={`${isMobile ? 'text-xs' : ''} text-[#4f4f4f]`}>Tax</span>
                <span className={`${isMobile ? 'text-xs' : ''} font-medium`}>${tax.toFixed(2)}</span>
              </div>

              <div className="flex justify-between">
                <span className={`${isMobile ? 'text-xs' : ''} text-[#4f4f4f]`}>Discount</span>
                <span className={`${isMobile ? 'text-xs' : ''} font-medium`}>-${discount.toFixed(2)}</span>
              </div>
            </div>
          )}

          {/* Total Section - Only show on desktop or when not mobile */}
          {!isMobile && (
            <div className="pt-4 border-t">
              <div className="flex justify-between items-center">
                <span className="font-bold text-[#0f373d]">Total</span>
                <span className="text-2xl font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
              </div>
            </div>
          )}
        </>
      )}

      <Button
        onClick={onSubmit}
        disabled={isSubmitting}
        className="w-full mt-4 bg-[#0f373d] hover:bg-[#0f373d]/90 rounded-full py-3"
      >
        {isSubmitting ? "Processing..." : "Complete Booking"}
      </Button>
    </div>
  )
}

