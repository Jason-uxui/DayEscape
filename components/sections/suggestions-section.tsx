"use client"

import { Bookmark } from "lucide-react"
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"

const suggestions = [
  {
    id: "1",
    name: "Ramada Marcoola",
    location: "Marcoola, Sunshine Coast",
    price: "50",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "2",
    name: "Oaks Caloundra",
    location: "Caloundra, Sunshine Coast",
    price: "32",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "3",
    name: "Novatel Maroochydore",
    location: "Maroochydore, Sunshine Coast",
    price: "40",
    image: "/placeholder.svg?height=300&width=400",
  },
  {
    id: "4",
    name: "Palms Casino",
    location: "Maroochydore, Sunshine Coast",
    price: "40",
    image: "/placeholder.svg?height=300&width=400",
  },
]

export function SuggestionsSection() {
  return (
    <section className="py-10">
      <div className="mx-auto max-w-6xl pt-10 pb-10 bg-[#FFF1E0] rounded-xl">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-[#0c363e]">Suggestions for discovery</h2>
          <p className="mt-2 text-[#4b5563]">Popular places to stay that recommends for you</p>
        </div>

        <div className="mt-12 px-12">
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="w-full"
          >
            <CarouselContent>
              {suggestions.map((item) => (
                <CarouselItem key={item.id} className="md:basis-1/2 lg:basis-1/4">
                  <div className="relative overflow-hidden rounded-xl h-[352px]">
                    <button
                      className="absolute right-4 top-4 z-10 rounded-full bg-white/90 p-2 transition-colors hover:bg-white"
                      aria-label="Add to favorites"
                    >
                      <Bookmark className="h-5 w-5 text-[#0c363e]" />
                    </button>
                    <img src={item.image} alt={item.name} className="absolute inset-0 h-full w-full object-cover" />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-0 p-4 text-white">
                      <h3 className="text-xl font-semibold">{item.name}</h3>
                      <p className="mt-1 text-sm text-white/90">{item.location}</p>
                      <p className="mt-2">
                        <span className="text-2xl font-bold">${item.price}</span>
                        <span className="ml-1 text-sm">/DayPass</span>
                      </p>
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </section>
  )
}

