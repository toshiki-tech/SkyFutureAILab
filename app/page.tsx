import type { Metadata } from 'next'
import Hero from '@/components/Hero'
import FeaturedCases from '@/components/FeaturedCases'
import FeaturedMethods from '@/components/FeaturedMethods'
import ServiceGrid from '@/components/ServiceGrid'
import ClientLogoWall from '@/components/ClientLogoWall'
import { Section, SectionHeader, CTABlock, Button } from '@/components/ui'
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
} from '@/lib/content'

export const metadata: Metadata = {
  title: 'SkyFuture AI Lab | Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援',
  description:
    'Sky Future のMicrosoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援に関する事例とメソッドを紹介します。',
}

export default async function HomePage() {
  const [sanityCtaConfig, sanityFeaturedCases, sanityFeaturedMethods, sanityServices] = await Promise.all([
    client.fetch(ctaConfigQuery).catch(() => null),
    client.fetch(featuredCasesQuery).catch(() => []),
    client.fetch(featuredMethodsQuery).catch(() => []),
    client.fetch(servicesQuery).catch(() => []),
  ])

  const ctaConfig = sanityCtaConfig || mockCtaConfig
  const featuredCases = (sanityFeaturedCases && sanityFeaturedCases.length > 0) ? sanityFeaturedCases : mockFeaturedCases
  const featuredMethods = (sanityFeaturedMethods && sanityFeaturedMethods.length > 0) ? sanityFeaturedMethods : mockFeaturedMethods
  const services = (sanityServices && sanityServices.length > 0) ? sanityServices : mockServices

  const statsItems = [
    { value: `${mockStats.consultationCount}+`, label: '相談実績（社）' },
    { value: `${mockStats.caseCount}+`, label: '導入実績（件）' },
    { value: '6', label: '解決課題（種）' },
    { value: `${mockStats.methodCount}+`, label: 'メソッド記事（本）' },
  ]

  return (
    <div className="overflow-x-hidden">
      <Hero ctaConfig={ctaConfig} />

      {/* サービス（首屏直下：先回答「何ができる会社か」） */}
      {services?.length > 0 && (
        <Section bg="white" size="xl">
          <SectionHeader
            eyebrow="SERVICES"
            title="サービス"
            description="Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援を中心に、課題解決型のサービスをご提供します。"
            align="center"
            size="lg"
          />
          <ServiceGrid services={services} />
          <div className="mt-14 flex justify-center">
            <Button href="/service" variant="outline" size="lg">
              サービス一覧へ
            </Button>
          </div>
        </Section>
      )}

      {/* 統計データ（軽い社会的証明） */}
      <Section bg="gray" size="md">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-8 md:gap-12">
          {statsItems.map((item) => (
            <div key={item.label} className="text-center">
              <div className="text-4xl md:text-5xl font-bold text-primary-900 tracking-tight">
                {item.value}
              </div>
              <div className="mt-2 text-sm md:text-base text-gray-600 font-medium">
                {item.label}
              </div>
            </div>
          ))}
        </div>
      </Section>

      {/* おすすめ事例 */}
      {featuredCases?.length > 0 && (
        <Section bg="white" size="xl">
          <SectionHeader
            eyebrow="CASES"
            title="導入事例"
            description="現場で成果を出した DX・生成 AI 導入プロジェクトをピックアップ。"
            align="center"
            size="lg"
          />
          <FeaturedCases cases={featuredCases} />
          <div className="mt-14 flex justify-center">
            <Button href="/cases" variant="outline" size="lg">
              事例一覧へ
            </Button>
          </div>
        </Section>
      )}

      {/* おすすめメソッド */}
      {featuredMethods?.length > 0 && (
        <Section bg="gray" size="xl">
          <SectionHeader
            eyebrow="METHODS"
            title="メソッド"
            description="再現性のある技術メソッドで、貴社の内製化と自走を支援します。"
            align="center"
            size="lg"
          />
          <FeaturedMethods methods={featuredMethods} />
          <div className="mt-14 flex justify-center">
            <Button href="/method" variant="outline" size="lg">
              メソッド一覧へ
            </Button>
          </div>
        </Section>
      )}

      {/* 信頼 / エコシステム：取引先ロゴ（薄ストリップ）+ 活用プラットフォーム */}
      <Section bg="white" size="lg">
        <div className="space-y-12">
          <div>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-8">
              主要取引先・協業パートナー
            </p>
            <ClientLogoWall variant="strip" columns="eight" />
          </div>

          <div className="mx-auto h-px w-24 bg-gray-200"></div>

          <div>
            <p className="text-center text-xs font-semibold uppercase tracking-[0.25em] text-gray-500 mb-6">
              活用プラットフォーム
            </p>
            <div className="flex flex-wrap items-center justify-center gap-x-10 gap-y-4 md:gap-x-14">
              {mockPartners.map((partner) => (
                <div
                  key={partner}
                  className="text-gray-500 text-sm md:text-base font-semibold hover:text-primary-900 transition-colors"
                >
                  {partner}
                </div>
              ))}
            </div>
          </div>
        </div>
      </Section>

      {/* CTA */}
      <Section bg="white" size="xl">
        <CTABlock
          eyebrow="CONTACT"
          title="DX・生成 AI 導入でお悩みの企業さまへ"
          description="30 分の無料相談、または資料ダウンロードからお気軽にどうぞ。"
          primary={{ label: '無料で相談する', href: '/contact' }}
          secondary={{ label: '資料をダウンロード', href: '/request' }}
          tone="dark"
        />
      </Section>
    </div>
  )
}
