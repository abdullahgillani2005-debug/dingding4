import type { Metadata } from 'next'
import { Inter } from 'next/font/google'
import './globals.css'
import { Providers } from '@/components/providers'
import { Header } from '@/components/layout/header'
import { Footer } from '@/components/layout/footer'
import { CartSidebar } from '@/components/cart/cart-sidebar'
import { Toaster } from '@/components/ui/toaster'

const inter = Inter({ subsets: ['latin'] })

export const metadata: Metadata = {
  title: 'DingDing E-commerce - Premium Online Shopping',
  description: 'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.',
  keywords: 'ecommerce, online shopping, fashion, electronics, home, beauty',
  authors: [{ name: 'DingDing Team' }],
  creator: 'DingDing',
  publisher: 'DingDing',
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  metadataBase: new URL(process.env.NEXTAUTH_URL || 'http://localhost:3000'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    url: '/',
    title: 'DingDing E-commerce - Premium Online Shopping',
    description: 'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.',
    siteName: 'DingDing E-commerce',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'DingDing E-commerce - Premium Online Shopping',
    description: 'Discover amazing products at unbeatable prices. Fast shipping, secure payments, and exceptional customer service.',
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-video-preview': -1,
      'max-image-preview': 'large',
      'max-snippet': -1,
    },
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <Providers>
          <div className="flex min-h-screen flex-col">
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </div>
          <CartSidebar />
          <Toaster />
        </Providers>
      </body>
    </html>
  )
}
