"use client"

import { Button } from "@/components/ui/button"

export function ContactUsSection() {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <h3 className="text-xl font-semibold text-[#0f373d] mb-4">Contact Us</h3>
      <p className="text-[#4f4f4f] mb-6">
        If you have any questions or need assistance, please don't hesitate to contact us.
      </p>
      <Button className="w-full bg-[#0f373d] hover:bg-[#0f373d]/90 text-white">Contact Support</Button>
    </div>
  )
}

