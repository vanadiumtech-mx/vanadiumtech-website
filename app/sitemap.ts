// app/sitemap.ts (versión mejorada)
import { MetadataRoute } from 'next'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://vanadiumtech.com.mx'
  const currentDate = new Date()
  
  // Definir todas las rutas con sus metadatos
  const routes = [
    {
      route: '',
      changefreq: 'weekly' as const,
      priority: 1.0,
      lastmod: currentDate,
    },
    {
      route: 'gobierno',
      changefreq: 'weekly' as const,
      priority: 0.9,
      lastmod: currentDate,
    },
    {
      route: 'contacto',
      changefreq: 'monthly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      route: 'servicios',
      changefreq: 'weekly' as const,
      priority: 0.9,
      lastmod: currentDate,
    },
    {
      route: 'infraestructura-redes',
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      route: 'telecomunicaciones',
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      route: 'desarrollo-software',
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      route: 'integracion-sistemas',
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      route: 'centros-de-datos',
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
    {
      route: 'ciberseguridad',
      changefreq: 'weekly' as const,
      priority: 0.8,
      lastmod: currentDate,
    },
  ]
  
  // Generar sitemap
  return routes.map(({ route, changefreq, priority, lastmod }) => ({
    url: `${baseUrl}/${route}`,
    lastModified: lastmod,
    changeFrequency: changefreq,
    priority: priority,
    alternates: {
      languages: {
        es: `${baseUrl}/${route}`,
      },
    },
  }))
}