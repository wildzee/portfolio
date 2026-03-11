import type { Metadata } from 'next'
import { headers } from 'next/headers'
import 'material-icons/iconfont/material-icons.css'
import './globals.css'

import PageTransition from './components/PageTransition'

export const metadata: Metadata = {
  title: 'Afjal Khan - Product Designer',
  description: 'UI/UX Designer Portfolio',
}

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  // Retrieve the generated nonce securely passed down from middleware.ts
  const headersList = await headers()
  const nonce = headersList.get('x-nonce') || undefined

  return (
    <html lang="en" className="scroll-smooth" suppressHydrationWarning>
      <head>
        {/* Google Fonts dynamically generates stylesheets unique per request based on user agent (e.g. woff vs woff2).
            Because the file content changes dynamically, Google Fonts API cannot support static SRI hashes.
            Instead, we authorize them explicitly via the 'fonts.googleapis.com' CSP domain directive. */}
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
        <PageTransition>{children}</PageTransition>
      </body>
    </html>
  )
}