'use client'

import { useState, useEffect } from 'react'
import Link from 'next/link'
import Image from 'next/image'
import { motion, AnimatePresence } from 'framer-motion'
import styles from './Header.module.scss'

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [isServicesOpen, setIsServicesOpen] = useState(false)
  const [isMobileServicesOpen, setIsMobileServicesOpen] = useState(false) // Estado independiente para móvil

  // Detectar scroll para cambiar estilo del header
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20)
    }
    window.addEventListener('scroll', handleScroll)
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Cerrar menú móvil al cambiar el tamaño de la ventana (útil para responsive)
  useEffect(() => {
    const handleResize = () => {
      if (window.innerWidth > 1024) {
        setIsMobileMenuOpen(false)
        setIsMobileServicesOpen(false)
      }
    }
    window.addEventListener('resize', handleResize)
    return () => window.removeEventListener('resize', handleResize)
  }, [])

  const navItems = [
    { href: '/', label: 'Inicio' },
    { href: '/gobierno', label: 'Gobierno' },
    { href: '/servicios', label: 'Servicios' },
    // 'Soluciones' se manejará como el dropdown de servicios
  ]

  // Lista completa de servicios/subpáginas
  const servicesItems = [
    { href: '/infraestructura-redes', label: 'Infraestructura y Redes' },
    { href: '/telecomunicaciones', label: 'Telecomunicaciones' },
    { href: '/desarrollo-software', label: 'Desarrollo de Software' },
    { href: '/integracion-sistemas', label: 'Integración de Sistemas' },
    { href: '/centros-de-datos', label: 'Centros de Datos' },
    { href: '/ciberseguridad', label: 'Ciberseguridad' },
  ]

  return (
    <header className={`${styles.header} ${isScrolled ? styles.scrolled : ''}`}>
      <div className={styles.wrapper}>
        <nav className={styles.nav}>

          {/* LOGO */}
          <Link href="/" className={styles.logo} aria-label="Vanadium Tech - Inicio">
            <Image 
              src="/vt-logo-black.png" 
              alt="Vanadium Tech" 
              width={180} 
              height={40}
              priority
              style={{ width: 'auto', height: 'auto' }}
            />
          </Link>

          {/* DESKTOP NAVIGATION */}
          <div className={styles.desktopNav}>
            {/* Enlaces principales */}
            {navItems.map((item) => (
              <Link key={item.href} href={item.href} className={styles.navLink}>
                {item.label}
              </Link>
            ))}

            {/* DROPDOWN SERVICIOS (Desktop) */}
            <div 
              className={styles.dropdown}
              onMouseEnter={() => setIsServicesOpen(true)}
              onMouseLeave={() => setIsServicesOpen(false)}
            >
              <button 
                className={styles.navLink}
                aria-expanded={isServicesOpen}
                aria-haspopup="true"
              >
                Soluciones
                <span className={`${styles.arrow} ${isServicesOpen ? styles.rotate : ''}`}>
                  ▼
                </span>
              </button>

              <AnimatePresence>
                {isServicesOpen && (
                  <motion.div
                    className={styles.dropdownMenu}
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    transition={{ duration: 0.2 }}
                  >
                    {servicesItems.map((item) => (
                      <Link 
                        key={item.href} 
                        href={item.href} 
                        className={styles.dropdownItem}
                      >
                        {item.label}
                      </Link>
                    ))}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            <Link href="/contacto" className={styles.cta}>
              Contacto
            </Link>
          </div>

          {/* MOBILE MENU BUTTON */}
          <button 
            className={`${styles.mobileBtn} ${isMobileMenuOpen ? styles.open : ''}`}
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            aria-label="Menú principal"
            aria-expanded={isMobileMenuOpen}
          >
            <span />
            <span />
            <span />
          </button>
        </nav>
      </div>

      {/* MOBILE MENU (Fullscreen) */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <motion.div
            className={styles.mobileMenu}
            initial={{ x: '100%' }}
            animate={{ x: 0 }}
            exit={{ x: '100%' }}
            transition={{ type: 'tween', duration: 0.3 }}
          >
            <div className={styles.mobileNavContainer}>
              <button 
                className={styles.closeMobileMenu}
                onClick={() => setIsMobileMenuOpen(false)}
                aria-label="Cerrar menú"
              >
                ✕
              </button>

              <div className={styles.mobileNav}>
                {/* Enlaces principales */}
                {navItems.map((item) => (
                  <Link 
                    key={item.href}
                    href={item.href}
                    onClick={() => setIsMobileMenuOpen(false)}
                    className={styles.mobileNavLink}
                  >
                    {item.label}
                  </Link>
                ))}

                {/* SERVICIOS MOBILE con toggle independiente */}
                <div className={styles.mobileDropdown}>
                  <button 
                    onClick={() => setIsMobileServicesOpen(!isMobileServicesOpen)}
                    className={styles.mobileDropdownButton}
                    aria-expanded={isMobileServicesOpen}
                  >
                    Soluciones
                    <span className={`${styles.mobileArrow} ${isMobileServicesOpen ? styles.rotate : ''}`}>
                      ▼
                    </span>
                  </button>

                  <AnimatePresence>
                    {isMobileServicesOpen && (
                      <motion.div 
                        className={styles.mobileSubmenu}
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                      >
                        {servicesItems.map((item) => (
                          <Link 
                            key={item.href}
                            href={item.href}
                            className={styles.mobileSubmenuLink}
                            onClick={() => {
                              setIsMobileMenuOpen(false)
                              setIsMobileServicesOpen(false)
                            }}
                          >
                            {item.label}
                          </Link>
                        ))}
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>

                <Link 
                  href="/contacto" 
                  className={styles.mobileCta}
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Contacto
                </Link>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </header>
  )
}