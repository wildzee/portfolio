import type { Metadata } from 'next'
import { headers } from 'next/headers'
import { Space_Grotesk, Syne } from 'next/font/google'
import 'material-icons/iconfont/material-icons.css'
import './globals.css'

import PageTransition from './components/PageTransition'
import SmoothScroll from './components/SmoothScroll'

const spaceGrotesk = Space_Grotesk({
  subsets: ['latin'],
  weight: ['300', '400', '500', '600', '700'],
  variable: '--font-space-grotesk',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700', '800'],
  variable: '--font-syne',
  display: 'swap',
})

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
        {/* Apply theme before paint so server-rendered content shows with the
            correct colors and there's no flash of the wrong theme. */}
        <script
          dangerouslySetInnerHTML={{
            __html: `(function(){try{var t=localStorage.getItem('theme');var d=t?t==='dark':true;document.documentElement.classList.toggle('dark',d);}catch(e){document.documentElement.classList.add('dark');}})();`,
          }}
        />
        <meta name="viewport" content="width=device-width, initial-scale=1, interactive-widget=resizes-content" />
        <link
          href="https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css"
          rel="stylesheet"
          integrity="sha384-/TTSVk38uhksabZVAaSPKQxYbB7S74y4LWusspQ6MX0Q2rDcuPeyKRRLZEDnITW0"
          crossOrigin="anonymous"
        />
      </head>
      <body className={`${spaceGrotesk.variable} ${syne.variable} bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-white`}>
        <SmoothScroll>
          <PageTransition>{children}</PageTransition>
        </SmoothScroll>
      </body>
    </html>
  )
}
