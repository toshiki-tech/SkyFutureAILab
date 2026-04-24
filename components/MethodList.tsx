import Link from 'next/link'
import type { Method } from '@/types'
import { TechTagIcon } from './icons/TechTagIcon'

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
      {methods.map((item) => {
        const primaryTag = item.techTags?.[0]
        return (
          <Link
            key={item._id}
            href={`/method/${item.slug.current}`}
            className="group relative overflow-hidden rounded-xl border border-gray-200/60 bg-white p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-500/10 hover:border-accent-200"
          >
            {/* 左上 細い accent バー — editorial tab */}
            <span
              aria-hidden
              className="absolute left-0 top-6 h-10 w-[3px] rounded-r-sm bg-gradient-to-b from-accent-400 to-accent-600 opacity-0 transition-opacity duration-300 group-hover:opacity-100"
            />
            <div className="flex items-start gap-4">
              <div className="relative flex h-11 w-11 shrink-0 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-accent-100/70 text-accent-600 ring-1 ring-inset ring-accent-200/60 transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600 group-hover:text-white group-hover:ring-accent-600">
                <TechTagIcon tag={primaryTag} className="h-[22px] w-[22px]" />
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
                <h3 className="mb-3 text-xl font-bold text-gray-900 group-hover:text-accent-600 transition-colors leading-snug">
                  {item.title}
                </h3>
                {item.excerpt && (
                  <p className="text-sm text-gray-600 leading-relaxed line-clamp-2">{item.excerpt}</p>
                )}
              </div>
            </div>
          </Link>
        )
      })}
    </div>
  )
}
