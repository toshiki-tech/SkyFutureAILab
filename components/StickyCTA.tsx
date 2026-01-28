import Link from 'next/link'
import Image from 'next/image'
import type { CtaConfig } from '@/types'

interface StickyCTAProps {
  ctaConfig?: CtaConfig | null
}

export default function StickyCTA({ ctaConfig }: StickyCTAProps) {
  if (!ctaConfig) {
    return null
  }

  return (
    <div className="flex flex-col gap-6">
      <Link
        href={ctaConfig.secondaryCTA.link}
        className="group relative block overflow-hidden rounded-xl bg-gray-900 shadow-xl transition-all duration-300 hover:scale-[1.02] hover:shadow-2xl hover:shadow-primary-600/20"
      >
        <div className="relative w-full">
          <Image
            src="/images/ad-banner.png"
            alt="SkyFuture AI Lab Ad"
            width={1024}
            height={1024}
            className="w-full h-auto transition-all duration-700 group-hover:scale-105 group-hover:brightness-110"
          />
          {/* Subtle overlay on hover */}
          <div className="absolute inset-0 bg-accent-500/0 transition-colors duration-300 group-hover:bg-accent-500/5"></div>
        </div>
      </Link>

      <div className="rounded-xl border border-gray-200/50 bg-gradient-to-br from-white to-gray-50 p-6 shadow-lg">
        <div className="mb-4 flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
            <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
            </svg>
          </div>
          <h3 className="text-sm font-semibold text-gray-900">こちらもチェック</h3>
        </div>
        <div className="flex flex-col gap-3">
          <Link
            href={ctaConfig.primaryCTA.link}
            className="group relative inline-flex items-center justify-center gap-2 px-6 py-3 bg-gradient-to-r from-primary-600 to-primary-700 text-white rounded-lg text-center text-sm font-semibold shadow-md hover:shadow-lg hover:shadow-primary-500/50 transition-all duration-300 hover:scale-105 overflow-hidden"
          >
            <span className="relative z-10">{ctaConfig.primaryCTA.text}</span>
            <div className="absolute inset-0 bg-gradient-to-r from-primary-700 to-accent-600 opacity-0 group-hover:opacity-100 transition-opacity"></div>
          </Link>
          <Link
            href={ctaConfig.secondaryCTA.link}
            className="inline-flex items-center justify-center gap-2 px-6 py-3 border-2 border-primary-600 text-primary-600 rounded-lg text-center text-sm font-semibold hover:bg-primary-50 transition-all duration-300 hover:scale-105"
          >
            {ctaConfig.secondaryCTA.text}
          </Link>
        </div>
      </div>
    </div>
  )
}
