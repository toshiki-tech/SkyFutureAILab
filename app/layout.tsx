import type { Metadata } from 'next'
import { Noto_Sans_JP } from 'next/font/google'
import './globals.css'
import ConditionalChrome from '@/components/ConditionalChrome'

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
        <ConditionalChrome>{children}</ConditionalChrome>
      </body>
    </html>
  )
}
