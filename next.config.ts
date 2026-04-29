import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  // Cloudflare Pages via @cloudflare/next-on-pages
  // Build with: npx @cloudflare/next-on-pages
  output: 'standalone',
  images: {
    // Cloudflare Images or unoptimized for Cloudflare Pages
    unoptimized: true,
  },
  experimental: {
    // Turbopack is default in Next.js 16 dev mode
  },
}

export default nextConfig
