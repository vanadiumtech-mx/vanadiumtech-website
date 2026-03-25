// app/components/Newsletter/Newsletter.tsx
'use client'

import { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Newsletter.module.scss'

export default function NewsletterForm() {
  const [email, setEmail] = useState('')
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [message, setMessage] = useState('')

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setStatus('idle')

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      setStatus('error')
      setMessage('Por favor ingresa un email válido')
      setIsSubmitting(false)
      return
    }

    try {
      const response = await fetch('/api/newsletter', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      })

      const data = await response.json()

      if (!response.ok) {
        throw new Error(data.error || 'Error al suscribirse')
      }

      setStatus('success')
      setMessage(data.message || '¡Suscripción exitosa!')
      setEmail('')
      
      // Limpiar mensaje después de 5 segundos
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } catch (error) {
      setStatus('error')
      setMessage(error instanceof Error ? error.message : 'Error al suscribirse')
      
      setTimeout(() => {
        setStatus('idle')
      }, 5000)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <form onSubmit={handleSubmit} className={styles.form}>
      <div className={styles.inputGroup}>
        <input
          type="email"
          placeholder="tu@email.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          disabled={isSubmitting}
          className={status === 'error' ? styles.error : ''}
        />
        <button type="submit" disabled={isSubmitting}>
          {isSubmitting ? (
            <>
              <span className={styles.spinner}></span>
              Enviando...
            </>
          ) : (
            'Suscribir'
          )}
        </button>
      </div>

      <AnimatePresence>
        {status === 'success' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.successMessage}
          >
            ✓ {message}
          </motion.div>
        )}

        {status === 'error' && (
          <motion.div
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -10 }}
            className={styles.errorMessage}
          >
            ⚠ {message}
          </motion.div>
        )}
      </AnimatePresence>
    </form>
  )
}