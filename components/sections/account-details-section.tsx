"use client"

import type React from "react"

import { useState, useEffect, useCallback } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { useToast } from "@/components/ui/use-toast"
import { AccountLayout } from "@/components/account-layout"
import { useAuth } from "@/contexts/AuthContext"
import { getSupabaseClient } from "@/lib/supabase"
import ErrorBoundary from "../ErrorBoundary"

interface FormData {
  email: string
  firstName: string
  lastName: string
  phone: string
}

export function AccountDetailsSection() {
  const { toast } = useToast()
  const { user } = useAuth()
  const [formData, setFormData] = useState<FormData>({
    email: user?.email || "",
    firstName: "",
    lastName: "",
    phone: "",
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isLoading, setIsLoading] = useState(true)
  const [isEditing, setIsEditing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [supabaseClient, setSupabaseClient] = useState<any>(null)

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const client = getSupabaseClient()
      setSupabaseClient(client)
    }
  }, [])

  const fetchUserData = useCallback(async () => {
    if (!user?.id) {
      console.error("No authenticated user found")
      setError("No authenticated user found")
      setIsLoading(false)
      return
    }

    if (!supabaseClient) {
      console.error("Supabase client not initialized")
      setError("Could not connect to the database")
      setIsLoading(false)
      return
    }

    try {
      console.log("Fetching user profile data for user ID:", user.id)
      const { data: profileData, error: profileError } = await supabaseClient
        .from("profiles")
        .select("*")
        .eq("id", user.id)
        .maybeSingle()

      if (profileError) {
        throw profileError
      }

      if (profileData) {
        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          firstName: profileData.first_name || "",
          lastName: profileData.last_name || "",
          phone: profileData.phone_number || "",
        }))
      } else {
        // No profile found, create a new one
        const { data: newProfile, error: createError } = await supabaseClient
          .from("profiles")
          .insert({ id: user.id })
          .select()
          .single()

        if (createError) {
          throw createError
        }

        setFormData((prev) => ({
          ...prev,
          email: user.email || "",
          firstName: newProfile.first_name || "",
          lastName: newProfile.last_name || "",
          phone: newProfile.phone_number || "",
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
  }, [user, supabaseClient, toast])

  useEffect(() => {
    if (user && supabaseClient) {
      fetchUserData()
    }
  }, [user, supabaseClient, fetchUserData])

  const updateUserProfile = async () => {
    if (!user?.id) {
      throw new Error("No authenticated user found")
    }

    if (!supabaseClient) {
      throw new Error("Supabase client not initialized")
    }

    try {
      console.log("Updating user profile for user ID:", user.id)
      const { data, error } = await supabaseClient
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
        throw error
      }

      console.log("Updated user profile:", data)
      return data
    } catch (error) {
      console.error("Error updating user profile:", error)
      throw error
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target
    setFormData((prev) => ({ ...prev, [name]: value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)

    try {
      await updateUserProfile()
      await fetchUserData()
      toast({
        variant: "default",
        title: "Account details updated successfully",
        className: "rounded-full",
      })
      setIsEditing(false)
    } catch (error: any) {
      console.error("Error updating account details:", error)
      toast({
        variant: "destructive",
        title: "Failed to update account details",
        description: error.message || "Please try again later",
        className: "rounded-full",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  if (isLoading) {
    return (
      <AccountLayout currentPage="/users/account">
        <div className="flex items-center justify-center p-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-[#0f373d] mx-auto mb-4"></div>
            <p className="text-[#4f4f4f]">Loading account details...</p>
          </div>
        </div>
      </AccountLayout>
    )
  }

  if (error) {
    return (
      <AccountLayout currentPage="/users/account">
        <div className="p-6 bg-red-50 border border-red-200 rounded-lg">
          <h2 className="text-xl font-semibold text-red-700 mb-2">Error Loading Account Details</h2>
          <p className="text-red-600">{error}</p>
          <Button onClick={fetchUserData} className="mt-4">
            Retry
          </Button>
        </div>
      </AccountLayout>
    )
  }

  return (
    <ErrorBoundary>
      <AccountLayout currentPage="/users/account">
        <h2 className="text-2xl font-semibold text-[#0f373d]">Account Details</h2>
        <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg border">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="firstName">First name</Label>
              <Input
                id="firstName"
                name="firstName"
                value={formData.firstName}
                onChange={handleInputChange}
                className="h-12"
                required
                disabled={!isEditing}
                placeholder="Enter your first name"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="lastName">Last name</Label>
              <Input
                id="lastName"
                name="lastName"
                value={formData.lastName}
                onChange={handleInputChange}
                className="h-12"
                required
                disabled={!isEditing}
                placeholder="Enter your last name"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input id="email" name="email" type="email" value={formData.email} className="h-12" disabled />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone Number</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={formData.phone}
              onChange={handleInputChange}
              className="h-12"
              placeholder="Enter your phone number"
              disabled={!isEditing}
            />
          </div>

          {isEditing ? (
            <div className="flex gap-4">
              <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-[#0f373d] hover:bg-[#0f373d]/90">
                {isSubmitting ? "Saving..." : "Save"}
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsEditing(false)} className="h-12 px-8">
                Cancel
              </Button>
            </div>
          ) : (
            <Button onClick={() => setIsEditing(true)} className="h-12 px-8 bg-[#0f373d] hover:bg-[#0f373d]/90">
              Update
            </Button>
          )}
        </form>
      </AccountLayout>
    </ErrorBoundary>
  )
}

