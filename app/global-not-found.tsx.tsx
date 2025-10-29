import './globals.css'
import { Inter } from 'next/font/google'
import type { Metadata } from 'next'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: '404 - Page Not Found',
  description: 'The page you are looking for does not exist.',
}

export default function GlobalNotFound() {
  return (
    <html lang="en" className={inter.className}>
      <body className="flex flex-col items-center justify-center min-h-screen bg-gray-950 text-white">
        <h1 className="text-5xl font-bold mb-4">404 - Page Not Found</h1>
        <p className="text-gray-400">The page you are looking for does not exist.</p>
      </body>
    </html>
  )
}
