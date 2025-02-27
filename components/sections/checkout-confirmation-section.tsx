"use client"

import { ArrowLeft, X } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Checkbox } from "@/components/ui/checkbox"
import { useCart } from "@/contexts/CartContext"
import { useState } from "react"
import { format } from "date-fns"
import { useRouter } from "next/navigation"

export function CheckoutConfirmationSection() {
  const { items, removeFromCart, total, getHotelInfo } = useCart()
  const [showDiscountInput, setShowDiscountInput] = useState(false)
  const router = useRouter()

  const hotelInfo = getHotelInfo()

  const subtotal = total
  const platformFee = 0
  const tax = Math.round(subtotal * 0.1)
  const discount = 0
  const totalDue = subtotal + platformFee + tax - discount

  if (!hotelInfo) {
    return <div>No hotel information available</div>
  }

  return (
    <div className="container max-w-6xl mx-auto px-4 py-8">
      <Link
        href={`/hotels/${hotelInfo.id}`}
        className="inline-flex items-center text-[#0f373d] hover:text-[#0f373d]/80 mb-8"
      >
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to {hotelInfo.name}
      </Link>

      <div className="grid lg:grid-cols-[1fr,400px] gap-10">
        {/* Review Card Component */}
        <div className="bg-white rounded-lg p-6 w-full">
          <div>
            <h2 className="text-xl font-bold text-[#0f373d] mb-6">Cart</h2>
            <div className="flex gap-4 items-start mb-8">
              <div className="relative h-24 w-32 flex-shrink-0 overflow-hidden rounded-lg">
                <Image src={hotelInfo.image} alt={hotelInfo.name} fill className="object-cover" />
              </div>
              <div>
                <h3 className="text-xl font-semibold text-[#0f373d]">{hotelInfo.name}</h3>
                <p className="text-[#4f4f4f] mt-1">{hotelInfo.address}</p>
                <p className="text-[#4f4f4f] mt-1">{format(new Date(), "EEEE, MMMM d, yyyy")}</p>
              </div>
            </div>
          </div>
          <div className="space-y-6">
            {items.map((item) => (
              <div key={item.id} className="flex items-center justify-between py-4 border-t first:border-t-0">
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => removeFromCart(item.id)}
                    className="rounded-full border p-2 text-[#4f4f4f] hover:text-[#333333] hover:border-[#333333]"
                  >
                    <X className="h-4 w-4" />
                  </button>
                  <span className="text-[#0f373d]">
                    {item.name} - {item.options?.adults} adult, {item.options?.children} child
                    {item.options?.infants > 0 && `, ${item.options?.infants} infant`}
                  </span>
                </div>
                <span className="font-medium text-[#0f373d]">${item.price}</span>
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
              <div className="flex gap-2">
                <input type="text" placeholder="Enter coupon code" className="flex-grow rounded-md border px-3 py-2" />
                <Button variant="outline">Apply</Button>
              </div>
            )}

            <div className="flex items-center gap-3">
              <Checkbox id="updates" />
              <label htmlFor="updates" className="text-[#4f4f4f] leading-none">
                Keep me updated with special offers and exciting news
              </label>
            </div>
          </div>
        </div>

        {/* Summary Checkout Component */}
        <div>
          <div className="bg-white rounded-lg p-6 max-w-[400px]">
            <h2 className="text-xl font-bold text-[#0f373d] mb-6">Summary</h2>

            <div className="space-y-4">
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

              <div className="pt-4 border-t">
                <div className="flex justify-between">
                  <span className="font-bold text-[#0f373d]">Total due</span>
                  <span className="text-2xl font-bold text-[#0f373d]">${totalDue.toFixed(2)}</span>
                </div>
              </div>
            </div>

            <Button
              className="w-full mt-6 bg-[#0f373d] hover:bg-[#0f373d]/90"
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

