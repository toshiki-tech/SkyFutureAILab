import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import MethodList from '@/components/MethodList'
import { Chip } from '@/components/ui'
import type { TechTag, Method } from '@/types'
import { client } from '@/sanity/lib/client'
import { methodsQuery } from '@/lib/sanity/queries'

export const metadata: Metadata = {
  title: 'メソッド | SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の技術メソッドをご紹介します。',
}

export const dynamic = 'force-dynamic'

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

  const methods = (await client.fetch(methodsQuery, {
    techTag: techTag || null,
  } as any)) as Method[]

  return (
    <div className="bg-white">
      <SectionHero
        title="メソッド"
        description="Microsoft 365・Power Platform・生成AI を軸とした、実務で再現可能な技術メソッド集です。"
        bgImage="/images/method-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: 'メソッド' },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20 max-w-7xl">
        <div className="bg-white rounded-2xl border border-gray-200/80 shadow-sm p-6 md:p-8 mb-10">
          <div className="flex items-center gap-2 mb-4">
            <svg className="h-5 w-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" aria-hidden="true">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M7 7h.01M7 3h5a1.99 1.99 0 011.414.586l7 7a2 2 0 010 2.828l-7 7a2 2 0 01-2.828 0l-7-7A1.994 1.994 0 013 12V7a4 4 0 014-4z" />
            </svg>
            <h2 className="text-base font-bold text-gray-900">技術タグで絞り込む</h2>
          </div>
          <div className="flex flex-wrap gap-2">
            <Chip href="/method" active={!techTag} tone="accent" size="md">
              すべて
            </Chip>
            {TECH_TAGS.map((item) => (
              <Chip
                key={item}
                href={`/method?techTag=${encodeURIComponent(item)}`}
                active={techTag === item}
                tone="accent"
                size="md"
              >
                {item}
              </Chip>
            ))}
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm text-gray-600">
            {methods.length > 0 ? (
              <>
                <span className="font-semibold text-gray-900">{methods.length}</span> 件のメソッドが見つかりました
              </>
            ) : (
              '該当するメソッドがありません'
            )}
          </p>
        </div>

        <div className="mt-8">
          {methods.length > 0 ? (
            <MethodList methods={methods} />
          ) : (
            <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
              <p className="text-gray-600 text-lg">該当するメソッドが見つかりませんでした</p>
              <p className="text-gray-500 text-sm mt-2">別の条件で検索してみてください</p>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
