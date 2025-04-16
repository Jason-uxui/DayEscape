"use client"

import { CheckoutConfirmationSection } from "@/components/sections/checkout-confirmation-section"
import { useCart } from "@/contexts/CartContext"
import { useRouter } from "next/navigation"
import { useEffect } from "react"

export default function CheckoutPage() {
    const { items } = useCart()
    const router = useRouter()

    useEffect(() => {
        // Redirect to home if cart is empty
        if (items.length === 0) {
            router.push("/")
        }
    }, [items, router])

    return (
        <main className="bg-[#FDFAF5] min-h-screen py-8">
            <CheckoutConfirmationSection />
        </main>
    )
} 