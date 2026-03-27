import { createClient } from '@/utils/supabase/server'
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('📝 Recibida solicitud POST en /api/contact')
  
  try {
    // Verificar variables de entorno primero
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_URL no está disponible en el servidor')
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      )
    }

    if (!process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY) {
      console.error('❌ NEXT_PUBLIC_SUPABASE_PUBLISHABLE_DEFAULT_KEY no está disponible en el servidor')
      return NextResponse.json(
        { error: 'Error de configuración del servidor' },
        { status: 500 }
      )
    }

    console.log('✅ Variables de entorno verificadas')
    
    // Crear cliente de Supabase
    const supabase = await createClient()
    console.log('✅ Cliente Supabase creado')
    
    // Parsear body
    const body = await request.json()
    console.log('📦 Body recibido:', { ...body, message: body.message?.substring(0, 50) + '...' })

    // Validar datos requeridos
    const { name, email, phone, service, message } = body
    if (!name || !email || !phone || !service || !message) {
      console.error('❌ Campos faltantes:', { name: !!name, email: !!email, phone: !!phone, service: !!service, message: !!message })
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }

    console.log('✅ Validación de campos exitosa')

    // Insertar en la tabla leads
    const insertData = {
      name: body.name,
      email: body.email,
      phone: body.phone,
      company: body.company || null,
      service: body.service,
      message: body.message,
      source: 'CONTACT_FORM',
      status: 'PENDING'
    }
    
    console.log('💾 Intentando insertar en Supabase:', { ...insertData, message: insertData.message.substring(0, 50) + '...' })
    
    const { data, error } = await supabase
      .from('leads')
      .insert(insertData)
      .select()
      .single()

    if (error) {
      console.error('❌ Error al insertar en Supabase:', error)
      console.error('Detalles del error:', {
        code: error.code,
        message: error.message,
        details: error.details,
        hint: error.hint
      })
      
      // Devolver mensaje de error más específico
      return NextResponse.json(
        { 
          error: 'Error al guardar el mensaje',
          details: error.message 
        },
        { status: 500 }
      )
    }

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
    console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}