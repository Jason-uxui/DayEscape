"use client"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { ContactSupportPopup } from "@/components/contact-support-popup"
import { AccountLayout } from "@/components/account-layout"

const FAQ_ITEMS = [
  {
    question: "How do I book a day pass?",
    answer:
      "To book a day pass, simply browse our available hotels, select your desired date and package, and follow the checkout process. You'll receive a confirmation email with all the details of your booking.",
  },
  {
    question: "Can I cancel or modify my booking?",
    answer:
      "Yes, you can cancel or modify your booking up to 24 hours before your scheduled arrival time. Go to 'My Bookings' in your account dashboard to make changes or cancel your reservation.",
  },
  {
    question: "What amenities are included in a day pass?",
    answer:
      "Amenities vary by hotel, but typically include access to the pool, fitness center, and other facilities. Check the specific hotel's page for a full list of included amenities.",
  },
  {
    question: "How do I check in for my day pass?",
    answer:
      "On the day of your visit, simply present your booking confirmation and a valid ID at the hotel's reception. They will provide you with any necessary access cards or information.",
  },
]

export function HelpSupportSection() {
  const [searchQuery, setSearchQuery] = useState("")
  const [isContactSupportOpen, setIsContactSupportOpen] = useState(false)

  const filteredFAQs = FAQ_ITEMS.filter(
    (item) =>
      item.question.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.answer.toLowerCase().includes(searchQuery.toLowerCase()),
  )

  return (
    <AccountLayout currentPage="/users/help-support">
      <h2 className="text-2xl font-semibold text-[#0f373d]">Help & Support</h2>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-semibold text-[#0C363E] mb-4">Frequently Asked Questions</h3>

        {/* Search Input */}
        <div className="mb-6">
          <Input
            type="text"
            placeholder="Search FAQs..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full h-12"
          />
        </div>

        {/* FAQ Accordion */}
        <Accordion type="single" collapsible className="w-full">
          {filteredFAQs.map((item, index) => (
            <AccordionItem value={`item-${index}`} key={index}>
              <AccordionTrigger className="text-[#0C363E] hover:text-[#0C363E]/80">{item.question}</AccordionTrigger>
              <AccordionContent className="text-[#4f4f4f]">{item.answer}</AccordionContent>
            </AccordionItem>
          ))}
        </Accordion>

        {/* Contact Support Button */}
        <div className="mt-8">
          <Button
            className="w-full bg-[#0C363E] hover:bg-[#0C363E]/90 text-white"
            onClick={() => setIsContactSupportOpen(true)}
          >
            Contact Support
          </Button>
        </div>
      </div>

      <ContactSupportPopup open={isContactSupportOpen} onOpenChange={setIsContactSupportOpen} />
    </AccountLayout>
  )
}

