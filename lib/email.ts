// lib/email.ts
import nodemailer from 'nodemailer'

// Configuración del transporter
const transporter = nodemailer.createTransport({
  host: process.env.SMTP_HOST,
  port: parseInt(process.env.SMTP_PORT || '587'),
  secure: process.env.SMTP_SECURE === 'true',
  auth: {
    user: process.env.SMTP_USER,
    pass: process.env.SMTP_PASS,
  },
})

interface ContactEmailData {
  name: string
  email: string
  phone: string
  company?: string
  service: string
  message: string
}

export async function sendContactEmail(data: ContactEmailData) {
  const { name, email, phone, company, service, message } = data

  const emailContent = `
    Nuevo mensaje de contacto de Vanadium Tech
    
    Datos del contacto:
    - Nombre: ${name}
    - Email: ${email}
    - Teléfono: ${phone}
    ${company ? `- Empresa: ${company}` : ''}
    - Servicio de interés: ${service}
    
    Mensaje:
    ${message}
    
    ---
    Este mensaje fue enviado desde el formulario de contacto de vanadiumtech.com.mx
  `

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0A2540; padding: 20px; text-align: center; }
        .header h1 { color: #00E5FF; margin: 0; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0A2540; }
        .value { margin-top: 5px; color: #666; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vanadium Tech</h1>
          <p>Nuevo mensaje de contacto</p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nombre:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Teléfono:</div>
            <div class="value">${phone}</div>
          </div>
          ${company ? `
          <div class="field">
            <div class="label">Empresa:</div>
            <div class="value">${company}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Servicio de interés:</div>
            <div class="value">${service}</div>
          </div>
          <div class="field">
            <div class="label">Mensaje:</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de contacto de vanadiumtech.com.mx</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `Nuevo contacto de ${name} - Vanadium Tech`,
    text: emailContent,
    html: htmlContent,
  })

  // Enviar confirmación al usuario
  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: email,
    subject: 'Hemos recibido tu mensaje - Vanadium Tech',
    text: `
      Hola ${name},
      
      Gracias por contactarnos. Hemos recibido tu mensaje y uno de nuestros asesores se comunicará contigo en las próximas 24 horas.
      
      Detalles de tu mensaje:
      - Servicio de interés: ${service}
      - Mensaje: ${message}
      
      Saludos cordiales,
      Equipo de Vanadium Tech
    `,
    html: `
      <!DOCTYPE html>
      <html>
      <head>
        <style>
          body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
          .container { max-width: 600px; margin: 0 auto; padding: 20px; }
          .header { background: #0A2540; padding: 20px; text-align: center; }
          .header h1 { color: #00E5FF; margin: 0; }
          .content { padding: 20px; background: #f9f9f9; }
          .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
        </style>
      </head>
      <body>
        <div class="container">
          <div class="header">
            <h1>Vanadium Tech</h1>
          </div>
          <div class="content">
            <h2>Hola ${name},</h2>
            <p>Gracias por contactarnos. Hemos recibido tu mensaje y uno de nuestros asesores se comunicará contigo en las próximas 24 horas.</p>
            <p><strong>Detalles de tu mensaje:</strong></p>
            <ul>
              <li>Servicio de interés: ${service}</li>
              <li>Mensaje: ${message}</li>
            </ul>
            <p>Saludos cordiales,<br>Equipo de Vanadium Tech</p>
          </div>
          <div class="footer">
            <p>© ${new Date().getFullYear()} Vanadium Tech. Todos los derechos reservados.</p>
          </div>
        </div>
      </body>
      </html>
    `,
  })
}

interface QuoteEmailData {
  name: string
  email: string
  phone: string
  company?: string
  service: string
  projectSize?: string
  budget?: string
  timeline?: string
  message: string
}

export async function sendQuoteEmail(data: QuoteEmailData) {
  const { name, email, phone, company, service, projectSize, budget, timeline, message } = data

  const htmlContent = `
    <!DOCTYPE html>
    <html>
    <head>
      <style>
        body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; }
        .container { max-width: 600px; margin: 0 auto; padding: 20px; }
        .header { background: #0A2540; padding: 20px; text-align: center; }
        .header h1 { color: #00E5FF; margin: 0; }
        .content { padding: 20px; background: #f9f9f9; }
        .field { margin-bottom: 15px; }
        .label { font-weight: bold; color: #0A2540; }
        .value { margin-top: 5px; color: #666; }
        .badge { display: inline-block; background: #00E5FF; color: #0A2540; padding: 5px 10px; border-radius: 5px; font-weight: bold; }
        .footer { text-align: center; padding: 20px; font-size: 12px; color: #999; }
      </style>
    </head>
    <body>
      <div class="container">
        <div class="header">
          <h1>Vanadium Tech</h1>
          <p><span class="badge">Nueva Solicitud de Cotización</span></p>
        </div>
        <div class="content">
          <div class="field">
            <div class="label">Nombre:</div>
            <div class="value">${name}</div>
          </div>
          <div class="field">
            <div class="label">Email:</div>
            <div class="value">${email}</div>
          </div>
          <div class="field">
            <div class="label">Teléfono:</div>
            <div class="value">${phone}</div>
          </div>
          ${company ? `
          <div class="field">
            <div class="label">Empresa:</div>
            <div class="value">${company}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Servicio:</div>
            <div class="value">${service}</div>
          </div>
          ${projectSize ? `
          <div class="field">
            <div class="label">Tamaño del proyecto:</div>
            <div class="value">${projectSize}</div>
          </div>
          ` : ''}
          ${budget ? `
          <div class="field">
            <div class="label">Presupuesto estimado:</div>
            <div class="value">${budget}</div>
          </div>
          ` : ''}
          ${timeline ? `
          <div class="field">
            <div class="label">Timeline esperado:</div>
            <div class="value">${timeline}</div>
          </div>
          ` : ''}
          <div class="field">
            <div class="label">Descripción del proyecto:</div>
            <div class="value">${message.replace(/\n/g, '<br>')}</div>
          </div>
        </div>
        <div class="footer">
          <p>Este mensaje fue enviado desde el formulario de cotización de vanadiumtech.com.mx</p>
        </div>
      </div>
    </body>
    </html>
  `

  await transporter.sendMail({
    from: process.env.SMTP_FROM,
    to: process.env.QUOTE_EMAIL || process.env.CONTACT_EMAIL,
    replyTo: email,
    subject: `Nueva cotización de ${name} - Vanadium Tech`,
    html: htmlContent,
  })
}