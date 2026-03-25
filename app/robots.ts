// app/robots.ts
import { MetadataRoute } from 'next'

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/api/',           // No indexar API routes
        '/admin/',         // Si tienes panel admin
        '/_next/',         // Archivos internos de Next.js
        '/static/',        // Archivos estáticos internos
      ],
    },
    sitemap: 'https://vanadiumtech.com.mx/sitemap.xml',
    host: 'https://vanadiumtech.com.mx',
  }
}