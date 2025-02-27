import { Button } from "@/components/ui/button"

interface BookingSummaryCardProps {
  totalPrice: number
  onCancel: () => void
  onUpdate: () => void
}

export function BookingSummaryCard({ totalPrice, onCancel, onUpdate }: BookingSummaryCardProps) {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <h3 className="text-xl font-semibold text-[#0f373d] mb-4">Booking Summary</h3>
      <div className="space-y-4 mb-6">
        <div className="flex justify-between items-center">
          <span className="text-[#4f4f4f]">Subtotal</span>
          <span className="font-medium text-[#0f373d]">${totalPrice.toFixed(2)}</span>
        </div>
        <div className="flex justify-between items-center">
          <span className="text-[#4f4f4f]">Taxes & Fees</span>
          <span className="font-medium text-[#0f373d]">$0.00</span>
        </div>
        <div className="flex justify-between items-center font-semibold">
          <span className="text-[#0f373d]">Total</span>
          <span className="text-xl text-[#0f373d]">${totalPrice.toFixed(2)}</span>
        </div>
      </div>
      <div className="space-y-3">
        <Button onClick={onCancel} variant="outline" className="w-full border-red-500 text-red-500 hover:bg-red-50">
          Cancel Booking
        </Button>
        <Button
          onClick={onUpdate}
          variant="secondary"
          className="w-full bg-[#f6ddb8] text-[#0f373d] hover:bg-[#f6ddb8]/90"
        >
          Update Booking
        </Button>
      </div>
    </div>
  )
}

