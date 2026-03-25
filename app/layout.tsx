// app/layout.tsx
import type { Metadata, Viewport } from 'next'
import { Inter, Sora } from 'next/font/google'
import './globals.scss'

// Optimización de fuentes para mejor rendimiento y SEO
const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-inter',
})

const sora = Sora({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-sora',
})

// Configuración de viewport para responsive
export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  userScalable: true,
  themeColor: [
    { media: '(prefers-color-scheme: light)', color: '#0A2540' },
    { media: '(prefers-color-scheme: dark)', color: '#0A2540' },
  ],
}

// Metadatos optimizados para SEO
export const metadata: Metadata = {
  metadataBase: new URL('https://vanadiumtech.com.mx'),
  title: {
    default: 'Vanadium Tech - Infraestructura Tecnológica Crítica',
    template: '%s | Vanadium Tech',
  },
  description: 'Somos líderes en infraestructura tecnológica crítica, especializados en soluciones para gobierno y empresas. Redes, telecomunicaciones, centros de datos y ciberseguridad.',
  keywords: 'infraestructura tecnológica, redes, telecomunicaciones, centros de datos, ciberseguridad, gobierno, licitaciones, desarrollo software, integración sistemas, Vanadium Tech',
  authors: [{ name: 'Vanadium Tech', url: 'https://vanadiumtech.com.mx' }],
  creator: 'Vanadium Tech',
  publisher: 'Vanadium Tech',
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
  alternates: {
    canonical: 'https://vanadiumtech.com.mx',
    languages: {
      'es-MX': 'https://vanadiumtech.com.mx',
    },
  },
  openGraph: {
    title: 'Vanadium Tech - Infraestructura Tecnológica Crítica',
    description: 'Soluciones tecnológicas de alto rendimiento para gobierno y empresas. Especialistas en redes, telecomunicaciones, ciberseguridad y centros de datos.',
    url: 'https://vanadiumtech.com.mx',
    siteName: 'Vanadium Tech',
    locale: 'es_MX',
    type: 'website',
    images: [
      {
        url: '/icon-vt.png',
        width: 1200,
        height: 630,
        alt: 'Vanadium Tech - Infraestructura Tecnológica Crítica',
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Vanadium Tech - Infraestructura Tecnológica Crítica',
    description: 'Soluciones tecnológicas de alto rendimiento para gobierno y empresas',
    images: ['icon-vt.png'],
    creator: '@vanadiumtech',
    site: '@vanadiumtech',
  },
  icons: {
    icon: [
      { url: '/ficon-vt.png', sizes: 'any' },
      { url: '/icon-vt.png', type: 'image/png', sizes: '32x32' },
      { url: '/icon-vt.png', type: 'image/png', sizes: '192x192' },
    ],
    apple: [
      { url: '/icon-vt.png', sizes: '180x180', type: 'image/png' },
    ],
    shortcut: ['/icon-vt.png'],
  },
  manifest: '/manifest.json',
  verification: {
    google: 'tu-codigo-de-verificacion-google', // Reemplaza con tu código de Google Search Console
    // other: {
    //   'facebook-domain-verification': 'tu-codigo-facebook',
    // },
  },
  category: 'technology',
  classification: 'Tecnología, Infraestructura IT, Servicios Tecnológicos',
  applicationName: 'Vanadium Tech',
  appleWebApp: {
    capable: true,
    title: 'Vanadium Tech',
    statusBarStyle: 'black-translucent',
  },
  formatDetection: {
    telephone: true,
    email: true,
    address: true,
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // IDs de Google Tag Manager y Google Analytics
  const GTM_ID = 'GTM-NCC2SCH8'
  const GA_ID = 'G-DE4VR93WZY'

  return (
    <html lang="es" className={`${inter.variable} ${sora.variable}`}>
      <head>
        {/* Google Tag Manager - Script en head */}
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function(w,d,s,l,i){w[l]=w[l]||[];w[l].push({'gtm.start':
              new Date().getTime(),event:'gtm.js'});var f=d.getElementsByTagName(s)[0],
              j=d.createElement(s),dl=l!='dataLayer'?'&l='+l:'';j.async=true;j.src=
              'https://www.googletagmanager.com/gtm.js?id='+i+dl;f.parentNode.insertBefore(j,f);
              })(window,document,'script','dataLayer','${GTM_ID}');
            `,
          }}
        />
        
        {/* Google Analytics (gtag.js) - Código recomendado por Google */}
        <script
          async
          src={`https://www.googletagmanager.com/gtag/js?id=${GA_ID}`}
        />
        <script
          dangerouslySetInnerHTML={{
            __html: `
              window.dataLayer = window.dataLayer || [];
              function gtag(){dataLayer.push(arguments);}
              gtag('js', new Date());
              gtag('config', '${GA_ID}', {
                page_path: window.location.pathname,
                send_page_view: true
              });
            `,
          }}
        />
        
        {/* Preconexión a dominios externos para mejorar rendimiento */}
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link rel="preconnect" href="https://www.googletagmanager.com" />
        <link rel="preconnect" href="https://www.google-analytics.com" />
        
        {/* Meta tags adicionales para SEO */}
        <meta name="geo.region" content="MX-DIF" />
        <meta name="geo.placename" content="Ciudad de México" />
        <meta name="geo.position" content="19.432608;-99.133209" />
        <meta name="ICBM" content="19.432608, -99.133209" />
        <meta name="revisit-after" content="7 days" />
        <meta name="language" content="Spanish" />
        <meta name="distribution" content="global" />
        <meta name="rating" content="general" />
        
        {/* Dublin Core metadata */}
        <meta name="DC.title" content="Vanadium Tech - Infraestructura Tecnológica Crítica" />
        <meta name="DC.creator" content="Vanadium Tech" />
        <meta name="DC.subject" content="Infraestructura tecnológica, redes, telecomunicaciones, ciberseguridad" />
        <meta name="DC.description" content="Soluciones tecnológicas de alto rendimiento para gobierno y empresas" />
        <meta name="DC.language" content="es" />
        
        {/* Schema.org markup para Google Rich Results */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Organization",
              "name": "Vanadium Tech",
              "url": "https://vanadiumtech.com.mx",
              "logo": "https://vanadiumtech.com.mx/icon-vt.png",
              "sameAs": [
                "https://www.linkedin.com/company/vanadium-tech",
                "https://twitter.com/vanadiumtech",
              ],
              "address": {
                "@type": "PostalAddress",
                "addressLocality": "Ciudad de México",
                "addressCountry": "México"
              },
              "contactPoint": {
                "@type": "ContactPoint",
                "telephone": "+52-55-1234-5678",
                "contactType": "customer service",
                "availableLanguage": ["Spanish", "English"]
              },
              "description": "Somos líderes en infraestructura tecnológica crítica, especializados en soluciones para gobierno y empresas.",
              "areaServed": "México",
              "hasOfferCatalog": {
                "@type": "OfferCatalog",
                "name": "Servicios Tecnológicos",
                "itemListElement": [
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Infraestructura en Redes"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Telecomunicaciones"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Desarrollo de Software"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Integración de Sistemas"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Centros de Datos"
                    }
                  },
                  {
                    "@type": "Offer",
                    "itemOffered": {
                      "@type": "Service",
                      "name": "Ciberseguridad"
                    }
                  }
                ]
              }
            })
          }}
        />
        
        {/* BreadcrumbList Schema para mejor navegación */}
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "BreadcrumbList",
              "itemListElement": [
                {
                  "@type": "ListItem",
                  "position": 1,
                  "name": "Inicio",
                  "item": "https://vanadiumtech.com.mx"
                }
              ]
            })
          }}
        />
      </head>
      <body>
        {/* Google Tag Manager (noscript) - Justo después de la etiqueta de apertura <body> */}
        <noscript>
          <iframe 
            src={`https://www.googletagmanager.com/ns.html?id=${GTM_ID}`}
            height="0" 
            width="0" 
            style={{ display: 'none', visibility: 'hidden' }}
          />
        </noscript>
        
        {children}
      </body>
    </html>
  )
}