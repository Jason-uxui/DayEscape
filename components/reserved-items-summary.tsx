"use client"

import { useCart } from "@/contexts/CartContext"

export function ReservedItemsSummary() {
  const { items, total } = useCart()

  return (
    <div className="bg-white rounded-lg shadow-md p-6">
      <h2 className="text-xl font-semibold text-[#0c363e] mb-4">Reserved Items</h2>
      {items.map((item) => (
        <div key={item.id} className="mb-4 pb-4 border-b last:border-b-0">
          <h3 className="font-medium text-[#333333]">{item.name}</h3>
          <p className="text-sm text-[#4f4f4f]">
            {item.options?.adults} adult, {item.options?.children} child, {item.options?.infants} infant
          </p>
          <p className="text-sm font-medium text-[#0c363e]">${item.price}</p>
        </div>
      ))}
      <div className="mt-6 pt-4 border-t">
        <div className="flex justify-between items-center">
          <span className="font-medium text-[#333333]">Total</span>
          <span className="text-xl font-bold text-[#0c363e]">${total}</span>
        </div>
      </div>
    </div>
  )
}

