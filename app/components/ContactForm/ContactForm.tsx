// app/components/ContactForm/ContactForm.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './ContactForm.module.scss'

interface FormData {
  name: string
  email: string
  phone: string
  company: string
  service: string
  message: string
}

interface ContactFormProps {
  type?: 'contact' | 'quote'
  onSubmitSuccess?: () => void
}

export default function ContactForm({ type = 'contact', onSubmitSuccess }: ContactFormProps) {
  const [formData, setFormData] = useState<FormData>({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorMessage, setErrorMessage] = useState('')

  const serviceOptions = [
    'Selecciona un servicio',
    'Infraestructura en Redes',
    'Telecomunicaciones',
    'Desarrollo de Software',
    'Integración de Sistemas',
    'Centros de Datos',
    'Ciberseguridad',
    'Soluciones para Gobierno',
    'Otro'
  ]

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorMessage('')

    // Validaciones
    if (!formData.name || !formData.email || !formData.phone || !formData.service || !formData.message) {
      setSubmitStatus('error')
      setErrorMessage('Por favor completa todos los campos requeridos')
      setIsSubmitting(false)
      return
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(formData.email)) {
      setSubmitStatus('error')
      setErrorMessage('Por favor ingresa un email válido')
      setIsSubmitting(false)
      return
    }

    try {
      const endpoint = type === 'contact' ? '/api/contact' : '/api/quote'
      
      const response = await fetch(endpoint, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al enviar el formulario')
      }

      setSubmitStatus('success')
      setFormData({
        name: '',
        email: '',
        phone: '',
        company: '',
        service: '',
        message: ''
      })
      
      if (onSubmitSuccess) {
        onSubmitSuccess()
      }
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } catch (error) {
      console.error('Error submitting form:', error)
      setSubmitStatus('error')
      setErrorMessage(error instanceof Error ? error.message : 'Error al enviar el formulario')
      
      setTimeout(() => {
        setSubmitStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.formGroup}>
        <input
          type="text"
          name="name"
          placeholder="Nombre completo *"
          value={formData.name}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input
            type="email"
            name="email"
            placeholder="Correo electrónico *"
            value={formData.email}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.formGroup}>
          <input
            type="tel"
            name="phone"
            placeholder="Teléfono *"
            value={formData.phone}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
      </div>

      <div className={styles.formRow}>
        <div className={styles.formGroup}>
          <input
            type="text"
            name="company"
            placeholder="Empresa / Institución"
            value={formData.company}
            onChange={handleChange}
            disabled={isSubmitting}
          />
        </div>
        <div className={styles.formGroup}>
          <select
            name="service"
            value={formData.service}
            onChange={handleChange}
            disabled={isSubmitting}
            required
          >
            {serviceOptions.map((option) => (
              <option key={option} value={option === 'Selecciona un servicio' ? '' : option}>
                {option}
              </option>
            ))}
          </select>
        </div>
      </div>

      <div className={styles.formGroup}>
        <textarea
          name="message"
          placeholder="Mensaje *"
          rows={5}
          value={formData.message}
          onChange={handleChange}
          disabled={isSubmitting}
        />
      </div>

      <button 
        type="submit" 
        className="btn btn-primary"
        disabled={isSubmitting}
      >
        {isSubmitting ? (
          <>
            <span className={styles.spinner}></span>
            Enviando...
          </>
        ) : (
          type === 'contact' ? 'Enviar mensaje' : 'Solicitar cotización'
        )}
      </button>

      <AnimatePresence>
        {submitStatus === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.successMessage}
          >
            ✓ ¡Mensaje enviado con éxito! Te contactaremos pronto.
          </motion.div>
        )}

        {submitStatus === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.errorMessage}
          >
            ⚠ {errorMessage || 'Hubo un error al enviar el mensaje. Por favor intenta de nuevo.'}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}