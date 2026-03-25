// app/servicios/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function ServiciosPage() {
  const services = [
    {
      id: 'infraestructura-redes',
      title: 'Infraestructura en Redes',
      icon: '🌐',
      description: 'Diseño, implementación y optimización de redes empresariales de alto rendimiento con arquitectura de seguridad integrada.',
      features: [
        'Redes LAN/WAN de alta disponibilidad',
        'WiFi 6/6E empresarial',
        'SD-WAN para conectividad optimizada',
        'Network Security (Firewalls, IDS/IPS)',
        'Balanceo de carga y redundancia',
        'Monitoreo y gestión de redes'
      ],
      technologies: ['Cisco', 'Juniper', 'Fortinet', 'Aruba', 'Palo Alto'],
      useCases: [
        'Corporativos multisitio',
        'Plantas industriales',
        'Instituciones gubernamentales',
        'Centros educativos'
      ]
    },
    {
      id: 'telecomunicaciones',
      title: 'Telecomunicaciones',
      icon: '📡',
      description: 'Soluciones avanzadas de comunicaciones unificadas y conectividad empresarial para optimizar la colaboración.',
      features: [
        'Comunicaciones Unificadas (UCaaS)',
        'VoIP y telefonía IP',
        'Fibra óptica y enlaces dedicados',
        'Redes privadas 5G',
        'Comunicaciones satelitales',
        'Contact Center en la nube'
      ],
      technologies: ['Cisco UCM', 'Microsoft Teams', 'Avaya', 'SIP Trunking', '5G NR'],
      useCases: [
        'Call centers',
        'Empresas distribuidas',
        'Sector financiero',
        'Gobierno'
      ]
    },
    {
      id: 'desarrollo-software',
      title: 'Desarrollo de Software',
      icon: '💻',
      description: 'Creación de plataformas escalables y sistemas a la medida con arquitectura moderna y mejores prácticas.',
      features: [
        'Aplicaciones web y móviles',
        'Sistemas empresariales (ERP, CRM)',
        'APIs y microservicios',
        'Plataformas de datos y analytics',
        'Automatización de procesos',
        'DevOps y CI/CD'
      ],
      technologies: ['React', 'Node.js', 'Python', 'Java', '.NET', 'Kubernetes'],
      useCases: [
        'Transformación digital',
        'Plataformas gubernamentales',
        'E-commerce',
        'Sistemas financieros'
      ]
    },
    {
      id: 'integracion-sistemas',
      title: 'Integración de Sistemas',
      icon: '🔄',
      description: 'Integración de plataformas empresariales y automatización de procesos para optimizar operaciones.',
      features: [
        'Middleware y ESB',
        'Integración de aplicaciones empresariales',
        'APIs y conectores personalizados',
        'Migración de datos',
        'Sincronización en tiempo real',
        'Orquestación de procesos'
      ],
      technologies: ['MuleSoft', 'Dell Boomi', 'Apache Kafka', 'REST APIs', 'GraphQL'],
      useCases: [
        'Fusiones y adquisiciones',
        'Modernización de sistemas',
        'Integración cloud-onpremise',
        'Interoperabilidad gubernamental'
      ]
    },
    {
      id: 'centros-de-datos',
      title: 'Centros de Datos',
      icon: '🏢',
      description: 'Diseño, implementación y operación de centros de datos críticos con alta disponibilidad y eficiencia.',
      features: [
        'Diseño de数据中心 (Tier III/IV)',
        'Virtualización y convergencia',
        'Alta disponibilidad y DRP',
        'Almacenamiento empresarial',
        'Migración a la nube',
        'Eficiencia energética'
      ],
      technologies: ['VMware', 'Nutanix', 'Dell EMC', 'Pure Storage', 'AWS Outposts'],
      useCases: [
        'Data centers empresariales',
        'Instalaciones gubernamentales',
        'Proveedores de servicios',
        'Disaster Recovery'
      ]
    },
    {
      id: 'ciberseguridad',
      title: 'Ciberseguridad',
      icon: '🔒',
      description: 'Protección integral de infraestructura crítica y datos sensibles con arquitectura Zero Trust.',
      features: [
        'Seguridad perimetral y NGFW',
        'EDR y protección endpoints',
        'SIEM y monitoreo 24/7',
        'Zero Trust Architecture',
        'Gestión de identidades',
        'Pruebas de penetración'
      ],
      technologies: ['CrowdStrike', 'SentinelOne', 'Splunk', 'Okta', 'Zscaler'],
      useCases: [
        'Protección de datos sensibles',
        'Cumplimiento normativo',
        'Seguridad para gobierno',
        'Respuesta a incidentes'
      ]
    }
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
              <span className={styles.badge}>Nuestros Servicios</span>
              <h1>Soluciones Tecnológicas de <span className="accent-text">Alto Rendimiento</span></h1>
              <p>
                Ofrecemos servicios especializados en infraestructura crítica, 
                diseñados para garantizar la máxima disponibilidad, seguridad 
                y escalabilidad de tus operaciones.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Services Grid */}
        {services.map((service, index) => (
          <section 
            key={service.id} 
            id={service.id}
            className={`${styles.serviceSection} ${index % 2 === 0 ? styles.even : styles.odd}`}
          >
            <div className="container">
              <div className={styles.serviceWrapper}>
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={styles.serviceContent}
                >
                  <div className={styles.serviceIcon}>{service.icon}</div>
                  <h2>{service.title}</h2>
                  <p className={styles.serviceDescription}>{service.description}</p>
                  
                  <div className={styles.features}>
                    <h3>Características principales</h3>
                    <ul>
                      {service.features.map((feature) => (
                        <li key={feature}>{feature}</li>
                      ))}
                    </ul>
                  </div>
                  
                  <div className={styles.techStack}>
                    <h3>Tecnologías</h3>
                    <div className={styles.techList}>
                      {service.technologies.map((tech) => (
                        <span key={tech} className={styles.techBadge}>{tech}</span>
                      ))}
                    </div>
                  </div>
                  
                  <div className={styles.useCases}>
                    <h3>Casos de uso</h3>
                    <div className={styles.useCaseList}>
                      {service.useCases.map((useCase) => (
                        <span key={useCase} className={styles.useCaseBadge}>{useCase}</span>
                      ))}
                    </div>
                  </div>
                  
                  <Link href="/contacto" className="btn btn-primary">
                    Solicitar este servicio
                  </Link>
                </motion.div>
                
                <motion.div
                  initial={{ opacity: 0, x: index % 2 === 0 ? 30 : -30 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                  viewport={{ once: true }}
                  className={styles.serviceVisual}
                >
                  <div className={styles.graphic}>
                    <div className={styles.graphicGlow}></div>
                    <div className={styles.graphicPattern}></div>
                  </div>
                </motion.div>
              </div>
            </div>
          </section>
        ))}

        {/* CTA Section */}
        <section className={styles.cta}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, scale: 0.95 }}
              whileInView={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.ctaContent}
            >
              <h2>¿Necesitas una solución personalizada?</h2>
              <p>
                Contáctanos para una consultoría gratuita y descubre cómo 
                podemos ayudarte a transformar tu infraestructura tecnológica.
              </p>
              <div className={styles.ctaButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Asesoría
                </Link>
                <Link href="/gobierno" className="btn btn-secondary">
                  Ver soluciones para Gobierno
                </Link>
              </div>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}