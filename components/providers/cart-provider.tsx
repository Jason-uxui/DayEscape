"use client"

import type React from "react"

import { CartProvider as Provider } from "@/contexts/CartContext"

export function CartProvider({ children }: { children: React.ReactNode }) {
  return <Provider>{children}</Provider>
}

