import Link from 'next/link'
import Image from 'next/image'
import type { Case } from '@/types'

interface CaseListProps {
  cases: Case[]
}

export default function CaseList({ cases }: CaseListProps) {
  if (!cases || cases.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>事例が見つかりませんでした。</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
      {cases.map((item) => (
        <Link
          key={item._id}
          href={`/cases/${item.slug.current}`}
          className="group flex flex-col overflow-hidden rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-primary-500/5 hover:border-primary-300"
        >
          {item.featuredImage?.asset?.url && (
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary-50 to-accent-50">
              <Image
                src={item.featuredImage.asset.url}
                alt={item.featuredImage.alt || item.title}
                fill
                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
            </div>
          )}

          <div className="flex flex-1 flex-col p-6">
            <div className="mb-4 flex flex-wrap gap-2">
              {item.industry?.displayName && (
                <span className="px-2.5 py-1 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md border border-blue-200">
                  {item.industry.displayName}
                </span>
              )}
              <span className="px-2.5 py-1 text-xs font-semibold text-primary-700 bg-primary-50 rounded-md border border-primary-200">
                {item.problem}
              </span>
            </div>

            <h3 className="mb-3 text-xl font-bold text-gray-900 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
              {item.title}
            </h3>

            {item.excerpt && (
              <p className="mb-4 text-sm text-gray-600 leading-relaxed line-clamp-3">
                {item.excerpt}
              </p>
            )}

            {item.techTags && item.techTags.length > 0 && (
              <div className="mb-5 flex flex-wrap gap-1.5">
                {item.techTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[10px] text-gray-600 bg-gray-100 rounded-full"
                  >
                    #{tag}
                  </span>
                ))}
              </div>
            )}

            <div className="mt-auto flex items-center justify-between pt-4 border-t border-gray-100">
              <div className="flex items-center gap-1.5 text-xs text-gray-500">
                <svg className="h-3.5 w-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ja-JP') : '公開日未定'}</span>
              </div>
              <span className="flex items-center gap-1 text-xs font-bold text-primary-600 group-hover:gap-2 transition-all">
                詳しく見る
                <svg className="h-3.5 w-3.5 group-hover:translate-x-0.5 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                </svg>
              </span>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
