import Image from "next/image"
import Link from "next/link"

export function PerfectDaySection() {
  return (
    <section className="bg-[#fdf5eb] py-24">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Column - Content */}
          <div className="space-y-8">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Guest_Website___Convert_to_Dev-bKGMGzLORzYLaKr6UcGZqfRhgoIgNL.png"
              alt="DayEscape"
              width={200}
              height={48}
              className="h-12 w-auto"
            />

            <div className="space-y-4">
              <p className="text-[#0c363e] text-xl font-medium">ESCAPE. RELAX. REPEAT.</p>

              <h2 className="text-4xl md:text-5xl lg:text-6xl font-serif font-semibold text-[#b65709]">
                Your Perfect Day, Anytime You Need It.
              </h2>

              <p className="text-lg text-[#0c363e]">
                For more info contact us at{" "}
                <Link href="mailto:hello@dayescape.co" className="font-medium hover:underline">
                  hello@dayescape.co
                </Link>
              </p>
            </div>
          </div>

          {/* Right Column - Image */}
          <div className="relative aspect-[4/3] lg:aspect-auto lg:h-[600px] overflow-hidden rounded-3xl">
            <Image
              src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/image-xWKPcEep5Qp7CAfo6c9lo2ARbv0nrd.png"
              alt="Person enjoying a cocktail in a luxury pool"
              fill
              className="object-cover"
            />
          </div>
        </div>
      </div>
    </section>
  )
}

