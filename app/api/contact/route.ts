// app/api/contact/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendContactEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { name, email, phone, company, service, message } = body

    // Validación de campos requeridos
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Todos los campos son requeridos' },
        { status: 400 }
      )
    }

    // Validación de email
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      return NextResponse.json(
        { error: 'Email inválido' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Guardar en contact_messages
    const { data: contactData, error: contactError } = await supabase
      .from('contact_messages')
      .insert({
        name,
        email,
        phone,
        company: company || null,
        service,
        message,
        is_read: false,
      })
      .select()
      .single()

    if (contactError) {
      console.error('Error saving contact:', contactError)
      throw new Error('Error al guardar el mensaje')
    }

    // Guardar también en leads
    const { error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        company: company || null,
        service,
        message,
        source: 'CONTACT_FORM',
      })

    if (leadError) {
      console.error('Error saving lead:', leadError)
    }

    // Registrar en auditoría
    const { error: auditError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'contact',
        data: body,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      })

    if (auditError) {
      console.error('Error saving audit:', auditError)
    }

    // Enviar email de notificación (opcional)
    await sendContactEmail({ name, email, phone, company, service, message })

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente', id: contactData.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en contacto:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}