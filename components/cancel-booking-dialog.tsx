"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Dialog, DialogContent, DialogTitle, DialogDescription, DialogFooter } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { Label } from "@/components/ui/label"
import { useRouter } from "next/navigation"

interface CancelBookingDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  onCancel: () => void
  onSubmit: (reason: string, details: string) => void
}

export function CancelBookingDialog({ open, onOpenChange, onCancel, onSubmit }: CancelBookingDialogProps) {
  const [reason, setReason] = useState("")
  const [details, setDetails] = useState("")
  const [showDetails, setShowDetails] = useState(false)
  const router = useRouter()

  const handleSubmit = () => {
    onSubmit(reason, showDetails ? details : "")
    onOpenChange(false)
    router.push("/refund-booking")
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden bg-[#FDFAF5]">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:text-[#0C363E] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-[#0C363E]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>
        <div className="p-8">
          <DialogTitle className="text-red-500 text-left mb-4">Cancel Booking</DialogTitle>
          <DialogDescription className="text-[#4f4f4f] text-left mb-6">Reason for canceling booking</DialogDescription>
          <RadioGroup
            value={reason}
            onValueChange={(value) => {
              setReason(value)
              setShowDetails(value === "other")
            }}
            className="space-y-2"
          >
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="date" id="date" className="border-[#0F373D] text-[#0F373D]" />
              <Label htmlFor="date" className="text-[#0f373d]">
                Request another date
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="credit" id="credit" className="border-[#0F373D] text-[#0F373D]" />
              <Label htmlFor="credit" className="text-[#0f373d]">
                Request a Credit
              </Label>
            </div>
            <div className="flex items-center space-x-2">
              <RadioGroupItem value="other" id="other" className="border-[#0F373D] text-[#0F373D]" />
              <Label htmlFor="other" className="text-[#0f373d]">
                Other
              </Label>
            </div>
          </RadioGroup>
          {showDetails && (
            <>
              <Label htmlFor="more-details" className="mt-4 text-[#4f4f4f] block">
                More details
              </Label>
              <textarea
                id="more-details"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
                className="w-full mt-1 rounded-md border border-[#e5e7eb] p-2 h-20 focus:outline-none focus:ring-2 focus:ring-[#0F373D] focus:border-transparent"
              />
            </>
          )}
          <p className="text-xs text-[#4f4f4f] mt-4">
            Only 80% of the money you can refund from your payment according to our policy
          </p>
          <DialogFooter className="mt-6 pt-4 border-t">
            <Button
              type="button"
              variant="secondary"
              onClick={onCancel}
              className="w-full sm:w-auto bg-[#f6ddb8] text-[#0f373d] hover:bg-[#f6ddb8]/90 mr-2"
            >
              Cancel
            </Button>
            <Button
              type="button"
              onClick={handleSubmit}
              className="w-full sm:w-auto bg-[#0f373d] hover:bg-[#0f373d]/90 text-white"
            >
              Submit request
            </Button>
          </DialogFooter>
        </div>
      </DialogContent>
    </Dialog>
  )
}

