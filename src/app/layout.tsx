import type { Metadata } from 'next'
import { Inter, Syne } from 'next/font/google'
import './globals.css'

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-inter',
  display: 'swap',
})

const syne = Syne({
  subsets: ['latin'],
  variable: '--font-syne',
  display: 'swap',
  weight: ['400', '500', '600', '700', '800'],
})

export const metadata: Metadata = {
  title: 'Afjal Khan - Portfolio',
  description: 'UI/UX Designer Portfolio',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" className={`${inter.variable} ${syne.variable} scroll-smooth`} suppressHydrationWarning>
      <head>
        <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body className="bg-background text-foreground font-sans antialiased selection:bg-primary selection:text-white">
        {children}
      </body>
    </html>
  )
}