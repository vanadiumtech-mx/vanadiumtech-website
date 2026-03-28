import { NextResponse } from 'next/server'
import { sendEmail, escapeHtml } from '@/utils/email'

// ============================================
// CONFIGURACIÓN
// ============================================

const ENV_VARS = {
  supabase: {
    url: process.env.NEXT_PUBLIC_SUPABASE_URL,
    key: process.env.SUPABASE_SERVICE_ROLE_KEY,
  },
  email: {
    user: process.env.EMAIL_SERVICE_USER || process.env.EMAIL_USER,
    pass: process.env.EMAIL_SERVICE_PASS || process.env.EMAIL_PASS,
    to: process.env.EMAIL_RECIPIENT || process.env.EMAIL_TO || 'contact@vanadiumtech.com.mx',
    from: process.env.EMAIL_SENDER || process.env.EMAIL_FROM || 'Vanadium Tech <vanadiumtec.co@gmail.com>',
  },
}

// ============================================
// UTILIDADES DE LOGGING
// ============================================

const logger = {
  section: (title: string) => {
    console.log('\n' + '='.repeat(50))
    console.log(`📌 ${title}`)
    console.log('='.repeat(50))
  },
  info: (message: string, data?: any) => {
    console.log(`ℹ️  ${message}`)
    if (data) console.log('   📦', JSON.stringify(data, null, 2))
  },
  success: (message: string) => {
    console.log(`✅ ${message}`)
  },
  warning: (message: string) => {
    console.log(`⚠️  ${message}`)
  },
  error: (message: string, error?: any) => {
    console.log(`❌ ${message}`)
    if (error) console.log('   🔍', error)
  },
  env: (key: string, exists: boolean) => {
    console.log(`   ${exists ? '✅' : '❌'} ${key}`)
  },
}

// ============================================
// VALIDACIÓN DE ENTORNO
// ============================================

const validateEnvironment = () => {
  logger.section('Validando configuración del entorno')
  
  const emailVars = [
    { key: 'EMAIL_SERVICE_USER / EMAIL_USER', exists: !!ENV_VARS.email.user },
    { key: 'EMAIL_SERVICE_PASS / EMAIL_PASS', exists: !!ENV_VARS.email.pass },
    { key: 'EMAIL_RECIPIENT / EMAIL_TO', exists: !!ENV_VARS.email.to },
    { key: 'EMAIL_SENDER / EMAIL_FROM', exists: !!ENV_VARS.email.from },
  ]
  
  const supabaseVars = [
    { key: 'NEXT_PUBLIC_SUPABASE_URL', exists: !!ENV_VARS.supabase.url },
    { key: 'SUPABASE_SERVICE_ROLE_KEY', exists: !!ENV_VARS.supabase.key },
  ]
  
  console.log('\n📧 Variables de email:')
  emailVars.forEach(({ key, exists }) => logger.env(key, exists))
  
  console.log('\n🗄️  Variables de Supabase:')
  supabaseVars.forEach(({ key, exists }) => logger.env(key, exists))
  
  if (!ENV_VARS.supabase.url || !ENV_VARS.supabase.key) {
    logger.error('Variables de Supabase faltantes')
    return false
  }
  
  if (!ENV_VARS.email.user || !ENV_VARS.email.pass) {
    logger.warning('Credenciales de email no configuradas - los correos no se enviarán')
  }
  
  return true
}

// ============================================
// VALIDACIÓN DE DATOS DEL FORMULARIO
// ============================================

interface ContactFormData {
  name: string
  email: string
  phone: string
  service: string
  message: string
  company?: string
}

const validateFormData = (data: any): data is ContactFormData => {
  const required = ['name', 'email', 'phone', 'service', 'message']
  const missing = required.filter(field => !data[field] || typeof data[field] !== 'string' || !data[field].trim())
  
  if (missing.length > 0) {
    logger.error(`Campos faltantes: ${missing.join(', ')}`)
    return false
  }
  
  return true
}

const sanitizeFormData = (data: any): ContactFormData => ({
  name: data.name.trim(),
  email: data.email.trim().toLowerCase(),
  phone: data.phone.trim(),
  service: data.service,
  message: data.message.trim(),
  company: data.company?.trim() || null,
})

// ============================================
// GUARDADO EN SUPABASE
// ============================================

const saveToSupabase = async (data: ContactFormData) => {
  logger.section('Guardando en Supabase')
  
  const insertData = {
    ...data,
    source: 'CONTACT_FORM',
    status: 'PENDING',
  }
  
  logger.info('Datos a insertar', insertData)
  
  const url = `${ENV_VARS.supabase.url}/rest/v1/leads`
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'apikey': ENV_VARS.supabase.key!,
      'Authorization': `Bearer ${ENV_VARS.supabase.key}`,
      'Content-Type': 'application/json',
      'Prefer': 'return=representation',
    },
    body: JSON.stringify(insertData),
  })
  
  logger.info(`Respuesta de Supabase: ${response.status}`)
  
  if (!response.ok) {
    const errorText = await response.text()
    logger.error(`Error al guardar: ${response.status}`, errorText)
    throw new Error(`Supabase error: ${response.status}`)
  }
  
  const savedData = await response.json()
  logger.success('Datos guardados correctamente')
  
  return savedData
}

// ============================================
// ENVÍO DE CORREOS
// ============================================

