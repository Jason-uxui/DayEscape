"use client"

import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"

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

export function HelpCenterSection() {
  return (
    <div className="bg-white rounded-lg p-6 border">
      <h3 className="text-xl font-semibold text-[#0f373d] mb-4">Help Center</h3>
      <Accordion type="single" collapsible className="w-full">
        {FAQ_ITEMS.map((item, index) => (
          <AccordionItem value={`item-${index}`} key={index}>
            <AccordionTrigger className="text-[#0f373d] hover:text-[#0f373d]/80">{item.question}</AccordionTrigger>
            <AccordionContent className="text-[#4f4f4f]">{item.answer}</AccordionContent>
          </AccordionItem>
        ))}
      </Accordion>
    </div>
  )
}

