"use client"

import Image from "next/image"

export function PerfectDaycationSection() {
  return (
    <section className="bg-[#0c363e] py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Image */}
          <div className="relative">
            <div className="aspect-square overflow-hidden rounded-[50%_50%_0_0]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-aQePGt0FE1lGkZtT6TgVfj0Kz75ps7.png"
                alt="Couple enjoying poolside drinks"
                width={800}
                height={800}
                className="h-full w-full object-cover"
              />
            </div>
          </div>

          {/* Right Column - Content */}
          <div className="space-y-8">
            <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#f7d4a2]">
              Treat Yourself to a Perfect Daycation
            </h2>

            <p className="text-lg text-white">
              Imagine lounging by a luxurious pool, unwinding in a serene spa, or enjoying a gourmet meal at a 5-star
              hotel—all in a single day. With DayEscape, you can access the finest hotels in your city for a day of
              relaxation and rejuvenation, without the need for an overnight booking.
            </p>

            <div className="space-y-6">
              <h3 className="text-3xl font-serif font-semibold text-[#f7d4a2]">Your Escape, Your Way</h3>

              <ul className="space-y-4">
                <li className="flex items-center gap-3 text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f7d4a2]" />
                  <div>
                    <span className="font-semibold">Relax by the Pool:</span> Soak up the sun, sip cocktails, and unwind
                    in style.
                  </div>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f7d4a2]" />
                  <div>
                    <span className="font-semibold">Indulge in the Spa:</span> Pamper yourself with spa treatments and
                    wellness facilities.
                  </div>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f7d4a2]" />
                  <div>
                    <span className="font-semibold">Enjoy a Gourmet Experience:</span> Dine at award-winning restaurants
                    and bars.
                  </div>
                </li>
                <li className="flex items-center gap-3 text-white">
                  <span className="h-1.5 w-1.5 rounded-full bg-[#f7d4a2]" />
                  <div>
                    <span className="font-semibold">Exclusive Access:</span> Experience luxury at top hotels, all in one
                    day.
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}

