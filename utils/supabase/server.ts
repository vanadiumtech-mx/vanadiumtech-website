import { createServerClient } from '@supabase/ssr'
import { cookies } from 'next/headers'

export const createClient = async () => {
  try {
    const cookieStore = await cookies()

    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    // Verificar que las variables existen
    if (!supabaseUrl) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL no está configurada')
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_URL environment variable')
    }

    if (!supabaseKey) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY no está configurada')
      throw new Error('Missing NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY environment variable')
    }

    console.log('✅ Supabase client inicializado correctamente')
    console.log('URL:', supabaseUrl.substring(0, 30) + '...') // Log parcial por seguridad

    return createServerClient(
      supabaseUrl,
      supabaseKey,
      {
        cookies: {
          getAll() {
            return cookieStore.getAll()
          },
          setAll(cookiesToSet) {
            try {
              cookiesToSet.forEach(({ name, value, options }) =>
                cookieStore.set(name, value, options)
              )
            } catch (error) {
              console.error('Error al setear cookies:', error)
            }
          },
        },
      }
    )
  } catch (error) {
    console.error('❌ Error al crear Supabase client:', error)
    throw error
  }
}