const emailTemplates = {
  team: (data: ContactFormData, leadId?: string) => `
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
            <div class="field-value"><strong>${escapeHtml(data.name)}</strong></div>
          </div>
          <div class="field">
            <div class="field-label">📧 Correo electrónico:</div>
            <div class="field-value"><a href="mailto:${escapeHtml(data.email)}">${escapeHtml(data.email)}</a></div>
          </div>
          <div class="field">
            <div class="field-label">📞 Teléfono:</div>
            <div class="field-value">${escapeHtml(data.phone)}</div>
          </div>
          ${data.company ? `
          <div class="field">
            <div class="field-label">🏢 Empresa / Institución:</div>
            <div class="field-value">${escapeHtml(data.company)}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="field-label">🔧 Servicio de interés:</div>
            <div class="field-value">
              ${escapeHtml(data.service)}
              <span class="badge">${escapeHtml(data.service)}</span>
            </div>
          </div>
          <div class="field">
            <div class="field-label">💬 Mensaje:</div>
            <div class="message-content">
              ${escapeHtml(data.message).replace(/\n/g, '<br>')}
            </div>
          </div>
        </div>
        <div class="footer">
          <p>Este mensaje fue enviado a través del formulario de contacto de Vanadium Tech.</p>
          <p>Fecha: ${new Date().toLocaleString('es-MX', { timeZone: 'America/Mexico_City' })}</p>
          <p>ID de referencia: ${leadId || 'N/A'}</p>
        </div>
      </div>
    </body>
    </html>
  `,
  
  client: (data: ContactFormData) => `
    <!DOCTYPE html>
    <html>
    <head>
      <meta charset="utf-8">
      <title>Confirmación de recepción - Vanadium Tech</title>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; margin: 0; padding: 20px; }
        .container { max-width: 600px; margin: 0 auto; background-color: #fff; border-radius: 8px; box-shadow: 0 2px 4px rgba(0,0,0,0.1); }
        .header { background-color: #2c3e50; color: #fff; padding: 20px; text-align: center; border-radius: 8px 8px 0 0; }
        .header h1 { margin: 0; font-size: 24px; }
        .content { padding: 30px; }
        .footer { text-align: center; margin-top: 20px; font-size: 12px; color: #777; padding: 20px; border-top: 1px solid #eee; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>¡Gracias por contactarnos!</h1>
        </div>
        <div class="content">
          <p>Hola <strong>${escapeHtml(data.name)}</strong>,</p>
          <p>Hemos recibido tu mensaje correctamente. Uno de nuestros asesores se comunicará contigo en las próximas 24 horas.</p>
          <p><strong>Detalles de tu mensaje:</strong></p>
          <ul>
            <li><strong>Servicio de interés:</strong> ${escapeHtml(data.service)}</li>
            <li><strong>Mensaje:</strong> ${escapeHtml(data.message.substring(0, 100))}${data.message.length > 100 ? '...' : ''}</li>
          </ul>
          <p>Mientras tanto, te invitamos a conocer más sobre nuestros servicios en nuestro sitio web.</p>
          <p>Saludos,<br><strong>Equipo de Vanadium Tech</strong></p>
        </div>
        <div class="footer">
          <p>© ${new Date().getFullYear()} Vanadium Tech. Todos los derechos reservados.</p>
        </div>
      </div>
    </body>
    </html>
  `,
}

const sendEmails = async (data: ContactFormData, leadId?: string) => {
  if (!ENV_VARS.email.user || !ENV_VARS.email.pass) {
    logger.warning('Credenciales de email no configuradas - omitiendo envío')
    return
  }
  
  logger.section('Enviando correos electrónicos')
  logger.info(`Usuario SMTP: ${ENV_VARS.email.user}`)
  logger.info(`Destinatario: ${ENV_VARS.email.to}`)
  
  try {
    // Correo al equipo
    await sendEmail(
      ENV_VARS.email.to,
      `Nuevo mensaje de ${data.name} - Vanadium Tech`,
      emailTemplates.team(data, leadId),
      data.email
    )
    logger.success('Correo enviado al equipo')
    
    // Correo de confirmación al cliente
    await sendEmail(
      data.email,
      'Hemos recibido tu mensaje - Vanadium Tech',
      emailTemplates.client(data)
    )
    logger.success('Correo de confirmación enviado al cliente')
    
  } catch (error) {
    logger.error('Error al enviar correos', error instanceof Error ? error.message : error)
  }
}

// ============================================
// HANDLER PRINCIPAL
// ============================================

export async function POST(request: Request) {
  const startTime = Date.now()
  logger.section('API Contact - Iniciando proceso')
  
  try {
    // 1. Validar entorno
    if (!validateEnvironment()) {
      return NextResponse.json(
        { error: 'Configuración del servidor incompleta' },
        { status: 500 }
      )
    }
    
    // 2. Parsear y validar datos
    const body = await request.json()
    logger.info('Datos recibidos', body)
    
    if (!validateFormData(body)) {
      return NextResponse.json(
        { error: 'Faltan campos requeridos' },
        { status: 400 }
      )
    }
    
    const sanitizedData = sanitizeFormData(body)
    
    // 3. Guardar en Supabase
    const savedData = await saveToSupabase(sanitizedData)
    const leadId = savedData[0]?.id
    
    // 4. Enviar correos
    await sendEmails(sanitizedData, leadId)
    
    // 5. Respuesta exitosa
    const duration = Date.now() - startTime
    logger.success(`Proceso completado en ${duration}ms`)
    logger.section('Finalizado correctamente')
    
    return NextResponse.json(
      { success: true, message: 'Mensaje enviado correctamente' },
      { status: 200 }
    )
    
  } catch (error) {
    const duration = Date.now() - startTime
    logger.error(`Error catastrófico después de ${duration}ms`, error instanceof Error ? error.message : error)
    if (error instanceof Error && error.stack) {
      console.log('   📚 Stack trace:', error.stack)
    }
    logger.section('Finalizado con errores')
    
    return NextResponse.json(
      {
        error: 'Error interno del servidor',
        details: error instanceof Error ? error.message : 'Error desconocido',
      },
      { status: 500 }
    )
  }
}