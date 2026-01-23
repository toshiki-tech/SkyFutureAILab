import type { Metadata } from 'next'
import MethodList from '@/components/MethodList'
import Breadcrumb from '@/components/Breadcrumb'
import type { TechTag } from '@/types'
import { mockAllMethods } from '@/lib/mockData'

export const metadata: Metadata = {
  title: 'メソッド | SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の技術メソッドをご紹介します。',
}

const TECH_TAGS: TechTag[] = [
  'Microsoft 365',
  'Power Platform',
  'Copilot / 生成AI',
  'Azure',
  'Dataverse / D365',
  'Security / Governance',
  'Integration（API連携など）',
]

interface MethodsPageProps {
  searchParams: { techTag?: string }
}

export default function MethodsPage({ searchParams }: MethodsPageProps) {
  const techTag = searchParams.techTag

  // 暂时使用静态数据，后续会替换为 Sanity 数据
  let methods = mockAllMethods

  // 简单的客户端过滤
  if (techTag) {
    methods = methods.filter((m) => m.techTags?.includes(techTag))
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'メソッド' },
        ]}
      />
      <div className="mb-16">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">メソッド</h1>
        <p className="text-xl text-gray-600 leading-relaxed">技術メソッドとベストプラクティス</p>
      </div>

      <div className="mt-12">
        <h2 className="mb-3 text-sm font-semibold text-gray-700">
          技術タグで絞り込む
        </h2>
        <div className="flex flex-wrap gap-2">
          <a
            href="/method"
            className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
              !techTag
                ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
            }`}
          >
            すべて
          </a>
          {TECH_TAGS.map((item) => (
            <a
              key={item}
              href={`/method?techTag=${encodeURIComponent(item)}`}
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${
                techTag === item
                  ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md'
                  : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm'
              }`}
            >
              {item}
            </a>
          ))}
        </div>
      </div>

      <div className="mt-16">
        {methods.length > 0 ? (
          <MethodList methods={methods} />
        ) : (
          <div className="text-center py-12 text-gray-500">
            <p>メソッド情報を準備中です。</p>
          </div>
        )}
      </div>
    </div>
  )
}
