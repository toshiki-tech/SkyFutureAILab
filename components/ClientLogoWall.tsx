'use client'

import Image from 'next/image'
import { useState } from 'react'

export type ClientEntry = { name: string; slug: string }

export const PARTNER_LOGOS: ClientEntry[] = [
  { name: 'アバナード株式会社', slug: 'avanade' },
  { name: 'SCSK株式会社', slug: 'scsk' },
  { name: 'NTTコミュニケーションズ株式会社', slug: 'ntt-com' },
  { name: '株式会社シーイーシー', slug: 'cec' },
  { name: 'アクセンチュア株式会社', slug: 'accenture' },
  { name: 'NTTコムウェア株式会社', slug: 'ntt-comware' },
  { name: '日本マイクロソフト株式会社', slug: 'microsoft' },
  { name: '日本ビジネスシステムズ株式会社', slug: 'jbs' },
]

function ClientLogo({ client }: { client: ClientEntry }) {
  const [imageError, setImageError] = useState(false)

  return (
    <div className="group relative flex min-h-[140px] flex-col items-center justify-center overflow-hidden rounded-2xl border border-gray-100 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:border-accent-100 hover:shadow-xl">
      <div className="pointer-events-none absolute inset-0 bg-accent-500/0 transition-colors duration-300 group-hover:bg-accent-500/5"></div>
      <div className="relative flex h-14 w-full items-center justify-center grayscale transition-all duration-300 group-hover:grayscale-0">
        {!imageError ? (
          <Image
            src={`/images/logos/${client.slug}.png`}
            alt={client.name}
            fill
            sizes="(max-width: 768px) 50vw, (max-width: 1024px) 25vw, 160px"
            className="object-contain p-2"
            onError={() => setImageError(true)}
          />
        ) : (
          <div className="text-center text-sm font-bold text-gray-400 transition-colors group-hover:text-primary-600">
            {client.slug === 'microsoft' ? (
              <div className="flex items-center gap-2">
                <div className="grid h-5 w-5 grid-cols-2 gap-0.5">
                  <div className="h-full w-full bg-[#f25022]"></div>
                  <div className="h-full w-full bg-[#7fbb00]"></div>
                  <div className="h-full w-full bg-[#00a1f1]"></div>
                  <div className="h-full w-full bg-[#ffbb00]"></div>
                </div>
                <span className="text-lg">Microsoft</span>
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
}

export default function ClientLogoWall({
  clients = PARTNER_LOGOS,
  columns = 'four',
}: ClientLogoWallProps) {
  const cols =
    columns === 'eight'
      ? 'grid-cols-2 md:grid-cols-4 lg:grid-cols-8'
      : 'grid-cols-2 md:grid-cols-4'
  return (
    <div className={`grid gap-4 md:gap-6 ${cols}`}>
      {clients.map((client) => (
        <ClientLogo key={client.slug} client={client} />
      ))}
    </div>
  )
}
