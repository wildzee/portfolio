import type { Metadata } from 'next'
import './globals.css'

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
    <html lang="en" suppressHydrationWarning>
      <head>
        <link href='https://cdn.jsdelivr.net/npm/boxicons@2.0.5/css/boxicons.min.css' rel='stylesheet' />
      </head>
      <body>{children}</body>
    </html>
  )
}