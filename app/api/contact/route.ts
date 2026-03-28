import { NextResponse } from 'next/server'
import { sendEmail, escapeHtml } from '@/utils/email'

export async function POST(request: Request) {
  console.log('=========================================')
  console.log('📝 API Contact - Iniciando proceso')
  console.log('=========================================')
  
  try {
    // DIAGNÓSTICO: Listar todas las variables de entorno disponibles
    console.log('🔍 LISTADO COMPLETO DE VARIABLES DE ENTORNO:')
    const allEnvVars = Object.keys(process.env).filter(key => 
      key.includes('EMAIL') || key.includes('SUPABASE')
    )
    console.log('Variables relacionadas con EMAIL y SUPABASE:', allEnvVars)
    
    // Verificar cada variable individualmente
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
    const supabaseKey = process.env.SUPABASE_SERVICE_ROLE_KEY
    const emailUser1 = process.env.EMAIL_SERVICE_USER
    const emailUser2 = process.env.EMAIL_USER
    const emailPass1 = process.env.EMAIL_SERVICE_PASS
    const emailPass2 = process.env.EMAIL_PASS
    const emailTo1 = process.env.EMAIL_RECIPIENT
    const emailTo2 = process.env.EMAIL_TO
    const emailFrom1 = process.env.EMAIL_SENDER
    const emailFrom2 = process.env.EMAIL_FROM
    
    console.log('🔍 Verificando variables de entorno UNA POR UNA:')
    console.log('  - NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl ? '✅' : '❌')
    console.log('  - SUPABASE_SERVICE_ROLE_KEY:', supabaseKey ? '✅' : '❌')
    console.log('  - EMAIL_SERVICE_USER:', emailUser1 ? '✅' : '❌')
    console.log('  - EMAIL_USER:', emailUser2 ? '✅' : '❌')
    console.log('  - EMAIL_SERVICE_PASS:', emailPass1 ? '✅' : '❌')
    console.log('  - EMAIL_PASS:', emailPass2 ? '✅' : '❌')
    console.log('  - EMAIL_RECIPIENT:', emailTo1 ? '✅' : '❌')
    console.log('  - EMAIL_TO:', emailTo2 ? '✅' : '❌')
    console.log('  - EMAIL_SENDER:', emailFrom1 ? '✅' : '❌')
    console.log('  - EMAIL_FROM:', emailFrom2 ? '✅' : '❌')
    
    // Usar la primera que encuentre
    const emailUser = emailUser1 || emailUser2
    const emailPass = emailPass1 || emailPass2
    const emailTo = emailTo1 || emailTo2 || 'contact@vanadiumtech.com.mx'
    const emailFrom = emailFrom1 || emailFrom2 || 'Vanadium Tech <vanadiumtec.co@gmail.com>'
    
    if (!supabaseUrl || !supabaseKey) {
      console.error('❌ Variables de entorno de Supabase faltantes')
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      )
    }
    
    if (!emailUser || !emailPass) {
      console.warn('⚠️ Credenciales de email no configuradas')
      console.warn('   Las variables disponibles son:', allEnvVars)
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
    
    // 6. Enviar correos electrónicos con Nodemailer
    if (emailUser && emailPass) {
      console.log('📧 Enviando correos con Nodemailer...')
      console.log('  - Usando usuario:', emailUser)
      console.log('  - Enviando a:', emailTo)
      
      try {
        // Plantilla de correo para el equipo
        const teamEmailHtml = `
          <!DOCTYPE html>
          <html>
          <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Nuevo mensaje de contacto - Vanadium Tech</title>
            <style>
              body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f4f4f4; margin: 0; padding: 20px; }
              .container { max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); overflow: hidden; }
              .header { background-color: #2c3e50; color: #fff; padding: 20px; text-align: center; }
              .header h1 { margin: 0; font-size: 24px; }
              .content { padding: 30px; }
              .field { margin-bottom: 20px; border-bottom: 1px solid #eee; padding-bottom: 10px; }
              .field-label { font-weight: bold; color: #2c3e50; margin-bottom: 5px; }
              .field-value { color: #555; margin-top: 5px; }
              .message-content { background-color: #f9f9f9; padding: 15px; border-radius: 5px; margin-top: 10px; }
              .footer { background-color: #f4f4f4; padding: 20px; text-align: center; font-size: 12px; color: #777; }
              .badge { display: inline-block; background-color: #3498db; color: #fff; padding: 3px 8px; border-radius: 3px; font-size: 12px; margin-left: 10px; }
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
        
        // Enviar correo al equipo
        await sendEmail(
          emailTo,
          `Nuevo mensaje de ${name} - Vanadium Tech`,
          teamEmailHtml,
          email
        )
        console.log('✅ Correo enviado exitosamente al equipo')
        
        // Plantilla de correo de confirmación para el cliente
        const clientEmailHtml = `
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
        
        // Enviar correo de confirmación al cliente
        await sendEmail(
          email,
          'Hemos recibido tu mensaje - Vanadium Tech',
          clientEmailHtml
        )
        console.log('✅ Correo de confirmación enviado al cliente')
        
      } catch (emailError) {
        console.error('❌ Error al enviar correo:', emailError)
        console.error('Detalles:', emailError instanceof Error ? emailError.message : 'Error desconocido')
      }
    } else {
      console.warn('⚠️ Credenciales de email no configuradas, los correos no se enviarán')
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