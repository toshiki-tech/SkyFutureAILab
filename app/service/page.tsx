import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import ServiceGrid from '@/components/ServiceGrid'
import { SectionHeader, CTABlock } from '@/components/ui'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/lib/sanity/queries'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'サービス | SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援サービスの一覧です。',
}

export const dynamic = 'force-dynamic'

export default async function ServicesPage() {
  const services = (await client.fetch(servicesQuery)) as Service[]

  return (
    <div className="bg-white">
      <SectionHero
        title="サービス"
        description="Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援を中心に、課題解決型のサービスをご提供します。"
        bgImage="/images/service-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: 'サービス' },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20 max-w-7xl">
        <SectionHeader
          eyebrow="SERVICE LINEUP"
          title="6 つの支援サービス"
          description="お客様の DX フェーズに合わせて、導入〜定着化まで一貫してご支援します。"
          align="left"
        />

        {services.length > 0 ? (
          <ServiceGrid services={services} />
        ) : (
          <div className="text-center py-12 text-gray-600">
            <p>サービス情報を準備中です。</p>
          </div>
        )}

        <div className="mt-16 md:mt-24">
          <CTABlock
            eyebrow="CONTACT"
            title="最適なサービスをご提案します"
            description="まずは貴社の状況をお聞かせください。30 分の無料相談から始められます。"
            primary={{ label: '無料で相談する', href: '/contact' }}
            secondary={{ label: '資料をダウンロード', href: '/request' }}
            tone="dark"
          />
        </div>
      </div>
    </div>
  )
}
