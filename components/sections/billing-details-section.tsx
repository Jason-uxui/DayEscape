"use client"

import type React from "react"

import { useState, useEffect } from "react"
import { ArrowLeft } from "lucide-react"
import Link from "next/link"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { useCart } from "@/contexts/CartContext"
import { BillingSeparator } from "@/components/billing-separator"
import { SummaryComponent } from "@/components/summary-component"
import { useRouter } from "next/navigation"
import { useAuth } from "@/contexts/AuthContext"
import { supabase } from "@/lib/supabase"
import { useToast } from "@/components/ui/use-toast"
import ErrorBoundary from "../ErrorBoundary"

interface FormData {
  firstName: string
  lastName: string
  email: string
  phone: string
}

interface FormErrors {
  firstName?: string
  lastName?: string
  email?: string
  phone?: string
}

export function BillingDetailsSection() {
  const router = useRouter()
  const { getHotelInfo } = useCart()
  const { user } = useAuth()
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
  })
  const [errors, setErrors] = useState<FormErrors>({})
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  const hotelInfo = getHotelInfo()

  useEffect(() => {
    async function fetchUserData() {
      if (!user?.id) {
        console.error("No authenticated user found")
        setError("No authenticated user found")
        setIsLoading(false)
        return
      }

      try {
        console.log("Fetching user profile data for user ID:", user.id)
        const { data: profileData, error: profileError } = await supabase
          .from("profiles")
          .select("*")
          .eq("id", user.id)
          .maybeSingle()

        if (profileError) {
          if (profileError.code === "42501") {
            console.warn("User doesn't have permission to access profiles. Using default empty profile.")
            // Use default empty profile
            setFormData((prev) => ({
              ...prev,
              firstName: "",
              lastName: "",
              email: user.email || "",
              phone: "",
            }))
          } else {
            throw profileError
          }
        } else if (profileData) {
          setFormData((prev) => ({
            ...prev,
            firstName: profileData.first_name || "",
            lastName: profileData.last_name || "",
            email: user.email || "",
            phone: profileData.phone_number || "",
          }))
        } else {
          console.warn("No profile found for user. Using default empty profile.")
          // Use default empty profile
          setFormData((prev) => ({
            ...prev,
            firstName: "",
            lastName: "",
            email: user.email || "",
            phone: "",
          }))
        }

        setError(null)
      } catch (error: any) {
        console.error("Error fetching user data:", error)
        setError(error.message)
        toast({
          variant: "destructive",
          title: "Failed to load account details",
          description: error.message || "Please try again later",
          className: "rounded-full",
        })
      } finally {
        setIsLoading(false)
      }
    }

    if (user) {
      fetchUserData()
    }
  }, [user, toast])

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
    validateField(name, value)
  }

  const validateField = (name: string, value: string) => {
    let error = ""
    switch (name) {
      case "firstName":
      case "lastName":
        error = value.trim() === "" ? "Name is required" : ""
        break
      case "email":
        error = value.trim() === "" ? "Email is required" : !isValidEmail(value) ? "Invalid email format" : ""
        break
      case "phone":
        error =
          value.trim() === "" ? "Phone number is required" : !isValidPhone(value) ? "Invalid phone number format" : ""
        break
    }
    setErrors((prev) => ({ ...prev, [name]: error }))
  }

  const isValidEmail = (email: string) => {
    const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    return re.test(email)
  }

  const isValidPhone = (phone: string) => {
    const cleanedNumber = phone.replace(/\s+/g, "")
    const mobileRegex = /^(?:\+61|0)?4\d{8}$/
    const landlineRegex = /^(?:\+61|0)?[2378]\d{8}$/
    return mobileRegex.test(cleanedNumber) || landlineRegex.test(cleanedNumber)
  }

  const validateForm = () => {
    const newErrors: FormErrors = {}
    Object.keys(formData).forEach((key) => {
      validateField(key, formData[key as keyof FormData])
      if (errors[key as keyof FormErrors]) {
        newErrors[key as keyof FormErrors] = errors[key as keyof FormErrors]
      }
    })
    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async () => {
    if (validateForm()) {
      setIsSubmitting(true)
      try {
        await updateUserProfile()
        router.push("/booking-confirmed")
      } catch (error: any) {
        console.error("Error during form submission:", error)
        toast({
          variant: "destructive",
          title: "Failed to update billing details",
          description: error.message || "Please try again later",
          className: "rounded-full",
        })
      } finally {
        setIsSubmitting(false)
      }
    } else {
      console.log("Form has errors")
    }
  }

  const updateUserProfile = async () => {
    if (!user?.id) {
      throw new Error("No authenticated user found")
    }

    try {
      console.log("Updating user profile for user ID:", user.id)
      const { data, error } = await supabase
        .from("profiles")
        .upsert({
          id: user.id,
          first_name: formData.firstName,
          last_name: formData.lastName,
          phone_number: formData.phone,
          updated_at: new Date().toISOString(),
        })
        .select()

      if (error) {
        console.error("Supabase error:", error)
        if (error.code === "42501") {
          console.warn("User doesn't have permission to update profile. Proceeding without update.")
          return null
        }
        throw error
      }

      console.log("Updated user profile:", data)
      return data
    } catch (error) {
      console.error("Error updating user profile:", error)
      throw error
    }
  }

  if (isLoading) {
    return <div>Loading...</div>
  }

  if (!hotelInfo) {
    return <div>No hotel information available</div>
  }

  console.log("Current billing form data:", formData)

  return (
    <ErrorBoundary>
      <div className="container max-w-6xl mx-auto px-4 py-8">
        <Link
          href="/checkout-confirmation"
          className="inline-flex items-center text-[#0f373d] hover:text-[#0f373d]/80 mb-8"
        >
          <ArrowLeft className="mr-2 h-4 w-4" />
          Back to Checkout Confirmation
        </Link>

        <div className="grid lg:grid-cols-[1fr,400px] gap-10">
          <div className="bg-white rounded-lg p-6 w-full">
            <h2 className="text-2xl font-bold text-[#0f373d] mb-6">Billing Details</h2>

            <form
              onSubmit={(e) => {
                e.preventDefault()
                handleSubmit()
              }}
            >
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-semibold text-[#0f373d] mb-4">Contact Information</h3>
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <Label htmlFor="firstName">First Name</Label>
                      <Input
                        id="firstName"
                        name="firstName"
                        value={formData.firstName}
                        onChange={handleInputChange}
                        required
                        className={errors.firstName ? "border-red-500 bg-red-50" : ""}
                        placeholder="Enter your first name"
                      />
                      {errors.firstName && <p className="text-red-500 text-sm mt-1">{errors.firstName}</p>}
                    </div>
                    <div>
                      <Label htmlFor="lastName">Last Name</Label>
                      <Input
                        id="lastName"
                        name="lastName"
                        value={formData.lastName}
                        onChange={handleInputChange}
                        required
                        className={errors.lastName ? "border-red-500 bg-red-50" : ""}
                        placeholder="Enter your last name"
                      />
                      {errors.lastName && <p className="text-red-500 text-sm mt-1">{errors.lastName}</p>}
                    </div>
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="email">Email Address</Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleInputChange}
                      required
                      className={errors.email ? "border-red-500 bg-red-50" : ""}
                      placeholder="Enter your email address"
                    />
                    {errors.email && <p className="text-red-500 text-sm mt-1">{errors.email}</p>}
                  </div>
                  <div className="mt-4">
                    <Label htmlFor="phone">Phone Number</Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleInputChange}
                      required
                      className={errors.phone ? "border-red-500 bg-red-50" : ""}
                      placeholder="Enter your phone number"
                    />
                    {errors.phone && <p className="text-red-500 text-sm mt-1">{errors.phone}</p>}
                    <p className="text-sm text-[#4f4f4f] mt-1">In case we need to reach you about your reservation</p>
                  </div>
                </div>

                <BillingSeparator />

                <div>
                  <h3 className="text-xl font-semibold text-[#0f373d] mb-4">Payment Details</h3>
                  <p className="text-[#4f4f4f]">Payment will be integrated with Stripe</p>
                  {/* Stripe integration will be added here */}
                </div>
              </div>
            </form>
          </div>

          {/* Summary Component */}
          <div>
            <SummaryComponent onSubmit={handleSubmit} hotelInfo={hotelInfo} isSubmitting={isSubmitting} />
          </div>
        </div>
      </div>
    </ErrorBoundary>
  )
}

