"use client"

import { Briefcase, Gift, Flower2, Wine } from "lucide-react"

const escapeTypes = [
  {
    icon: Briefcase,
    title: "Escape the office",
    description:
      "Escape the grind and recharge with a relaxing poolside break or a rejuvenating spa session—perfect for clearing your mind and boosting productivity.",
  },
  {
    icon: Gift,
    title: "Escape with Family",
    description:
      "Looking for a memorable day out with the kids? Enjoy a day of swimming, great food, and family-friendly fun at luxury hotels, all without an overnight stay.",
  },
  {
    icon: Flower2,
    title: "Escape to Rejuvinate",
    description:
      "Take a day to focus on you. Unwind with yoga, spa treatments, and wellness activities designed to leave you feeling refreshed and revitalised.",
  },
  {
    icon: Wine,
    title: "Escape for fun",
    description:
      "Gather friends for a day of indulgence—whether it's lounging by the pool or enjoying gourmet dining. Turn any day into a mini getaway with style.",
  },
]

export function EscapeTypesSection() {
  return (
    <section className="bg-[#fdfaf5] py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-24 items-start">
          {/* Left Column - Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#b65709] leading-tight">
              Which kind of DayEscaper are you?
            </h2>
            <p className="mt-6 text-lg text-[#0c363e]">
              Whether you're a professional needing a midday recharge, a family looking for a fun day out, or someone
              who just wants to escape the hustle and bustle, DayEscape offers you the perfect mini-retreat—right in
              your own city.
            </p>
            <p className="mt-4 text-lg text-[#0c363e]">You deserve a DayEscape.</p>
          </div>

          {/* Right Column - Escape Types Grid */}
          <div className="grid sm:grid-cols-2 gap-12">
            {escapeTypes.map((type) => (
              <div key={type.title} className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18817a]/10">
                  <type.icon className="h-6 w-6 text-[#18817a]" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#b65709]">{type.title}</h3>
                <p className="mt-2 text-[#0c363e]">{type.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

