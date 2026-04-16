// app/components/Industries/Industries.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './Industries.module.scss'

export default function Industries() {
  const industries = [
    {
      name: 'Gobierno',
      icon: '🏛️',
      description: 'Soluciones para instituciones públicas y licitaciones',
      color: '#00E5FF'
    },
    {
      name: 'Financiero',
      icon: '💰',
      description: 'Seguridad y alta disponibilidad para el sector financiero',
      color: '#00E5FF'
    },
    {
      name: 'Energía',
      icon: '⚡',
      description: 'Infraestructura crítica para el sector energético',
      color: '#00E5FF'
    },
    {
      name: 'Salud',
      icon: '🏥',
      description: 'Conectividad y seguridad para instituciones de salud',
      color: '#00E5FF'
    }
  ]

  return (
    <section className={styles.industries}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>Sectores que Transformamos</span>
          <h2>Industrias que <span className="accent-text">Confían</span> en Nosotros</h2>
          <p>Soluciones especializadas para cada sector crítico</p>
        </motion.div>

        <div className={styles.grid}>
          {industries.map((industry, index) => (
            <motion.div
              key={industry.name}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.card}
              style={{ '--accent-color': industry.color } as React.CSSProperties}
            >
              <div className={styles.icon}>{industry.icon}</div>
              <h3>{industry.name}</h3>
              <p>{industry.description}</p>
              <div className={styles.glow}></div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}