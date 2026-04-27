import { Suspense } from 'react'
import SectionHero from '@/components/SectionHero'
import SearchClient, { type SearchResults } from './SearchClient'
import { client } from '@/sanity/lib/client'
import {
  searchQuery,
  industryCategoriesQuery,
  featuredCasesQuery,
  featuredMethodsQuery,
} from '@/lib/sanity/queries'
import type { Case, Method, IndustryCategory } from '@/types'

export const revalidate = 60

interface SearchPageProps {
  searchParams: { q?: string; industry?: string; tech?: string }
}

const EMPTY_RESULTS: SearchResults = { cases: [], methods: [], services: [], columns: [] }

export default async function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''

  const [results, industries, featuredCases, featuredMethods] = (await Promise.all([
    query
      ? client.fetch(searchQuery, { query } as any)
      : Promise.resolve(EMPTY_RESULTS),
    client.fetch(industryCategoriesQuery),
    client.fetch(featuredCasesQuery),
    client.fetch(featuredMethodsQuery),
  ])) as [SearchResults, IndustryCategory[], Case[], Method[]]

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
        <Suspense fallback={null}>
          <SearchClient
            query={query}
            results={results || EMPTY_RESULTS}
            industries={industries || []}
            featuredCases={featuredCases || []}
            featuredMethods={featuredMethods || []}
          />
        </Suspense>
      </div>
    </div>
  )
}
