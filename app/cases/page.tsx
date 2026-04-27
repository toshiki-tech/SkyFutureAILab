import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import CaseList from '@/components/CaseList'
import StickyCTA from '@/components/StickyCTA'
import type { CaseProblem, IndustryCategory, Case } from '@/types'
import { client } from '@/sanity/lib/client'
import {
  casesQuery,
  industryCategoriesQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import { Chip } from '@/components/ui'

export const metadata: Metadata = {
  title: '事例 | SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の導入事例をご紹介します。',
}

export const revalidate = 60

const CASE_PROBLEMS: CaseProblem[] = [
  '業務効率化',
  '申請・稟議のデジタル化',
  '問い合わせ・サポート対応',
  'データ集計・レポート自動化',
  'ナレッジ管理・検索',
  'セキュアな生成AI導入',
]

interface CasesPageProps {
  searchParams: { problem?: string; industry?: string }
}

export default async function CasesPage({ searchParams }: CasesPageProps) {
  const problem = searchParams.problem
  const industry = searchParams.industry

  const [cases, industries, ctaConfig] = (await Promise.all([
    client.fetch(casesQuery, { problem: problem || null, industry: industry || null } as any),
    client.fetch(industryCategoriesQuery),
    client.fetch(ctaConfigQuery),
  ])) as [Case[], IndustryCategory[], any]

  return (
    <div className="min-h-screen bg-white">
      <SectionHero
        title="導入事例"
        description="Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の実践事例をご紹介します"
        bgImage="/images/cases-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: '事例' },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20 max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-4">
          <div className="lg:col-span-3">
            {/* フィルターセクション */}
            <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 md:p-8 mb-10">
              <div className="space-y-8">
                {/* 課題フィルター */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002-2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
                    </svg>
                    <h2 className="text-base font-bold text-gray-900">
                      課題で絞り込む
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip href="/cases" active={!problem} tone="primary" size="md">
                      すべて
                    </Chip>
                    {CASE_PROBLEMS.map((item) => (
                      <Chip
                        key={item}
                        href={`/cases?problem=${encodeURIComponent(item)}${industry ? `&industry=${encodeURIComponent(industry)}` : ''}`}
                        active={problem === item}
                        tone="primary"
                        size="md"
                      >
                        {item}
                      </Chip>
                    ))}
                  </div>
                </div>

                {/* 業種フィルター */}
                <div>
                  <div className="flex items-center gap-2 mb-4">
                    <svg className="h-5 w-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                    </svg>
                    <h2 className="text-base font-bold text-gray-900">
                      業種で絞り込む
                    </h2>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    <Chip
                      href={`/cases${problem ? `?problem=${encodeURIComponent(problem)}` : ''}`}
                      active={!industry}
                      tone="accent"
                      size="md"
                    >
                      すべて
                    </Chip>
                    {(industries as IndustryCategory[]).map((item) => (
                      <Chip
                        key={item._id}
                        href={`/cases?industry=${encodeURIComponent(item.value)}${problem ? `&problem=${encodeURIComponent(problem)}` : ''}`}
                        active={industry === item.value}
                        tone="accent"
                        size="md"
                      >
                        {item.displayName}
                      </Chip>
                    ))}
                  </div>
                </div>
              </div>
            </div>

            {/* 結果表示 */}
            <div className="mb-6">
              <p className="text-sm text-gray-600">
                {cases.length > 0 ? (
                  <>
                    <span className="font-semibold text-gray-900">{cases.length}</span> 件の事例が見つかりました
                  </>
                ) : (
                  '該当する事例がありません'
                )}
              </p>
            </div>

            {/* ケースリスト */}
            <div className="mt-8">
              {cases.length > 0 ? (
                <CaseList cases={cases} />
              ) : (
                <div className="bg-white rounded-2xl border border-gray-200 p-12 text-center">
                  <div className="flex flex-col items-center justify-center">
                    <svg className="h-16 w-16 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p className="text-gray-500 text-lg">該当する事例が見つかりませんでした</p>
                    <p className="text-gray-400 text-sm mt-2">別の条件で検索してみてください</p>
                  </div>
                </div>
              )}
            </div>
          </div>

          <aside className="hidden lg:col-span-1 lg:block">
            <div className="lg:sticky lg:top-6">
              <StickyCTA ctaConfig={ctaConfig} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
