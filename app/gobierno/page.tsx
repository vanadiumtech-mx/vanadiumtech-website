// app/gobierno/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function GobiernoPage() {
  const contractProcesses = [
    {
      title: 'Licitaciones Públicas Nacionales',
      description: 'Participación en procesos de licitación pública federal y estatal',
      requirements: [
        'Registro en COMPRANET',
        'Opinión de cumplimiento de obligaciones fiscales',
        'Experiencia comprobable en proyectos similares',
        'Certificaciones técnicas vigentes'
      ]
    },
    {
      title: 'Licitaciones Internacionales',
      description: 'Participación en procesos de licitación con organismos internacionales',
      requirements: [
        'Registro en proveedores internacionales',
        'Certificaciones ISO 9001:2015',
        'Capacidad financiera comprobable',
        'Referencias internacionales'
      ]
    },
    {
      title: 'Adjudicación Directa',
      description: 'Contrataciones por montos menores a los umbrales de licitación',
      requirements: [
        'Cotización formal',
        'Especificaciones técnicas detalladas',
        'Garantías de cumplimiento',
        'Entregables definidos'
      ]
    }
  ]

  const governmentSolutions = [
    {
      category: 'Plataformas Gubernamentales',
      solutions: [
        'Sistemas de gestión documental',
        'Plataformas de trámites en línea',
        'Portales de transparencia',
        'Sistemas de información estadística'
      ]
    },
    {
      category: 'Infraestructura Crítica',
      solutions: [
        'Centros de datos gubernamentales',
        'Redes de comunicación seguras',
        'Sistemas de videovigilancia',
        'Sala de situación y comando'
      ]
    },
    {
      category: 'Seguridad Institucional',
      solutions: [
        'Plataformas de ciberseguridad',
        'Sistemas de identidad digital',
        'Auditoría y cumplimiento normativo',
        'Protección de datos sensibles'
      ]
    }
  ]

  const legalDocuments = [
    'Acta Constitutiva',
    'RFC con obligaciones',
    'Opinión de cumplimiento SAT',
    'Seguro de responsabilidad civil',
    'Certificaciones ISO 9001:2015',
    'Certificaciones ISO 27001',
    'Registro COMPRANET',
    'Cédula de habilidades técnicas'
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
              <span className={styles.badge}>Sector Público</span>
              <h1>Soluciones Tecnológicas para <span className="accent-text">Gobierno</span></h1>
              <p>
                Especialistas en proyectos gubernamentales de gran escala. 
                Contamos con la experiencia, certificaciones y capacidad 
                técnica para participar en licitaciones públicas y 
                adjudicaciones directas.
              </p>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Información
                </Link>
                <Link href="#licitaciones" className="btn btn-secondary">
                  Ver Licitaciones Activas
                </Link>
              </div>
            </motion.div>
          </div>
        </section>

        {/* Procesos de Contratación */}
        <section id="licitaciones" className={styles.processes}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Procesos de <span className="accent-text">Contratación</span></h2>
              <p>Modalidades de participación en el sector público</p>
            </motion.div>

            <div className={styles.processesGrid}>
              {contractProcesses.map((process, index) => (
                <motion.div
                  key={process.title}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.processCard}
                >
                  <div className={styles.cardIcon}>
                    <svg width="40" height="40" viewBox="0 0 40 40" fill="none">
                      <rect x="8" y="12" width="24" height="20" stroke="#00E5FF" strokeWidth="2" fill="none"/>
                      <path d="M12 8 L20 12 L28 8" stroke="#00E5FF" strokeWidth="2" fill="none"/>
                    </svg>
                  </div>
                  <h3>{process.title}</h3>
                  <p>{process.description}</p>
                  <ul className={styles.requirements}>
                    {process.requirements.map((req) => (
                      <li key={req}>{req}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Soluciones Gubernamentales */}
        <section className={styles.solutions}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Soluciones para <span className="accent-text">Gobierno</span></h2>
              <p>Tecnología diseñada para las necesidades del sector público</p>
            </motion.div>

            <div className={styles.solutionsGrid}>
              {governmentSolutions.map((solution, index) => (
                <motion.div
                  key={solution.category}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.solutionCard}
                >
                  <h3>{solution.category}</h3>
                  <ul>
                    {solution.solutions.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Documentación Legal */}
        <section className={styles.documents}>
          <div className="container">
            <div className={styles.documentsWrapper}>
              <motion.div
                initial={{ opacity: 0, x: -30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.documentsContent}
              >
                <span className={styles.badge}>Documentación</span>
                <h2>Certificaciones y <span className="accent-text">Acreditaciones</span></h2>
                <p>
                  Contamos con toda la documentación legal y técnica requerida 
                  para participar en procesos de contratación gubernamental.
                </p>
              </motion.div>

              <motion.div
                initial={{ opacity: 0, x: 30 }}
                whileInView={{ opacity: 1, x: 0 }}
                transition={{ duration: 0.6 }}
                viewport={{ once: true }}
                className={styles.documentsList}
              >
                {legalDocuments.map((doc, index) => (
                  <motion.div
                    key={doc}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={styles.docItem}
                  >
                    <span className={styles.checkmark}>✓</span>
                    {doc}
                  </motion.div>
                ))}
              </motion.div>
            </div>
          </div>
        </section>

        {/* CTA Gobierno */}
        <section className={styles.cta}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.ctaContent}
            >
              <h2>¿Interesado en nuestros servicios para gobierno?</h2>
              <p>
                Contáctanos para recibir información detallada sobre nuestros 
                procesos de contratación y documentación legal.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Contactar al área de Gobierno
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}