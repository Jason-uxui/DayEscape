"use client"

import { X } from "lucide-react"
import { QRCodeSVG } from "qrcode.react"
import { Dialog, DialogContent } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"

interface CheckInDialogProps {
  open: boolean
  onOpenChange: (open: boolean) => void
  bookingId: string
}

export function CheckInDialog({ open, onOpenChange, bookingId }: CheckInDialogProps) {
  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-md p-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:text-[#0C363E] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-[#0C363E]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="p-6 text-center">
          <h2 className="text-xl font-semibold text-[#0f373d]">Check-in QR Code</h2>
          <p className="text-sm text-[#4f4f4f] mt-1">Booking ID: {bookingId}</p>

          <div className="mt-6 flex justify-center">
            <QRCodeSVG value={`booking-${bookingId}`} size={200} level="H" includeMargin />
          </div>

          <div className="mt-8 space-y-4 border-t border-dashed pt-6">
            <p className="text-[#4f4f4f]">Please present this QR code at the hotel reception for check-in.</p>
          </div>

          <Button variant="secondary" size="lg" className="w-full mt-6" onClick={() => onOpenChange(false)}>
            Close
          </Button>
        </div>
      </DialogContent>
    </Dialog>
  )
}

