// app/components/CTA/CTA.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './CTA.module.scss'

export default function CTA() {
  return (
    <section className={styles.cta}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.content}
        >
          <h2>¿Listo para transformar tu infraestructura tecnológica?</h2>
          <p>
            Contáctanos hoy mismo y descubre cómo podemos ayudarte a construir 
            soluciones de alto rendimiento para tu organización.
          </p>
          <div className={styles.buttons}>
            <a href="/contacto" className="btn btn-primary">
              Solicitar Asesoría
            </a>
            <a href="/servicios" className="btn btn-secondary">
              Conocer más
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  )
}