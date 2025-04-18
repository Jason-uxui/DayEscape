"use client"

import { useState, useEffect } from "react"
import { X, Minus, Plus, AlertTriangle, ChevronRight, Calendar as CalendarIcon } from "lucide-react"
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/lib/supabase"
import { useAuth } from "@/contexts/AuthContext"
import { DatePicker } from "@/components/common/date-picker"
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover"
import { Calendar } from "@/components/ui/calendar"
import { format } from "date-fns"
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
  // State để theo dõi tab nào đang active trên mobile
  const [activeTab, setActiveTab] = useState<'info' | 'booking'>('info')

  // Kiểm tra xem sản phẩm có bị Sold Out không
  const isSoldOut = availabilityStatus.toLowerCase().includes("sold out")

  // Kiểm tra xem tổng số người có vượt quá sức chứa không
  const isOverCapacity = productDetails ? (guestCount.adults + guestCount.children > productDetails.max_capacity) : false;

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
      // Reset về tab info khi mở dialog
      setActiveTab('info')
    }
  }, [productId, open])

  const updateGuestCount = (type: keyof GuestCount, increment: boolean) => {
    if (increment) {
      // Kiểm tra giới hạn khi tăng số lượng
      const currentTotal = guestCount.adults + guestCount.children;

      // Nếu đang tăng Adults hoặc Children và đã đạt giới hạn
      if ((type === "adults" || type === "children") && currentTotal >= productDetails!.max_capacity) {
        toast({
          variant: "default",
          description: (
            <div className="flex items-center">
              <AlertTriangle className="h-5 w-5 text-red-600 mr-2 flex-shrink-0" />
              <span>Sorry, this product has a maximum occupancy of {productDetails!.max_capacity}</span>
            </div>
          ),
          className: "rounded-full bg-white border border-gray-200 shadow-md",
        });
        return; // Không tăng thêm
      }
    }

    // Tiếp tục với logic tăng/giảm số lượng
    setGuestCount((prev) => ({
      ...prev,
      [type]: increment ? prev[type] + 1 : Math.max(0, prev[type] - 1),
    }));
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
      <DialogContent className="max-w-[1000px] w-[94%] sm:w-[90%] md:w-[85%] mx-auto h-[85vh] p-0 overflow-hidden rounded-lg flex flex-col">
        <button
          onClick={() => onOpenChange(false)}
          className="absolute right-4 top-4 z-50 rounded-sm opacity-70 ring-offset-background transition-opacity hover:opacity-100 hover:text-[#0C363E] focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-[#0C363E]"
        >
          <X className="h-4 w-4" />
          <span className="sr-only">Close</span>
        </button>

        {/* Mobile Tabs - Chỉ hiển thị trên mobile */}
        <div className="md:hidden border-b sticky top-0 bg-white z-40 rounded-t-lg">
          <div className="flex">
            <button
              className={`flex-1 py-3 text-center ${activeTab === 'info' ? 'border-b-2 border-[#0f373d] text-[#0f373d] font-medium' : 'text-[#4f4f4f]'}`}
              onClick={() => setActiveTab('info')}
            >
              Product Info
            </button>
            <button
              className={`flex-1 py-3 text-center ${activeTab === 'booking' ? 'border-b-2 border-[#0f373d] text-[#0f373d] font-medium' : 'text-[#4f4f4f]'}`}
              onClick={() => setActiveTab('booking')}
            >
              Booking
            </button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 flex-1 overflow-hidden">
          {/* Left Column - Product Details */}
          <div className={`${activeTab === 'info' ? 'block' : 'hidden'} md:block bg-[#FDFAF5] h-full flex flex-col overflow-hidden`}>
            <div className="overflow-y-auto h-full pb-[76px]">
              <div className="p-4 md:p-6">
                <DialogHeader className="md:block hidden">
                  <DialogTitle>{productDetails.name}</DialogTitle>
                </DialogHeader>

                {/* Mobile Dialog Title - Chỉ hiển thị trên mobile */}
                <h2 className="text-xl font-semibold text-[#333333] md:hidden">{productDetails.name}</h2>

                <div className="mt-4 md:mt-6">
                  <div className="relative aspect-[4/3] overflow-hidden rounded-lg w-full">
                    <img
                      src={selectedImage || productDetails.images[0]}
                      alt={`${productDetails.name} main view`}
                      className="absolute inset-0 h-full w-full object-cover"
                    />
                  </div>

                  <div className="mt-4 flex gap-2 overflow-x-auto pb-2 snap-x">
                    {productDetails.images.map((image, index) => (
                      <button
                        key={index}
                        onClick={() => setSelectedImage(image)}
                        className={cn(
                          "relative flex-none aspect-[4/3] w-16 md:w-20 overflow-hidden rounded-lg border-2 snap-center",
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

                <div className="mt-6 md:mt-8">
                  <h3 className="text-lg font-semibold text-[#333333]">{productDetails.name} Details</h3>
                  <p className="mt-2 md:mt-4 text-[#4f4f4f]">{productDetails.description}</p>
                </div>
              </div>
            </div>

            {/* Button to navigate to booking tab - Chỉ hiển thị trên mobile */}
            <div className="p-4 md:hidden bg-[#FDFAF5] border-t fixed bottom-0 left-0 right-0 z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.05)]">
              <Button
                className="w-full bg-[#0f373d] hover:bg-[#0f373d]/90"
                onClick={() => setActiveTab('booking')}
              >
                Continue to Booking <ChevronRight className="ml-1 h-4 w-4" />
              </Button>
            </div>
          </div>

          {/* Right Column - Booking Details */}
          <div className={`${activeTab === 'booking' ? 'block' : 'hidden'} md:block border-t-0 md:border-l md:border-t-0 bg-white h-full flex flex-col overflow-hidden`}>
            <div className="overflow-y-auto h-full pb-[76px]">
              <div className="p-4 md:p-6">
                <h2 className="text-xl font-semibold text-[#333333]">Who's coming?</h2>

                <div className="mt-6 space-y-5 md:space-y-6">
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
                        <Button
                          variant="outline"
                          className="flex items-center gap-2 rounded-lg border bg-white px-4 py-2 text-[#4f4f4f] hover:border-[#0f373d] hover:text-[#0f373d] w-auto"
                        >
                          <CalendarIcon className="h-4 w-4" />
                          {date ? format(date, "EEE dd MMM yyyy") : "Select date"}
                        </Button>
                      </PopoverTrigger>
                      <PopoverContent className="w-auto p-0 z-[9999]" align="start">
                        <Calendar
                          mode="single"
                          selected={date}
                          onSelect={setDate}
                          initialFocus
                        />
                      </PopoverContent>
                    </Popover>
                    <span className="rounded bg-orange-100 px-2 py-1 text-xs text-orange-600 whitespace-nowrap">
                      Only {productDetails.max_capacity - (guestCount.adults + guestCount.children)} left
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Footer với giá và nút thêm vào giỏ hàng - Fixed */}
            <div className="p-4 md:p-6 border-t fixed bottom-0 left-0 md:left-auto right-0 bg-white z-30 shadow-[0_-2px_10px_rgba(0,0,0,0.05)] w-full md:w-[50%]">
              <div className="flex items-center justify-between w-full">
                <div className="text-lg font-medium">Total</div>
                <div className="text-lg font-medium">${calculateTotal()}</div>
              </div>
              <Button
                onClick={handleAddToCart}
                disabled={isSubmitting || isSoldOut || !date || !user || isOverCapacity}
                className="w-full mt-3 bg-[#0f373d] hover:bg-[#0f373d]/90 rounded-full py-3"
              >
                {isSubmitting
                  ? "Adding to Cart..."
                  : isSoldOut
                    ? "Sold Out"
                    : isOverCapacity
                      ? "Exceeds Capacity"
                      : "Add to Cart"
                }
              </Button>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}

