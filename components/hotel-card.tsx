import Link from "next/link"
import Image from "next/image"
import type { Hotel } from "@/types/hotel"

interface HotelCardProps {
  hotel: Hotel
  isSelected: boolean
  onSelect: () => void
}

export function HotelCard({ hotel, isSelected, onSelect }: HotelCardProps) {
  const sortedProducts = hotel.products.sort((a, b) => {
    if (a.type.toLowerCase() === "day pass") return -1
    if (b.type.toLowerCase() === "day pass") return 1
    return a.base_price - b.base_price
  })

  const displayProducts = sortedProducts.slice(0, 3)
  const additionalProducts = sortedProducts.length - 3

  const defaultImage = "/placeholder.svg?height=300&width=400"

  return (
    <Link
      href={`/hotels/${encodeURIComponent(hotel.name.replace(/ /g, "-").toLowerCase())}`}
      className={`block p-4 sm:p-6 hover:bg-[#fdfaf5] transition-colors ${isSelected ? "bg-[#fdfaf5]" : ""}`}
      onMouseEnter={onSelect}
    >
      {/* Desktop Layout: Horizontal card with image left, content right */}
      <div className="hidden sm:flex gap-4 sm:gap-6 items-start">
        <div className="relative h-[120px] w-[180px] flex-shrink-0 overflow-hidden rounded-xl">
          <Image
            src={hotel.card_image && hotel.card_image.trim() !== "" ? hotel.card_image : defaultImage}
            alt={hotel.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 768px) 180px, (max-width: 1200px) 180px, 180px"
          />
        </div>
        <div className="flex-1 flex flex-col">
          <h3 className="text-xl font-semibold text-[#111827]">{hotel.name}</h3>
          <p className="mt-1 text-sm text-[#6B7280]">{hotel.display_address}</p>

          <div className="mt-4">
            <div className="grid grid-cols-3 gap-4">
              {displayProducts.map((product) => (
                <div key={product.id}>
                  <div className="text-xs font-medium text-[#6B7280] uppercase">{product.name}</div>
                  <div className="mt-1 text-lg font-semibold text-[#111827]">${product.base_price}</div>
                </div>
              ))}
            </div>
            {additionalProducts > 0 && <p className="mt-2 text-sm text-[#6B7280]">+{additionalProducts} more</p>}
          </div>
        </div>
      </div>

      {/* Mobile Layout: Vertical card with image on top, content below */}
      <div className="flex flex-col sm:hidden">
        <div className="relative w-full h-[180px] overflow-hidden rounded-xl mb-3">
          <Image
            src={hotel.card_image && hotel.card_image.trim() !== "" ? hotel.card_image : defaultImage}
            alt={hotel.name}
            fill
            className="object-cover object-center"
            sizes="(max-width: 640px) 100vw"
          />
        </div>
        <div className="flex-1">
          <h3 className="text-xl font-semibold text-[#111827]">{hotel.name}</h3>
          <p className="mt-1 text-sm text-[#6B7280]">{hotel.display_address}</p>

          <div className="mt-4">
            <div className="grid grid-cols-3 gap-3">
              {displayProducts.map((product) => (
                <div key={product.id}>
                  <div className="text-xs font-medium text-[#6B7280] uppercase">{product.name}</div>
                  <div className="mt-1 text-lg font-semibold text-[#111827]">${product.base_price}</div>
                </div>
              ))}
            </div>
            {additionalProducts > 0 && <p className="mt-2 text-sm text-[#6B7280]">+{additionalProducts} more</p>}
          </div>
        </div>
      </div>
    </Link>
  )
}

