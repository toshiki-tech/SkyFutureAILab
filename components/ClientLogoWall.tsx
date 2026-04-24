'use client'

import Image from 'next/image'
import { useState } from 'react'

export type ClientEntry = { name: string; slug: string }

export const PARTNER_LOGOS: ClientEntry[] = [
  { name: '日本マイクロソフト株式会社', slug: 'microsoft' },
  { name: 'アバナード株式会社', slug: 'avanade' },
  { name: 'SCSK株式会社', slug: 'scsk' },
  { name: 'NTTコミュニケーションズ株式会社', slug: 'ntt-com' },
  { name: '株式会社シーイーシー', slug: 'cec' },
  { name: 'アクセンチュア株式会社', slug: 'accenture' },
  { name: 'NTTコムウェア株式会社', slug: 'ntt-comware' },
  { name: '日本ビジネスシステムズ株式会社', slug: 'jbs' },
]

type Variant = 'card' | 'strip'

function ClientLogo({ client, variant }: { client: ClientEntry; variant: Variant }) {
  const [imageError, setImageError] = useState(false)

  const wrapperClass =
    variant === 'strip'
      ? 'group relative flex h-16 items-center justify-center px-2'
      : 'group relative flex min-h-[140px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-100 hover:shadow-xl'

  const innerClass =
    variant === 'strip'
      ? 'relative flex h-10 w-full items-center justify-center opacity-60 grayscale transition-all duration-300 group-hover:opacity-100 group-hover:grayscale-0'
      : 'relative flex h-14 w-full items-center justify-center grayscale transition-all duration-300 group-hover:grayscale-0'

  return (
    <div className={wrapperClass}>
      {variant === 'card' && (
        <div className="pointer-events-none absolute inset-0 bg-accent-500/0 transition-colors duration-300 group-hover:bg-accent-500/5"></div>
      )}
      <div className={innerClass}>
        {!imageError ? (
          <Image
            src={`/images/logos/${client.slug}.png`}
            alt={client.name}
            fill
            sizes={
              variant === 'strip'
                ? '(max-width: 768px) 33vw, (max-width: 1024px) 20vw, 120px'
                : '(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 160px'
            }
            className="object-contain p-2"
            onError={() => setImageError(true)}
          />
        ) : (
          <div
            className={
              variant === 'strip'
                ? 'text-center text-xs font-semibold text-gray-500 transition-colors group-hover:text-primary-700'
                : 'text-center text-sm font-bold text-gray-400 transition-colors group-hover:text-primary-600'
            }
          >
            {client.slug === 'microsoft' ? (
              <div className="flex items-center gap-2">
                <div className={variant === 'strip' ? 'grid h-4 w-4 grid-cols-2 gap-0.5' : 'grid h-5 w-5 grid-cols-2 gap-0.5'}>
                  <div className="h-full w-full bg-[#f25022]"></div>
                  <div className="h-full w-full bg-[#7fbb00]"></div>
                  <div className="h-full w-full bg-[#00a1f1]"></div>
                  <div className="h-full w-full bg-[#ffbb00]"></div>
                </div>
                <span className={variant === 'strip' ? 'text-sm' : 'text-lg'}>Microsoft</span>
              </div>
            ) : (
              client.name
            )}
          </div>
        )}
      </div>
    </div>
  )
}

type ClientLogoWallProps = {
  clients?: ClientEntry[]
  columns?: 'four' | 'eight'
  variant?: Variant
}

export default function ClientLogoWall({
  clients = PARTNER_LOGOS,
  columns = 'four',
  variant = 'card',
}: ClientLogoWallProps) {
  const cols =
    columns === 'eight'
      ? 'grid-cols-2 sm:grid-cols-4 lg:grid-cols-8'
      : 'grid-cols-2 md:grid-cols-4'
  const gap = variant === 'strip' ? 'gap-x-6 gap-y-4 md:gap-x-10' : 'gap-4 md:gap-6'
  return (
    <div className={`grid ${gap} ${cols}`}>
      {clients.map((client) => (
        <ClientLogo key={client.slug} client={client} variant={variant} />
      ))}
    </div>
  )
}
