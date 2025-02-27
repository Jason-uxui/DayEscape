"use client"

import { Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function ReviewsSection() {
  return (
    <div className="flex flex-col items-center py-16 text-center">
      <h3 className="text-2xl font-semibold text-[#333333]">No reviews yet</h3>

      <p className="mt-4 max-w-md text-[#4f4f4f]">Be the first to experience with a Day Pass and leave your review!</p>

      <div className="mt-6 flex gap-1">
        {[1, 2, 3, 4].map((star) => (
          <Star key={star} className="h-8 w-8 text-[#f59e0b]" strokeWidth={1.5} />
        ))}
      </div>

      <Button variant="secondary" className="mt-8 bg-[#f6ddb8] hover:bg-[#f6ddb8]/90 text-[#0f373d]">
        View more 20 review
      </Button>
    </div>
  )
}

