import { HotelCard } from "./hotel-card"
import type { Hotel } from "@/types/hotel"

interface HotelListProps {
  hotels: Hotel[]
  selectedHotel: string | null
  onSelectHotel: (id: string) => void
}

export function HotelList({ hotels, selectedHotel, onSelectHotel }: HotelListProps) {
  if (hotels.length === 0) {
    return (
      <div className="p-4 text-center">
        <p className="text-gray-500">No hotels found. Please try again later.</p>
      </div>
    )
  }

  return (
    <div className="divide-y overflow-y-auto h-screen">
      {hotels.map((hotel) => (
        <HotelCard
          key={hotel.id}
          hotel={hotel}
          isSelected={selectedHotel === hotel.id}
          onSelect={() => onSelectHotel(hotel.id)}
        />
      ))}
    </div>
  )
}

