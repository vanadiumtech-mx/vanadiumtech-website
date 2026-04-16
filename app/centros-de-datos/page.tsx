// app/centros-de-datos/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function CentrosDeDatosPage() {
  const services = [
    {
      title: 'Diseño y Construcción',
      description: 'Centros de datos desde cero con estándares internacionales.',
      features: [
        'Tier III / Tier IV certification',
        'Arquitectura redundante',
        'Eficiencia energética (PUE)',
        'Diseño modular escalable'
      ]
    },
    {
      title: 'Virtualización',
      description: 'Optimización de recursos con tecnologías de virtualización.',
      features: [
        'Server Virtualization',
        'Storage Virtualization',
        'Network Virtualization',
        'Desktop Virtualization'
      ]
    },
    {
      title: 'Alta Disponibilidad',
      description: 'Arquitecturas que garantizan continuidad operativa.',
      features: [
        'Clustering',
        'Load Balancing',
        'Failover automático',
        'SLA 99.999%'
      ]
    },
    {
      title: 'Disaster Recovery',
      description: 'Estrategias de recuperación ante desastres.',
      features: [
        'DRP y BCP',
        'Replicación síncrona/asíncrona',
        'Backup automatizado',
        'Failover site'
      ]
    },
    {
      title: 'Almacenamiento Empresarial',
      description: 'Soluciones de almacenamiento de alto rendimiento.',
      features: [
        'SAN / NAS',
        'All-Flash Arrays',
        'Object Storage',
        'Data Deduplication'
      ]
    },
    {
      title: 'Cloud Hybrid',
      description: 'Integración de entornos on-premise y cloud.',
      features: [
        'Cloud Management',
        'Orquestación',
        'Bursting',
        'Cost Optimization'
      ]
    }
  ]

  const tiers = [
    {
      level: 'Tier I',
      description: 'Capacidad básica',
      availability: '99.671%',
      downtime: '28.8 horas/año'
    },
    {
      level: 'Tier II',
      description: 'Componentes redundantes',
      availability: '99.741%',
      downtime: '22 horas/año'
    },
    {
      level: 'Tier III',
      description: 'Mantenimiento concurrente',
      availability: '99.982%',
      downtime: '1.6 horas/año'
    },
    {
      level: 'Tier IV',
      description: 'Tolerancia a fallos',
      availability: '99.995%',
      downtime: '26.3 minutos/año'
    }
  ]

  const technologies = [
    { category: 'Virtualización', items: ['VMware vSphere', 'Microsoft Hyper-V', 'Nutanix AHV', 'Red Hat Virtualization'] },
    { category: 'Almacenamiento', items: ['Dell EMC', 'Pure Storage', 'NetApp', 'HPE Storage'] },
    { category: 'Cloud', items: ['AWS Outposts', 'Azure Stack', 'Google Anthos', 'VMware Cloud'] },
    { category: 'Gestión', items: ['vRealize', 'Ansible', 'Terraform', 'CloudFormation'] }
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
              <span className={styles.badge}>Infraestructura Crítica</span>
              <h1>Centros de <span className="accent-text">Datos</span></h1>
              <p>
                Diseñamos, implementamos y operamos centros de datos de misión crítica 
                con los más altos estándares de disponibilidad, seguridad y eficiencia.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>99.999%</span>
                  <span className={styles.statLabel}>Disponibilidad</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{'< 1.2'}</span>
                  <span className={styles.statLabel}>PUE</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Monitoreo</span>
                </div>
              </div>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Consultoría
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
              <h2>Servicios de <span className="accent-text">Data Center</span></h2>
              <p>Soluciones end-to-end para infraestructura crítica</p>
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

        {/* Tier Levels */}
        <section className={styles.tiers}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Niveles de <span className="accent-text">Certificación</span></h2>
              <p>Estándares Uptime Institute</p>
            </motion.div>

            <div className={styles.tiersGrid}>
              {tiers.map((tier, index) => (
                <motion.div
                  key={tier.level}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.tierCard}
                >
                  <h3>{tier.level}</h3>
                  <p>{tier.description}</p>
                  <div className={styles.tierStats}>
                    <div>
                      <span className={styles.tierLabel}>Disponibilidad</span>
                      <span className={styles.tierValue}>{tier.availability}</span>
                    </div>
                    <div>
                      <span className={styles.tierLabel}>Downtime</span>
                      <span className={styles.tierValue}>{tier.downtime}</span>
                    </div>
                  </div>
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
              <h2>Tecnologías <span className="accent-text">Líderes</span></h2>
              <p>Partner oficial de los principales fabricantes</p>
            </motion.div>

            <div className={styles.techGrid}>
              {technologies.map((category, index) => (
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
              <h2>¿Necesitas un Data Center de misión crítica?</h2>
              <p>
                Te ayudamos a diseñar la infraestructura que garantice la 
                continuidad de tus operaciones con los más altos estándares.
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