"use client"

import type React from "react"
import { createContext, useContext, useEffect, useState } from "react"
import type { Session, User } from "@supabase/supabase-js"
import { createClient } from "@supabase/supabase-js"
import type { Database } from "@/types/supabase"

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY

// Tạo client chỉ ở client-side để tránh vấn đề URL trong SSR
let supabase: ReturnType<typeof createClient<Database>> | null = null;

// Khởi tạo supabase client chỉ khi ở client-side
if (typeof window !== 'undefined') {
  if (!supabaseUrl || !supabaseAnonKey) {
    console.error("Missing Supabase environment variables")
  } else {
    try {
      // Clean the URL - remove any whitespace, trailing slashes, etc
      const cleanSupabaseUrl = supabaseUrl.trim().replace(/\/+$/, "")
      supabase = createClient<Database>(cleanSupabaseUrl, supabaseAnonKey)
    } catch (error) {
      console.error("Error initializing Supabase client:", error)
    }
  }
}

type AuthContextType = {
  user: User | null
  session: Session | null
  signIn: (email: string, password: string) => Promise<{ error: Error | null }>
  signUp: (email: string, password: string) => Promise<{ error: Error | null }>
  signOut: () => Promise<void>
  resetPassword: (email: string) => Promise<void>
  resendConfirmationEmail: (email: string) => Promise<{ error: Error | null }>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null)
  const [session, setSession] = useState<Session | null>(null)
  const [isClient, setIsClient] = useState(false)

  // Đảm bảo chúng ta chỉ chạy code liên quan đến xác thực ở client-side
  useEffect(() => {
    setIsClient(true)
  }, [])

  useEffect(() => {
    // Kiểm tra nếu đang ở client-side và supabase đã được khởi tạo
    if (isClient && supabase) {
      const { data: authListener } = supabase.auth.onAuthStateChange(async (event, session) => {
        setSession(session)
        setUser(session?.user ?? null)
      })

      return () => {
        authListener?.subscription.unsubscribe()
      }
    }
  }, [isClient])

  const signIn = async (email: string, password: string) => {
    if (!supabase) return { error: new Error("Supabase client not initialized") }
    const { error } = await supabase.auth.signInWithPassword({ email, password })
    return { error }
  }

  const signUp = async (email: string, password: string) => {
    if (!supabase) return { error: new Error("Supabase client not initialized") }
    const { data, error } = await supabase.auth.signUp({
      email,
      password,
    })

    return { error }
  }

  const signOut = async () => {
    if (!supabase) throw new Error("Supabase client not initialized")
    const { error } = await supabase.auth.signOut()
    if (error) throw error
  }

  const resetPassword = async (email: string) => {
    if (!supabase) throw new Error("Supabase client not initialized")
    const { error } = await supabase.auth.resetPasswordForEmail(email)
    if (error) throw error
  }

  const resendConfirmationEmail = async (email: string) => {
    if (!supabase) return { error: new Error("Supabase client not initialized") }
    const { error } = await supabase.auth.resend({
      type: "signup",
      email: email,
    })
    return { error }
  }

  const value = {
    user,
    session,
    signIn,
    signUp,
    signOut,
    resetPassword,
    resendConfirmationEmail,
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>
}

export function useAuth() {
  const context = useContext(AuthContext)
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider")
  }
  return context
}

