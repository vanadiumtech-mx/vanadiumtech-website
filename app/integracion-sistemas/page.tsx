// app/integracion-sistemas/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function IntegracionSistemasPage() {
  const solutions = [
    {
      title: 'Middleware Empresarial',
      description: 'Plataformas de integración que conectan aplicaciones heterogéneas.',
      features: [
        'ESB (Enterprise Service Bus)',
        'Message Brokering',
        'Transformación de datos',
        'Enrutamiento inteligente'
      ]
    },
    {
      title: 'APIs y Microservicios',
      description: 'Diseño e implementación de APIs robustas y arquitecturas de microservicios.',
      features: [
        'API Gateway',
        'Rate Limiting',
        'Autenticación OAuth/JWT',
        'Documentación OpenAPI'
      ]
    },
    {
      title: 'ETL y Data Integration',
      description: 'Procesos de extracción, transformación y carga de datos.',
      features: [
        'Data Warehousing',
        'Real-time ETL',
        'Data Quality',
        'Master Data Management'
      ]
    },
    {
      title: 'Integración Cloud-Híbrida',
      description: 'Conectividad entre entornos on-premise y múltiples nubes.',
      features: [
        'Cloud Connectors',
        'Hybrid Integration',
        'Event-Driven Architecture',
        'Serverless Integration'
      ]
    },
    {
      title: 'B2B Integration',
      description: 'Intercambio electrónico de datos con socios comerciales.',
      features: [
        'EDI',
        'MFT (Managed File Transfer)',
        'B2B Gateways',
        'Trading Partner Management'
      ]
    },
    {
      title: 'Legacy Modernization',
      description: 'Integración y modernización de sistemas heredados.',
      features: [
        'Legacy Wrapping',
        'Mainframe Integration',
        'Database Integration',
        'Screen Scraping'
      ]
    }
  ]

  const integrationPatterns = [
    {
      name: 'Point-to-Point',
      description: 'Conexión directa entre aplicaciones',
      useCase: 'Sistemas simples, integraciones puntuales'
    },
    {
      name: 'Hub-and-Spoke',
      description: 'Arquitectura centralizada con bus de integración',
      useCase: 'Múltiples sistemas, gobierno centralizado'
    },
    {
      name: 'Event-Driven',
      description: 'Integración basada en eventos y mensajería asíncrona',
      useCase: 'Alta escalabilidad, tiempo real'
    },
    {
      name: 'Microservices',
      description: 'Arquitectura distribuida con APIs independientes',
      useCase: 'Escalabilidad, despliegues independientes'
    }
  ]

  const benefits = [
    'Reducción de silos de información',
    'Automatización de procesos end-to-end',
    'Visibilidad unificada de operaciones',
    'Mayor agilidad en cambios de negocio',
    'Reducción de costos de mantenimiento',
    'Cumplimiento normativo garantizado'
  ]

  return (
    <>
      <Header />
      <main className={styles.main}>
        {/* Hero Section */}
        <section className={styles.hero}>
          <div className={styles.heroBackground}></div>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              className={styles.heroContent}
            >
              <span className={styles.badge}>Conectividad Empresarial</span>
              <h1>Integración de <span className="accent-text">Sistemas</span></h1>
              <p>
                Conectamos tus aplicaciones, datos y procesos empresariales en una 
                arquitectura unificada que optimiza la operación y acelera la 
                transformación digital.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>50+</span>
                  <span className={styles.statLabel}>Sistemas integrados</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{'< 1s'}</span>
                  <span className={styles.statLabel}>Latencia de integración</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>99.99%</span>
                  <span className={styles.statLabel}>Disponibilidad</span>
                </div>
              </div>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Consultoría
                </Link>
                <Link href="#soluciones" className="btn btn-secondary">
                  Ver Soluciones
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Soluciones */}
        <section id="soluciones" className={styles.solutions}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Soluciones de <span className="accent-text">Integración</span></h2>
              <p>Conectamos tu ecosistema tecnológico</p>
            </motion.div>

            <div className={styles.solutionsGrid}>
              {solutions.map((solution, index) => (
                <motion.div
                  key={solution.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={styles.solutionCard}
                >
                  <div className={styles.cardIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M12 20 L28 20 M20 12 L20 28" stroke="#00E5FF" strokeWidth="2"/>
                      <circle cx="12" cy="20" r="3" fill="#00E5FF"/>
                      <circle cx="28" cy="20" r="3" fill="#00E5FF"/>
                      <circle cx="20" cy="12" r="3" fill="#00E5FF"/>
                      <circle cx="20" cy="28" r="3" fill="#00E5FF"/>
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

        {/* Patrones de Integración */}
        <section className={styles.patterns}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Patrones de <span className="accent-text">Integración</span></h2>
              <p>Arquitecturas probadas para cada necesidad</p>
            </motion.div>

            <div className={styles.patternsGrid}>
              {integrationPatterns.map((pattern, index) => (
                <motion.div
                  key={pattern.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.patternCard}
                >
                  <h3>{pattern.name}</h3>
                  <p>{pattern.description}</p>
                  <div className={styles.useCase}>
                    <span className={styles.useCaseLabel}>Ideal para:</span>
                    <span>{pattern.useCase}</span>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Beneficios */}
        <section className={styles.benefits}>
          <div className="container">
            <div className={styles.benefitsWrapper}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.benefitsContent}
              >
                <h2>Beneficios de una <span className="accent-text">Arquitectura Integrada</span></h2>
                <div className={styles.benefitsList}>
                  {benefits.map((benefit, index) => (
                    <motion.div
                      key={benefit}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      transition={{ duration: 0.3, delay: index * 0.1 }}
                      viewport={{ once: true }}
                      className={styles.benefitItem}
                    >
                      <span className={styles.checkmark}>✓</span>
                      {benefit}
                    </motion.div>
                  ))}
                </div>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.benefitsVisual}
              >
                <div className={styles.integrationGraphic}>
                  <div className={styles.center}></div>
                  {[...Array(6)].map((_, i) => (
                    <div key={i} className={styles.node} style={{ 
                      transform: `rotate(${i * 60}deg) translate(100px)`,
                      animationDelay: `${i * 0.2}s`
                    }}></div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* Tecnologías */}
        <section className={styles.technologies}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Tecnologías de <span className="accent-text">Integración</span></h2>
              <p>Las mejores plataformas del mercado</p>
            </motion.div>

            <div className={styles.techGrid}>
              {[
                { name: 'MuleSoft', category: 'iPaaS' },
                { name: 'Dell Boomi', category: 'iPaaS' },
                { name: 'Apache Kafka', category: 'Streaming' },
                { name: 'RabbitMQ', category: 'Message Broker' },
                { name: 'Redis', category: 'In-Memory' },
                { name: 'GraphQL', category: 'API' }
              ].map((tech, index) => (
                <motion.div
                  key={tech.name}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.techCard}
                >
                  <h3>{tech.name}</h3>
                  <span className={styles.techCategory}>{tech.category}</span>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* CTA */}
        <section className={styles.cta}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.ctaContent}
            >
              <h2>¿Necesitas integrar tus sistemas?</h2>
              <p>
                Te ayudamos a diseñar la arquitectura de integración perfecta 
                para tu organización, conectando todos tus sistemas en una 
                plataforma unificada.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Solicitar Assessment
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}