'use client'

import { usePathname } from 'next/navigation'
import type { ReactNode } from 'react'
import Header from '@/components/Header'
import Footer from '@/components/Footer'

/**
 * Renders the site Header/Footer except on /studio (Sanity Studio is a
 * fullscreen SPA and clashes with the marketing-site chrome).
 */
export default function ConditionalChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname()
  const isStudio = pathname?.startsWith('/studio')

  if (isStudio) {
    return <>{children}</>
  }

  return (
    <>
      <Header />
      <main className="overflow-x-clip">{children}</main>
      <Footer />
    </>
  )
}
