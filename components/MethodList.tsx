import Link from 'next/link'
import Image from 'next/image'
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
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2">
      {methods.map((item) => {
        return (
          <Link
            key={item._id}
            href={`/method/${item.slug.current}`}
            className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/60 bg-white shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-500/10 hover:border-accent-200"
          >
            {item.featuredImage?.asset?.url && (
              <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-accent-50 to-primary-50">
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
              <div className="flex flex-wrap gap-1.5 mb-3">
                {item.techTags?.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-medium text-accent-700 bg-accent-50 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
              <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-accent-600 transition-colors leading-snug line-clamp-2">
                {item.title}
              </h3>
              {item.excerpt && (
                <p className="text-sm text-gray-600 leading-relaxed line-clamp-3">
                  {item.excerpt}
                </p>
              )}
            </div>
          </Link>
        )
      })}
    </div>
  )
}
