import Link from 'next/link'
import type { CtaConfig } from '@/types'

interface StickyCTAProps {
  ctaConfig?: CtaConfig | null
}

export default function StickyCTA({ ctaConfig }: StickyCTAProps) {
  if (!ctaConfig) {
    return null
  }

  return (
    <div className="rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
      <div className="mb-4 flex items-center gap-2">
        <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
          <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <h3 className="text-sm font-semibold text-gray-900">お問い合わせ</h3>
      </div>
      <div className="flex flex-col gap-3">
        <Link
          href={ctaConfig.primaryCTA.link}
          className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg text-center text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
          </svg>
          <span className="relative z-10">{ctaConfig.primaryCTA.text}</span>
          <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
        </Link>
        <Link
          href={ctaConfig.secondaryCTA.link}
          className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg text-center text-sm font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
        >
          <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
          {ctaConfig.secondaryCTA.text}
        </Link>
      </div>
    </div>
  )
}
