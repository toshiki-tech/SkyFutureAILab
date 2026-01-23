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
    <div className="space-y-6">
      {cases.map((item) => (
        <Link
          key={item._id}
          href={`/cases/${item.slug.current}`}
          className="group block rounded-2xl border border-gray-200/80 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-primary-500/5 hover:border-primary-300 overflow-hidden"
        >
          <div className="flex flex-col md:flex-row">
            {/* 左侧图片区域 */}
            <div className="relative w-full md:w-2/5 h-64 md:h-auto bg-gradient-to-br from-primary-50 to-accent-50 flex items-center justify-center overflow-hidden">
              {item.mainImage ? (
                <Image
                  src={item.mainImage}
                  alt={item.title}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-500"
                />
              ) : (
                <div className="flex flex-col items-center justify-center text-primary-300">
                  <svg className="h-16 w-16 mb-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                  </svg>
                  <span className="text-sm font-medium">Case Study</span>
                </div>
              )}
            </div>

            {/* 右侧内容区域 */}
            <div className="flex-1 p-6 md:p-8 flex flex-col justify-between">
              <div>
                {/* 分类标签 */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {item.industry?.displayName && (
                    <span className="px-3 py-1.5 text-xs font-semibold text-blue-700 bg-blue-50 rounded-md border border-blue-200">
                      {item.industry.displayName}
                    </span>
                  )}
                  <span className="px-3 py-1.5 text-xs font-semibold text-primary-700 bg-primary-50 rounded-md border border-primary-200">
                    {item.problem}
                  </span>
                </div>

                {/* 标题 */}
                <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight group-hover:text-primary-600 transition-colors">
                  {item.title}
                </h3>

                {/* 摘要 */}
                {item.excerpt && (
                  <p className="text-base text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {item.excerpt}
                  </p>
                )}

                {/* 技术标签 */}
                {item.techTags && item.techTags.length > 0 && (
                  <div className="flex flex-wrap gap-2">
                    {item.techTags.slice(0, 4).map((tag) => (
                      <span
                        key={tag}
                        className="px-3 py-1 text-xs text-gray-600 bg-gray-100 rounded-full hover:bg-gray-200 transition-colors"
                      >
                        #{tag}
                      </span>
                    ))}
                  </div>
                )}
              </div>

              {/* 底部元数据 */}
              <div className="flex items-center justify-between mt-6 pt-4 border-t border-gray-100">
                <div className="flex items-center gap-2 text-sm text-gray-500">
                  <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                  </svg>
                  <span>{item.publishedAt ? new Date(item.publishedAt).toLocaleDateString('ja-JP') : '公開日未定'}</span>
                </div>
                <div className="flex items-center gap-2 text-primary-600 font-medium text-sm group-hover:gap-3 transition-all">
                  <span>詳しく見る</span>
                  <svg className="h-4 w-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
