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
import { mockAllCases, mockIndustryCategories, mockCtaConfig } from '@/lib/mockData'

export const metadata: Metadata = {
  title: '事例 | SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の導入事例をご紹介します。',
}

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

  // Sanityからデータを取得
  const [sanityCases, sanityIndustries, sanityCtaConfig] = await Promise.all([
    client.fetch(casesQuery, { problem: problem || null, industry: industry || null }).catch(() => []),
    client.fetch(industryCategoriesQuery).catch(() => []),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  let cases = (sanityCases && sanityCases.length > 0) ? sanityCases as unknown as Case[] : mockAllCases as unknown as Case[]
  const industries = (sanityIndustries && sanityIndustries.length > 0) ? sanityIndustries as IndustryCategory[] : mockIndustryCategories as IndustryCategory[]
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  // モックデータを使用する場合のみ、クライアントサイドでのフィルタリング（簡易版）を適用
  if (!sanityCases || sanityCases.length === 0) {
    if (problem) {
      cases = cases.filter((c) => c.problem === problem)
    }
    if (industry) {
      cases = cases.filter((c) => c.industry?.value === industry)
    }
  }

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
                    <a
                      href="/cases"
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${!problem
                        ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg hover:from-primary-700 hover:to-primary-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm border border-gray-200'
                        }`}
                    >
                      すべて
                    </a>
                    {CASE_PROBLEMS.map((item) => (
                      <a
                        key={item}
                        href={`/cases?problem=${encodeURIComponent(item)}${industry ? `&industry=${encodeURIComponent(industry)}` : ''
                          }`}
                        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${problem === item
                          ? 'bg-gradient-to-r from-primary-600 to-primary-700 text-white shadow-md hover:shadow-lg hover:from-primary-700 hover:to-primary-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm border border-gray-200'
                          }`}
                      >
                        {item}
                      </a>
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
                    <a
                      href={`/cases${problem ? `?problem=${encodeURIComponent(problem)}` : ''}`}
                      className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${!industry
                        ? 'bg-gradient-to-r from-accent-600 to-accent-700 text-white shadow-md hover:shadow-lg hover:from-accent-700 hover:to-accent-800'
                        : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm border border-gray-200'
                        }`}
                    >
                      すべて
                    </a>
                    {(industries as IndustryCategory[]).map((item) => (
                      <a
                        key={item._id}
                        href={`/cases?industry=${encodeURIComponent(item.value)}${problem ? `&problem=${encodeURIComponent(problem)}` : ''
                          }`}
                        className={`rounded-full px-5 py-2.5 text-sm font-semibold transition-all duration-200 ${industry === item.value
                          ? 'bg-gradient-to-r from-accent-600 to-accent-700 text-white shadow-md hover:shadow-lg hover:from-accent-700 hover:to-accent-800'
                          : 'bg-gray-100 text-gray-700 hover:bg-gray-200 hover:shadow-sm border border-gray-200'
                          }`}
                      >
                        {item.displayName}
                      </a>
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

          <aside className="lg:col-span-1">
            <div className="lg:sticky lg:top-6">
              <StickyCTA ctaConfig={ctaConfig} />
            </div>
          </aside>
        </div>
      </div>
    </div>
  )
}
