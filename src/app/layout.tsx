import type { Metadata } from 'next'
import { headers } from 'next/headers'
import 'material-icons/iconfont/material-icons.css'
import './globals.css'

import PageTransition from './components/PageTransition'
import SmoothScroll from './components/SmoothScroll'

export const metadata: Metadata = {
  title: 'Afjal Khan - Product Designer',
  description: 'UI/UX Designer Portfolio',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  await headers()

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content" />
        <link
          href="https://fonts.googleapis.com/css2?family=Space+Grotesk:wght@300..700&family=Syne:wght@400..800&display=swap"
          rel="stylesheet"
        />
        <link
          href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
          rel="stylesheet"
          integrity="sha384-/TTSVk38uhksabZVAaSPKQxYbB7S74y4LWusspQ6MX0Q2rDcuPeyKRRLZEDnITW0"
          crossOrigin="anonymous"
        />
      </head>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-white">
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
