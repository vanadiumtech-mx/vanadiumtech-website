// app/desarrollo-software/page.tsx
'use client'

import { motion } from 'framer-motion'
import Link from 'next/link'
import Header from '@/app/components/Header/Header'
import Footer from '@/app/components/Footer/Footer'
import styles from './page.module.scss'

export default function DesarrolloSoftwarePage() {
  const services = [
    {
      title: 'Aplicaciones Web Empresariales',
      description: 'Plataformas web escalables con arquitectura moderna y alto rendimiento.',
      features: [
        'SPA y PWA',
        'Dashboards interactivos',
        'Sistemas de gestión empresarial',
        'Portales de autoservicio'
      ],
      technologies: ['React', 'Next.js', 'Vue.js', 'Angular']
    },
    {
      title: 'Aplicaciones Móviles',
      description: 'Apps nativas y multiplataforma para iOS y Android.',
      features: [
        'Apps nativas',
        'Cross-platform',
        'Offline-first',
        'Push notifications'
      ],
      technologies: ['React Native', 'Flutter', 'Swift', 'Kotlin']
    },
    {
      title: 'APIs y Microservicios',
      description: 'Arquitectura de servicios escalable y segura.',
      features: [
        'REST APIs',
        'GraphQL',
        'gRPC',
        'API Gateway'
      ],
      technologies: ['Node.js', 'Python', 'Java', 'Go']
    },
    {
      title: 'Plataformas de Datos',
      description: 'Soluciones para procesamiento y análisis de datos.',
      features: [
        'Data Lakes',
        'Data Warehouses',
        'Real-time analytics',
        'Machine Learning'
      ],
      technologies: ['Python', 'Spark', 'Kafka', 'TensorFlow']
    },
    {
      title: 'DevOps y Cloud Native',
      description: 'Automatización y optimización del ciclo de vida del software.',
      features: [
        'CI/CD pipelines',
        'Containerización',
        'Orquestación',
        'Infraestructura como código'
      ],
      technologies: ['Docker', 'Kubernetes', 'GitHub Actions', 'Terraform']
    },
    {
      title: 'Modernización de Legacy',
      description: 'Transformación de sistemas heredados a arquitecturas modernas.',
      features: [
        'Re-platforming',
        'Re-architecting',
        'Migración a cloud',
        'API wrapping'
      ],
      technologies: ['.NET', 'Java EE', 'COBOL', 'Mainframe']
    }
  ]

  const methodologies = [
    {
      name: 'Scrum',
      description: 'Entregas iterativas con sprints de 2 semanas',
      icon: '🔄'
    },
    {
      name: 'Kanban',
      description: 'Flujo continuo con priorización dinámica',
      icon: '📊'
    },
    {
      name: 'DevOps',
      description: 'Integración y despliegue continuo',
      icon: '⚙️'
    },
    {
      name: 'TDD',
      description: 'Desarrollo guiado por pruebas',
      icon: '🧪'
    }
  ]

  const industries = [
    'Financiero', 'Gubernamental', 'Salud', 'Educación',
    'Manufactura', 'Retail', 'Logística', 'Energía'
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
              <span className={styles.badge}>Desarrollo a Medida</span>
              <h1>Desarrollo de <span className="accent-text">Software</span></h1>
              <p>
                Creamos soluciones de software personalizadas con arquitecturas modernas, 
                escalables y seguras que impulsan la transformación digital de tu organización.
              </p>
              <div className={styles.heroStats}>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>100+</span>
                  <span className={styles.statLabel}>Proyectos entregados</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>2 semanas</span>
                  <span className={styles.statLabel}>Sprints ágiles</span>
                </div>
                <div className={styles.stat}>
                  <span className={styles.statNumber}>24/7</span>
                  <span className={styles.statLabel}>Soporte continuo</span>
                </div>
              </div>
              <div className={styles.heroButtons}>
                <Link href="/contacto" className="btn btn-primary">
                  Solicitar Propuesta
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
              <h2>Servicios de <span className="accent-text">Desarrollo</span></h2>
              <p>Soluciones end-to-end para tus necesidades de software</p>
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
                  <div className={styles.features}>
                    {service.features.map((feature) => (
                      <span key={feature} className={styles.featureTag}>
                        {feature}
                      </span>
                    ))}
                  </div>
                  <div className={styles.techStack}>
                    {service.technologies.map((tech) => (
                      <span key={tech} className={styles.techTag}>
                        {tech}
                      </span>
                    ))}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Metodologías */}
        <section className={styles.methodologies}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Metodologías <span className="accent-text">Ágiles</span></h2>
              <p>Entregas rápidas con calidad garantizada</p>
            </motion.div>

            <div className={styles.methodologiesGrid}>
              {methodologies.map((method, index) => (
                <motion.div
                  key={method.name}
                  initial={{ opacity: 0, scale: 0.95 }}
                  whileInView={{ opacity: 1, scale: 1 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                  className={styles.methodCard}
                >
                  <div className={styles.methodIcon}>{method.icon}</div>
                  <h3>{method.name}</h3>
                  <p>{method.description}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Stack Tecnológico */}
        <section className={styles.techStack}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.sectionHeader}
            >
              <h2>Stack <span className="accent-text">Tecnológico</span></h2>
              <p>Tecnologías líderes que utilizamos en cada proyecto</p>
            </motion.div>

            <div className={styles.techCategories}>
              <div className={styles.techCategory}>
                <h3>Frontend</h3>
                <div className={styles.techList}>
                  {['React', 'Next.js', 'Vue.js', 'Angular', 'TypeScript', 'Tailwind'].map(tech => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.techCategory}>
                <h3>Backend</h3>
                <div className={styles.techList}>
                  {['Node.js', 'Python', 'Java', 'Go', '.NET', 'PHP'].map(tech => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.techCategory}>
                <h3>Bases de Datos</h3>
                <div className={styles.techList}>
                  {['PostgreSQL', 'MongoDB', 'MySQL', 'Redis', 'Elasticsearch', 'Cassandra'].map(tech => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
              <div className={styles.techCategory}>
                <h3>Cloud & DevOps</h3>
                <div className={styles.techList}>
                  {['AWS', 'Azure', 'GCP', 'Docker', 'Kubernetes', 'Terraform'].map(tech => (
                    <span key={tech} className={styles.techBadge}>{tech}</span>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Industrias */}
        <section className={styles.industries}>
          <div className="container">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
              viewport={{ once: true }}
              className={styles.industriesWrapper}
            >
              <div className={styles.industriesContent}>
                <h2>Industrias que <span className="accent-text">transformamos</span></h2>
                <p>Nuestro software impulsa la innovación en múltiples sectores</p>
              </div>
              <div className={styles.industriesGrid}>
                {industries.map((industry, index) => (
                  <motion.div
                    key={industry}
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: index * 0.05 }}
                    viewport={{ once: true }}
                    className={styles.industryItem}
                  >
                    {industry}
                  </motion.div>
                ))}
              </div>
            </motion.div>
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
              <h2>¿Tienes una idea que quieres desarrollar?</h2>
              <p>
                Cuéntanos tu proyecto y te ayudaremos a convertirlo en realidad 
                con la mejor tecnología y metodologías ágiles.
              </p>
              <Link href="/contacto" className="btn btn-primary">
                Comenzar Proyecto
              </Link>
            </motion.div>
          </div>
        </section>
      </main>
      <Footer />
    </>
  )
}