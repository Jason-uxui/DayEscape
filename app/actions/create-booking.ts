"use server"

import { createServerActionClient } from "@supabase/auth-helpers-nextjs"
import { cookies } from "next/headers"
import type { Database } from "@/types/supabase"

export async function createBooking(formData: FormData) {
  const supabase = createServerActionClient<Database>({ cookies })

  // Check if the user is authenticated
  const {
    data: { user },
    error: authError,
  } = await supabase.auth.getUser()

  if (authError || !user) {
    return { error: "User is not authenticated" }
  }

  const productId = formData.get("productId") as string
  const hotelId = formData.get("hotelId") as string
  const checkInDate = formData.get("checkInDate") as string
  const adults = Number.parseInt(formData.get("adults") as string, 10)
  const children = Number.parseInt(formData.get("children") as string, 10)
  const infants = Number.parseInt(formData.get("infants") as string, 10)

  if (!productId || !hotelId || !checkInDate) {
    return { error: "Missing required fields" }
  }

  try {
    const { data, error } = await supabase
      .from("bookings")
      .insert({
        user_id: user.id,
        hotel_id: hotelId,
        product_id: productId,
        check_in_date: checkInDate,
        status: "upcoming",
        guest_count: { adults, children, infants },
      })
      .select()

    if (error) throw error

    return { success: true, booking: data[0] }
  } catch (error) {
    console.error("Error creating booking:", error)
    return { error: "Failed to create booking" }
  }
}

