// app/telecomunicaciones/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function TelecomunicacionesPage() {
  const solutions = [
    {
      title: 'Comunicaciones Unificadas',
      description: 'Integración de voz, video, mensajería y colaboración en una sola plataforma.',
      features: ['VoIP empresarial', 'Videoconferencia HD', 'Mensajería instantánea', 'Presencia y movilidad']
    },
    {
      title: 'Contact Center Omnicanal',
      description: 'Plataforma integral para gestión de interacciones con clientes en todos los canales.',
      features: ['Enrutamiento inteligente', 'IVR avanzado', 'Analytics en tiempo real', 'Integración CRM']
    },
    {
      title: 'Conectividad Empresarial',
      description: 'Enlaces dedicados de alta capacidad para operaciones críticas.',
      features: ['Fibra óptica', 'MPLS VPN', 'Internet dedicado', 'Redes privadas 5G']
    },
    {
      title: 'Telefonía en la Nube',
      description: 'Soluciones de telefonía como servicio con escalabilidad inmediata.',
      features: ['UCaaS', 'CPaaS', 'SIP Trunking', 'Telefonía virtual']
    }
  ]

  const deploymentModels = [
    {
      name: 'On-Premise',
      description: 'Infraestructura local con control total y alta seguridad',
      features: ['Control absoluto', 'Integración legacy', 'Latencia mínima', 'Seguridad máxima']
    },
    {
      name: 'Híbrido',
      description: 'Combinación de recursos locales y en la nube',
      features: ['Flexibilidad', 'Escalabilidad', 'Resiliencia', 'Optimización de costos']
    },
    {
      name: 'Cloud-Native',
      description: 'Solución completamente en la nube sin inversión inicial',
      features: ['Escalabilidad inmediata', 'Actualizaciones automáticas', 'Bajo CAPEX', 'Movilidad total']
    }
  ]

  return (
    <>
      <Header />
      <main className={styles.main}>
        <section className={styles.hero}>
          <div className={styles.heroBackground}></div>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.heroContent}
            >
              <span className={styles.badge}>Comunicaciones Avanzadas</span>
              <h1>Telecomunicaciones <span className="accent-text">Empresariales</span></h1>
              <p>
                Soluciones integrales de comunicaciones unificadas y conectividad 
                empresarial que optimizan la colaboración y reducen costos operativos.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>99.999%</span>
                  <span className={styles.statLabel}>Disponibilidad</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{'< 50ms'}</span>
                  <span className={styles.statLabel}>Latencia global</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>40%</span>
                  <span className={styles.statLabel}>Reducción de costos</span>
                </div>
              </div>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Demo
                </Link>
                <Link href="#soluciones" className="btn btn-secondary">
                  Conocer Más
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        <section id="soluciones" className={styles.solutions}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Soluciones de <span className="accent-text">Telecomunicaciones</span></h2>
              <p>Comunicación empresarial de última generación</p>
            </motion.div>

            <div className={styles.solutionsGrid}>
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.solutionCard}
                >
                  <div className={styles.cardIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="8" y="12" width="24" height="20" rx="2" stroke="#00E5FF" strokeWidth="2"/>
                      <path d="M20 8 L20 12 M20 32 L20 36" stroke="#00E5FF" strokeWidth="2"/>
                    </svg>
                  </div>
                  <h3>{solution.title}</h3>
                  <p>{solution.description}</p>
                  <ul>
                    {solution.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.models}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Modelos de <span className="accent-text">Despliegue</span></h2>
              <p>Flexibilidad para adaptarse a tus necesidades</p>
            </motion.div>

            <div className={styles.modelsGrid}>
              {deploymentModels.map((model, index) => (
                <motion.div
                  key={model.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.modelCard}
                >
                  <h3>{model.name}</h3>
                  <p>{model.description}</p>
                  <ul>
                    {model.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        <section className={styles.cta}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.ctaContent}
            >
              <h2>¿Listo para transformar tus comunicaciones?</h2>
              <p>
                Agenda una demo gratuita y descubre cómo nuestras soluciones 
                pueden optimizar la colaboración en tu organización.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Agendar Demo
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}