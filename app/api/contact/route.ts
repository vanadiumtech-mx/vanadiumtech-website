// app/api/contact/route.ts - Versión con logging detallado
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('=========================================')
  console.log('📝 API Contact - Iniciando proceso')
  console.log('=========================================')
  
  // Loggear TODAS las variables de entorno (con cuidado)
  console.log('🔍 TODAS las variables de entorno disponibles:')
  console.log('  - RESEND_API_KEY existe?:', !!process.env.RESEND_API_KEY)
  console.log('  - RESEND_API_KEY valor:', process.env.RESEND_API_KEY ? 'PRESENTE' : 'AUSENTE')
  console.log('  - Primeros 10 chars:', process.env.RESEND_API_KEY?.substring(0, 10))
  
  // También verificar otras variables relevantes
  console.log('  - SUPABASE_SERVICE_ROLE_KEY existe?:', !!process.env.SUPABASE_SERVICE_ROLE_KEY)
  console.log('  - NEXT_PUBLIC_SUPABASE_URL existe?:', !!process.env.NEXT_PUBLIC_SUPABASE_URL)
  
  try {
    // Verificar específicamente RESEND_API_KEY
    if (!process.env.RESEND_API_KEY) {
      console.error('❌ RESEND_API_KEY NO ESTÁ CONFIGURADA en el entorno de ejecución')
      console.error('   Posibles causas:')
      console.error('   1. No se agregó en Vercel Environment Variables')
      console.error('   2. Se agregó pero no se redeployó después')
      console.error('   3. El nombre tiene un typo')
      console.error('   4. Está en desarrollo pero no en producción')
    } else {
      console.log('✅ RESEND_API_KEY está configurada correctamente')
    }
    
    // Resto del código...
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    if (!supabaseUrl || !supabaseKey) {
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      )
    }
    
    const body = await request.json()
    const { name, email, phone, service, message } = body
    
    if (!name || !email || !phone || !service || !message) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
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
    
    // Insertar en Supabase
    const url = `${supabaseUrl}/rest/v1/leads`
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
    
    if (!response.ok) {
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: response.status }
      )
    }
    
    const savedData = await response.json()
    
    // Enviar correo con Resend - Usar import dinámico
    if (process.env.RESEND_API_KEY) {
      try {
        console.log('📧 Intentando enviar correo con Resend...')
        
        // Importar dinámicamente Resend
        const { Resend } = await import('resend')
        const resend = new Resend(process.env.RESEND_API_KEY)
        
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <title>Nuevo mensaje de contacto - Vanadium Tech</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
              .container { max-width: 600px; margin: 0 auto; padding: 20px; }
              .header { background-color: #2c3e50; color: #fff; padding: 20px; text-align: center; }
              .content { padding: 30px; }
              .field { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
              .field-label { font-weight: bold; color: #2c3e50; }
              .message-content { background-color: #f9f9f9; padding: 15px; border-radius: 5px; }
            </style>
          </head>
          <body>
            <div class="container">
              <div class="header">
                <h1>📬 Nuevo mensaje de contacto</h1>
                <p>Vanadium Tech - Formulario web</p>
              </div>
              <div class="content">
                <div class="field">
                  <div class="field-label">👤 Nombre:</div>
                  <div><strong>${escapeHtml(name)}</strong></div>
                </div>
                <div class="field">
                  <div class="field-label">📧 Email:</div>
                  <div><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
                </div>
                <div class="field">
                  <div class="field-label">📞 Teléfono:</div>
                  <div>${escapeHtml(phone)}</div>
                </div>
                ${body.company ? `
                <div class="field">
                  <div class="field-label">🏢 Empresa:</div>
                  <div>${escapeHtml(body.company)}</div>
                </div>
                ` : ''}
                <div class="field">
                  <div class="field-label">🔧 Servicio:</div>
                  <div>${escapeHtml(service)}</div>
                </div>
                <div class="field">
                  <div class="field-label">💬 Mensaje:</div>
                  <div class="message-content">${escapeHtml(message).replace(/\n/g, '<br>')}</div>
                </div>
              </div>
            </div>
          </body>
          </html>
        `
        
        function escapeHtml(str: string): string {
          return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }
        
        // Enviar correo al equipo
        const emailResponse = await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: process.env.EMAIL_TO || 'contact@vanadiumtech.com.mx',
          subject: `Nuevo mensaje de ${name} - Vanadium Tech`,
          html: emailHtml,
          replyTo: email,
        })
        
        console.log('✅ Correo enviado exitosamente:', emailResponse)
        
        // Enviar confirmación al cliente
        await resend.emails.send({
          from: process.env.EMAIL_FROM || 'onboarding@resend.dev',
          to: email,
          subject: 'Hemos recibido tu mensaje - Vanadium Tech',
          html: `
            <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; padding: 20px;">
              <h1>¡Gracias por contactarnos!</h1>
              <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
              <p>Hemos recibido tu mensaje correctamente. Uno de nuestros asesores se comunicará contigo en las próximas 24 horas.</p>
              <p>Saludos,<br><strong>Equipo de Vanadium Tech</strong></p>
            </div>
          `
        })
        
        console.log('✅ Correo de confirmación enviado al cliente')
        
      } catch (emailError) {
        console.error('❌ Error detallado al enviar correo:', emailError)
      }
    } else {
      console.error('❌ RESEND_API_KEY NO ESTÁ CONFIGURADA - No se enviarán correos')
      console.error('   Por favor, verifica en Vercel que la variable existe')
    }
    
    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    )
    
  } catch (error) {
    console.error('❌ Error:', error)
    return NextResponse.json(
      { error: 'Error interno del servidor' },
      { status: 500 }
    )
  }
}