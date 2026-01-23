import type { Metadata } from 'next'
import ServiceGrid from '@/components/ServiceGrid'
import Breadcrumb from '@/components/Breadcrumb'
import { mockServices } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'サービス | SkyFuture AI Lab',
  description: 'Sky Future のサービス一覧をご紹介します。',
}

export default function ServicesPage() {
  // 暂时使用静态数据，后续会替换为 Sanity 数据
  const services = mockServices

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'サービス' },
        ]}
      />
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">サービス</h1>
        <p className="text-xl text-gray-600 max-w-3xl leading-relaxed">
          Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援を中心に、課題解決型のサービスを提供します。
        </p>
      </div>
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
  )
}
