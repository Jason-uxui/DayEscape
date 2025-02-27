"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { CheckCircle } from "@/components/ui/icons/check-circle"

interface ComingSoonCardProps {
  locationName?: string;
}

export function ComingSoonCard({ locationName }: ComingSoonCardProps = {}) {
  const [email, setEmail] = useState("")
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isSuccess, setIsSuccess] = useState(false)

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    // Simulating an API call
    await new Promise((resolve) => setTimeout(resolve, 1000))

    setIsSuccess(true)
    setEmail("")
    setIsSubmitting(false)
  }

  const isValidEmail = (email: string) => {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
  }

  if (isSuccess) {
    return (
      <div className="text-center">
        <CheckCircle className="w-12 h-12 text-green-500 mx-auto mb-4" />
        <h3 className="text-2xl font-semibold text-[#0c363e] mb-4">Thank you!</h3>
        <p className="text-[#4f4f4f]">
          {locationName 
            ? `We'll notify you when new experiences are added to ${locationName}.` 
            : "We'll notify you when new experiences are added to this area."}
        </p>
      </div>
    )
  }

  return (
    <div>
      <h3 className="text-2xl font-semibold text-[#0c363e] mb-4">Coming Soon</h3>
      <p className="text-[#4f4f4f] mb-6">
        {locationName 
          ? `Leave your email to be the first to know when new experiences are added to ${locationName}.`
          : "Leave your email to be the first to know when new experiences are added to this area."}
      </p>
      <form onSubmit={handleSubmit} className="space-y-4">
        <Input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
          className="w-full"
        />
        <Button
          type="submit"
          disabled={!isValidEmail(email) || isSubmitting}
          className="w-full bg-[#0c363e] hover:bg-[#0c363e]/90 text-white"
        >
          {isSubmitting ? "Submitting..." : "Notify Me"}
        </Button>
      </form>
    </div>
  )
}

