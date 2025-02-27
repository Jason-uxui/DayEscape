"use client"

import { SiteHeader } from "@/components/site-header"
import { SiteFooter } from "@/components/sections/site-footer"
import { BannerInner } from "@/components/banner-inner"
import { PartnerOpportunitySection } from "@/components/sections/partner-opportunity-section"
import { BoostRevenueSection } from "@/components/sections/boost-revenue-section"
import { HowItWorksSection } from "@/components/sections/how-it-works-section"
import { ContactFormSection } from "@/components/sections/contact-form-section"
import { PerfectDaySection } from "@/components/sections/perfect-day-section"

export default function PartnersPage() {
  return (
    <div className="min-h-screen bg-[#fdfaf5] flex flex-col">
      <SiteHeader />
      <BannerInner
        backgroundImage="/placeholder.svg?height=1080&width=1920"
        heading="Unlock New Revenue with Day Guests"
        subheading="Transform Your Hotel's Underutilised Amenities into Revenue Generators"
      />
      <PartnerOpportunitySection />
      <BoostRevenueSection />
      <HowItWorksSection />
      <ContactFormSection />
      <PerfectDaySection />
      <SiteFooter />
    </div>
  )
}

