// next.config.js
/** @type {import('next').NextConfig} */
const nextConfig = {
  images: {
    domains: ['images.unsplash.com', 'cdn.sanity.io'],
  },
  experimental: {
    serverActions: {
      allowedOrigins: ['vanadiumtech.com.mx', 'localhost:3000'],
    },
  },
  // Configuración para SCSS modules
  sassOptions: {
    includePaths: ['./app'],
  },
}

module.exports = nextConfig