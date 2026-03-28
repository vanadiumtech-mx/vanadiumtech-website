// app/api/contact/route.ts - Versión temporal con credenciales hardcodeadas
// SOLO PARA PROBAR QUE EL ENVÍO DE CORREOS FUNCIONA

import { NextResponse } from 'next/server'
import nodemailer from 'nodemailer'

export async function POST(request: Request) {
  console.log('=========================================')
  console.log('📝 API Contact - Iniciando proceso (versión de prueba)')
  console.log('=========================================')
  
  try {
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
    console.log('✅ Datos guardados en Supabase')
    
    // CONFIGURACIÓN TEMPORAL HARDCODEADA
    // IMPORTANTE: Después de probar, elimina esto y usa variables de entorno
    const emailUser = 'vanadiumtec.co@gmail.com'
    const emailPass = 'lhdwpmbnklucdeua'
    const emailTo = 'contact@vanadiumtech.com.mx'
    
    console.log('📧 Enviando correos con credenciales hardcodeadas...')
    
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: emailUser,
        pass: emailPass,
      },
    })
    
    const escapeHtml = (str: string): string => {
      return str
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&#39;')
    }
    
    // Correo al equipo
    await transporter.sendMail({
      from: `Vanadium Tech <${emailUser}>`,
      to: emailTo,
      subject: `Nuevo mensaje de ${name} - Vanadium Tech`,
      html: `
        <h2>Nuevo mensaje de contacto</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p><strong>Teléfono:</strong> ${escapeHtml(phone)}</p>
        <p><strong>Empresa:</strong> ${escapeHtml(body.company || 'No especificada')}</p>
        <p><strong>Servicio:</strong> ${escapeHtml(service)}</p>
        <p><strong>Mensaje:</strong></p>
        <p>${escapeHtml(message).replace(/\n/g, '<br>')}</p>
        <hr>
        <p><small>ID: ${savedData[0]?.id || 'N/A'}</small></p>
      `,
      replyTo: email,
    })
    console.log('✅ Correo al equipo enviado')
    
    // Correo de confirmación al cliente
    await transporter.sendMail({
      from: `Vanadium Tech <${emailUser}>`,
      to: email,
      subject: 'Hemos recibido tu mensaje - Vanadium Tech',
      html: `
        <h2>¡Gracias por contactarnos!</h2>
        <p>Hola <strong>${escapeHtml(name)}</strong>,</p>
        <p>Hemos recibido tu mensaje correctamente. Uno de nuestros asesores se comunicará contigo en las próximas 24 horas.</p>
        <p><strong>Detalles de tu mensaje:</strong></p>
        <ul>
          <li><strong>Servicio de interés:</strong> ${escapeHtml(service)}</li>
          <li><strong>Mensaje:</strong> ${escapeHtml(message.substring(0, 100))}${message.length > 100 ? '...' : ''}</li>
        </ul>
        <p>Saludos,<br><strong>Equipo de Vanadium Tech</strong></p>
      `,
    })
    console.log('✅ Correo de confirmación enviado')
    
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