import { type NextRequest } from 'next/server'
import { createClient } from '@/utils/supabase/middleware'

export async function middleware(request: NextRequest) {
  const supabase = createClient(request)
  // Aquí puedes agregar lógica de autenticación si es necesario
  // Por ahora solo actualizamos la sesión
  await supabase.auth.getSession()
  
  return
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    '/((?!_next/static|_next/image|favicon.ico|public).*)',
  ],
}