"use client"

import type React from "react"

import { useState } from "react"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Label } from "@/components/ui/label"
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group"
import { useToast } from "@/components/ui/use-toast"
import { CreditCard, PaypalIcon } from "@/components/ui/icons"
import { AccountLayout } from "@/components/account-layout"

interface PaymentMethod {
  id: string
  type: "credit_card" | "paypal"
  details: string
}

export function PaymentDetailsSection() {
  const { toast } = useToast()
  const [paymentMethods, setPaymentMethods] = useState<PaymentMethod[]>([
    { id: "1", type: "credit_card", details: "**** **** **** 1234" },
    { id: "2", type: "paypal", details: "user@example.com" },
  ])
  const [selectedMethod, setSelectedMethod] = useState<string>(paymentMethods[0].id)
  const [isAddingNew, setIsAddingNew] = useState(false)
  const [newMethodType, setNewMethodType] = useState<"credit_card" | "paypal">("credit_card")

  const handleAddNewMethod = (e: React.FormEvent) => {
    e.preventDefault()
    // In a real application, you would send this data to your backend
    const newMethod: PaymentMethod = {
      id: (paymentMethods.length + 1).toString(),
      type: newMethodType,
      details: newMethodType === "credit_card" ? "**** **** **** 5678" : "newuser@example.com",
    }
    setPaymentMethods([...paymentMethods, newMethod])
    setSelectedMethod(newMethod.id)
    setIsAddingNew(false)
    toast({
      variant: "success",
      title: "New payment method added",
      className: "rounded-full",
    })
  }

  return (
    <AccountLayout currentPage="/users/payment-details">
      <h2 className="text-2xl font-semibold text-[#0f373d]">Payment Details</h2>

      <div className="bg-white p-6 rounded-lg border">
        <h3 className="text-xl font-semibold text-[#0f373d] mb-4">Your Payment Methods</h3>
        <RadioGroup value={selectedMethod} onValueChange={setSelectedMethod} className="space-y-4">
          {paymentMethods.map((method) => (
            <div key={method.id} className="flex items-center space-x-3">
              <RadioGroupItem
                value={method.id}
                id={method.id}
                className="border-[#0F373D] text-[#0F373D] focus:ring-[#0F373D]"
              />
              <Label htmlFor={method.id} className="flex items-center space-x-3 cursor-pointer text-[#0F373D]">
                {method.type === "credit_card" ? (
                  <CreditCard className="h-6 w-6 text-[#0f373d]" />
                ) : (
                  <PaypalIcon className="h-6 w-6 text-[#0f373d]" />
                )}
                <span>{method.details}</span>
              </Label>
            </div>
          ))}
        </RadioGroup>

        {!isAddingNew && (
          <Button onClick={() => setIsAddingNew(true)} className="mt-6 bg-[#0f373d] hover:bg-[#0f373d]/90 text-white">
            Add New Payment Method
          </Button>
        )}

        {isAddingNew && (
          <form onSubmit={handleAddNewMethod} className="mt-6 space-y-4">
            <div>
              <Label htmlFor="payment-type">Payment Type</Label>
              <RadioGroup
                id="payment-type"
                value={newMethodType}
                onValueChange={(value) => setNewMethodType(value as "credit_card" | "paypal")}
                className="flex space-x-4 mt-2"
              >
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="credit_card"
                    id="credit-card"
                    className="border-[#0F373D] text-[#0F373D] focus:ring-[#0F373D]"
                  />
                  <Label htmlFor="credit-card" className="flex items-center space-x-2 cursor-pointer text-[#0F373D]">
                    <CreditCard className="h-5 w-5" />
                    <span>Credit Card</span>
                  </Label>
                </div>
                <div className="flex items-center space-x-2">
                  <RadioGroupItem
                    value="paypal"
                    id="paypal"
                    className="border-[#0F373D] text-[#0F373D] focus:ring-[#0F373D]"
                  />
                  <Label htmlFor="paypal" className="flex items-center space-x-2 cursor-pointer text-[#0F373D]">
                    <PaypalIcon className="h-5 w-5" />
                    <span>PayPal</span>
                  </Label>
                </div>
              </RadioGroup>
            </div>

            {newMethodType === "credit_card" ? (
              <>
                <div className="space-y-2">
                  <Label htmlFor="card-number">Card Number</Label>
                  <Input id="card-number" placeholder="1234 5678 9012 3456" className="h-12" required />
                </div>
                <div className="grid grid-cols-2 gap-4">
                  <div className="space-y-2">
                    <Label htmlFor="expiry-date">Expiry Date</Label>
                    <Input id="expiry-date" placeholder="MM/YY" className="h-12" required />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="cvv">CVV</Label>
                    <Input id="cvv" placeholder="123" className="h-12" required />
                  </div>
                </div>
              </>
            ) : (
              <div className="space-y-2">
                <Label htmlFor="paypal-email">PayPal Email</Label>
                <Input id="paypal-email" type="email" placeholder="you@example.com" className="h-12" required />
              </div>
            )}

            <div className="flex space-x-4">
              <Button type="submit" className="bg-[#0f373d] hover:bg-[#0f373d]/90 text-white">
                Add Payment Method
              </Button>
              <Button type="button" variant="outline" onClick={() => setIsAddingNew(false)}>
                Cancel
              </Button>
            </div>
          </form>
        )}
      </div>
    </AccountLayout>
  )
}

