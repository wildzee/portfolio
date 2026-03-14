import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // Security Fix: Remove the 'x-powered-by: Next.js' header
  poweredByHeader: false,

  images: {
    remotePatterns: [
      {
        protocol: 'https',
        hostname: 'localhost',
      },
    ],
    formats: ['image/webp', 'image/avif'],
  },

  async headers() {
    return [
      {
        source: '/(.*)',
        headers: [
          // Anti-Clickjacking
          { key: 'X-Frame-Options', value: 'DENY' },
          // Prevent MIME-sniffing
          { key: 'X-Content-Type-Options', value: 'nosniff' },
          // Reflected XSS protection (Legacy)
          { key: 'X-XSS-Protection', value: '1; mode=block' },
          // Restrict Referrer leaks
          { key: 'Referrer-Policy', value: 'strict-origin-when-cross-origin' },
          // Disable device API access (Camera, Mic, GPS)
          { key: 'Permissions-Policy', value: 'camera=(), microphone=(), geolocation=()' },
          // Strict Transport Security (HSTS)
          { key: 'Strict-Transport-Security', value: 'max-age=63072000; includeSubDomains; preload' },
          // DNS Prefetch Control
          { key: 'X-DNS-Prefetch-Control', value: 'off' },
          // Cross-Origin Isolation Headers
          { key: 'Cross-Origin-Opener-Policy', value: 'same-origin' },
          { key: 'Cross-Origin-Embedder-Policy', value: 'require-corp' },
          { key: 'Cross-Origin-Resource-Policy', value: 'same-origin' }
        ]
      }
    ]
  }
};

export default nextConfig;