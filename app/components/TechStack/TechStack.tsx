// app/components/TechStack/TechStack.tsx
'use client'

import { motion } from 'framer-motion'
import styles from './TechStack.module.scss'

export default function TechStack() {
  const stacks = [
    {
      category: 'Networking',
      technologies: ['Cisco', 'Juniper', 'Fortinet', 'Aruba', 'Palo Alto', 'F5']
    },
    {
      category: 'Cloud & Virtualization',
      technologies: ['AWS', 'Azure', 'VMware', 'OpenStack', 'Kubernetes', 'Docker']
    },
    {
      category: 'Development',
      technologies: ['Node.js', 'Python', 'Java', '.NET', 'React', 'Angular']
    },
    {
      category: 'Security',
      technologies: ['CrowdStrike', 'SentinelOne', 'Splunk', 'Okta', 'Zscaler', 'Proofpoint']
    },
    {
      category: 'Databases',
      technologies: ['Oracle', 'SQL Server', 'PostgreSQL', 'MongoDB', 'Redis', 'Elasticsearch']
    },
    {
      category: 'Monitoring & Analytics',
      technologies: ['Datadog', 'New Relic', 'Prometheus', 'Grafana', 'ELK Stack', 'Splunk']
    }
  ]

  return (
    <section className={styles.techStack}>
      <div className="container">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          viewport={{ once: true }}
          className={styles.header}
        >
          <span className={styles.badge}>Tecnologías</span>
          <h2>Stack <span className="accent-text">Tecnológico</span></h2>
          <p>Las mejores tecnologías del mercado para cada solución</p>
        </motion.div>

        <div className={styles.grid}>
          {stacks.map((stack, index) => (
            <motion.div
              key={stack.category}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
              viewport={{ once: true }}
              className={styles.stackCard}
            >
              <h3>{stack.category}</h3>
              <div className={styles.techList}>
                {stack.technologies.map((tech) => (
                  <span key={tech} className={styles.techItem}>
                    {tech}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}