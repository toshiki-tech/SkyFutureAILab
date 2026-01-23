import Link from 'next/link'
import type { Case } from '@/types'

interface FeaturedCasesProps {
  cases: Case[]
}

export default function FeaturedCases({ cases }: FeaturedCasesProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {cases.map((item) => (
        <Link
          key={item._id}
          href={`/cases/${item.slug.current}`}
          className="group relative rounded-xl border border-gray-200/50 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-primary-50 to-accent-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100 text-primary-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
              </div>
              <span className="px-3 py-1.5 text-xs font-medium text-primary-700 bg-primary-50 rounded-full">
                {item.problem}
              </span>
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-snug">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-base text-gray-600 leading-relaxed line-clamp-3">{item.excerpt}</p>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
