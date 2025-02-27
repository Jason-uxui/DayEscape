"use client"

import { Button } from "@/components/ui/button"
import Image from "next/image"

interface Statistic {
  value: string
  label: string
  sublabel: string
}

interface PartnerOpportunityProps {
  heading: string
  description: string
  benefits: string[]
  statistics: Statistic[]
  image: string
}

export function PartnerOpportunitySection({
  heading = "The opportunity",
  description = "Hotels and resorts have incredible spaces that often remain underutilised during the day. DayEscape allows you to tap into a new and growing market of local day guests—working professionals, families, and influencers—who seek premium day experiences without the need for an overnight stay.",
  benefits = [
    "Attract new local customers.",
    "Increase ancillary revenue from pools, spas, dining, and more.",
    "Optimise underused spaces during non-peak hours.",
  ],
  statistics = [
    {
      value: "40%",
      label: "Up to",
      sublabel: "increase in F&B monthly revenue",
    },
    {
      value: "40%",
      label: "Increase of",
      sublabel: "use of underutilised spaces",
    },
    {
      value: "80%",
      label: "Day guests",
      sublabel: "return within a month",
    },
  ],
  image = "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-yAvZFV6SjZsTmDLCV2MwrHKRS4L9hv.png",
}: PartnerOpportunityProps) {
  return (
    <section className="bg-[#0c363e] py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center py-12">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-[50%_50%_0_0]">
              <Image
                src={image}
                alt="People enjoying hotel amenities"
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#f7d4a2]">{heading}</h2>

            <p className="text-lg text-white">{description}</p>

            <div className="space-y-4">
              <p className="text-lg font-medium text-white">With DayEscape, you can:</p>
              <ul className="space-y-3">
                {benefits.map((benefit, index) => (
                  <li key={index} className="flex items-center gap-3 text-white">
                    <span className="h-1.5 w-1.5 rounded-full bg-[#f7d4a2]" />
                    {benefit}
                  </li>
                ))}
              </ul>
            </div>

            {/* Statistics Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 pt-8">
              {statistics.map((stat, index) => (
                <div key={index} className="text-center">
                  <div className="text-[#f7d4a2] space-y-1">
                    <p className="text-sm">{stat.label}</p>
                    <p className="text-4xl font-bold">{stat.value}</p>
                  </div>
                  <p className="mt-2 text-sm text-white">{stat.sublabel}</p>
                </div>
              ))}
            </div>

            {/* CTA Button */}
            <Button className="mt-8 bg-[#f7d4a2] text-[#0c363e] hover:bg-[#f7d4a2]/90" size="lg">
              Get listed
            </Button>
          </div>
        </div>
      </div>
    </section>
  )
}

