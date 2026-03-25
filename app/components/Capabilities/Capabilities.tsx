// app/components/Capabilities/Capabilities.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './Capabilities.module.scss'

export default function Capabilities() {
  const capabilities = [
    {
      icon: '🌐',
      title: 'Infraestructura en Redes',
      description: 'Diseño e implementación de redes LAN, WAN, WiFi de alto rendimiento con arquitectura de seguridad integrada.',
      features: ['Redes empresariales', 'Conectividad redundante', 'SD-WAN']
    },
    {
      icon: '📡',
      title: 'Telecomunicaciones',
      description: 'Soluciones avanzadas de comunicaciones unificadas y conectividad empresarial.',
      features: ['VoIP', 'Comunicaciones unificadas', 'Fibra óptica']
    },
    {
      icon: '💻',
      title: 'Desarrollo de Software',
      description: 'Plataformas escalables y sistemas a la medida con arquitectura moderna.',
      features: ['Aplicaciones web', 'Sistemas empresariales', 'APIs robustas']
    },
    {
      icon: '🔄',
      title: 'Integración de Sistemas',
      description: 'Integración de plataformas empresariales y automatización de procesos.',
      features: ['Middleware', 'APIs', 'Migración de datos']
    },
    {
      icon: '🏢',
      title: 'Centros de Datos',
      description: 'Diseño, implementación y operación de centros de datos críticos.',
      features: ['Virtualización', 'Alta disponibilidad', 'DRP']
    },
    {
      icon: '🔒',
      title: 'Ciberseguridad',
      description: 'Protección integral de infraestructura crítica y datos sensibles.',
      features: ['SIEM', 'EDR', 'Zero Trust']
    }
  ]

  return (
    <section className={styles.capabilities}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>Servicios Especializados</span>
          <h2>Capacidades <span className="accent-text">Técnicas</span></h2>
          <p>Soluciones de alto rendimiento para infraestructura crítica</p>
        </motion.div>

        <div className={styles.grid}>
          {capabilities.map((cap, index) => (
            <motion.div
              key={cap.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.card}
            >
              <div className={styles.icon}>{cap.icon}</div>
              <h3>{cap.title}</h3>
              <p>{cap.description}</p>
              <ul className={styles.features}>
                {cap.features.map((feature) => (
                  <li key={feature}>{feature}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}