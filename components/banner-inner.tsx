"use client"

import Image from "next/image"

interface BannerInnerProps {
  backgroundImage?: string
  heading: string
  subheading: string
}

export function BannerInner({ backgroundImage, heading, subheading }: BannerInnerProps) {
  return (
    <div className="relative h-screen w-full overflow-hidden">
      <Image
        src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/day-escape.jpg-dvkWEDyuIBwJwC3Tg0R5pWliYlH4Gi.jpeg"
        alt="Couple enjoying luxury pool day"
        fill
        className="object-cover"
        priority
      />
      <div
        className="absolute inset-0"
        style={{
          background: "linear-gradient(180deg, rgba(12, 54, 62, 0.00) 0%, #0C363E 80%)",
        }}
      />
      <div className="container mx-auto px-4 h-full flex flex-col justify-center items-center text-center text-white relative z-10">
        <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold mb-4 text-[#F7D4A2]">{heading}</h1>
        <p className="text-xl md:text-2xl max-w-2xl text-[#F7D4A2">{subheading}</p>
      </div>
    </div>
  )
}

