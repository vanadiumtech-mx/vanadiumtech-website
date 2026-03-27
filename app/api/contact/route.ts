import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  try {
    const supabase = await createClient()
    const body = await request.json()

    // Validar datos requeridos
    const { name, email, phone, service, message } = body
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Insertar en la tabla leads (recomendada) o contact_messages
    const { data, error } = await supabase
      .from('leads')
      .insert({
        name: body.name,
        email: body.email,
        phone: body.phone,
        company: body.company || null,
        service: body.service,
        message: body.message,
        source: 'CONTACT_FORM',
        status: 'PENDING'
      })
      .select()
      .single()

    if (error) {
      console.error('Error al insertar en Supabase:', error)
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: 500 }
      )
    }

    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente', data },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en la API:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}