// types/supabase.ts
export type Json =
  | string
  | number
  | boolean
  | null
  | { [key: string]: Json | undefined }
  | Json[]

export interface Database {
  public: {
    Tables: {
      leads: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company: string | null
          service: string
          message: string
          status: string
          source: string
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          company?: string | null
          service: string
          message: string
          status?: string
          source?: string
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          company?: string | null
          service?: string
          message?: string
          status?: string
          source?: string
          created_at?: string
          updated_at?: string
        }
      }
      contact_messages: {
        Row: {
          id: string
          name: string
          email: string
          phone: string
          company: string | null
          service: string
          message: string
          is_read: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          name: string
          email: string
          phone: string
          company?: string | null
          service: string
          message: string
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          name?: string
          email?: string
          phone?: string
          company?: string | null
          service?: string
          message?: string
          is_read?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      subscribers: {
        Row: {
          id: string
          email: string
          is_active: boolean
          created_at: string
          updated_at: string
        }
        Insert: {
          id?: string
          email: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
        Update: {
          id?: string
          email?: string
          is_active?: boolean
          created_at?: string
          updated_at?: string
        }
      }
      form_submissions: {
        Row: {
          id: string
          form_type: string
          data: Json
          ip: string | null
          user_agent: string | null
          status: string
          created_at: string
        }
        Insert: {
          id?: string
          form_type: string
          data: Json
          ip?: string | null
          user_agent?: string | null
          status?: string
          created_at?: string
        }
        Update: {
          id?: string
          form_type?: string
          data?: Json
          ip?: string | null
          user_agent?: string | null
          status?: string
          created_at?: string
        }
      }
    }
  }
}