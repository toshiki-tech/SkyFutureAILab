import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import ServiceGrid from '@/components/ServiceGrid'
import { client } from '@/sanity/lib/client'
import { servicesQuery } from '@/lib/sanity/queries'
import { mockServices } from '@/lib/mockData'
import type { Service } from '@/types'

export const metadata: Metadata = {
  title: 'サービス | SkyFuture AI Lab',
  description: 'Sky Future のサービス一覧をご紹介します。',
}

export default async function ServicesPage() {
  // Sanityからデータを取得
  const sanityServices = await client.fetch(servicesQuery).catch(() => [])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  const services = (sanityServices && sanityServices.length > 0) ? sanityServices as unknown as Service[] : mockServices as unknown as Service[]

  return (
    <div className="bg-white">
      <SectionHero
        title="サービス"
        description="Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援を中心に、課題解决型のサービスを提供します。"
        bgImage="/images/service-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: 'サービス' },
        ]}
      />

      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <div className="mt-16">
          {services.length > 0 ? (
            <ServiceGrid services={services} />
          ) : (
            <div className="text-center py-12 text-gray-500">
              <p>サービス情報を準備中です。</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
