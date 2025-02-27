"use client"

import { Bookmark, MapPin, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"

const hotels = [
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
    name: "Hilton Sydney",
    location: "George Street, Sydney, New South Wales",
    image: "/placeholder.svg?height=300&width=400",
    prices: {
      dayPass: 55,
      cabana: 350,
      dayRoom: 179,
    },
  },
  {
    id: "4",
    name: "Sheraton Grand Hyde Park",
    location: "Elizabeth Street, Sydney, New South Wales",
    image: "/placeholder.svg?height=300&width=400",
    prices: {
      dayPass: 50,
      cabana: 320,
      dayRoom: 159,
    },
  },
]

export function DiscoverMoreSection() {
  return (
    <section className="py-10 bg-[#FDFAF5]">
      <div className="mx-auto max-w-6xl px-4">
        <div className="flex items-end justify-between">
          <div>
            <h2 className="text-3xl font-bold text-[#0c363e]">Discover more escapes nearby</h2>
            <p className="mt-2 text-[#4b5563]">Let's go on an adventure</p>
          </div>
          <Button
            variant="secondary"
            className="rounded-full bg-[#F6DDB8] text-[#0F373D] hover:bg-[#F6DDB8]/90 border-none shadow-sm"
          >
            Search more <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>

        <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {hotels.map((hotel) => (
            <div key={hotel.id} className="group overflow-hidden rounded-xl bg-white">
              <div className="relative">
                <div className="absolute left-4 top-4 z-10 rounded bg-[#b91c1c] px-2 py-1 text-sm font-medium text-white">
                  -10% today
                </div>
                <button
                  className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
                  aria-label="Add to favorites"
                >
                  <Bookmark className="h-5 w-5 text-[#0c363e]" />
                </button>
                <img
                  src={hotel.image || "/placeholder.svg"}
                  alt={hotel.name}
                  className="aspect-[4/3] w-full object-cover transition-transform group-hover:scale-105"
                />
              </div>

              <div className="p-4">
                <h3 className="text-xl font-semibold text-[#0c363e]">{hotel.name}</h3>
                <div className="mt-2 flex items-center gap-1 text-sm text-[#4b5563]">
                  <MapPin className="h-4 w-4" />
                  <span>{hotel.location}</span>
                </div>

                <div className="mt-4 flex items-center justify-between gap-4 border-t pt-4">
                  <div>
                    <div className="text-xs text-[#4b5563]">DAY PASS</div>
                    <div className="font-semibold text-[#0c363e]">${hotel.prices.dayPass}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#4b5563]">CABANA</div>
                    <div className="font-semibold text-[#0c363e]">${hotel.prices.cabana}</div>
                  </div>
                  <div>
                    <div className="text-xs text-[#4b5563]">DAY ROOM</div>
                    <div className="font-semibold text-[#0c363e]">${hotel.prices.dayRoom}</div>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

