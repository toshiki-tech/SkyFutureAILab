import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import MethodList from '@/components/MethodList'
import type { TechTag, Method } from '@/types'
import { client } from '@/sanity/lib/client'
import { methodsQuery } from '@/lib/sanity/queries'
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

export default async function MethodsPage({ searchParams }: MethodsPageProps) {
  const techTag = searchParams.techTag as TechTag | undefined

  // Sanityからデータを取得
  const sanityMethods = await client.fetch(methodsQuery, { techTag: techTag || null }).catch(() => [])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  let methods = (sanityMethods && sanityMethods.length > 0) ? sanityMethods as unknown as Method[] : mockAllMethods as unknown as Method[]

  // モックデータを使用する場合のみ、クライアントサイドでのフィルタリング（簡易版）を適用
  if (!sanityMethods || sanityMethods.length === 0) {
    if (techTag) {
      methods = methods.filter((m) => m.techTags?.includes(techTag))
    }
  }

  return (
    <div className="bg-white">
      <SectionHero
        title="メソッド"
        description="技術メソッドとベストプラクティス。Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の技术メソッドをご紹介します。"
        bgImage="/images/method-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: 'メソッド' },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20 max-w-7xl">
        <div className="mt-12">
          <h2 className="mb-3 text-sm font-semibold text-gray-700">
            技術タグで絞り込む
          </h2>
          <div className="flex flex-wrap gap-2">
            <a
              href="/method"
              className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${!techTag
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
                className={`rounded-full px-4 py-2 text-sm font-medium transition-all ${techTag === item
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
    </div>
  )
}
