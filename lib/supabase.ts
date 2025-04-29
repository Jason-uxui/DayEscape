import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim()
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim()

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error("Missing Supabase environment variables")
}

// Clean the URL - remove any whitespace, trailing slashes, etc
const cleanSupabaseUrl = supabaseUrl.replace(/\/+$/, "")

// Create the Supabase client
const supabaseClient = createClient<Database>(cleanSupabaseUrl, supabaseAnonKey)

export function isSupabaseInitialized() {
  return Boolean(cleanSupabaseUrl && supabaseAnonKey)
}

// Export as both named export and default export to support different import styles
export { supabaseClient as supabase }
export default supabaseClient

