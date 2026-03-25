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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitting(true)
    
    // Simular envío de formulario
    setTimeout(() => {
      setIsSubmitting(false)
      setSubmitStatus('success')
      setTimeout(() => setSubmitStatus('idle'), 5000)
    }, 1500)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    })
  }

  const contactInfo = [
    {
      icon: '📍',
      title: 'Oficina Principal',
      details: [
        'Emiliano Zapata 16',
        'Col. Centro Acolman',
        'C.P. 55870, Edo. México'
      ]
    },
    {
      icon: '📞',
      title: 'Teléfono',
      details: [
        '(55) 13763758',
      ]
    },
    {
      icon: '✉️',
      title: 'Email',
      details: [
        'contact@vanadiumtech.com.mx',
        'ventas@vanadiumtech.com.mx'
      ]
    },
    {
      icon: '🕒',
      title: 'Horario de Atención',
      details: [
        'Lunes a Viernes: 9:00 - 18:00',
        'Sábados: 9:00 - 14:00'
      ]
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
                      Hubo un error al enviar el mensaje. Por favor intenta de nuevo.
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
                      key={info.title}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ duration: 0.5, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={styles.infoCard}
                    >
                      <div className={styles.infoIcon}>{info.icon}</div>
                      <h3>{info.title}</h3>
                      {info.details.map((detail) => (
                        <p key={detail}>{detail}</p>
                      ))}
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