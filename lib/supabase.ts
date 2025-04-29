import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

// Tạo và export supabase client chỉ khi đang ở client-side
let supabase: ReturnType<typeof createClient<Database>> | null = null;

// Hàm khởi tạo đảm bảo client chỉ được tạo khi URL hợp lệ và ở môi trường client
function initializeSupabase() {
  // Nếu đã khởi tạo rồi, chỉ cần trả về instance đã có
  if (supabase) return supabase;

  // Chỉ khởi tạo ở môi trường client
  if (typeof window === 'undefined') return null;

  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL?.trim();
  const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY?.trim();

  // Kiểm tra các biến môi trường
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables");
    return null;
  }

  try {
    // Clean the URL - remove any whitespace, trailing slashes, etc
    const cleanSupabaseUrl = supabaseUrl.replace(/\/+$/, "");

    // Tạo và lưu trữ client instance
    supabase = createClient<Database>(cleanSupabaseUrl, supabaseAnonKey);
    return supabase;
  } catch (error) {
    console.error("Error initializing Supabase client:", error);
    return null;
  }
}

// Export client thông qua getter để đảm bảo khởi tạo an toàn
export function getSupabaseClient() {
  return initializeSupabase();
}

// Kiểm tra xem client có được khởi tạo không
export function isSupabaseInitialized() {
  return Boolean(supabase);
}

