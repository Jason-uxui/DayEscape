"use client"

import { useState } from "react"
import { ArrowLeft, Plus, Check } from "lucide-react"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import Image from "next/image"
import { useRouter } from "next/navigation"

export function RefundBookingSection() {
  const [isSuccess, setIsSuccess] = useState(false)
  const router = useRouter()

  if (isSuccess) {
    return (
      <div className="container max-w-[600px] mx-auto px-4 py-8">
        <div className="flex flex-col items-center justify-center min-h-[60vh] text-center">
          {/* Success Icon */}
          <div className="relative">
            <div className="w-24 h-24 rounded-full bg-[#cb5f06] flex items-center justify-center mb-8">
              <Check className="w-12 h-12 text-white" />
            </div>
            {/* Decorative dots */}
            <div className="absolute -top-4 -right-4 w-4 h-4 rounded-full bg-[#fbae70]" />
            <div className="absolute -bottom-2 -left-4 w-3 h-3 rounded-full bg-[#fbae70]" />
            <div className="absolute top-1/2 -right-6 w-2 h-2 rounded-full bg-[#fbae70]" />
          </div>

          {/* Success Message */}
          <h1 className="text-3xl font-semibold text-[#212121] mb-4">Successful!</h1>
          <p className="text-[#212121] mb-8 max-w-md">
            You have successfully cancelled your order. Funds will be returned to yours.
          </p>

          {/* Back to Home Button */}
          <Button
            onClick={() => router.push("/")}
            className="w-full max-w-md bg-[#0f373d] hover:bg-[#0f373d]/90 text-white py-6 rounded-full"
          >
            Back to home
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="container max-w-[600px] mx-auto px-4 py-8">
      <Link href="/users/my-bookings" className="inline-flex items-center text-[#0f373d] hover:text-[#0f373d]/80 mb-8">
        <ArrowLeft className="mr-2 h-4 w-4" />
        Back to My Bookings
      </Link>

      <p className="text-[#424242] text-center mb-6">
        Please select a payment refund method (only 80% will be refunded).
      </p>

      {/* Amount Card */}
      <div className="bg-white rounded-xl p-6 mb-4 flex justify-between items-center">
        <div className="text-[#424242]">
          Paid: <span className="font-medium text-[#212121]">$479.5</span>
        </div>
        <div className="text-[#424242]">
          Refund: <span className="font-medium text-[#212121]">$383.8</span>
        </div>
      </div>

      {/* Refund Options */}
      <div className="bg-white rounded-xl p-6 mb-4">
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Refund Options</h2>
        <RadioGroup defaultValue="credit" className="space-y-4">
          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="space-y-1">
              <Label className="text-base font-medium text-[#212121]">Instant Refund as Credit</Label>
              <p className="text-sm text-[#424242]">
                The refunded amount will be instantly credited to your DayEscape account and can be used immediately for
                a new booking.
              </p>
            </div>
            <RadioGroupItem value="credit" className="border-[#238699] text-[#238699]" />
          </div>

          <div className="flex items-center justify-between p-4 rounded-lg border">
            <div className="space-y-1">
              <Label className="text-base font-medium text-[#212121]">Funds Refund Request</Label>
              <p className="text-sm text-[#424242]">
                The refunded amount will be sent back to your original payment method (Processing time: 3-10 business
                days).
              </p>
            </div>
            <RadioGroupItem value="refund" className="border-[#238699] text-[#238699]" />
          </div>
        </RadioGroup>
      </div>

      {/* Payment Details */}
      <div className="bg-white rounded-xl p-6 mb-6">
        <h2 className="text-lg font-semibold text-[#212121] mb-4">Payment Details</h2>

        <RadioGroup defaultValue="card-2" className="space-y-4">
          {/* Apple Pay */}
          <div className="mb-4">
            <div className="flex items-center justify-between p-4 rounded-lg border mb-2">
              <div className="flex items-center gap-3">
                <Image
                  src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-1xv5AMO1wUoxY1IZu2aNdNl6BpcjD4.png"
                  alt="Apple Pay"
                  width={24}
                  height={24}
                  className="w-6 h-6"
                />
                <span className="text-[#212121]">Apple Pay</span>
              </div>
              <RadioGroupItem value="apple-pay" className="border-[#238699] text-[#238699]" />
            </div>
          </div>

          {/* Debit/Credit Cards */}
          <div className="mb-8">
            <div className="text-[#212121] mb-2">Debit/Credit Card</div>
            <div className="space-y-2">
              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-1xv5AMO1wUoxY1IZu2aNdNl6BpcjD4.png"
                    alt="Mastercard"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-[#212121]">•••• •••• 4679</span>
                </div>
                <RadioGroupItem value="card-1" className="border-[#238699] text-[#238699]" />
              </div>

              <div className="flex items-center justify-between p-4 rounded-lg border">
                <div className="flex items-center gap-3">
                  <Image
                    src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-1xv5AMO1wUoxY1IZu2aNdNl6BpcjD4.png"
                    alt="Mastercard"
                    width={24}
                    height={24}
                    className="w-6 h-6"
                  />
                  <span className="text-[#212121]">•••• •••• 6167</span>
                </div>
                <RadioGroupItem value="card-2" className="border-[#238699] text-[#238699]" />
              </div>
            </div>
          </div>
        </RadioGroup>

        {/* Add New Card Button */}
        <Button
          variant="outline"
          className="w-full flex items-center justify-center gap-2 text-[#212121] mt-4 border-[#e0e0e0]"
        >
          <Plus className="w-4 h-4" />
          Add New Card
        </Button>
      </div>

      {/* Confirm Button */}
      <Button
        onClick={() => setIsSuccess(true)}
        className="w-full bg-[#0c363e] hover:bg-[#0c363e]/90 text-white py-6 rounded-full"
      >
        Confirm Cancellation
      </Button>
    </div>
  )
}

