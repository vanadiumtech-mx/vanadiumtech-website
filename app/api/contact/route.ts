// app/api/contact/route.ts
import { NextResponse } from 'next/server'

export async function POST(request: Request) {
  console.log('=========================================')
  console.log('📝 API Contact - Iniciando proceso')
  console.log('=========================================')
  
  // ============================================
  // DEBUG EXTREMO - Ver todas las variables de entorno
  // ============================================
  console.log('🔍 DEBUG COMPLETO DE VARIABLES DE ENTORNO:')
  console.log('----------------------------------------')
  
  // Listar todas las variables disponibles
  const allEnvVars = Object.keys(process.env)
  console.log('📋 Total de variables:', allEnvVars.length)
  console.log('📋 Variables que contienen "RESEND":', allEnvVars.filter(k => k.includes('RESEND')))
  console.log('📋 Variables que contienen "EMAIL":', allEnvVars.filter(k => k.includes('EMAIL')))
  console.log('📋 Variables que contienen "SUPABASE":', allEnvVars.filter(k => k.includes('SUPABASE')))
  
  // Verificar cada variable específica
  console.log('----------------------------------------')
  console.log('🔍 VERIFICACIÓN ESPECÍFICA:')
  console.log('  - process.env.RESEND_API_KEY:', process.env.RESEND_API_KEY ? '✅ Presente' : '❌ Faltante')
  console.log('  - process.env.RESEND_API_KEY valor:', process.env.RESEND_API_KEY ? `"${process.env.RESEND_API_KEY.substring(0, 10)}..."` : 'no')
  console.log('  - process.env.RESEND_API_KEY tipo:', typeof process.env.RESEND_API_KEY)
  console.log('  - process.env.RESEND_API_KEY longitud:', process.env.RESEND_API_KEY?.length || 0)
  console.log('----------------------------------------')
  console.log('  - process.env.EMAIL_FROM:', process.env.EMAIL_FROM ? '✅ Presente' : '❌ Faltante')
  console.log('  - process.env.EMAIL_TO:', process.env.EMAIL_TO ? '✅ Presente' : '❌ Faltante')
  console.log('----------------------------------------')
  console.log('  - process.env.NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL ? '✅ Presente' : '❌ Faltante')
  console.log('  - process.env.SUPABASE_SERVICE_ROLE_KEY:', process.env.SUPABASE_SERVICE_ROLE_KEY ? '✅ Presente' : '❌ Faltante')
  console.log('=========================================')
  
  try {
    // 1. Verificar variables de entorno
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    
    // Intentar obtener RESEND_API_KEY de diferentes formas
    let resendApiKey = process.env.RESEND_API_KEY
    
    // Si no está en RESEND_API_KEY, buscar en otras variantes
    if (!resendApiKey) {
      console.log('⚠️ Buscando RESEND_API_KEY en otras variantes...')
      resendApiKey = process.env.RESEND_API_KEY_ALT || 
                      process.env.RESEND_KEY || 
                      process.env.RESEND_API ||
                      process.env.RESEND
      if (resendApiKey) {
        console.log('✅ Encontrada en variante alternativa')
      }
    }
    
    console.log('🔍 Verificación final:')
    console.log('  - URL Supabase:', supabaseUrl ? '✅ Presente' : '❌ Faltante')
    console.log('  - SERVICE ROLE KEY:', supabaseKey ? '✅ Presente' : '❌ Faltante')
    console.log('  - RESEND API KEY (final):', resendApiKey ? '✅ Presente' : '❌ Faltante')
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variables de entorno de Supabase faltantes')
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
    
    // 5. Insertar en Supabase
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
    
    console.log('📡 Status de Supabase:', response.status)
    
    if (!response.ok) {
      const responseText = await response.text()
      console.error('❌ Error en Supabase:', response.status, responseText)
      return NextResponse.json(
        { error: 'Error al guardar el mensaje' },
        { status: response.status }
      )
    }
    
    const savedData = await response.json()
    console.log('✅ Datos guardados en Supabase')
    
    // 6. Enviar correo electrónico (inicializar Resend dentro de la función)
    if (resendApiKey) {
      console.log('📧 Preparando envío de correos...')
      console.log('🔑 Usando RESEND_API_KEY:', resendApiKey.substring(0, 10) + '...')
      
      try {
        // Importar Resend dinámicamente dentro de la función
        console.log('📦 Importando Resend...')
        const { Resend } = await import('resend')
        console.log('✅ Resend importado correctamente')
        
        const resend = new Resend(resendApiKey)
        console.log('✅ Resend inicializado correctamente')
        
        // Función para escapar HTML
        const escapeHtml = (str: string): string => {
          return str
            .replace(/&/g, '&amp;')
            .replace(/</g, '&lt;')
            .replace(/>/g, '&gt;')
            .replace(/"/g, '&quot;')
            .replace(/'/g, '&#39;')
        }
        
        const emailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo mensaje de contacto - Vanadium Tech</title>
            <style>
              body {
                font-family: Arial, sans-serif;
                line-height: 1.6;
                color: #333;
                background-color: #f4f4f4;
                margin: 0;
                padding: 20px;
              }
              .container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #fff;
                border-radius: 8px;
                box-shadow: 0 2px 4px rgba(0,0,0,0.1);
                overflow: hidden;
              }
              .header {
                background-color: #2c3e50;
                color: #fff;
                padding: 20px;
                text-align: center;
              }
              .header h1 {
                margin: 0;
                font-size: 24px;
              }
              .content {
                padding: 30px;
              }
              .field {
                margin-bottom: 20px;
                border-bottom: 1px solid #eee;
                padding-bottom: 10px;
              }
              .field-label {
                font-weight: bold;
                color: #2c3e50;
                margin-bottom: 5px;
              }
              .field-value {
                color: #555;
                margin-top: 5px;
              }
              .message-content {
                background-color: #f9f9f9;
                padding: 15px;
                border-radius: 5px;
                margin-top: 10px;
              }
              .footer {
                background-color: #f4f4f4;
                padding: 20px;
                text-align: center;
                font-size: 12px;
                color: #777;
              }
              .badge {
                display: inline-block;
                background-color: #3498db;
                color: #fff;
                padding: 3px 8px;
                border-radius: 3px;
                font-size: 12px;
                margin-left: 10px;
              }
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
                  <div class="field-label">👤 Nombre completo:</div>
                  <div class="field-value"><strong>${escapeHtml(name)}</strong></div>
                </div>
                
                <div class="field">
                  <div class="field-label">📧 Correo electrónico:</div>
                  <div class="field-value"><a href="mailto:${escapeHtml(email)}">${escapeHtml(email)}</a></div>
                </div>
                
                <div class="field">
                  <div class="field-label">📞 Teléfono:</div>
                  <div class="field-value">${escapeHtml(phone)}</div>
                </div>
                
                ${body.company ? `
                <div class="field">
                  <div class="field-label">🏢 Empresa / Institución:</div>
                  <div class="field-value">${escapeHtml(body.company)}</div>
                </div>
                ` : ''}
                
                <div class="field">
                  <div class="field-label">🔧 Servicio de interés:</div>
                  <div class="field-value">
                    ${escapeHtml(service)}
                    <span class="badge">${escapeHtml(service)}</span>
                  </div>
                </div>
                
                <div class="field">
                  <div class="field-label">💬 Mensaje:</div>
                  <div class="message-content">
                    ${escapeHtml(message).replace(/\n/g, '<br>')}
                  </div>
                </div>
              </div>
              <div class="footer">
                <p>Este mensaje fue enviado a través del formulario de contacto de Vanadium Tech.</p>
                <p>Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
                <p>ID de referencia: ${savedData[0]?.id || 'N/A'}</p>
              </div>
            </div>
          </body>
          </html>
        `
        
        const emailFrom = process.env.EMAIL_FROM || 'Vanadium Tech <noreply@vanadiumtech.com.mx>'
        const emailTo = process.env.EMAIL_TO || 'contact@vanadiumtech.com.mx'
        
        console.log('📧 Configuración de correo:')
        console.log('  - FROM:', emailFrom)
        console.log('  - TO:', emailTo)
        console.log('  - REPLY_TO:', email)
        
        // Enviar correo al equipo
        console.log('📤 Enviando correo al equipo...')
        const emailToTeam = await resend.emails.send({
          from: emailFrom,
          to: emailTo,
          subject: `Nuevo mensaje de ${name} - Vanadium Tech`,
          html: emailHtml,
          replyTo: email,
        })
        
        console.log('✅ Correo enviado exitosamente al equipo:', emailToTeam)
        
        // Enviar correo de confirmación al cliente
        console.log('📤 Enviando correo de confirmación al cliente...')
        const emailToClient = await resend.emails.send({
          from: emailFrom,
          to: email,
          subject: 'Hemos recibido tu mensaje - Vanadium Tech',
          html: `
            <!DOCTYPE html>
            <html>
            <head>
              <meta charset="utf-8">
              <title>Confirmación de recepción - Vanadium Tech</title>
            </head>
            <body style="font-family: Arial, sans-serif; line-height: 1.6; color: #333;">
              <div style="max-width: 600px; margin: 0 auto; padding: 20px;">
                <div style="background-color: #2c3e50; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0;">
                  <h1>¡Gracias por contactarnos!</h1>
                </div>
                <div style="background-color: #fff; padding: 30px; border: 1px solid #ddd; border-radius: 0 0 8px 8px;">
                  <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
                  <p>Hemos recibido tu mensaje correctamente. Uno de nuestros asesores se comunicará contigo en las próximas 24 horas.</p>
                  <p><strong>Detalles de tu mensaje:</strong></p>
                  <ul>
                    <li><strong>Servicio de interés:</strong> ${escapeHtml(service)}</li>
                    <li><strong>Mensaje:</strong> ${escapeHtml(message.substring(0, 100))}${message.length > 100 ? '...' : ''}</li>
                  </ul>
                  <p>Mientras tanto, te invitamos a conocer más sobre nuestros servicios en nuestro sitio web.</p>
                  <p>Saludos,<br><strong>Equipo de Vanadium Tech</strong></p>
                </div>
                <div style="text-align: center; margin-top: 20px; font-size: 12px; color: #777;">
                  <p>© ${new Date().getFullYear()} Vanadium Tech. Todos los derechos reservados.</p>
                </div>
              </div>
            </body>
            </html>
          `
        })
        
        console.log('✅ Correo de confirmación enviado al cliente:', emailToClient)
        
      } catch (emailError) {
        console.error('❌ Error al enviar correo:', emailError)
        console.error('Detalles del error:', emailError instanceof Error ? emailError.message : 'Error desconocido')
        console.error('Stack:', emailError instanceof Error ? emailError.stack : 'No stack')
        // No fallamos la petición si el correo falla
      }
    } else {
      console.warn('⚠️ RESEND_API_KEY no configurada, los correos no se enviarán')
      console.warn('💡 Sugerencia: Verifica que la variable esté configurada en Vercel Settings → Environment Variables')
      console.warn('💡 El nombre exacto debe ser: RESEND_API_KEY')
    }
    
    console.log('✅ Proceso completado exitosamente')
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
    console.error('Stack:', error instanceof Error ? error.stack : 'No stack')
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