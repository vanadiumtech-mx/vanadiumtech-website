// app/api/newsletter/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { email } = body

    if (!email) {
      return NextResponse.json(
        { error: 'Email es requerido' },
        { status: 400 }
      )
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Verificar si ya existe
    const { data: existing, error: findError } = await supabase
      .from('subscribers')
      .select('email, is_active')
      .eq('email', email)
      .single()

    if (findError && findError.code !== 'PGRST116') {
      console.error('Error finding subscriber:', findError)
    }

    if (existing) {
      if (!existing.is_active) {
        // Reactivar si estaba inactivo
        const { error: updateError } = await supabase
          .from('subscribers')
          .update({ is_active: true })
          .eq('email', email)

        if (updateError) {
          throw new Error('Error al reactivar suscripción')
        }

        return NextResponse.json(
          { success: true, message: 'Suscripción reactivada' },
          { status: 200 }
        )
      }
      return NextResponse.json(
        { error: 'Email ya suscrito' },
        { status: 400 }
      )
    }

    // Crear nuevo suscriptor
    const { error: insertError } = await supabase
      .from('subscribers')
      .insert({ email })

    if (insertError) {
      throw new Error('Error al suscribir')
    }

    // Registrar en auditoría
    const { error: auditError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'newsletter',
        data: { email },
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      })

    if (auditError) {
      console.error('Error saving audit:', auditError)
    }

    return NextResponse.json(
      { success: true, message: 'Suscripción exitosa' },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en newsletter:', error)
    return NextResponse.json(
      { error: 'Error al procesar la suscripción' },
      { status: 500 }
    )
  }
}