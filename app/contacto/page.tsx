// app/contacto/page.tsx
'use client'

import { useState } from 'react'
import { motion } from 'framer-motion'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function ContactoPage() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    company: '',
    service: '',
    message: ''
  })

  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitStatus, setSubmitStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [errorDetails, setErrorDetails] = useState<string>('')

  // Función para sanitizar texto y prevenir XSS
  const sanitizeInput = (input: string): string => {
    return input
      .replace(/[<>]/g, '') // Eliminar caracteres peligrosos
      .trim()
      .slice(0, 1000) // Limitar longitud máxima
  }

  // Validación de email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@([^\s@]+\.)+[^\s@]+$/
    return emailRegex.test(email)
  }

  // Validación de teléfono (solo números y caracteres permitidos)
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[0-9+\-\s()]{8,20}$/
    return phoneRegex.test(phone)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    setSubmitStatus('idle')
    setErrorDetails('')
    
    console.log('🚀 Iniciando envío de formulario')
    console.log('📝 Datos originales:', formData)
    
    // Sanitizar todos los campos del formulario
    const sanitizedData = {
      name: sanitizeInput(formData.name),
      email: sanitizeInput(formData.email),
      phone: sanitizeInput(formData.phone),
      company: sanitizeInput(formData.company),
      service: sanitizeInput(formData.service),
      message: sanitizeInput(formData.message)
    }

    console.log('🧹 Datos sanitizados:', sanitizedData)

    // Validaciones adicionales en el cliente
    if (!sanitizedData.name || sanitizedData.name.length < 2) {
      console.error('❌ Error: Nombre inválido')
      setErrorDetails('El nombre debe tener al menos 2 caracteres')
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorDetails('')
      }, 5000)
      return
    }

    if (!isValidEmail(sanitizedData.email)) {
      console.error('❌ Error: Email inválido')
      setErrorDetails('El correo electrónico no es válido')
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorDetails('')
      }, 5000)
      return
    }

    if (!isValidPhone(sanitizedData.phone)) {
      console.error('❌ Error: Teléfono inválido')
      setErrorDetails('El teléfono debe tener entre 8 y 20 caracteres y solo números, +, -, espacios o ()')
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorDetails('')
      }, 5000)
      return
    }

    if (!sanitizedData.service || sanitizedData.service === 'Selecciona un servicio') {
      console.error('❌ Error: Servicio no seleccionado')
      setErrorDetails('Por favor selecciona un servicio')
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorDetails('')
      }, 5000)
      return
    }

    if (!sanitizedData.message || sanitizedData.message.length < 10) {
      console.error('❌ Error: Mensaje demasiado corto')
      setErrorDetails('El mensaje debe tener al menos 10 caracteres')
      setSubmitStatus('error')
      setIsSubmitting(false)
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorDetails('')
      }, 5000)
      return
    }
    
    try {
      console.log('📤 Enviando petición a /api/contact')
      
      const response = await fetch('/api/contact', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(sanitizedData),
      })

      console.log('📡 Status de respuesta:', response.status)
      console.log('📡 Headers:', response.headers)

      const data = await response.json()
      console.log('📦 Datos de respuesta:', data)

      if (response.ok) {
        console.log('✅ Formulario enviado con éxito')
        setSubmitStatus('success')
        // Limpiar formulario después de envío exitoso
        setFormData({
          name: '',
          email: '',
          phone: '',
          company: '',
          service: '',
          message: ''
        })
        setTimeout(() => setSubmitStatus('idle'), 5000)
      } else {
        console.error('❌ Error en la respuesta:', {
          status: response.status,
          statusText: response.statusText,
          data: data
        })
        setErrorDetails(data.details || data.error || 'Error desconocido')
        setSubmitStatus('error')
        setTimeout(() => {
          setSubmitStatus('idle')
          setErrorDetails('')
        }, 5000)
      }
    } catch (error) {
      console.error('❌ Error de red o excepción:', error)
      console.error('Stack trace:', error instanceof Error ? error.stack : 'No stack trace')
      setErrorDetails(error instanceof Error ? error.message : 'Error de conexión con el servidor')
      setSubmitStatus('error')
      setTimeout(() => {
        setSubmitStatus('idle')
        setErrorDetails('')
      }, 5000)
    } finally {
      setIsSubmitting(false)
      console.log('🏁 Proceso de envío finalizado')
    }
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    // Sanitizar en tiempo real para prevenir XSS
    const value = e.target.value
    const sanitizedValue = value.replace(/[<>]/g, '')
    
    setFormData({
      ...formData,
      [e.target.name]: sanitizedValue
    })
  }

  const contactInfo = [
    {
      id: 'primary',
      icon: '📍',
      title: 'Oficina Principal',
      address: '17th Floor Torre Magenta, Paseo de la Reforma 284, MEXICO CITY, Ciudad de Mexico, CP 06600, México',
      details: [
        '17th Floor Torre Magenta',
        'Paseo de la Reforma 284',
        'CDMX, CP 06600, México'
      ],
      isPrimary: true
    },
    {
      id: 'phone',
      icon: '📞',
      title: 'Teléfono',
      details: [
        '(55) 13763758',
      ],
      isPrimary: false
    },
    {
      id: 'email',
      icon: '✉️',
      title: 'Email',
      details: [
        'contact@vanadiumtech.com.mx',
        
      ],
      isPrimary: false
    },
    {
      id: 'schedule',
      icon: '🕒',
      title: 'Horario de Atención',
      details: [
        'Lunes a Viernes: 9:00 - 18:00',
        'Sábados: 9:00 - 14:00'
      ],
      isPrimary: false
    }
  ]

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

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.heroContent}
            >
              <h1>Contacta a <span className="accent-text">nuestro equipo</span></h1>
              <p>
                ¿Listo para transformar tu infraestructura tecnológica? 
                Déjanos tus datos y un asesor se comunicará contigo.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Form and Info */}
        <section className={styles.contactSection}>
          <div className="container">
            <div className={styles.contactGrid}>
              {/* Formulario */}
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.formContainer}
              >
                <h2>Envíanos un <span className="accent-text">mensaje</span></h2>
                <form onSubmit={handleSubmit} className={styles.form}>
                  <div className={styles.formGroup}>
                    <input
                      type="text"
                      name="name"
                      placeholder="Nombre completo *"
                      value={formData.name}
                      onChange={handleChange}
                      required
                      maxLength={100}
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
                        required
                        maxLength={100}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <input
                        type="tel"
                        name="phone"
                        placeholder="Teléfono *"
                        value={formData.phone}
                        onChange={handleChange}
                        required
                        maxLength={20}
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
                        maxLength={100}
                      />
                    </div>
                    <div className={styles.formGroup}>
                      <select
                        name="service"
                        value={formData.service}
                        onChange={handleChange}
                        required
                      >
                        {serviceOptions.map((option) => (
                          <option key={option} value={option}>
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
                      required
                      maxLength={1000}
                    ></textarea>
                  </div>
                  
                  <button 
                    type="submit" 
                    className="btn btn-primary"
                    disabled={isSubmitting}
                  >
                    {isSubmitting ? 'Enviando...' : 'Enviar mensaje'}
                  </button>
                  
                  {submitStatus === 'success' && (
                    <div className={styles.successMessage}>
                      ¡Mensaje enviado con éxito! Te contactaremos pronto.
                    </div>
                  )}
                  
                  {submitStatus === 'error' && (
                    <div className={styles.errorMessage}>
                      <strong>Error al enviar el mensaje:</strong>
                      <br />
                      {errorDetails || 'Por favor verifica que todos los campos sean correctos e intenta de nuevo.'}
                      <br />
                      <br />
                      <small>Revisa la consola del navegador (F12) para más detalles.</small>
                    </div>
                  )}
                </form>
              </motion.div>

              {/* Información de Contacto */}
              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.infoContainer}
              >
                <h2>Información de <span className="accent-text">Contacto</span></h2>
                <div className={styles.infoGrid}>
                  {contactInfo.map((info, index) => (
                    <motion.div
                      key={info.id}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={info.isPrimary ? styles.infoCardPrimary : styles.infoCardSecondary}
                    >
                      <div className={styles.infoIcon}>{info.icon}</div>
                      <h3>{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}
                      {/* Mapa dentro de la tarjeta de Oficina Principal */}
                      {info.isPrimary && (
                        <div className={styles.cardMapContainer}>
                          <iframe 
                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.6427645259796!2d-99.16717482500077!3d19.427835140833448!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x85d1ffead366482d%3A0x2ee1f207b563cfd2!2sMagenta%20Tower!5e0!3m2!1ses-419!2smx!4v1775244946834!5m2!1ses-419!2smx" 
                            width="100%" 
                            height="200" 
                            style={{ border: 0, borderRadius: '8px', marginTop: '12px' }}
                            allowFullScreen 
                            loading="lazy" 
                            referrerPolicy="no-referrer-when-downgrade"
                            title="Mapa Oficina Principal - Torre Magenta"
                          ></iframe>
                        </div>
                      )}
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.ctaContent}
            >
              <h2>¿Prefieres atención inmediata?</h2>
              <p>
                Llámanos directamente al <strong>(55) 1376 3758</strong> o 
                escríbenos a <strong>contact@vanadiumtech.com.mx</strong>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}