import nodemailer from 'nodemailer'

// Configurar el transporter de nodemailer
let transporter: nodemailer.Transporter | null = null

export const getTransporter = () => {
  if (transporter) return transporter
  
  const user = process.env.EMAIL_USER
  const pass = process.env.EMAIL_PASS
  
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
  
  const mailOptions = {
    from: process.env.EMAIL_FROM || `Vanadium Tech <${process.env.EMAIL_USER}>`,
    to: to,
    subject: subject,
    html: html,
    ...(replyTo && { replyTo: replyTo })
  }
  
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