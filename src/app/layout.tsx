import type { Metadata } from 'next'
import { Montserrat } from 'next/font/google'

import { cn } from '@/lib/utils'

import { Toaster } from 'sonner'
import './globals.css'

const font = Montserrat({
  subsets: ['latin'],
})

export const metadata: Metadata = {
  title: 'Support management',
  description: 'Control and management supports for your entrepise',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={cn('min-h-screen antialiased sm:p-3', font.className)}>
        {children}
        <Toaster />
      </body>
    </html>
  )
}
