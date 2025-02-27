"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Checkbox } from "@/components/ui/checkbox"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
  hotelName: string
  amenities: string[]
  state: string
  city: string
  source: string
}

const INITIAL_FORM_DATA: FormData = {
  firstName: "",
  lastName: "",
  email: "",
  phone: "",
  hotelName: "",
  amenities: [],
  state: "",
  city: "",
  source: "",
}

const AMENITIES_OPTIONS = [
  { id: "day-pass", label: "Day Pass" },
  { id: "daybeds-cabanas", label: "Daybeds/Cabanas" },
  { id: "spa-services", label: "Spa Services" },
  { id: "day-rooms", label: "Day Rooms" },
  { id: "fitness-wellness", label: "Fitness/Wellness" },
  { id: "other", label: "Other" },
]

const STATE_OPTIONS = [
  { value: "QLD", label: "QLD" },
  { value: "NSW", label: "NSW" },
  { value: "VIC", label: "VIC" },
  { value: "SA", label: "SA" },
  { value: "ACT", label: "ACT" },
  { value: "WA", label: "WA" },
  { value: "TAS", label: "TAS" },
  { value: "NT", label: "NT" },
]

const SOURCE_OPTIONS = [
  { value: "contact", label: "Someone contacted me" },
  { value: "social", label: "Social ads" },
  { value: "google", label: "Google" },
  { value: "referral", label: "Referral" },
  { value: "other", label: "Other" },
]

export function ContactFormSection() {
  const [formData, setFormData] = useState<FormData>(INITIAL_FORM_DATA)
  const [errors, setErrors] = useState<Partial<FormData>>({})
  const [isSubmitted, setIsSubmitted] = useState(false)

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.firstName) newErrors.firstName = "First name is required"
    if (!formData.lastName) newErrors.lastName = "Last name is required"
    if (!formData.email) {
      newErrors.email = "Email is required"
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = "Invalid email format"
    }
    if (!formData.phone) newErrors.phone = "Phone is required"
    if (!formData.hotelName) newErrors.hotelName = "Hotel/Resort name is required"

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()

    if (validateForm()) {
      console.log("Form submitted:", formData)
      setIsSubmitted(true)
    }
  }

  const handleInputChange = (field: keyof FormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }))
    }
  }

  const handleAmenityToggle = (amenityId: string) => {
    setFormData((prev) => ({
      ...prev,
      amenities: prev.amenities.includes(amenityId)
        ? prev.amenities.filter((id) => id !== amenityId)
        : [...prev.amenities, amenityId],
    }))
  }

  if (isSubmitted) {
    return (
      <section className="bg-[#0c363e] py-24">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto bg-[#18817a] rounded-3xl p-12 text-white">
            <h2 className="text-2xl font-semibold mb-6">
              Thanks for your interest! We're excited about the opportunity to partner with DayEscape and help you
              unlock new revenue through DayEscape.
            </h2>
            <p className="mb-6">
              One of our team members will be in touch shortly to schedule a quick chat and discuss how we can bring
              local day guests to your property—without any hassle.
            </p>
            <p className="mb-4">Cheers,</p>
            <p className="font-semibold">The DayEscape Team</p>
          </div>
        </div>
      </section>
    )
  }

  return (
    <section id="contact-form" className="bg-[#0c363e] py-24">
      <div className="container mx-auto px-4">
        <div className="max-w-3xl mx-auto text-center mb-12">
          <h2 className="text-4xl md:text-5xl font-serif font-semibold text-[#f7d4a2] mb-4">
            Unlock new revenue streams with zero upfront cost.
          </h2>
          <p className="text-lg text-white">
            Get in touch now to list your hotel and start attracting a whole new type of high-value day guests!
          </p>
        </div>

        <form onSubmit={handleSubmit} className="max-w-2xl mx-auto space-y-8">
          {/* Name Fields */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName" className="text-white">
                First Name
              </Label>
              <Input
                id="firstName"
                value={formData.firstName}
                onChange={(e) => handleInputChange("firstName", e.target.value)}
                className={errors.firstName ? "border-red-500" : ""}
              />
              {errors.firstName && <p className="text-red-400 text-sm">{errors.firstName}</p>}
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName" className="text-white">
                Last Name
              </Label>
              <Input
                id="lastName"
                value={formData.lastName}
                onChange={(e) => handleInputChange("lastName", e.target.value)}
                className={errors.lastName ? "border-red-500" : ""}
              />
              {errors.lastName && <p className="text-red-400 text-sm">{errors.lastName}</p>}
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <Label htmlFor="email" className="text-white">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => handleInputChange("email", e.target.value)}
              className={errors.email ? "border-red-500" : ""}
            />
            {errors.email && <p className="text-red-400 text-sm">{errors.email}</p>}
          </div>

          {/* Phone Field */}
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-white">
              Phone
            </Label>
            <Input
              id="phone"
              type="tel"
              value={formData.phone}
              onChange={(e) => handleInputChange("phone", e.target.value)}
              className={errors.phone ? "border-red-500" : ""}
            />
            {errors.phone && <p className="text-red-400 text-sm">{errors.phone}</p>}
          </div>

          {/* Hotel/Resort Name Field */}
          <div className="space-y-2">
            <Label htmlFor="hotelName" className="text-white">
              Hotel/Resort Name
            </Label>
            <Input
              id="hotelName"
              value={formData.hotelName}
              onChange={(e) => handleInputChange("hotelName", e.target.value)}
              className={errors.hotelName ? "border-red-500" : ""}
            />
            {errors.hotelName && <p className="text-red-400 text-sm">{errors.hotelName}</p>}
          </div>

          {/* Amenities Checkboxes */}
          <div className="space-y-4">
            <Label className="text-white">What Amenities are you looking to offer on DayEscape?</Label>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {AMENITIES_OPTIONS.map((amenity) => (
                <div key={amenity.id} className="flex items-center space-x-2">
                  <Checkbox
                    id={amenity.id}
                    checked={formData.amenities.includes(amenity.id)}
                    onCheckedChange={() => handleAmenityToggle(amenity.id)}
                  />
                  <label htmlFor={amenity.id} className="text-sm font-medium leading-none text-white cursor-pointer">
                    {amenity.label}
                  </label>
                </div>
              ))}
            </div>
          </div>

          {/* State Dropdown */}
          <div className="space-y-2">
            <Label className="text-white">State</Label>
            <Select value={formData.state} onValueChange={(value) => handleInputChange("state", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select a state" />
              </SelectTrigger>
              <SelectContent>
                {STATE_OPTIONS.map((state) => (
                  <SelectItem key={state.value} value={state.value}>
                    {state.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* City/Area Field */}
          <div className="space-y-2">
            <Label htmlFor="city" className="text-white">
              City/Area
            </Label>
            <Input id="city" value={formData.city} onChange={(e) => handleInputChange("city", e.target.value)} />
          </div>

          {/* Source Dropdown */}
          <div className="space-y-2">
            <Label className="text-white">How did you hear about DayEscape?</Label>
            <Select value={formData.source} onValueChange={(value) => handleInputChange("source", value)}>
              <SelectTrigger>
                <SelectValue placeholder="Select an option" />
              </SelectTrigger>
              <SelectContent>
                {SOURCE_OPTIONS.map((source) => (
                  <SelectItem key={source.value} value={source.value}>
                    {source.label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          {/* Submit Button */}
          <Button type="submit" className="w-full bg-[#f7d4a2] text-[#0c363e] hover:bg-[#f7d4a2]/90" size="lg">
            Submit
          </Button>
        </form>
      </div>
    </section>
  )
}

