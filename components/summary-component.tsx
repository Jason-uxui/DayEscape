"use client"

import { useState } from "react"
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

  const subtotal = total
  const platformFee = 0
  const tax = Math.round(subtotal * 0.1)
  const discount = 0
  const totalDue = subtotal + platformFee + tax - discount

  return (
    <div className="bg-white rounded-lg p-6 w-full max-w-[400px]">
      <h2 className="text-xl font-bold text-[#0f373d] mb-6">Summary</h2>

      {/* Hotel Details */}
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

      {/* Itemized List */}
      <div className="space-y-4 mb-6 border-b pb-4">
        {items.map((item) => (
          <div key={item.id} className="flex justify-between items-start">
            <div className="text-[#333333] text-lg">
              {item.name} - {item.options?.adults} adult
              {item.options?.children > 0 && `, ${item.options?.children} child`}
              {item.options?.infants > 0 && `, ${item.options?.infants} infant`}
              <span className="text-[#4f4f4f]"> (${item.price})</span>
            </div>
            <div className="text-lg font-medium text-[#333333]">${item.price}</div>
          </div>
        ))}
      </div>

      {/* Details Toggle */}
      <button
        onClick={() => setIsDetailsOpen(!isDetailsOpen)}
        className="flex items-center gap-2 text-[#0f373d] hover:text-[#0f373d]/80 w-full mb-4"
      >
        <span className="font-medium">Details</span>
        {isDetailsOpen ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
      </button>

      {/* Collapsible Details */}
      {isDetailsOpen && (
        <div className="space-y-4 mb-6">
          <div className="flex justify-between">
            <span className="text-[#4f4f4f]">Subtotal</span>
            <span className="font-medium">${subtotal.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#4f4f4f]">Platform Fee</span>
            <span className="font-medium">-${platformFee.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#4f4f4f]">Tax</span>
            <span className="font-medium">${tax.toFixed(2)}</span>
          </div>

          <div className="flex justify-between">
            <span className="text-[#4f4f4f]">Discount</span>
            <span className="font-medium">-${discount.toFixed(2)}</span>
          </div>
        </div>
      )}

      {/* Total Section */}
      <div className="pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-bold text-[#0f373d]">Total</span>
          <span className="text-2xl font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
        </div>
      </div>

      <Button onClick={onSubmit} disabled={isSubmitting} className="w-full mt-6 bg-[#0f373d] hover:bg-[#0f373d]/90">
        {isSubmitting ? "Processing..." : "Complete Booking"}
      </Button>
    </div>
  )
}

