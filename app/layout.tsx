import type { Metadata } from 'next'
import './globals.css'
import { CurrencyProvider } from './lib/context/currency-context'

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
      <body>
        <CurrencyProvider>{children}</CurrencyProvider>
      </body>
    </html>
  )
}
