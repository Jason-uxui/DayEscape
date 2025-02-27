"use client"

import Image from "next/image"
import { Search } from "@/components/search"

export function HeroSection() {
  return (
    <section className="relative min-h-[80vh] px-4 pt-20">
      <div className="absolute inset-0 -z-10">
        <div className="absolute inset-0 bg-gradient-to-r from-[#0c363e]/90 to-[#0c363e]/60" />
        <img
          src="/placeholder.svg?height=1080&width=1920"
          alt="Luxury hotel background"
          className="h-full w-full object-cover"
        />
      </div>

      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-8 lg:flex-row lg:items-center">
          <div className="lg:w-1/2">
            <h1 className="font-serif text-4xl font-semibold leading-tight md:text-5xl lg:text-6xl text-[#0c363e]">
              Escape for the Day, Indulge in Luxury
            </h1>
            <p className="mt-6 text-xl text-[#333333]">Access world-class hotel experiences without checking in.</p>
            <p className="mt-4 text-[#4f4f4f]">
              Why wait for your next holiday? With DayEscape, you can access premium hotels and resorts for the day,
              giving you the freedom to enjoy pools, spas, and cabanas at your convenience. Easy booking, instant
              relaxation, and pure indulgence – your perfect escape is just a tap away.
            </p>
          </div>

          <div className="relative mt-8 lg:mt-0 lg:w-1/2">
            <div className="absolute -left-4 top-1/2 -translate-y-1/2 lg:-left-12">
              <div className="h-8 w-8 text-[#b65709]">★</div>
            </div>
            <div className="absolute -right-4 -top-4 lg:-right-12 lg:-top-12">
              <div className="h-8 w-8 text-[#b65709]">★</div>
            </div>
            <div className="rounded-[40px]">
              <Image
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-V3pl7m7kUi3MHjYoAMuHFcUp955clc.png"
                alt="Couple enjoying a luxury pool day"
                width={600}
                height={600}
                className="h-full w-full object-cover rounded-[40px]"
              />
            </div>
          </div>
        </div>

        <div className="relative mt-12 z-20">
          <Search />
        </div>
      </div>
    </section>
  )
}

