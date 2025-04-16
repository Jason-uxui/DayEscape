"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, Calendar } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar as CalendarComponent } from "@/components/ui/calendar"
import { format } from "date-fns"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"
// import { createBooking } from "@/app/actions/create-booking"
// import { useTransition } from "react"
// import { useFormStatus } from "react-dom"

interface ProductDialogProps {
  productId: string
  open: boolean
  onOpenChange: (open: boolean) => void
  availabilityStatus?: string
}

interface GuestCount {
  adults: number
  children: number
  infants: number
}

interface ProductDetails {
  id: string
  name: string
  base_price: number
  type: string
  max_capacity: number
  images: string[]
  description: string
  hotels: {
    id: string
    name: string
    card_image: string
    display_address: string
  }
}

export function ProductDialog({ productId, open, onOpenChange, availabilityStatus = "" }: ProductDialogProps) {
  const { toast } = useToast()
  const { addToCart } = useCart()
  const { user } = useAuth()
  const [selectedImage, setSelectedImage] = useState<string | null>(null)
  const [guestCount, setGuestCount] = useState<GuestCount>({
    adults: 2,
    children: 0,
    infants: 0,
  })
  const [date, setDate] = useState<Date | undefined>(new Date())
  const [productDetails, setProductDetails] = useState<ProductDetails | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)

  // Kiểm tra xem sản phẩm có bị Sold Out không
  const isSoldOut = availabilityStatus.toLowerCase().includes("sold out")

  useEffect(() => {
    async function fetchProductDetails() {
      const { data, error } = await supabase
        .from("products")
        .select(`
          id, 
          name, 
          base_price, 
          type, 
          max_capacity, 
          images, 
          description,
          hotels!inner(
            id,
            name,
            card_image,
            display_address
          )
        `)
        .eq("id", productId)
        .single()

      if (error) {
        console.error("Error fetching product details:", error)
        return
      }

      if (data) {
        setProductDetails(data as unknown as ProductDetails)
        if (data.images && data.images.length > 0) {
          setSelectedImage(data.images[0])
        }
      }
    }

    if (open && productId) {
      fetchProductDetails()
    }
  }, [productId, open])

  const updateGuestCount = (type: keyof GuestCount, increment: boolean) => {
    setGuestCount((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }))
  }

  const calculateTotal = () => {
    if (!productDetails) return 0
    return productDetails.base_price * (guestCount.adults + guestCount.children)
  }

  const handleAddToCart = () => {
    // Kiểm tra trạng thái Sold Out
    if (isSoldOut) {
      toast({
        variant: "destructive",
        title: "Product is sold out",
        description: "This product is currently not available.",
        className: "rounded-full",
      })
      return
    }

    if (!user) {
      toast({
        variant: "destructive",
        title: "Please log in to make a booking",
        description: "You need to be logged in to create a booking.",
        className: "rounded-full",
      })
      return
    }

    if (productDetails && date) {
      setIsSubmitting(true)
      const total = calculateTotal()
      addToCart({
        id: productDetails.id,
        name: productDetails.name,
        quantity: 1,
        price: total,
        hotel: {
          id: productDetails.hotels.id,
          name: productDetails.hotels.name,
          image: productDetails.hotels.card_image,
          address: productDetails.hotels.display_address,
        },
        options: { ...guestCount, date: date.toISOString() },
      })
      onOpenChange(false)
      toast({
        variant: "default",
        title: `${productDetails.name} added to cart`,
        description: "Your item has been added to the cart.",
        className: "rounded-full",
      })
      setIsSubmitting(false)
    } else {
      toast({
        variant: "destructive",
        title: "Unable to add to cart",
        description: "Please ensure all details are filled out.",
        className: "rounded-full",
      })
    }
  }

  if (!productDetails) {
    return null
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="max-w-[1000px] w-full h-[calc(100vh-88px)] p-0 overflow-hidden">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:text-[#0C363E] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-[#0C363E]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        <div className="grid md:grid-cols-2 h-full overflow-hidden">
          {/* Left Column - Product Details */}
          <div className="p-6 overflow-y-auto bg-[#FDFAF5] h-full w-full">
            <DialogHeader>
              <DialogTitle>{productDetails.name}</DialogTitle>
            </DialogHeader>

            <div className="mt-6">
              <div className="relative aspect-[4/3] overflow-hidden rounded-lg w-full">
                <img
                  src={selectedImage || productDetails.images[0]}
                  alt={`${productDetails.name} main view`}
                  className="absolute inset-0 h-full w-full object-cover"
                />
              </div>

              <div className="mt-4 flex gap-2 overflow-x-auto pb-2">
                {productDetails.images.map((image, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedImage(image)}
                    className={cn(
                      "relative flex-none aspect-[4/3] w-20 overflow-hidden rounded-lg border-2",
                      selectedImage === image ? "border-[#0f373d]" : "border-transparent",
                    )}
                  >
                    <img
                      src={image || "/placeholder.svg"}
                      alt={`${productDetails.name} thumbnail ${index + 1}`}
                      className="absolute inset-0 h-full w-full object-cover"
                      style={{ objectPosition: "center" }}
                    />
                  </button>
                ))}
              </div>
            </div>

            <div className="mt-8">
              <h3 className="text-lg font-semibold text-[#333333]">{productDetails.name} Details</h3>
              <p className="mt-4 text-[#4f4f4f]">{productDetails.description}</p>
            </div>
          </div>

          {/* Right Column - Booking Details */}
          <div className="border-t md:border-l md:border-t-0 bg-white p-6 overflow-y-auto h-full">
            <h2 className="text-xl font-semibold text-[#333333]">Who's coming?</h2>

            <div className="mt-6 space-y-6">
              {/* Adults */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#333333]">
                    Adult <span className="text-[#4f4f4f]">(Over 18)</span>
                  </div>
                  <div className="text-sm text-[#4f4f4f]">Starting at ${productDetails.base_price}</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateGuestCount("adults", false)}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-4 text-center">{guestCount.adults}</span>
                  <button
                    onClick={() => updateGuestCount("adults", true)}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Children */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#333333]">
                    Child <span className="text-[#4f4f4f]">(Under 17)</span>
                  </div>
                  <div className="text-sm text-[#4f4f4f]">Starting at ${productDetails.base_price}</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateGuestCount("children", false)}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-4 text-center">{guestCount.children}</span>
                  <button
                    onClick={() => updateGuestCount("children", true)}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Infants */}
              <div className="flex items-center justify-between">
                <div>
                  <div className="font-medium text-[#333333]">
                    Infant <span className="text-[#4f4f4f]">(Under 2)</span>
                  </div>
                  <div className="text-sm text-[#4f4f4f]">Free</div>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => updateGuestCount("infants", false)}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]"
                  >
                    <Minus className="h-4 w-4" />
                  </button>
                  <span className="w-4 text-center">{guestCount.infants}</span>
                  <button
                    onClick={() => updateGuestCount("infants", true)}
                    className="rounded-full border h-8 w-8 flex items-center justify-center text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]"
                  >
                    <Plus className="h-4 w-4" />
                  </button>
                </div>
              </div>

              {/* Date Selection */}
              <div className="flex items-center justify-between space-x-4">
                <Popover>
                  <PopoverTrigger asChild>
                    <button className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d]">
                      <Calendar className="h-4 w-4" />
                      <span>{date ? format(date, "EEE dd MMM yyyy") : "Select date"}</span>
                    </button>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <CalendarComponent mode="single" selected={date} onSelect={setDate} initialFocus />
                  </PopoverContent>
                </Popover>
                <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-600 whitespace-nowrap">
                  Only {productDetails.max_capacity - (guestCount.adults + guestCount.children)} left
                </span>
              </div>

              {/* Total */}
              <div className="mt-8 flex flex-col gap-5">
                <div className="flex items-center justify-between">
                  <div className="text-lg font-medium">Total</div>
                  <div className="text-lg font-medium">${calculateTotal()}</div>
                </div>

                <Button
                  onClick={handleAddToCart}
                  disabled={isSubmitting || isSoldOut || !date || !user}
                  className="w-full"
                >
                  {isSubmitting
                    ? "Adding to Cart..."
                    : isSoldOut
                      ? "Sold Out"
                      : "Add to Cart"
                  }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

