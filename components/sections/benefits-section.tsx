import { Map, ShoppingCart, HeadphonesIcon } from "lucide-react"

const benefits = [
  {
    icon: Map,
    title: "Discover Daycations",
    description: "Select a date and explore pool, spa, beach access and more, at 1,000+ top hotels.",
  },
  {
    icon: ShoppingCart,
    title: "Book Confidently",
    description: "After booking, receive check-in instructions, parking details, and all necessary information.",
  },
  {
    icon: HeadphonesIcon,
    title: "Flexible Support and Cancellation",
    description: "Invite guests or cancel bookings as needed with support on our website or app.",
  },
]

export function BenefitsSection() {
  return (
    <section className="py-20">
      <div className="mx-auto max-w-6xl px-4">
        <div className="grid gap-8 md:grid-cols-3">
          {benefits.map((benefit, index) => (
            <div key={index} className="flex flex-col items-center text-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-[#0c363e]/10">
                <benefit.icon className="h-7 w-7 text-[#0c363e]" />
              </div>
              <h3 className="mt-6 text-xl font-semibold text-[#0c363e]">{benefit.title}</h3>
              <p className="mt-2 text-[#4b5563]">{benefit.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}

