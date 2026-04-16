// app/components/WorkProcess/WorkProcess.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './WorkProcess.module.scss'

export default function WorkProcess() {
  const steps = [
    {
      number: '01',
      title: 'Análisis y Consultoría',
      description: 'Evaluación profunda de necesidades, infraestructura existente y objetivos del proyecto.',
      duration: '1-2 semanas'
    },
    {
      number: '02',
      title: 'Diseño de Solución',
      description: 'Arquitectura técnica detallada, selección de tecnologías y definición de roadmap.',
      duration: '2-3 semanas'
    },
    {
      number: '03',
      title: 'Implementación',
      description: 'Ejecución del proyecto con metodologías ágiles y estándares de calidad.',
      duration: 'Variable'
    },
    {
      number: '04',
      title: 'Pruebas y Validación',
      description: 'Pruebas de rendimiento, seguridad y validación de requisitos.',
      duration: '1-2 semanas'
    },
    {
      number: '05',
      title: 'Puesta en Marcha',
      description: 'Despliegue en producción, transferencia de conocimiento y documentación.',
      duration: '1 semana'
    },
    {
      number: '06',
      title: 'Soporte y Evolución',
      description: 'Mantenimiento continuo, optimización y mejora constante.',
      duration: 'Continuo'
    }
  ]

  return (
    <section className={styles.process}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>Metodología</span>
          <h2>Proceso de <span className="accent-text">Trabajo</span></h2>
          <p>Un enfoque estructurado para garantizar el éxito de cada proyecto</p>
        </motion.div>

        <div className={styles.timeline}>
          {steps.map((step, index) => (
            <motion.div
              key={step.number}
              initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.6, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.step}
            >
              <div className={styles.stepNumber}>{step.number}</div>
              <div className={styles.stepContent}>
                <h3>{step.title}</h3>
                <p>{step.description}</p>
                <span className={styles.duration}>{step.duration}</span>
              </div>
              {index < steps.length - 1 && <div className={styles.connector}></div>}
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}