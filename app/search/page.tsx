'use client'

import { useState, useMemo } from 'react'
import { useRouter, useSearchParams } from 'next/navigation'
import Link from 'next/link'
import { mockAllCases, mockAllMethods, mockServices, mockIndustryCategories } from '@/lib/mockData'
import Breadcrumb from '@/components/Breadcrumb'
import SearchSidebar from '@/components/SearchSidebar'
import SearchCard from '@/components/SearchCard'
import SectionHero from '@/components/SectionHero'

export default function SearchPage() {
  const router = useRouter()
  const searchParams = useSearchParams()
  const query = searchParams.get('q') || ''

  // Filtering states
  const [selectedFilters, setSelectedFilters] = useState<Record<string, string[]>>({
    industry: searchParams.get('industry')?.split(',').filter(Boolean) || [],
    tech: searchParams.get('tech')?.split(',').filter(Boolean) || [],
  })

  // Filter options
  const filterGroups = [
    {
      id: 'industry',
      label: '業界で絞り込む',
      options: mockIndustryCategories.map(cat => ({ label: cat.displayName, value: cat.value }))
    },
    {
      id: 'tech',
      label: 'テクノロジー',
      options: [
        { label: 'Microsoft 365', value: 'Microsoft 365' },
        { label: 'Power Platform', value: 'Power Platform' },
        { label: 'Copilot / 生成AI', value: 'Copilot / 生成AI' },
        { label: 'Azure', value: 'Azure' },
        { label: 'Dynamics 365', value: 'Dynamics 365' },
      ]
    }
  ]

  const handleFilterChange = (groupId: string, value: string) => {
    const current = selectedFilters[groupId] || []
    const updated = current.includes(value)
      ? current.filter(v => v !== value)
      : [...current, value]

    const newFilters = { ...selectedFilters, [groupId]: updated }
    setSelectedFilters(newFilters)

    // Update URL
    const params = new URLSearchParams(searchParams.toString())
    if (updated.length > 0) {
      params.set(groupId, updated.join(','))
    } else {
      params.delete(groupId)
    }
    router.push(`/search?${params.toString()}`)
  }

  // Filtered Results
  const filteredResults = useMemo(() => {
    const lowerQuery = query.toLowerCase()

    const filterFn = (item: any) => {
      const matchesQuery = !query ||
        item.title.toLowerCase().includes(lowerQuery) ||
        item.excerpt?.toLowerCase().includes(lowerQuery)

      const matchesIndustry = selectedFilters.industry.length === 0 ||
        (item.industry && selectedFilters.industry.includes(item.industry.value))

      const matchesTech = selectedFilters.tech.length === 0 ||
        (item.techTags && item.techTags.some((tag: string) => selectedFilters.tech.includes(tag)))

      return matchesQuery && matchesIndustry && matchesTech
    }

    return {
      cases: mockAllCases.filter(filterFn),
      methods: mockAllMethods.filter(filterFn),
      services: mockServices.filter(filterFn)
    }
  }, [query, selectedFilters])

  const totalResults = filteredResults.cases.length + filteredResults.methods.length + filteredResults.services.length

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <SectionHero
        title="検索結果"
        description={query ? `「${query}」の検索結果を表示しています。` : 'サイト内を検索します。'}
        bgImage="/images/cases-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: '検索結果' },
        ]}
      />

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="flex flex-col md:flex-row gap-12">
          {/* Sidebar */}
          <SearchSidebar
            filters={filterGroups}
            selectedFilters={selectedFilters}
            onFilterChange={handleFilterChange}
          />

          {/* Results Area */}
          <div className="flex-grow">
            <div className="mb-8 flex items-center justify-between border-b border-gray-200 pb-4">
              <h2 className="text-xl font-bold text-gray-900">
                {totalResults} 件の検索結果
              </h2>
              {/* Reset Filters button could go here */}
            </div>

            {!query && totalResults === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-400">検索キーワードを入力してください。</p>
              </div>
            ) : totalResults === 0 ? (
              <div className="text-center py-20 bg-white rounded-2xl shadow-sm border border-gray-100">
                <p className="text-gray-400">条件に一致する結果が見つかりませんでした。</p>
                <button
                  onClick={() => setSelectedFilters({ industry: [], tech: [] })}
                  className="mt-4 text-accent-600 font-bold hover:underline"
                >
                  フィルターをクリアする
                </button>
              </div>
            ) : (
              <div className="space-y-16">
                {/* Cases */}
                {filteredResults.cases.length > 0 && (
                  <section>
                    <div className="mb-6 flex items-center gap-4">
                      <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-accent-50 text-accent-700 rounded-lg">事例</h3>
                      <div className="h-px flex-grow bg-gray-100"></div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      {filteredResults.cases.map((item) => (
                        <SearchCard
                          key={item._id}
                          type="case"
                          title={item.title}
                          slug={item.slug.current}
                          category={item.industry?.displayName}
                          excerpt={item.excerpt}
                          techTags={item.techTags}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Methods */}
                {filteredResults.methods.length > 0 && (
                  <section>
                    <div className="mb-6 flex items-center gap-4">
                      <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-primary-50 text-primary-700 rounded-lg">メソッド</h3>
                      <div className="h-px flex-grow bg-gray-100"></div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      {filteredResults.methods.map((item) => (
                        <SearchCard
                          key={item._id}
                          type="method"
                          title={item.title}
                          slug={item.slug.current}
                          category="技術解説"
                          excerpt={item.excerpt}
                          techTags={item.techTags}
                        />
                      ))}
                    </div>
                  </section>
                )}

                {/* Services */}
                {filteredResults.services.length > 0 && (
                  <section>
                    <div className="mb-6 flex items-center gap-4">
                      <h3 className="text-lg font-bold text-gray-900 px-4 py-1 bg-gray-100 text-gray-700 rounded-lg">サービス</h3>
                      <div className="h-px flex-grow bg-gray-100"></div>
                    </div>
                    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-2">
                      {filteredResults.services.map((item) => (
                        <SearchCard
                          key={item._id}
                          type="service"
                          title={item.title}
                          slug={item.slug.current}
                          category="ソリューション"
                          excerpt={item.excerpt}
                          techTags={item.techTags}
                        />
                      ))}
                    </div>
                  </section>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
