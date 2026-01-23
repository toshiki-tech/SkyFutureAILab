import type { Metadata } from 'next'
import CaseList from '@/components/CaseList'
import Breadcrumb from '@/components/Breadcrumb'
import type { CaseProblem, IndustryCategory } from '@/types'
import { mockAllCases, mockIndustryCategories } from '@/lib/mockData'

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

export default function CasesPage({ searchParams }: CasesPageProps) {
  const problem = searchParams.problem
  const industry = searchParams.industry

  // 暂时使用静态数据，后续会替换为 Sanity 数据
  let cases = mockAllCases
  const industries = mockIndustryCategories as IndustryCategory[]

  // 简单的客户端过滤
  if (problem) {
    cases = cases.filter((c) => c.problem === problem)
  }
  if (industry) {
    cases = cases.filter((c) => c.industry?.value === industry)
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '事例' },
          ]}
        />

        {/* ヘッダーセクション */}
        <div className="mb-12">
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">
            導入事例
          </h1>
          <p className="text-xl text-gray-600 leading-relaxed max-w-3xl">
            Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援の実践事例をご紹介します
          </p>
        </div>

        {/* フィルターセクション */}
        <div className="bg-white rounded-2xl shadow-sm border border-gray-200/80 p-6 md:p-8 mb-10">
          <div className="space-y-8">
            {/* 課題フィルター */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
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
    </div>
  )
}
