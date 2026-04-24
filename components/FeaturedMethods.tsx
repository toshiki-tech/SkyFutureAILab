import Link from 'next/link'
import type { Method } from '@/types'
import { TechTagIcon } from './icons/TechTagIcon'

interface FeaturedMethodsProps {
  methods: Method[]
}

export default function FeaturedMethods({ methods }: FeaturedMethodsProps) {
  return (
    <div className="grid gap-8 md:grid-cols-3">
      {methods.map((item) => {
        const primaryTag = item.techTags?.[0]
        return (
          <Link
            key={item._id}
            href={`/method/${item.slug.current}`}
            className="group relative rounded-xl border border-gray-200/50 bg-white p-8 shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-accent-500/10 hover:border-accent-200 overflow-hidden"
          >
            <div className="absolute top-0 right-0 w-32 h-32 bg-gradient-to-br from-accent-50 to-primary-50 rounded-full blur-2xl opacity-0 group-hover:opacity-100 transition-opacity"></div>
            <div className="relative">
              <div className="mb-5 flex items-center gap-3">
                <div className="relative flex h-12 w-12 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-accent-100/70 text-accent-600 ring-1 ring-inset ring-accent-200/60 transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600 group-hover:text-white group-hover:ring-accent-600 group-hover:scale-105">
                  <TechTagIcon tag={primaryTag} className="h-6 w-6" />
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
        )
      })}
    </div>
  )
}
