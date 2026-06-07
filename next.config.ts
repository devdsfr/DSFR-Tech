import type { NextConfig } from 'next'

const nextConfig: NextConfig = {
  pageExtensions: ['tsx', 'ts', 'jsx', 'js'],
  experimental: {
    appDir: true,
  },
}

export default nextConfig
