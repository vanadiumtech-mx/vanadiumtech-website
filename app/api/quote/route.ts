// app/api/quote/route.ts
import { NextRequest, NextResponse } from 'next/server'
import { createClient } from '@/lib/supabase/server'
import { sendQuoteEmail } from '@/lib/email'

export async function POST(request: NextRequest) {
  try {
    const body = await request.json()
    const { 
      name, 
      email, 
      phone, 
      company, 
      service, 
      projectSize, 
      budget, 
      timeline, 
      message 
    } = body

    // Validación
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Todos los campos requeridos deben estar completos' },
        { status: 400 }
      )
    }

    const supabase = createClient()

    // Guardar como lead con información adicional
    const fullMessage = `${message}\n\nDetalles adicionales:\nTamaño de proyecto: ${projectSize || 'No especificado'}\nPresupuesto: ${budget || 'No especificado'}\nTimeline: ${timeline || 'No especificado'}`

    const { data: leadData, error: leadError } = await supabase
      .from('leads')
      .insert({
        name,
        email,
        phone,
        company: company || null,
        service,
        message: fullMessage,
        source: 'QUOTE_REQUEST',
      })
      .select()
      .single()

    if (leadError) {
      console.error('Error saving lead:', leadError)
      throw new Error('Error al guardar la solicitud')
    }

    // Registrar en auditoría
    const { error: auditError } = await supabase
      .from('form_submissions')
      .insert({
        form_type: 'quote',
        data: body,
        ip: request.headers.get('x-forwarded-for') || request.headers.get('x-real-ip') || 'unknown',
        user_agent: request.headers.get('user-agent') || 'unknown',
      })

    if (auditError) {
      console.error('Error saving audit:', auditError)
    }

    // Enviar email de cotización
    await sendQuoteEmail({ name, email, phone, company, service, projectSize, budget, timeline, message })

    return NextResponse.json(
      { success: true, message: 'Solicitud de cotización enviada', id: leadData.id },
      { status: 200 }
    )
  } catch (error) {
    console.error('Error en cotización:', error)
    return NextResponse.json(
      { error: 'Error al procesar la solicitud' },
      { status: 500 }
    )
  }
}