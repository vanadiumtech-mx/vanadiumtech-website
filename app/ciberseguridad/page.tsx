// app/ciberseguridad/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function CiberseguridadPage() {
  const services = [
    {
      title: 'Seguridad Perimetral',
      description: 'Protección avanzada de la red contra amenazas externas.',
      features: [
        'NGFW/UTM',
        'IPS/IDS',
        'DDOS Protection',
        'Web Application Firewall'
      ]
    },
    {
      title: 'Endpoint Protection',
      description: 'Seguridad integral para todos los dispositivos.',
      features: [
        'EDR/XDR',
        'Antivirus Next-Gen',
        'Vulnerability Management',
        'Application Control'
      ]
    },
    {
      title: 'Zero Trust Architecture',
      description: 'Modelo de seguridad basado en verificación continua.',
      features: [
        'Identity Management',
        'Multi-Factor Authentication',
        'Micro-segmentation',
        'Least Privilege Access'
      ]
    },
    {
      title: 'SIEM y SOC',
      description: 'Monitoreo y respuesta a incidentes 24/7.',
      features: [
        'Security Monitoring',
        'Threat Intelligence',
        'Incident Response',
        'Forensics'
      ]
    },
    {
      title: 'Cloud Security',
      description: 'Protección de entornos cloud y SaaS.',
      features: [
        'CSPM',
        'CWPP',
        'CASB',
        'Cloud Native Security'
      ]
    },
    {
      title: 'Compliance & Governance',
      description: 'Cumplimiento normativo y gestión de riesgos.',
      features: [
        'GDPR/LFPDPPP',
        'ISO 27001',
        'NIST Framework',
        'Auditoría continua'
      ]
    }
  ]

  const threats = [
    { name: 'Ransomware', reduction: '95%', description: 'Prevención de ataques de secuestro de datos' },
    { name: 'Phishing', reduction: '98%', description: 'Detección y bloqueo de correos maliciosos' },
    { name: 'Malware', reduction: '99.9%', description: 'Protección contra software malicioso' },
    { name: 'Insider Threats', reduction: '85%', description: 'Detección de amenazas internas' }
  ]

  const certifications = [
    'ISO 27001',
    'NIST Cybersecurity Framework',
    'PCI DSS',
    'GDPR',
    'LFPDPPP',
    'CMMC'
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
              <span className={styles.badge}>Protección Avanzada</span>
              <h1>Ciberseguridad <span className="accent-text">Empresarial</span></h1>
              <p>
                Protegemos tu infraestructura crítica con arquitectura Zero Trust, 
                monitoreo 24/7 y respuesta inmediata ante incidentes de seguridad.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Monitoreo continuo</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{'< 10min'}</span>
                  <span className={styles.statLabel}>Tiempo de respuesta</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>99.9%</span>
                  <span className={styles.statLabel}>Efectividad</span>
                </div>
              </div>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Auditoría
                </Link>
                <Link href="#servicios" className="btn btn-secondary">
                  Ver Servicios
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Servicios */}
        <section id="servicios" className={styles.services}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Servicios de <span className="accent-text">Ciberseguridad</span></h2>
              <p>Protección integral para tu organización</p>
            </motion.div>

            <div className={styles.servicesGrid}>
              {services.map((service, index) => (
                <motion.div
                  key={service.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={styles.serviceCard}
                >
                  <div className={styles.cardIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <path d="M20 8 L20 12 M20 28 L20 32" stroke="#00E5FF" strokeWidth="2"/>
                      <rect x="12" y="12" width="16" height="16" rx="2" stroke="#00E5FF" strokeWidth="2"/>
                      <circle cx="20" cy="20" r="2" fill="#00E5FF"/>
                    </svg>
                  </div>
                  <h3>{service.title}</h3>
                  <p>{service.description}</p>
                  <ul>
                    {service.features.map((feature) => (
                      <li key={feature}>{feature}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Threat Reduction */}
        <section className={styles.threats}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Reducción de <span className="accent-text">Amenazas</span></h2>
              <p>Resultados comprobados en protección</p>
            </motion.div>

            <div className={styles.threatsGrid}>
              {threats.map((threat, index) => (
                <motion.div
                  key={threat.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.threatCard}
                >
                  <h3>{threat.name}</h3>
                  <div className={styles.reduction}>{threat.reduction}</div>
                  <p>{threat.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Certificaciones */}
        <section className={styles.certifications}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Certificaciones y <span className="accent-text">Cumplimiento</span></h2>
              <p>Estándares internacionales que garantizan tu seguridad</p>
            </motion.div>

            <div className={styles.certsGrid}>
              {certifications.map((cert, index) => (
                <motion.div
                  key={cert}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.3, delay: index * 0.05 }}
                  viewport={{ once: true }}
                  className={styles.certCard}
                >
                  {cert}
                </motion.div>
              ))}
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
              <h2>Tecnologías de <span className="accent-text">Seguridad</span></h2>
              <p>Las mejores soluciones del mercado</p>
            </motion.div>

            <div className={styles.techGrid}>
              {[
                { category: 'Endpoint', items: ['CrowdStrike', 'SentinelOne', 'Microsoft Defender'] },
                { category: 'Network', items: ['Palo Alto', 'Fortinet', 'Cisco Security'] },
                { category: 'SIEM', items: ['Splunk', 'QRadar', 'Sentinel'] },
                { category: 'Identity', items: ['Okta', 'Azure AD', 'Ping Identity'] }
              ].map((category, index) => (
                <motion.div
                  key={category.category}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.techCategory}
                >
                  <h3>{category.category}</h3>
                  <div className={styles.techList}>
                    {category.items.map((item) => (
                      <span key={item} className={styles.techBadge}>{item}</span>
                    ))}
                  </div>
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
              <h2>¿Quieres evaluar tu postura de seguridad?</h2>
              <p>
                Realizamos una auditoría completa de tu infraestructura y te 
                entregamos un plan de mejora con las acciones prioritarias.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Solicitar Auditoría de Seguridad
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}