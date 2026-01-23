import Link from 'next/link'
import type { CtaConfig } from '@/types'

interface HeroProps {
  ctaConfig?: CtaConfig | null
}

export default function Hero({ ctaConfig }: HeroProps) {
  const primary = ctaConfig?.primaryCTA || { text: '資料請求', link: '/request' }
  const secondary = ctaConfig?.secondaryCTA || { text: '無料相談', link: '/contactus' }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900 text-white">
      {/* 背景装饰 - 参考微软风格 */}
      <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmYiIGZpbGwtb3BhY2l0eT0iMC4wMyI+PGNpcmNsZSBjeD0iMzAiIGN5PSIzMCIgcj0iMiIvPjwvZz48L2c+PC9zdmc+')] opacity-30"></div>
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-blue-500/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-blue-400/5 rounded-full blur-3xl"></div>
      
      <div className="relative container mx-auto px-6 py-24 md:py-32 lg:py-40 max-w-7xl">
        <div className="max-w-6xl">
          <h1 className="mb-6 text-3xl md:text-4xl lg:text-5xl font-bold leading-tight tracking-tight text-white">
            Dynamics 365 / Power Platform と AI を活用し、導入・開発・運用・教育までを一気通貫で支援する、次世代型ワンストップソリューションを提供します。
          </h1>
          <p className="mb-10 text-xl md:text-2xl font-semibold text-white/95 leading-relaxed max-w-4xl">
            AI時代の未来をつくる、もっと信頼されるパートナーに
          </p>
          <div className="flex flex-wrap gap-4 md:gap-6">
            <Link
              href={primary.link}
              className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-white text-gray-900 rounded-md font-semibold text-base md:text-lg shadow-lg hover:bg-gray-50 hover:shadow-xl transition-all duration-200"
            >
              {primary.text}
            </Link>
            <Link
              href={secondary.link}
              className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 border-2 border-white text-white rounded-md font-semibold text-base md:text-lg hover:bg-white/10 transition-all duration-200"
            >
              {secondary.text}
            </Link>
          </div>
        </div>
      </div>
    </section>
  )
}
