"use client"

import { useEffect, useState } from "react"
import { supabase } from "@/lib/supabase"

export function SupabaseStatus() {
  const [status, setStatus] = useState<"checking" | "connected" | "error">("checking")
  const [errorMessage, setErrorMessage] = useState<string | null>(null)

  useEffect(() => {
    async function checkConnection() {
      try {
        // Thử kết nối đến Supabase bằng cách lấy dữ liệu từ bảng hotels
        const { data, error } = await supabase
          .from("hotels")
          .select("id")
          .limit(1)

        if (error) {
          console.error("Supabase connection error:", error)
          setStatus("error")
          setErrorMessage(error.message)
          return
        }

        setStatus("connected")
      } catch (err) {
        console.error("Unexpected error:", err)
        setStatus("error")
        setErrorMessage(err instanceof Error ? err.message : "Lỗi không xác định")
      }
    }

    checkConnection()
  }, [])

  return (
    <div className="p-4 border rounded-md">
      <h3 className="font-semibold mb-2">Trạng thái Supabase:</h3>
      {status === "checking" && <p>Đang kiểm tra kết nối...</p>}
      {status === "connected" && <p className="text-green-600">Đã kết nối thành công!</p>}
      {status === "error" && (
        <div>
          <p className="text-red-600">Lỗi kết nối</p>
          {errorMessage && <p className="text-sm mt-1">{errorMessage}</p>}
        </div>
      )}
    </div>
  )
} 