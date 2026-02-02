import type { Metadata } from 'next'
import './globals.css'

export const metadata: Metadata = {
  title: 'Design Investment Calculator',
  description: 'Calculate your design and development investment with projected ROI',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  )
}
