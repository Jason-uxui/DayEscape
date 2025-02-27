import Link from "next/link"
import { HotelCard } from "./hotel-card"
import { ArrowRight } from "lucide-react"

const NEARBY_HOTELS = [
  {
    id: "1",
    name: "Novatel Maroochydore",
    location: "Sydney CBD, New South Wales",
    image: "/placeholder.svg?height=300&width=400",
    prices: {
      dayPass: 40,
      cabana: 300,
      dayRoom: 149,
    },
  },
  {
    id: "2",
    name: "Palms Casino",
    location: "Darling Harbour, Sydney, New South Wales",
    image: "/placeholder.svg?height=300&width=400",
    prices: {
      dayPass: 40,
      cabana: 300,
      dayRoom: 149,
    },
  },
  {
    id: "3",
    name: "Palazzo Versace",
    location: "The Rocks, Sydney, New South Wales",
    image: "/placeholder.svg?height=300&width=400",
    prices: {
      dayPass: 40,
      cabana: 300,
      dayRoom: 149,
    },
  },
  {
    id: "4",
    name: "Bulgari Resort",
    location: "Circular Quay, Sydney, New South Wales",
    image: "/placeholder.svg?height=300&width=400",
    prices: {
      dayPass: 40,
      cabana: 300,
      dayRoom: 149,
    },
  },
]

export function NearbyHotels() {
  return (
    <section className="w-full border-t bg-[#fdfaf5] py-16">
      <div className="mx-auto flex flex-col px-6" style={{ maxWidth: "calc(100% - 400px)" }}>
        <div className="mb-12 flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#0c363e]">Discover more escapes nearby</h2>
            <p className="mt-2 text-[#6b7280]">Let's go on an adventure</p>
          </div>
          <Link
            href="/locations"
            className="flex items-center gap-2 text-sm font-medium text-[#5bc7b2] hover:text-[#5bc7b2]/80"
          >
            View All Location
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {NEARBY_HOTELS.map((hotel) => (
            <HotelCard key={hotel.id} {...hotel} />
          ))}
        </div>
      </div>
    </section>
  )
}

