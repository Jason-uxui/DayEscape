"use client"

import { PocketIcon as Pool, CalendarCheck, QrCode, DollarSign } from "lucide-react"

const steps = [
  {
    icon: Pool,
    number: "1",
    title: "List Your Amenities",
    description:
      "We'll help you create your hotel's listing with available assets such as pools, cabanas, spas, and restaurants.",
  },
  {
    icon: CalendarCheck,
    number: "2",
    title: "Guests Book",
    description: "Local day guests book through the DayEscape platform, choosing from your available amenities.",
  },
  {
    icon: QrCode,
    number: "3",
    title: "Seamless Check-In",
    description: "Guests arrive with a digital pass. Your team checks them in like any other guest.",
  },
  {
    icon: DollarSign,
    number: "4",
    title: "Revenue for Your Hotel",
    description: "You keep 100% of the revenue from F&B and other add-ons, with a small commission on bookings.",
  },
]

export function HowItWorksSection() {
  return (
    <section className="bg-[#fdfaf5] py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-[1fr,2fr] gap-24 items-start">
          {/* Left Column - Heading */}
          <div>
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#b65709] leading-tight">
              How DayEscape Works: Simple, Risk-Free, and Profitable from Day One
            </h2>
            <p className="mt-6 text-lg text-[#1c1c1d]">
              DayEscape offers a seamless, risk-free solution for hotels—no technical integration, no upfront costs. We
              handle the setup and bookings, allowing you to instantly generate revenue from underutilised spaces like
              pools and spas. You only pay a small commission on successful bookings, meaning you profit from day one.
            </p>
          </div>

          {/* Right Column - Steps Grid */}
          <div className="grid sm:grid-cols-2 gap-12">
            {steps.map((step) => (
              <div key={step.number} className="flex flex-col items-start">
                <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#18817a]/10">
                  <step.icon className="h-6 w-6 text-[#18817a]" />
                </div>
                <h3 className="mt-6 text-xl font-semibold text-[#b65709]">
                  {step.number}. {step.title}
                </h3>
                <p className="mt-2 text-[#1c1c1d]">{step.description}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  )
}

