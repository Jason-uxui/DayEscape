"use client"

import { Button } from "@/components/ui/button"
import { useState, useEffect } from "react"
import { ProductDialog } from "./product-dialog"
import { useCart } from "@/contexts/CartContext"
import { supabase } from "@/lib/supabase"

export interface Product {
  id: string
  name: string
  base_price: number
  type: string
  max_capacity: number
}

interface ProductListProps {
  hotelId: string
}

export default function ProductList({ hotelId }: ProductListProps) {
  const [products, setProducts] = useState<Product[]>([])
  const [selectedProductId, setSelectedProductId] = useState<string | null>(null)
  const [dialogOpen, setDialogOpen] = useState(false)
  const { isInCart } = useCart()
  const [productStatuses, setProductStatuses] = useState<{ [key: string]: string }>({})
  const [productAvailability, setProductAvailability] = useState<{ [key: string]: string }>({})
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    async function fetchProducts() {
      try {
        setLoading(true)
        console.log("Fetching products...")

        const { data, error } = await supabase
          .from("products")
          .select("id, name, base_price, type, max_capacity")
          .eq("hotel_id", hotelId)

        if (error) throw error

        setProducts(data)
      } catch (error: any) {
        console.error("Error fetching products:", error)
        setError(error.message || "An unknown error occurred")
      } finally {
        setLoading(false)
      }
    }

    fetchProducts()
  }, [hotelId])

  useEffect(() => {
    const newStatuses: { [key: string]: string } = {}
    products.forEach((product) => {
      if (isInCart(product.id)) {
        newStatuses[product.id] = "in cart"
      }
    })
    setProductStatuses(newStatuses)
  }, [isInCart, products])

  useEffect(() => {
    async function fetchAvailability() {
      try {
        if (products.length === 0) return

        const { data, error } = await supabase
          .from("availability")
          .select("product_id, status")
          .in("product_id", products.map(p => p.id))

        if (error) throw error

        // Tạo object mapping từ product_id đến status
        const availabilityMap: { [key: string]: string } = {}
        data.forEach(item => {
          if (item.status) {
            availabilityMap[item.product_id] = item.status
          }
        })

        setProductAvailability(availabilityMap)
      } catch (error: any) {
        console.error("Error fetching availability:", error)
      }
    }

    fetchAvailability()
  }, [products])

  // Kiểm tra xem sản phẩm có bị Sold Out không
  const isProductSoldOut = (productId: string) => {
    return productAvailability[productId]?.toLowerCase().includes("sold out");
  };

  if (loading) {
    return <div>Loading products...</div>
  }

  if (error) {
    return <div>{error}</div>
  }

  return (
    <div className="space-y-6">
      <div className="space-y-2">
        <h2 className="text-xl font-semibold text-[#333333]">Available Products</h2>
        <p className="text-[#4f4f4f]">Select your product that meets your needs</p>
      </div>

      <div className="space-y-4">
        {products.map((product) => (
          <div key={product.id} className="flex flex-col sm:flex-row sm:items-center sm:justify-between rounded-lg border bg-white p-4 sm:p-6">
            <div className="mb-4 sm:mb-0">
              <div className="flex items-center gap-2 flex-wrap">
                <h3 className="text-lg font-semibold text-[#333333]">{product.name}</h3>
                {/* Hiển thị "in cart" nếu sản phẩm đã được thêm vào giỏ hàng */}
                {productStatuses[product.id] ? (
                  <span className="rounded px-2 py-0.5 text-xs bg-green-100 text-green-600">
                    {productStatuses[product.id]}
                  </span>
                ) : (
                  /* Nếu không, hiển thị badge availability nếu có */
                  productAvailability[product.id] && (
                    <span className={`rounded px-2 py-0.5 text-xs ${productAvailability[product.id].toLowerCase().includes("sold out")
                      ? "bg-red-100 text-red-600"
                      : productAvailability[product.id].toLowerCase().includes("only")
                        ? "bg-orange-100 text-orange-600"
                        : productAvailability[product.id].toLowerCase().includes("available")
                          ? "bg-green-100 text-green-600"
                          : "bg-blue-100 text-blue-600"
                      }`}>
                      {productAvailability[product.id]}
                    </span>
                  )
                )}
              </div>
              <div className="mt-2 sm:hidden">
                <span className="text-sm text-[#4f4f4f]">Max {product.max_capacity} People</span>
                <span className="text-lg font-semibold text-[#333333] ml-2">${product.base_price}</span>
              </div>
            </div>
            <div className="flex items-center justify-between sm:justify-end gap-4">
              <div className="hidden sm:flex sm:flex-col sm:items-end">
                <span className="text-sm text-[#4f4f4f]">Max {product.max_capacity} People</span>
                <span className="text-lg font-semibold text-[#333333]">${product.base_price}</span>
              </div>
              <Button
                onClick={() => {
                  setSelectedProductId(product.id)
                  setDialogOpen(true)
                }}
                className="bg-[#0f373d] hover:bg-[#0f373d]/90 rounded-full ml-auto sm:ml-0"
                disabled={isProductSoldOut(product.id)}
              >
                Select
              </Button>
            </div>
          </div>
        ))}
      </div>

      <ProductDialog
        productId={selectedProductId || ""}
        open={dialogOpen}
        onOpenChange={setDialogOpen}
        availabilityStatus={selectedProductId ? productAvailability[selectedProductId] : ""}
      />
    </div>
  )
}

