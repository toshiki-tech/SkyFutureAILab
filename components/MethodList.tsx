import Link from 'next/link'
import type { Method } from '@/types'

interface MethodListProps {
  methods: Method[]
}

export default function MethodList({ methods }: MethodListProps) {
  if (!methods || methods.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>メソッドが見つかりませんでした。</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {methods.map((item) => (
        <Link
          key={item._id}
          href={`/method/${item.slug.current}`}
          className="group relative rounded-xl border border-gray-200/50 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-500/10 hover:border-accent-200"
        >
          <div className="mb-4 flex items-start gap-3">
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-accent-100 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
              <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div className="flex-1 min-w-0">
              <div className="flex flex-wrap gap-2 mb-3">
                {item.techTags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-1 text-xs font-medium text-accent-700 bg-accent-50 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{item.excerpt}</p>
              )}
            </div>
          </div>
        </Link>
      ))}
    </div>
  )
}
