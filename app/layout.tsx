import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

const notoSansJp = Noto_Sans_JP({
  subsets: ['latin'],
  weight: ['400', '500', '700'],
  display: 'swap',
  variable: '--font-noto-sans-jp',
  preload: true,
})

export const metadata: Metadata = {
  title: 'SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="ja" className={`${notoSansJp.variable} overflow-x-hidden`}>
      <body className="min-h-screen bg-white text-gray-900 overflow-x-hidden font-sans">
        <Header />
        <main className="overflow-x-hidden">{children}</main>
        <Footer />
      </body>
    </html>
  )
}
