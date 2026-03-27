// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('=========================================')
  console.log('📝 API Contact - Iniciando proceso')
  console.log('=========================================')
  
  try {
    // 1. Verificar variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    // IMPORTANTE: Usar la clave de servicio para operaciones del servidor
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    console.log('🔍 Verificando variables de entorno:')
    console.log('  - URL:', supabaseUrl ? '✅ Presente' : '❌ Faltante')
    console.log('  - SERVICE ROLE KEY:', supabaseKey ? '✅ Presente' : '❌ Faltante')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variables de entorno faltantes')
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      )
    }
    
    // 2. Parsear body
    const body = await request.json()
    console.log('📦 Datos recibidos:', body)
    
    // 3. Validar campos
    const { name, email, phone, service, message } = body
    
    if (!name || !email || !phone || !service || !message) {
      console.error('❌ Campos faltantes')
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
    // 4. Preparar datos para insertar
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
    
    console.log('💾 Datos a insertar:', insertData)
    
    // 5. Intentar inserción con la clave de servicio
    const url = `${supabaseUrl}/rest/v1/leads`
    console.log('🌐 URL:', url)
    
    const response = await fetch(url, {
      method: 'POST',
      headers: {
        'apikey': supabaseKey,
        'Authorization': `Bearer ${supabaseKey}`,
        'Content-Type': 'application/json',
        'Prefer': 'return=representation'
      },
      body: JSON.stringify(insertData)
    })
    
    console.log('📡 Status de respuesta:', response.status)
    
    // 6. Leer respuesta
    const responseText = await response.text()
    console.log('📄 Respuesta:', responseText)
    
    if (!response.ok) {
      console.error('❌ Error en Supabase:', response.status, responseText)
      return NextResponse.json(
        { 
          error: 'Error al guardar el mensaje',
          details: responseText
        },
        { status: response.status }
      )
    }
    
    // 7. Éxito
    console.log('✅ Éxito! Mensaje guardado correctamente')
    console.log('=========================================')
    
    return NextResponse.json(
      { 
        success: true, 
        message: 'Mensaje enviado correctamente'
      },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('❌ Error catastrófico:', error)
    console.log('=========================================')
    
    return NextResponse.json(
      { 
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido'
      },
      { status: 500 }
    )
  }
}