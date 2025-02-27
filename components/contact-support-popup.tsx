"use client"

import type React from "react"

import { useState } from "react"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { useToast } from "@/components/ui/use-toast"
import { CheckCircle } from "@/components/ui/icons/check-circle"

interface ContactSupportPopupProps {
  open: boolean
  onOpenChange: (open: boolean) => void
}

export function ContactSupportPopup({ open, onOpenChange }: ContactSupportPopupProps) {
  const { toast } = useToast()
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      // Simulating an API call
      await new Promise((resolve) => setTimeout(resolve, 1000))

      // Success scenario
      toast({
        title: (
          <div className="flex items-center gap-2">
            <CheckCircle className="w-5 h-5 text-green-500" />
            <span>Message Sent</span>
          </div>
        ),
        description: "Your message has been sent. Our support team will contact you shortly.",
        className: "rounded-full",
      })
      onOpenChange(false)
      setFormData({ name: "", email: "", message: "" })
    } catch (error) {
      // Error scenario
      toast({
        title: "Error",
        description: "There was an issue sending your request. Please try again later.",
        variant: "destructive",
        className: "rounded-full",
      })
    }
  }

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[425px] bg-[#FDFAF5]">
        <DialogHeader>
          <DialogTitle className="text-[#0C363E]">Contact Support</DialogTitle>
          <DialogDescription>
            Our support team is here to assist you. Please provide your details, and we'll get back to you as soon as
            possible.
          </DialogDescription>
        </DialogHeader>
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-[#0C363E]">
              Name
            </Label>
            <Input
              id="name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              required
              className="focus:border-[#0C363E] focus:ring-[#0C363E] focus-visible:ring-[#0C363E]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="email" className="text-[#0C363E]">
              Email
            </Label>
            <Input
              id="email"
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({ ...formData, email: e.target.value })}
              required
              className="focus:border-[#0C363E] focus:ring-[#0C363E] focus-visible:ring-[#0C363E]"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="message" className="text-[#0C363E]">
              Message
            </Label>
            <Textarea
              id="message"
              value={formData.message}
              onChange={(e) => setFormData({ ...formData, message: e.target.value })}
              required
              className="focus:border-[#0C363E] focus:ring-[#0C363E] focus-visible:ring-[#0C363E]"
            />
          </div>
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Close
            </Button>
            <Button type="submit" className="bg-[#0C363E] hover:bg-[#0C363E]/90 text-white">
              Send Message
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  )
}

