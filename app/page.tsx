import { HeroSection } from "@/components/sections/hero-section"
import { PerfectDaycationSection } from "@/components/sections/perfect-daycation-section"
import { BenefitsSection } from "@/components/sections/benefits-section"
import { ExperiencesSection } from "@/components/sections/experiences-section"
import { WaitlistSection } from "@/components/sections/waitlist-section"
import { IndulgeSection } from "@/components/sections/indulge-section"
import { EscapeTypesSection } from "@/components/sections/escape-types-section"
import { SiteFooter } from "@/components/sections/site-footer"
import { SiteHeader } from "@/components/site-header"
import { PerfectDaySection } from "@/components/sections/perfect-day-section"
import { Suspense } from "react"

function HomePageContent() {
  return (
    <div className="min-h-screen bg-[#fdfaf5]">
      <SiteHeader />
      <main>
        <HeroSection />
        <BenefitsSection />
        <PerfectDaycationSection />
        <WaitlistSection />
        <IndulgeSection />
        <EscapeTypesSection />
        <ExperiencesSection />
        <PerfectDaySection />
      </main>
      <SiteFooter />
    </div>
  )
}

export default function HomePage() {
  return (
    <Suspense fallback={<div className="min-h-screen bg-[#fdfaf5] flex items-center justify-center">Loading...</div>}>
      <HomePageContent />
    </Suspense>
  )
}

