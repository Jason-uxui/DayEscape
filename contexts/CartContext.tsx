"use client"

import type React from "react"
import { createContext, useContext, useState, useCallback } from "react"

interface HotelInfo {
  id: string
  name: string
  image: string
  address: string
}

interface CartItem {
  id: string
  name: string
  quantity: number
  price: number
  hotel: HotelInfo
  options?: {
    adults: number
    children: number
    infants: number
    date: string
  }
}

interface CartContextType {
  items: CartItem[]
  escapeDate: Date
  addToCart: (item: CartItem) => void
  removeFromCart: (id: string) => void
  updateEscapeDate: (date: Date) => void
  isInCart: (id: string) => boolean
  total: number
  getHotelInfo: () => HotelInfo | null
}

const CartContext = createContext<CartContextType | undefined>(undefined)

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error("useCart must be used within a CartProvider")
  }
  return context
}

export function CartProvider({
  children,
}: {
  children: React.ReactNode
}) {
  const [items, setItems] = useState<CartItem[]>([])
  const [escapeDate, setEscapeDate] = useState<Date>(new Date())

  const addToCart = useCallback((newItem: CartItem) => {
    setItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex(
        (item) => item.id === newItem.id && item.options?.date === newItem.options?.date,
      )
      if (existingItemIndex > -1) {
        const updatedItems = [...prevItems]
        updatedItems[existingItemIndex] = {
          ...updatedItems[existingItemIndex],
          quantity: updatedItems[existingItemIndex].quantity + newItem.quantity,
          price: updatedItems[existingItemIndex].price + newItem.price,
          options: newItem.options,
        }
        return updatedItems
      }
      return [...prevItems, newItem]
    })
  }, [])

  const removeFromCart = useCallback((id: string) => {
    setItems((prevItems) => prevItems.filter((item) => item.id !== id))
  }, [])

  const updateEscapeDate = useCallback((date: Date) => {
    setEscapeDate(date)
  }, [])

  const isInCart = useCallback(
    (id: string) => {
      return items.some((item) => item.id === id)
    },
    [items],
  )

  const total = items.reduce((sum, item) => sum + item.price, 0)

  const getHotelInfo = useCallback(() => {
    return items.length > 0 ? items[0].hotel : null
  }, [items])

  return (
    <CartContext.Provider
      value={{
        items,
        escapeDate,
        addToCart,
        removeFromCart,
        updateEscapeDate,
        isInCart,
        total,
        getHotelInfo,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

