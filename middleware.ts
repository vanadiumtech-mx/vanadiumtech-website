import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Permitir todas las peticiones sin procesar
  return NextResponse.next()
}

export const config = {
  matcher: [], // No aplicar a ninguna ruta
}