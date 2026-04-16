// app/components/TechnicalCapabilities/TechnicalCapabilities.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './TechnicalCapabilities.module.scss'

export default function TechnicalCapabilities() {
  const technicalAreas = [
    {
      category: 'Redes',
      items: ['LAN/WAN Design', 'SD-WAN', 'WiFi 6/6E', 'Network Security', 'MPLS', 'Load Balancing']
    },
    {
      category: 'Telecomunicaciones',
      items: ['VoIP', 'Unified Communications', 'Fiber Optics', '5G Private Networks', 'Satellite Communications']
    },
    {
      category: 'Data Centers',
      items: ['Virtualization', 'High Availability', 'Disaster Recovery', 'Storage Solutions', 'DCIM']
    },
    {
      category: 'Cloud',
      items: ['AWS', 'Azure', 'Google Cloud', 'Hybrid Cloud', 'Multi-Cloud', 'Cloud Security']
    },
    {
      category: 'Software',
      items: ['Custom Development', 'APIs', 'Microservices', 'DevOps', 'CI/CD', 'Containerization']
    },
    {
      category: 'Seguridad',
      items: ['SIEM', 'EDR', 'Zero Trust', 'Identity Management', 'Penetration Testing', 'Compliance']
    }
  ]

  return (
    <section className={styles.technical}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>Expertise Técnico</span>
          <h2>Capacidades <span className="accent-text">Técnicas</span></h2>
          <p>Dominio de las tecnologías más avanzadas del mercado</p>
        </motion.div>

        <div className={styles.grid}>
          {technicalAreas.map((area, index) => (
            <motion.div
              key={area.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.area}
            >
              <h3>{area.category}</h3>
              <ul>
                {area.items.map((item) => (
                  <li key={item}>{item}</li>
                ))}
              </ul>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}