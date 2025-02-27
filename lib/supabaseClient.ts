import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Clean the URL - remove any whitespace, trailing slashes, etc
const cleanSupabaseUrl = supabaseUrl.trim().replace(/\/+$/, "")

export const supabase = createClient<Database>(cleanSupabaseUrl, supabaseAnonKey)

