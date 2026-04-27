'use client'

import { useMemo, useState } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import SearchSidebar from '@/components/SearchSidebar'
import SearchCard from '@/components/SearchCard'
import { Button } from '@/components/ui'
import type { Case, Method, Service, Column, IndustryCategory } from '@/types'

export interface SearchResults {
  cases: Case[]
  methods: Method[]
  services: Service[]
  columns: Column[]
}

interface SearchClientProps {
  query: string
  results: SearchResults
  industries: IndustryCategory[]
  featuredCases: Case[]
  featuredMethods: Method[]
}

const TECH_OPTIONS = [
  { label: 'Microsoft 365', value: 'Microsoft 365' },
  { label: 'Power Platform', value: 'Power Platform' },
  { label: 'Copilot / 生成AI', value: 'Copilot / 生成AI' },
  { label: 'Azure', value: 'Azure' },
  { label: 'Dataverse / D365', value: 'Dataverse / D365' },
  { label: 'Security / Governance', value: 'Security / Governance' },
]

export default function SearchClient({
  query,
  results,
  industries,
  featuredCases,
  featuredMethods,
}: SearchClientProps) {
  const router = useRouter()
  const searchParams = useSearchParams()

  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    industry: searchParams.get('industry')?.split(',').filter(Boolean) || [],
    tech: searchParams.get('tech')?.split(',').filter(Boolean) || [],
  })

  const filterGroups = [
    {
      id: 'industry',
      label: '業界で絞り込む',
      options: industries.map((cat) => ({ label: cat.displayName, value: cat.value })),
    },
    {
      id: 'tech',
      label: 'テクノロジー',
      options: TECH_OPTIONS,
    },
  ]

  const handleFilterChange = (groupId: string, value: string) => {
    const current = selectedFilters[groupId] || []
    const updated = current.includes(value)
      ? current.filter((v) => v !== value)
      : [...current, value]

    const newFilters = { ...selectedFilters, [groupId]: updated }
    setSelectedFilters(newFilters)

    const params = new URLSearchParams(searchParams.toString())
    if (updated.length > 0) {
      params.set(groupId, updated.join(','))
    } else {
      params.delete(groupId)
    }
    router.push(`/search?${params.toString()}`)
  }

  const filtered = useMemo(() => {
    const matchesIndustry = (item: any) =>
      selectedFilters.industry.length === 0 ||
      (item.industry && selectedFilters.industry.includes(item.industry.value))

    const matchesTech = (item: any) =>
      selectedFilters.tech.length === 0 ||
      (item.techTags && item.techTags.some((t: string) => selectedFilters.tech.includes(t)))

    const filterFn = (item: any) => matchesIndustry(item) && matchesTech(item)

    return {
      cases: results.cases.filter(filterFn),
      methods: results.methods.filter(filterFn),
      services: results.services.filter(filterFn),
      columns: results.columns.filter(filterFn),
    }
  }, [results, selectedFilters])

  const totalResults =
    filtered.cases.length +
    filtered.methods.length +
    filtered.services.length +
    filtered.columns.length

  return (
    <div className="flex flex-col md:flex-row gap-12">
      <SearchSidebar
        filters={filterGroups}
        selectedFilters={selectedFilters}
        onFilterChange={handleFilterChange}
      />

      <div className="flex-grow">
        <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
          <h2 className="text-xl font-bold text-gray-900">{totalResults} 件の検索結果</h2>
        </div>

        {!query && totalResults === 0 ? (
          <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
            <p className="text-gray-400">検索キーワードを入力してください。</p>
          </div>
        ) : totalResults === 0 ? (
          <div className="space-y-12">
            <div className="rounded-2xl border border-gray-100 bg-white px-6 py-12 text-center shadow-sm md:py-16">
              <div className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-accent-50 text-accent-600">
                <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-4.35-4.35M10.5 18a7.5 7.5 0 100-15 7.5 7.5 0 000 15z" />
                </svg>
              </div>
              <h3 className="mb-2 text-xl font-bold text-gray-900">
                お探しの情報が見つかりませんでした
              </h3>
              <p className="mx-auto mb-6 max-w-xl text-sm text-gray-600 md:text-base">
                別のキーワードでお試しいただくか、以下のおすすめコンテンツもご覧ください。解決したい課題を直接ご相談いただくことも可能です。
              </p>
              <div className="flex flex-wrap items-center justify-center gap-3">
                <Button variant="primary" href="/contact">
                  課題を直接ご相談する
                </Button>
                <button
                  onClick={() => setSelectedFilters({ industry: [], tech: [] })}
                  className="rounded-lg border border-gray-200 bg-white px-5 py-2.5 text-sm font-semibold text-gray-700 transition hover:border-accent-500 hover:text-accent-600"
                >
                  フィルターをクリア
                </button>
              </div>
            </div>

            {featuredCases.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="rounded-lg bg-accent-50 px-4 py-1 text-lg font-bold text-accent-700">
                    おすすめの事例
                  </h3>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {featuredCases.slice(0, 2).map((item) => (
                    <SearchCard
                      key={item._id}
                      type="case"
                      title={item.title}
                      slug={item.slug.current}
                      category={item.industry?.displayName}
                      excerpt={item.excerpt}
                      techTags={item.techTags}
                      image={item.featuredImage?.asset?.url}
                    />
                  ))}
                </div>
              </section>
            )}

            {featuredMethods.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="rounded-lg bg-primary-50 px-4 py-1 text-lg font-bold text-primary-700">
                    おすすめのメソッド
                  </h3>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2">
                  {featuredMethods.slice(0, 2).map((item) => (
                    <SearchCard
                      key={item._id}
                      type="method"
                      title={item.title}
                      slug={item.slug.current}
                      category="技術解説"
                      excerpt={item.excerpt}
                      techTags={item.techTags}
                      image={item.featuredImage?.asset?.url}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        ) : (
          <div className="space-y-16">
            {filtered.cases.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-accent-50 text-accent-700 rounded-lg">
                    事例
                  </h3>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {filtered.cases.map((item) => (
                    <SearchCard
                      key={item._id}
                      type="case"
                      title={item.title}
                      slug={item.slug.current}
                      category={item.industry?.displayName}
                      excerpt={item.excerpt}
                      techTags={item.techTags}
                      image={item.featuredImage?.asset?.url}
                    />
                  ))}
                </div>
              </section>
            )}

            {filtered.methods.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-primary-50 text-primary-700 rounded-lg">
                    メソッド
                  </h3>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {filtered.methods.map((item) => (
                    <SearchCard
                      key={item._id}
                      type="method"
                      title={item.title}
                      slug={item.slug.current}
                      category="技術解説"
                      excerpt={item.excerpt}
                      techTags={item.techTags}
                      image={item.featuredImage?.asset?.url}
                    />
                  ))}
                </div>
              </section>
            )}

            {filtered.services.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-gray-100 text-gray-700 rounded-lg">
                    サービス
                  </h3>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {filtered.services.map((item) => (
                    <SearchCard
                      key={item._id}
                      type="service"
                      title={item.title}
                      slug={item.slug.current}
                      category="ソリューション"
                      excerpt={item.excerpt}
                      techTags={item.techTags}
                      image={item.featuredImage?.asset?.url}
                    />
                  ))}
                </div>
              </section>
            )}

            {filtered.columns.length > 0 && (
              <section>
                <div className="mb-6 flex items-center gap-4">
                  <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-emerald-50 text-emerald-700 rounded-lg">
                    コラム
                  </h3>
                  <div className="h-px flex-grow bg-gray-100"></div>
                </div>
                <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                  {filtered.columns.map((item) => (
                    <SearchCard
                      key={item._id}
                      type="column"
                      title={item.title}
                      slug={item.slug.current}
                      category={item.category}
                      excerpt={item.excerpt}
                      techTags={item.techTags}
                      image={item.featuredImage?.asset?.url}
                    />
                  ))}
                </div>
              </section>
            )}
          </div>
        )}
      </div>
    </div>
  )
}
