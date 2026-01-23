import Link from 'next/link'
import type { Method } from '@/types'

interface FeaturedMethodsProps {
  methods: Method[]
}

export default function FeaturedMethods({ methods }: FeaturedMethodsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {methods.map((item) => (
        <Link
          key={item._id}
          href={`/method/${item.slug.current}`}
          className="group relative rounded-xl border border-gray-200/50 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 overflow-hidden"
        >
          <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-50 to-primary-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
          <div className="relative">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100 text-accent-600">
                <svg className="h-5 w-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>
              </div>
              <div className="flex flex-wrap gap-2">
                {item.techTags?.slice(0, 2).map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 text-xs font-medium text-accent-700 bg-accent-50 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
            <h3 className="mb-4 text-xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors leading-snug">
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
