"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export function WaitlistSection() {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the data to your backend
    console.log("Form submitted:", formData)
    setIsSubmitted(true)
  }

  return (
    <section id="join-waitlist" className="relative bg-[#0c363e] min-h-[80vh] flex items-center overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10">
        <div className="w-[600px] h-[600px] relative">
          <Image
            src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-TYaHVnVJPNKNNsUxBzd9dyYXLMaErt.png"
            alt="Decorative arch pattern"
            fill
            className="object-contain"
          />
        </div>
      </div>

      <div className="container relative mx-auto px-4 text-center py-24">
        <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#f7d4a2] mb-4">
          Don't miss the DayEscape launch!
        </h2>
        <p className="text-lg text-white/90 mb-12 max-w-2xl mx-auto">
          Join the waiting list now to be among the first to enjoy these exclusive day experiences at Australia's best
          hotels.
        </p>

        {isSubmitted ? (
          <div className="max-w-2xl mx-auto bg-[#18817a] rounded-3xl p-12 text-white">
            <p className="text-xl mb-8">
              Thanks for joining the DayEscape waitlist {formData.name}! We can't wait to help you discover luxury
              escapes, right in your city. You'll be the first to know when we launch, and we'll have some exclusive
              perks just for you!
            </p>
            <p className="text-xl mb-8">Stay tuned, your perfect day is coming soon. 😊</p>
            <div>
              <p className="mb-2">Cheers,</p>
              <p className="font-semibold">The DayEscape Team</p>
            </div>
          </div>
        ) : (
          <form onSubmit={handleSubmit} className="max-w-md mx-auto space-y-4">
            <Input
              type="text"
              placeholder="Name"
              value={formData.name}
              onChange={(e) => setFormData((prev) => ({ ...prev, name: e.target.value }))}
              required
              className="h-12 bg-white border-0 rounded-full text-[#0c363e] placeholder:text-[#0c363e]/60"
            />
            <Input
              type="email"
              placeholder="name@gmail.com"
              value={formData.email}
              onChange={(e) => setFormData((prev) => ({ ...prev, email: e.target.value }))}
              required
              className="h-12 bg-white border-0 rounded-full text-[#0c363e] placeholder:text-[#0c363e]/60"
            />
            <Button type="submit" className="w-32 h-12 bg-[#5bc7b2] hover:bg-[#5bc7b2]/90 text-white rounded-full">
              SUBMIT
            </Button>
          </form>
        )}
      </div>
    </section>
  )
}

