import type { Metadata } from 'next'
import Link from 'next/link'
import Hero from '@/components/Hero'
import FeaturedCases from '@/components/FeaturedCases'
import FeaturedMethods from '@/components/FeaturedMethods'
import ServiceGrid from '@/components/ServiceGrid'
import { client } from '@/sanity/lib/client'
import {
  ctaConfigQuery,
  featuredCasesQuery,
  featuredMethodsQuery,
  servicesQuery,
} from '@/lib/sanity/queries'
import {
  mockCtaConfig,
  mockServices,
  mockFeaturedCases,
  mockFeaturedMethods,
  mockStats,
  mockPartners,
} from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'SkyFuture AI Lab | Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援',
  description:
    'Sky Future のMicrosoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援に関する事例とメソッドを紹介します。',
}

export default async function HomePage() {
  // Sanityからデータを取得（失敗した場合はnull/空配列を返す）
  const [sanityCtaConfig, sanityFeaturedCases, sanityFeaturedMethods, sanityServices] = await Promise.all([
    client.fetch(ctaConfigQuery).catch(() => null),
    client.fetch(featuredCasesQuery).catch(() => []),
    client.fetch(featuredMethodsQuery).catch(() => []),
    client.fetch(servicesQuery).catch(() => []),
  ])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  const ctaConfig = sanityCtaConfig || mockCtaConfig
  const featuredCases = (sanityFeaturedCases && sanityFeaturedCases.length > 0) ? sanityFeaturedCases : mockFeaturedCases
  const featuredMethods = (sanityFeaturedMethods && sanityFeaturedMethods.length > 0) ? sanityFeaturedMethods : mockFeaturedMethods
  const services = (sanityServices && sanityServices.length > 0) ? sanityServices : mockServices

  return (
    <div className="overflow-x-hidden">
      <Hero ctaConfig={ctaConfig} />

      {/* サービスセクション */}
      {services?.length > 0 && (
        <section className="bg-white py-28">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16 text-center">
              <div className="mb-6 flex justify-center">
                <div className="flex h-20 w-20 items-center justify-center rounded-3xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-xl">
                  <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                  </svg>
                </div>
              </div>
              <h2 className="mb-6 text-5xl font-bold text-gray-900 tracking-tight">サービス</h2>
              <p className="text-xl text-gray-600 max-w-3xl mx-auto leading-relaxed">
                課題解決型のサービスをご提供。Microsoft 365・Power Platform・Dynamics 365・生成AIを活用したDX支援を中心に、企業の変革を支援します。
              </p>
            </div>
            <ServiceGrid services={services} />
            <div className="mt-16 text-center">
              <Link
                href="/service"
                className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 group transition-colors"
              >
                サービス一覧へ
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* 統計データセクション - 参考 ai-souken.com */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-12 md:gap-16">
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-600 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-primary-600 tracking-tight">{mockStats.consultationCount}+</div>
              <div className="text-base text-gray-600 font-medium">総相談企業数</div>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-600 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-primary-600 tracking-tight">{mockStats.caseCount}+</div>
              <div className="text-base text-gray-600 font-medium">導入事例紹介数</div>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-blue-500 to-blue-600 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-primary-600 tracking-tight">{mockStats.methodCount}+</div>
              <div className="text-base text-gray-600 font-medium">お役立ち記事数</div>
            </div>
            <div className="text-center">
              <div className="mb-4 flex justify-center">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-purple-500 to-purple-600 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10" />
                  </svg>
                </div>
              </div>
              <div className="mb-2 text-5xl font-bold text-primary-600 tracking-tight">{mockStats.contentCount}+</div>
              <div className="text-base text-gray-600 font-medium">総コンテンツ数</div>
            </div>
          </div>
        </div>
      </section>

      {/* おすすめ事例セクション */}
      {featuredCases?.length > 0 && (
        <section className="bg-gradient-to-b from-white to-gray-50 py-28">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">おすすめ事例</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">実践的な導入事例をご紹介</p>
                </div>
              </div>
            </div>
            <FeaturedCases cases={featuredCases} />
            <div className="mt-16 text-center">
              <Link
                href="/cases"
                className="inline-flex items-center gap-2 text-lg font-semibold text-primary-600 hover:text-primary-700 group transition-colors"
              >
                事例一覧へ
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* おすすめメソッドセクション */}
      {featuredMethods?.length > 0 && (
        <section className="bg-white py-28">
          <div className="container mx-auto px-6 max-w-7xl">
            <div className="mb-16">
              <div className="flex items-center gap-4 mb-4">
                <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg">
                  <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                  </svg>
                </div>
                <div>
                  <h2 className="text-5xl font-bold text-gray-900 mb-4 tracking-tight">おすすめメソッド</h2>
                  <p className="text-xl text-gray-600 leading-relaxed">現場で使える技術メソッド</p>
                </div>
              </div>
            </div>
            <FeaturedMethods methods={featuredMethods} />
            <div className="mt-16 text-center">
              <Link
                href="/method"
                className="inline-flex items-center gap-2 text-lg font-semibold text-accent-600 hover:text-accent-700 group transition-colors"
              >
                メソッド一覧へ
                <span className="group-hover:translate-x-1 transition-transform">→</span>
              </Link>
            </div>
          </div>
        </section>
      )}

      {/* パートナー・技術スタックセクション - 参考 ai-souken.com */}
      <section className="bg-gradient-to-b from-gray-50 to-white py-24">
        <div className="container mx-auto px-6 max-w-7xl">
          <div className="mb-12 text-center">
            <div className="mb-6 flex justify-center">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-gray-400 to-gray-600 shadow-lg">
                <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
            </div>
            <h2 className="text-4xl font-bold text-gray-900 mb-4 tracking-tight">最先端技術による、企業の変革を支援</h2>
          </div>
          <div className="flex flex-wrap items-center justify-center gap-10 md:gap-16">
            {mockPartners.map((partner) => (
              <div
                key={partner}
                className="group px-6 py-3 text-gray-400 text-xl font-semibold hover:text-primary-600 transition-colors relative"
              >
                {partner}
                <div className="absolute bottom-0 left-0 w-0 h-0.5 bg-primary-600 group-hover:w-full transition-all duration-300"></div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA セクション */}
      <section className="relative text-white py-28 overflow-hidden" style={{ background: 'linear-gradient(to bottom right, #2563eb, #1d4ed8, #1e40af)' }}>
        {/* 装饰性背景图标 */}
        <div className="absolute top-10 right-10 opacity-10">
          <svg className="h-32 w-32 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
          </svg>
        </div>
        <div className="absolute bottom-10 left-10 opacity-10">
          <svg className="h-24 w-24 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        </div>
        <div className="container mx-auto px-6 max-w-4xl text-center relative z-10">
          <div className="mb-8 flex justify-center">
            <div className="flex h-20 w-20 items-center justify-center rounded-full bg-white/20 backdrop-blur-sm border-2 border-white/30">
              <svg className="h-10 w-10 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
          </div>
          <h2 className="mb-6 text-5xl font-bold text-white tracking-tight">AI導入でお悩みの企業さま</h2>
          <p className="mb-12 text-xl text-white leading-relaxed max-w-2xl mx-auto" style={{ color: 'rgba(255, 255, 255, 0.95)' }}>
            Sky Future にまずは無料でご相談しませんか？
          </p>
          <div className="flex flex-wrap justify-center gap-6">
            <Link
              href="/contact"
              className="inline-flex items-center gap-2 px-10 py-5 bg-white rounded-lg font-semibold text-lg shadow-xl hover:shadow-2xl hover:scale-105 transition-all duration-300"
              style={{ color: '#2563eb' }}
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
              無料相談する
            </Link>
            <Link
              href="/request"
              className="inline-flex items-center gap-2 px-10 py-5 border-2 border-white text-white rounded-lg font-semibold text-lg hover:bg-white/20 hover:border-white transition-all duration-300"
            >
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
              資料請求する
            </Link>
          </div>
        </div>
      </section>
    </div>
  )
}
