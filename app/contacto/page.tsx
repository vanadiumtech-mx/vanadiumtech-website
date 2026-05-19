// app/contacto/page.tsx (actualizado)
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import ContactForm from '@/app/components/ContactForm/ContactForm'
import styles from './page.module.scss'
import NewsletterForm from '../components/Newsletter/Newsletter'

export default function ContactoPage() {
  const contactInfo = [
    {
      icon: '📍',
      title: 'Oficina Principal',
      details: [
        'Av. Paseo de la Reforma 123',
        'Col. Juárez, CDMX',
        'C.P. 06600, México'
      ]
    },
    {
      icon: '📞',
      title: 'Teléfono',
      details: [
        '(55) 1234 5678',
        '(55) 8765 4321'
      ]
    },
    {
      icon: '✉️',
      title: 'Email',
      details: [
        'contacto@vanadiumtech.com.mx',
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
                <ContactForm type="contact" />
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

        {/* Newsletter Section */}
        <section className={styles.newsletter}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.newsletterContent}
            >
              <h2>Boletín <span className="accent-text">Técnico</span></h2>
              <p>Recibe las últimas novedades en infraestructura tecnológica</p>
              <NewsletterForm />
            </motion.div>
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
                Llámanos directamente al <strong>(55) 1234 5678</strong> o 
                escríbenos a <strong>contacto@vanadiumtech.com.mx</strong>
              </p>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}