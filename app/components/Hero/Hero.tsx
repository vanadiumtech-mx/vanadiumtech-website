'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import styles from './Hero.module.scss'
import NetworkBackground from '../NetworkBackground/NetworkBackground'

export default function Hero() {
  return (
    <section className={styles.hero}>
      <div className={styles.background}>
       <NetworkBackground />
      </div>
      {/* Background */}
      <div className={styles.background}>
        <div className={styles.lines}></div>
        <div className={styles.linesOverlay}></div>
      </div>

      <div className="container">
        <div className={styles.content}>

          <motion.span
            className={styles.badge}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
          >
            Infraestructura Tecnológica Crítica
          </motion.span>

          <motion.h1
            className={styles.title}
            initial={{ opacity: 0, y: 40, filter: 'blur(10px)' }}
            animate={{ opacity: 1, y: 0, filter: 'blur(0px)' }}
            transition={{ duration: 0.9 }}
          >
            Construyendo el futuro de la{' '}
            <span className={styles.accent}>infraestructura crítica</span>
          </motion.h1>

          <motion.p
            className={styles.description}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.2 }}
          >
            Soluciones tecnológicas de alto rendimiento para gobierno y empresas.
            Desarrollo de Software redes, telecomunicaciones, centros de datos y ciberseguridad.
          </motion.p>

          <motion.div
            className={styles.buttons}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3 }}
          >
            <Link href="/servicios" className={styles.primaryBtn}>
              Explorar soluciones →
            </Link>

            <Link href="/contacto" className={styles.secondaryBtn}>
              Contactar asesor
            </Link>
          </motion.div>
        </div>
      </div>

      <div className={styles.scrollIndicator}>
        <div></div>
      </div>

    </section>
  )
}