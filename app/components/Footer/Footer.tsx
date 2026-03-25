'use client'

import Link from 'next/link'
import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Footer.module.scss'

export default function Footer() {
  const currentYear = new Date().getFullYear()

  const services = [
    { href: '/infraestructura-redes', label: 'Infraestructura en Redes' },
    { href: '/telecomunicaciones', label: 'Telecomunicaciones' },
    { href: '/desarrollo-software', label: 'Desarrollo de Software' },
    { href: '/integracion-sistemas', label: 'Integración de Sistemas' },
    { href: '/centros-de-datos', label: 'Centros de Datos' },
    { href: '/ciberseguridad', label: 'Ciberseguridad' }
  ]

  const quickLinks = [
    { href: '/gobierno', label: 'Gobierno' },
    { href: '/contacto', label: 'Contacto' },
  ]

  return (
    <footer className={styles.footer}>
      <div className={styles.container}>
        <div className={styles.grid}>
          {/* Brand Section with Logo */}
          <div className={styles.brand}>
            <Link href="/" className={styles.logo}>
              <Image 
                src="/vt-logo-black.png" 
                alt="Vanadium Tech" 
                width={200} 
                height={45}
                priority
                style={{ width: 'auto', height: 'auto' }}
              />
            </Link>
            <p className={styles.description}>
              Infraestructura tecnológica crítica para un futuro conectado y seguro.
            </p>
            <div className={styles.contact}>
              <p className={styles.contactItem}>
                <span className={styles.icon}>📧</span>
                contact@vanadiumtech.com.mx
              </p>
              <p className={styles.contactItem}>
                <span className={styles.icon}>📞</span>
                (55) 1376 3758
              </p>
              <p className={styles.contactItem}>
                <span className={styles.icon}>📍</span>
                Ciudad de México, México
              </p>
            </div>
          </div>

          {/* Services Links */}
          <div className={styles.links}>
            <h3 className={styles.title}>Servicios</h3>
            <ul className={styles.list}>
              {services.map((service, index) => (
                <motion.li 
                  key={service.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 }}
                >
                  <Link href={service.href} className={styles.link}>
                    {service.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div className={styles.links}>
            <h3 className={styles.title}>Enlaces Rápidos</h3>
            <ul className={styles.list}>
              {quickLinks.map((link, index) => (
                <motion.li 
                  key={link.href}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.05 + 0.3 }}
                >
                  <Link href={link.href} className={styles.link}>
                    {link.label}
                  </Link>
                </motion.li>
              ))}
            </ul>
          </div>

          {/* Newsletter Section */}
          <div className={styles.newsletter}>
            <h3 className={styles.title}>Boletín Técnico</h3>
            <p className={styles.newsletterText}>
              Recibe información sobre nuevas tecnologías y tendencias
            </p>
            <form className={styles.form} onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="tu@email.com" 
                className={styles.input}
                aria-label="Correo electrónico para suscripción"
              />
              <button type="submit" className={styles.button}>
                Suscribir
              </button>
            </form>
          </div>
        </div>

        {/* Bottom Section */}
        <div className={styles.bottom}>
          <p className={styles.copyright}>
            &copy; {currentYear} Vanadium Tech. Todos los derechos reservados.
          </p>
          <div className={styles.legal}>
            <Link href="/privacidad" className={styles.legalLink}>
              Política de Privacidad
            </Link>
            <Link href="/terminos" className={styles.legalLink}>
              Términos y Condiciones
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}