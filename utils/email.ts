import nodemailer from 'nodemailer'

// Configurar el transporter de nodemailer
let transporter: nodemailer.Transporter | null = null

export const getTransporter = () => {
  if (transporter) return transporter
  
  // Usar los nuevos nombres de variables
  const user = process.env.EMAIL_SERVICE_USER || process.env.EMAIL_USER
  const pass = process.env.EMAIL_SERVICE_PASS || process.env.EMAIL_PASS
  
  console.log('🔍 Configurando email transporter:')
  console.log('  - USER:', user ? '✅ Presente' : '❌ Faltante')
  console.log('  - PASS:', pass ? '✅ Presente' : '❌ Faltante')
  
  if (!user || !pass) {
    console.warn('⚠️ Credenciales de email no configuradas')
    return null
  }
  
  transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
      user: user,
      pass: pass,
    },
  })
  
  return transporter
}

export const sendEmail = async (to: string, subject: string, html: string, replyTo?: string) => {
  const transporter = getTransporter()
  
  if (!transporter) {
    throw new Error('Email transporter not configured')
  }
  
  const from = process.env.EMAIL_SENDER || process.env.EMAIL_FROM || `Vanadium Tech <${process.env.EMAIL_SERVICE_USER || process.env.EMAIL_USER}>`
  const recipient = process.env.EMAIL_RECIPIENT || process.env.EMAIL_TO || to
  
  const mailOptions = {
    from: from,
    to: recipient,
    subject: subject,
    html: html,
    ...(replyTo && { replyTo: replyTo })
  }
  
  console.log('📧 Enviando correo:', {
    from: from,
    to: recipient,
    subject: subject
  })
  
  return await transporter.sendMail(mailOptions)
}

export const escapeHtml = (str: string): string => {
  return str
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
}