"use client"

import { X, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useState } from "react"
import { format } from "date-fns"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { cn } from "@/lib/utils"

export default function CartSidebar() {
  const { items, removeFromCart, total, updateEscapeDate } = useCart()
  const router = useRouter()
  const [date, setDate] = useState<Date>(new Date())

  const handleDateSelect = (newDate: Date | undefined) => {
    if (newDate) {
      setDate(newDate)
      updateEscapeDate(newDate)
    }
  }

  const handleReserve = () => {
    router.push("/checkout-confirmation")
  }

  return (
    <div className="w-[400px] sticky top-[88px] self-start">
      <div className="p-4 bg-white rounded-md border flex flex-col">
        {/* Header */}
        <div>
          <h2 className="text-xl font-bold text-[#333333] mb-2">Your Cart</h2>

          {/* Escape Day Section */}
          <div className="bg-white rounded-lg border p-4 mb-4">
            <div className="text-sm text-[#4f4f4f] mb-1">Escape day</div>
            <Popover>
              <PopoverTrigger asChild>
                <button className="flex w-full items-center gap-2 text-left font-medium text-[#333333]">
                  <Calendar className="h-5 w-5 text-[#4f4f4f]" />
                  <span>{format(date, "MMM d, yyyy")}</span>
                </button>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <CalendarComponent
                  mode="single"
                  selected={date}
                  onSelect={handleDateSelect}
                  initialFocus
                  className="rounded-md border"
                  classNames={{
                    day_selected:
                      "bg-[#0C363E] text-white hover:bg-[#0C363E] hover:text-white focus:bg-[#0C363E] focus:text-white",
                    day_today: "bg-accent text-accent-foreground",
                    day: cn("h-9 w-9 p-0 font-normal aria-selected:opacity-100"),
                  }}
                />
              </PopoverContent>
            </Popover>
          </div>
        </div>

        {/* Scrollable product list */}
        <div className="flex-grow overflow-y-auto mt-4 mb-4 max-h-[calc(100vh-250px)]">
          <div className="space-y-4">
            {items.map((item) => (
              <div key={item.id} className="flex items-start justify-between rounded-lg border p-4">
                <div>
                  <div className="flex items-center gap-2">
                    <span className="font-medium text-[#333333]">{item.name}</span>
                    <span className="text-sm text-[#4f4f4f]">
                      - {item.options?.adults} adult, {item.options?.children} child, {item.options?.infants} infant
                    </span>
                  </div>
                  <span className="text-sm text-[#4f4f4f]">(${item.price})</span>
                  {item.options?.date && (
                    <div className="text-sm text-[#4f4f4f] mt-1">
                      Date: {format(new Date(item.options.date), "MMM d, yyyy")}
                    </div>
                  )}
                </div>
                <button className="text-[#4f4f4f] hover:text-[#333333]" onClick={() => removeFromCart(item.id)}>
                  <X className="h-4 w-4" />
                </button>
              </div>
            ))}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-4 pt-4 border-t">
          <div className="flex items-center justify-between">
            <span className="font-medium text-[#333333]">Total</span>
            <span className="text-xl font-bold text-[#333333]">${total}</span>
          </div>
          <Button className="mt-6 w-full bg-[#0f373d] hover:bg-[#0f373d]/90" onClick={handleReserve}>
            Reserve
          </Button>
        </div>
      </div>
    </div>
  )
}

