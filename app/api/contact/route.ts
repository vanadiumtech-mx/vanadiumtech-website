// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('📝 Recibida solicitud POST en /api/contact')
  
  try {
    // Parsear body
    const body = await request.json()
    console.log('📦 Body recibido:', { 
      ...body, 
      message: body.message?.substring(0, 50) + '...' 
    })

    // Validar datos requeridos
    const { name, email, phone, service, message } = body
    
    if (!name || !email || !phone || !service || !message) {
      console.error('❌ Campos faltantes:', { 
        name: !!name, 
        email: !!email, 
        phone: !!phone, 
        service: !!service, 
        message: !!message 
      })
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    // Obtener variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY

    console.log('🔍 Variables de entorno:')
    console.log('- URL disponible:', !!supabaseUrl)
    console.log('- Key disponible:', !!supabaseKey)

    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variables de entorno faltantes')
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      )
    }

    // Preparar datos para Supabase
    const insertData = {
      name: name.trim(),
      email: email.trim().toLowerCase(),
      phone: phone.trim(),
      company: body.company?.trim() || null,
      service: service,
      message: message.trim(),
      source: 'CONTACT_FORM',
      status: 'PENDING'
    }

    console.log('💾 Insertando datos en Supabase...')

    // Llamar directamente a la API REST de Supabase
    const response = await fetch(`${supabaseUrl}/rest/v1/leads`, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(insertData)
    })

    console.log('📡 Respuesta de Supabase:', response.status, response.statusText)

    if (!response.ok) {
      const errorText = await response.text()
      console.error('❌ Error de Supabase:', {
        status: response.status,
        statusText: response.statusText,
        body: errorText
      })
      
      return NextResponse.json(
        { 
          error: 'Error al guardar el mensaje',
          details: `Supabase error: ${response.status} ${response.statusText}`
        },
        { status: 500 }
      )
    }

    const data = await response.json()
    console.log('✅ Mensaje guardado exitosamente:', data)

    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente',
        data: data 
      },
      { status: 200 }
    )

  } catch (error) {
    console.error('❌ Error general en la API:', error)
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack')
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}