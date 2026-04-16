// app/components/Government/Government.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './Government.module.scss'

export default function Government() {
  const contractTypes = [
    {
      title: 'Licitaciones Públicas',
      description: 'Participación en procesos de licitación nacional e internacional',
      requirements: ['Documentación legal completa', 'Experiencia comprobable', 'Certificaciones técnicas']
    },
    {
      title: 'Adjudicación Directa',
      description: 'Contrataciones simplificadas para necesidades específicas',
      requirements: ['Presupuesto autorizado', 'Especificaciones técnicas', 'Cotización formal']
    }
  ]

  const solutions = [
    'Plataformas Gubernamentales Digitales',
    'Centros de Datos para Gobierno',
    'Redes de Comunicación Seguras',
    'Ciberseguridad Institucional',
    'Sistemas de Gestión Documental',
    'Infraestructura Tecnológica Crítica'
  ]

  return (
    <section className={styles.government}>
      <div className="container">
        <div className={styles.grid}>
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={styles.content}
          >
            <span className={styles.badge}>Sector Público</span>
            <h2>Soluciones para <span className="accent-text">Gobierno</span></h2>
            <p className={styles.description}>
              Especialistas en proyectos gubernamentales de gran escala. 
              Contamos con la experiencia y certificaciones necesarias para 
              participar en licitaciones públicas y adjudicaciones directas.
            </p>
            
            <div className={styles.contractTypes}>
              <h3>Modalidades de Contratación</h3>
              <div className={styles.contractGrid}>
                {contractTypes.map((type) => (
                  <div key={type.title} className={styles.contractCard}>
                    <h4>{type.title}</h4>
                    <p>{type.description}</p>
                    <ul>
                      {type.requirements.map((req) => (
                        <li key={req}>{req}</li>
                      ))}
                    </ul>
                  </div>
                ))}
              </div>
            </div>
          </motion.div>

          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className={styles.solutions}
          >
            <h3>Soluciones Gubernamentales</h3>
            <ul className={styles.solutionsList}>
              {solutions.map((solution, index) => (
                <motion.li
                  key={solution}
                  initial={{ opacity: 0, x: 20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  viewport={{ once: true }}
                >
                  <span className={styles.checkmark}>✓</span>
                  {solution}
                </motion.li>
              ))}
            </ul>
            
            <div className={styles.documents}>
              <h4>Documentación Legal Disponible</h4>
              <div className={styles.docList}>
                <span>Acta Constitutiva</span>
                <span>RFC</span>
                <span>Opiniones de Cumplimiento</span>
                <span>Certificaciones ISO</span>
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  )
}