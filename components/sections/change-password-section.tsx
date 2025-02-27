"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { cn } from "@/lib/utils"
import { useToast } from "@/components/ui/use-toast"
import { Eye, EyeOff, Lock } from "lucide-react"
import { AccountLayout } from "@/components/account-layout"

// Remove these lines
// const NAVIGATION_ITEMS = [
//   { label: "My Bookings", href: "/users/my-bookings" },
//   { label: "My Favourite", href: "/users/favorites" },
//   { label: "Account Details", href: "/users/account" },
//   { label: "Payment Details", href: "/users/payment-details" },
//   { label: "Change Passwords", href: "/users/change-password" },
//   { label: "Help & Support", href: "/users/help-support" },
// ]

interface FormData {
  currentPassword: string
  newPassword: string
  confirmPassword: string
}

export function ChangePasswordSection() {
  const { toast } = useToast()
  const [formData, setFormData] = useState<FormData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  })
  const [showPasswords, setShowPasswords] = useState({
    current: false,
    new: false,
    confirm: false,
  })
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [errors, setErrors] = useState<Partial<FormData>>({})

  const validateForm = () => {
    const newErrors: Partial<FormData> = {}

    if (!formData.currentPassword) {
      newErrors.currentPassword = "Current password is required"
    }

    if (!formData.newPassword) {
      newErrors.newPassword = "New password is required"
    } else if (formData.newPassword.length < 8) {
      newErrors.newPassword = "Password must be at least 8 characters"
    }

    if (!formData.confirmPassword) {
      newErrors.confirmPassword = "Please confirm your new password"
    } else if (formData.newPassword !== formData.confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!validateForm()) {
      return
    }

    setIsSubmitting(true)

    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      toast({
        variant: "success",
        title: "Password updated successfully",
        className: "rounded-full",
      })

      // Reset form
      setFormData({
        currentPassword: "",
        newPassword: "",
        confirmPassword: "",
      })
    } catch (error) {
      toast({
        variant: "destructive",
        title: "Failed to update password",
        description: "Please try again later",
        className: "rounded-full",
      })
    } finally {
      setIsSubmitting(false)
    }
  }

  const togglePasswordVisibility = (field: keyof typeof showPasswords) => {
    setShowPasswords((prev) => ({
      ...prev,
      [field]: !prev[field],
    }))
  }

  return (
    <AccountLayout currentPage="/users/change-password">
      <h2 className="text-2xl font-semibold text-[#0f373d]">Change Password</h2>

      <form onSubmit={handleSubmit} className="space-y-6 max-w-2xl bg-white p-6 rounded-lg border">
        {/* Current Password */}
        <div className="space-y-2">
          <Label htmlFor="currentPassword">Current Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
            <Input
              id="currentPassword"
              type={showPasswords.current ? "text" : "password"}
              value={formData.currentPassword}
              onChange={(e) => setFormData({ ...formData, currentPassword: e.target.value })}
              className={cn("pl-10 pr-10 h-12", errors.currentPassword && "border-red-500")}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("current")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#130f26]"
            >
              {showPasswords.current ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.currentPassword && <p className="text-red-500 text-sm">{errors.currentPassword}</p>}
        </div>

        {/* New Password */}
        <div className="space-y-2">
          <Label htmlFor="newPassword">New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
            <Input
              id="newPassword"
              type={showPasswords.new ? "text" : "password"}
              value={formData.newPassword}
              onChange={(e) => setFormData({ ...formData, newPassword: e.target.value })}
              className={cn("pl-10 pr-10 h-12", errors.newPassword && "border-red-500")}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("new")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#130f26]"
            >
              {showPasswords.new ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.newPassword && <p className="text-red-500 text-sm">{errors.newPassword}</p>}
        </div>

        {/* Confirm New Password */}
        <div className="space-y-2">
          <Label htmlFor="confirmPassword">Confirm New Password</Label>
          <div className="relative">
            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-[#9e9e9e]" />
            <Input
              id="confirmPassword"
              type={showPasswords.confirm ? "text" : "password"}
              value={formData.confirmPassword}
              onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
              className={cn("pl-10 pr-10 h-12", errors.confirmPassword && "border-red-500")}
            />
            <button
              type="button"
              onClick={() => togglePasswordVisibility("confirm")}
              className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9e9e9e] hover:text-[#130f26]"
            >
              {showPasswords.confirm ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
            </button>
          </div>
          {errors.confirmPassword && <p className="text-red-500 text-sm">{errors.confirmPassword}</p>}
        </div>

        <Button type="submit" disabled={isSubmitting} className="h-12 px-8 bg-[#0f373d] hover:bg-[#0f373d]/90">
          {isSubmitting ? "Saving..." : "Save"}
        </Button>
      </form>
    </AccountLayout>
  )
}

