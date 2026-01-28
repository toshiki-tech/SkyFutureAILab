import Link from 'next/link'
import Image from 'next/image'
import type { CtaConfig } from '@/types'

interface HeroProps {
  ctaConfig?: CtaConfig | null
}

export default function Hero({ ctaConfig }: HeroProps) {
  const primary = ctaConfig?.primaryCTA || { text: '資料請求', link: '/request' }
  const secondary = ctaConfig?.secondaryCTA || { text: '無料相談', link: '/contact' }

  return (
    <section className="relative h-screen min-h-[700px] w-full overflow-hidden bg-gray-900">
      {/* 背景图片 - 采用高质感的东京办公司/城市景观 */}
      <Image
        src="/images/about-hero-visionary.png"
        alt="SkyFuture Visionary Innovation"
        fill
        className="object-cover object-[center_30%] opacity-70"
        priority
      />

      {/* 动态渐变遮罩 - 参考微软/高科技风格 */}
      <div className="absolute inset-0 bg-gradient-to-tr from-gray-900 via-gray-900/40 to-transparent" />

      <div className="container relative z-10 mx-auto flex h-full items-center px-6 max-w-7xl">
        <div className="max-w-4xl pt-20 md:pt-0 animate-in fade-in slide-in-from-left-12 duration-1000">
          <h1 className="mb-6 text-3xl font-extrabold text-white md:text-6xl lg:text-7xl leading-[1.2] md:leading-[1.15] tracking-tight">
            Dynamics 365 / Power Platform <br className="hidden md:block" />
            <span className="text-accent-500">× AI ワンストップ支援</span>
          </h1>
          <p className="mb-10 text-lg md:text-2xl font-medium text-gray-200 leading-relaxed max-w-3xl">
            導入・開発・運用・教育までを一元化。<br />
            AI時代の未来をつくる、最良のパートナーを目指します。
          </p>
          <div className="flex flex-col sm:flex-row flex-wrap gap-4 md:gap-5">
            <Link
              href={primary.link}
              className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 bg-white text-gray-900 rounded-lg font-bold text-base md:text-lg shadow-2xl hover:bg-blue-50 transition-all duration-300 transform md:hover:-translate-y-1"
            >
              {primary.text}
            </Link>
            <Link
              href={secondary.link}
              className="inline-flex items-center justify-center px-8 py-4 md:px-10 md:py-5 border-2 border-white/80 text-white rounded-lg font-bold text-base md:text-lg hover:bg-white/10 backdrop-blur-sm transition-all duration-300 transform md:hover:-translate-y-1"
            >
              {secondary.text}
            </Link>
          </div>
        </div>
      </div>

      {/* 底部装饰线 - 已移除渐变 */}
    </section>
  )
}
