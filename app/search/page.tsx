import type { Metadata } from 'next'
import Link from 'next/link'
import { mockAllCases, mockAllMethods, mockServices } from '@/lib/mockData'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: '検索結果 | SkyFuture AI Lab',
  description: '検索結果を表示します。',
}

interface SearchPageProps {
  searchParams: { q?: string }
}

// 简单的客户端搜索函数（暂时使用，后续会替换为 Sanity 搜索）
function searchContent(query: string) {
  const lowerQuery = query.toLowerCase()
  
  const cases = mockAllCases.filter((item) =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.excerpt?.toLowerCase().includes(lowerQuery) ||
    item.problem?.toLowerCase().includes(lowerQuery) ||
    item.techTags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )

  const methods = mockAllMethods.filter((item) =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.excerpt?.toLowerCase().includes(lowerQuery) ||
    item.techTags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )

  const services = mockServices.filter((item) =>
    item.title.toLowerCase().includes(lowerQuery) ||
    item.excerpt?.toLowerCase().includes(lowerQuery) ||
    item.techTags?.some((tag) => tag.toLowerCase().includes(lowerQuery))
  )

  return { cases, methods, services }
}

export default function SearchPage({ searchParams }: SearchPageProps) {
  const query = searchParams.q || ''
  const results = query ? searchContent(query) : { cases: [], methods: [], services: [] }
  const totalResults = results.cases.length + results.methods.length + results.services.length

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '検索結果' },
        ]}
      />

      <div className="mb-12">
        <h1 className="text-5xl font-bold text-gray-900 mb-6 tracking-tight">
          検索結果
        </h1>
        {query && (
          <p className="text-xl text-gray-600 leading-relaxed">
            「<span className="font-semibold text-gray-900">{query}</span>」の検索結果: {totalResults}件
          </p>
        )}
      </div>

      {!query ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">検索キーワードを入力してください。</p>
        </div>
      ) : totalResults === 0 ? (
        <div className="text-center py-16">
          <p className="text-gray-500 text-lg">検索結果が見つかりませんでした。</p>
          <p className="text-gray-400 text-sm mt-2">別のキーワードで検索してみてください。</p>
        </div>
      ) : (
        <div className="space-y-12">
          {/* 事例結果 */}
          {results.cases.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                事例 ({results.cases.length})
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.cases.map((item) => (
                  <Link
                    key={item._id}
                    href={`/cases/${item.slug.current}`}
                    className="group block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-primary-300 transition-all"
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.problem && (
                        <span className="px-3 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
                          {item.problem}
                        </span>
                      )}
                      {item.industry?.displayName && (
                        <span className="px-3 py-1 text-xs font-medium text-gray-600 bg-gray-100 rounded-full">
                          {item.industry.displayName}
                        </span>
                      )}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                    )}
                    {item.techTags && item.techTags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.techTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* メソッド結果 */}
          {results.methods.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                メソッド ({results.methods.length})
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.methods.map((item) => (
                  <Link
                    key={item._id}
                    href={`/method/${item.slug.current}`}
                    className="group block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-primary-300 transition-all"
                  >
                    <div className="mb-3 flex flex-wrap gap-2">
                      {item.techTags?.slice(0, 2).map((tag) => (
                        <span
                          key={tag}
                          className="px-3 py-1 text-xs font-medium text-accent-700 bg-accent-50 rounded-full"
                        >
                          {tag}
                        </span>
                      ))}
                    </div>
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}

          {/* サービス結果 */}
          {results.services.length > 0 && (
            <section>
              <h2 className="text-2xl font-bold text-gray-900 mb-6">
                サービス ({results.services.length})
              </h2>
              <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
                {results.services.map((item) => (
                  <Link
                    key={item._id}
                    href={`/service/${item.slug.current}`}
                    className="group block p-6 bg-white border border-gray-200 rounded-lg hover:shadow-lg hover:border-primary-300 transition-all"
                  >
                    <h3 className="text-lg font-semibold text-gray-900 mb-2 group-hover:text-primary-600 transition-colors line-clamp-2">
                      {item.title}
                    </h3>
                    {item.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-2">{item.excerpt}</p>
                    )}
                    {item.techTags && item.techTags.length > 0 && (
                      <div className="mt-3 flex flex-wrap gap-2">
                        {item.techTags.slice(0, 3).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-1 text-xs text-gray-600 bg-gray-100 rounded"
                          >
                            {tag}
                          </span>
                        ))}
                      </div>
                    )}
                  </Link>
                ))}
              </div>
            </section>
          )}
        </div>
      )}
    </div>
  )
}
