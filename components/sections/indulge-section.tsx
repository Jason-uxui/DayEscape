"use client"

import type React from "react"
import Image from "next/image"
import Link from "next/link"

const experiences = [
  {
    title: "Poolside Bliss",
    description:
      "Soak up the sun at luxurious hotel pools, sip on refreshing drinks, and enjoy exclusive cabanas for the ultimate relaxation.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-RRf1WTVlHTGdp4hXPm6oKley5yjCsE.png",
  },
  {
    title: "Spa Serenity",
    description:
      "Indulge in total relaxation with world-class spa treatments and wellness facilities designed to melt away stress and rejuvenate your body.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-ouIy4IPkR0EDKzmH3x7uSTeHoHjUX6.png",
  },
  {
    title: "Gourmet Indulgence",
    description:
      "Savour a culinary escape with access to the finest hotel restaurants and bars, where every meal becomes an experience to remember.",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-socrgNRwN3Gwu4cFOzUu1lj2TUSW5d.png",
  },
]

export function IndulgeSection() {
  const scrollToWaitlist = (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault()
    const element = document.getElementById("join-waitlist")
    if (element) {
      element.scrollIntoView({ behavior: "smooth" })
    }
  }

  return (
    <section className="bg-[#fdf5eb] py-24">
      <div className="container mx-auto px-4">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#b65709] text-center mb-16">
          Indulge in the Ultimate Day Escape
        </h2>

        <div className="grid md:grid-cols-3 gap-12 max-w-6xl mx-auto">
          {experiences.map((experience, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="relative w-full aspect-[3/4] mb-8">
                <div className="relative w-full h-full rounded-[500px_500px_0_0] overflow-hidden">
                  <Image
                    src={experience.image || "/placeholder.svg"}
                    alt={experience.title}
                    fill
                    className="object-cover"
                    priority={index === 0}
                  />
                </div>
              </div>
              <div className="text-sm font-medium tracking-wider text-[#4b5563] mb-4">EXPERIENCE</div>
              <h3 className="text-2xl font-semibold text-[#b65709] mb-4">{experience.title}</h3>
              <p className="text-[#0c363e] text-lg">{experience.description}</p>
            </div>
          ))}
        </div>

        <div className="text-center mt-16">
          <Link
            href="#join-waitlist"
            onClick={scrollToWaitlist}
            className="inline-flex h-10 px-8 items-center justify-center rounded-full border border-[#0c363e] text-[#0c363e] bg-[#fdf5eb] hover:bg-[#0c363e] hover:text-white transition-colors"
          >
            Become a Day Escaper
          </Link>
        </div>
      </div>
    </section>
  )
}

