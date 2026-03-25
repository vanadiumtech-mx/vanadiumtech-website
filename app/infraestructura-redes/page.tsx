// app/infraestructura-redes/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function InfraestructuraRedesPage() {
  const solutions = [
    {
      title: 'Redes LAN/WAN Empresariales',
      description: 'Diseño e implementación de redes de campus y sucursales con arquitectura de alta disponibilidad.',
      features: ['Conmutación de capa 2/3', 'Enrutamiento dinámico (OSPF, BGP)', 'Redundancia y failover', 'Segmentación de redes (VLANs)']
    },
    {
      title: 'SD-WAN y Optimización',
      description: 'Soluciones de red definida por software para optimizar conectividad multisitio.',
      features: ['Balanceo de enlaces', 'Calidad de servicio (QoS)', 'Seguridad integrada', 'Gestión centralizada']
    },
    {
      title: 'WiFi Empresarial',
      description: 'Redes inalámbricas de alto rendimiento con seguridad avanzada.',
      features: ['WiFi 6/6E', 'Controladores inalámbricos', 'Autenticación 802.1X', 'Guest access management']
    },
    {
      title: 'Seguridad de Red',
      description: 'Protección perimetral y segmentación avanzada contra amenazas.',
      features: ['NGFW/UTM', 'IPS/IDS', 'Segmentación Zero Trust', 'VPN y acceso remoto seguro']
    }
  ]

  const architectures = [
    {
      name: 'Campus Core',
      components: ['Core Switches', 'Distribution Switches', 'Access Switches', 'Wireless Controllers']
    },
    {
      name: 'Data Center',
      components: ['Spine-Leaf Architecture', 'TOR Switches', 'Load Balancers', 'Firewalls']
    },
    {
      name: 'Sucursales',
      components: ['SD-WAN Edge', 'Firewalls', 'Access Points', 'IoT Gateways']
    }
  ]

  const benefits = [
    'Alta disponibilidad 99.999%',
    'Reducción de latencia hasta 40%',
    'Seguridad integrada en todos los niveles',
    'Visibilidad y control centralizado',
    'Escalabilidad sin interrupciones',
    'Soporte 24/7 con NOC especializado'
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
              <span className={styles.badge}>Servicio Especializado</span>
              <h1>Infraestructura en <span className="accent-text">Redes</span></h1>
              <p>
                Diseñamos e implementamos redes empresariales de alto rendimiento 
                con arquitectura de seguridad integrada, garantizando la máxima 
                disponibilidad y rendimiento para tus operaciones críticas.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>99.999%</span>
                  <span className={styles.statLabel}>Disponibilidad</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>{'< 1ms'}</span>
                  <span className={styles.statLabel}>Latencia interna</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>10K+</span>
                  <span className={styles.statLabel}>Dispositivos gestionados</span>
                </div>
              </div>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Diagnóstico
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
              <h2>Soluciones de <span className="accent-text">Redes</span></h2>
              <p>Arquitecturas adaptadas a las necesidades de tu organización</p>
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

        {/* Arquitecturas */}
        <section className={styles.architectures}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Arquitecturas <span className="accent-text">Referencia</span></h2>
              <p>Modelos de despliegue probados en entornos críticos</p>
            </motion.div>

            <div className={styles.architecturesGrid}>
              {architectures.map((arch, index) => (
                <motion.div
                  key={arch.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.architectureCard}
                >
                  <h3>{arch.name}</h3>
                  <div className={styles.components}>
                    {arch.components.map((comp) => (
                      <span key={comp} className={styles.component}>{comp}</span>
                    ))}
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
                <h2>Beneficios de una <span className="accent-text">Red Optimizada</span></h2>
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
                <div className={styles.networkGraphic}>
                  <div className={styles.node}></div>
                  <div className={styles.node}></div>
                  <div className={styles.node}></div>
                  <div className={styles.node}></div>
                  <div className={styles.connection}></div>
                  <div className={styles.connection}></div>
                  <div className={styles.connection}></div>
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
              <h2>Tecnologías <span className="accent-text">Líderes</span></h2>
              <p>Partner oficial de los principales fabricantes de networking</p>
            </motion.div>

            <div className={styles.techGrid}>
              {['Cisco', 'Juniper', 'Fortinet', 'Aruba', 'Palo Alto', 'F5'].map((tech, index) => (
                <motion.div
                  key={tech}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.techCard}
                >
                  <h3>{tech}</h3>
                  <p>Partner certificado</p>
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
              <h2>¿Necesitas una auditoría de red?</h2>
              <p>
                Realizamos un diagnóstico completo de tu infraestructura actual 
                y te entregamos un plan de optimización sin costo.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Solicitar Auditoría Gratuita
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}