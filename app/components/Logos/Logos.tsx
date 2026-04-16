'use client'

import Image from 'next/image'
import { motion } from 'framer-motion'
import styles from './Logos.module.scss'

const technologies = [
  { name: 'Cisco', src: '/logos/Cisco.png' },
  { name: 'Next.js', src: '/logos/Nextjs.svg' },
  { name: 'AWS', src: '/logos/AWS.png' },
  { name: 'Huawei', src: '/logos/h.png' },
  { name: 'VMware', src: '/logos/vmware.png' },
  { name: 'Dell', src: '/logos/Dell.png' },
]

export default function Logos() {
  return (
    <section className={styles.logos}>
      <div className="container">
        <motion.div
          className={styles.content}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
        >
          <p className={styles.subtitle}>
            Tecnologías líderes que impulsan nuestras soluciones
          </p>

          <div className={styles.marquee}>
            <div className={styles.track}>
              {[...technologies, ...technologies].map((tech, index) => (
                <motion.div
                  key={`${tech.name}-${index}`}
                  className={styles.logoItem}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6, delay: index * 0.05 }}
                  viewport={{ once: true }}
                >
                  <div className={styles.logoWrapper}>
                    <Image
                      src={tech.src}
                      alt={tech.name}
                      width={120}
                      height={60}
                      className={styles.logo}
                    />
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}