"use client"

import { Button } from "@/components/ui/button"
import { ArrowRight } from "lucide-react"
import Image from "next/image"

const features = [
  {
    title: "Day Passes",
    description:
      "Guests book day passes through DayEscape to access hotel pools, spa, day-use rooms, and other amenities.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-DBI9Pv1hcRMUAwYZUxis9dC2s7uK7A.png",
  },
  {
    title: "Upsell Opportunities",
    description:
      "You control pricing for these assets, and guests can purchase add-ons like dining packages of spa treatments.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-2lq4aUbUqcOT9jrjokO4cOJBpentV1.png",
  },
  {
    title: "100% Ancillary Revenue",
    description: "You keep 100% of all food, beverage, and ancillary, service revenue.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ApGFVbEu3n8uCiPBujJVafcJafSFpb.png",
  },
]

export function BoostRevenueSection() {
  return (
    <section className="bg-[#FBF6EF] py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#b65709] text-center mb-16">
          How DayEscape boosts hotel revenue
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {features.map((feature, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-[3/4] mb-8">
                <div className="relative w-full h-full rounded-[500px_500px_0_0] overflow-hidden">
                  <Image src={feature.image || "/placeholder.svg"} alt={feature.title} fill className="object-cover" />
                </div>
              </div>
              <h3 className="text-2xl font-semibold text-[#b65709] mb-4">{feature.title}</h3>
              <p className="text-[#0c363e] text-lg">{feature.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Button
            variant="secondary"
            size="lg"
            className="bg-[#F6DDB8] text-[#0F373D] hover:bg-[#F6DDB8]/90"
            onClick={(e) => {
              e.preventDefault()
              const element = document.getElementById("contact-form")
              if (element) {
                element.scrollIntoView({ behavior: "smooth" })
              }
            }}
          >
            Get In touch
            <ArrowRight className="ml-2 h-4 w-4" />
          </Button>
        </div>
      </div>
    </section>
  )
}

