import Link from 'next/link'
import Image from 'next/image'
import type { Service } from '@/types'

interface ServiceGridProps {
  services: Service[]
}

export default function ServiceGrid({ services }: ServiceGridProps) {
  if (!services || services.length === 0) {
    return (
      <div className="text-center py-12 text-gray-500">
        <p>サービスが見つかりませんでした。</p>
      </div>
    )
  }

  return (
    <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
      {services.map((item) => (
        <Link
          key={item._id}
          href={`/service/${item.slug.current}`}
          className="group flex flex-col overflow-hidden rounded-xl border border-gray-200/50 bg-white shadow-sm transition-all duration-300 hover:-translate-y-2 hover:shadow-xl hover:shadow-primary-500/10 hover:border-primary-200"
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
            <h3 className="mb-3 text-lg font-bold text-gray-900 group-hover:text-primary-600 transition-colors leading-snug line-clamp-2">
              {item.title}
            </h3>
            {item.excerpt && (
              <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-4">
                {item.excerpt}
              </p>
            )}
            {item.techTags && item.techTags.length > 0 && (
              <div className="mt-auto flex flex-wrap gap-1.5 pt-4 border-t border-gray-100">
                {item.techTags.slice(0, 3).map((tag) => (
                  <span
                    key={tag}
                    className="px-2 py-0.5 text-[11px] font-medium text-primary-700 bg-primary-50 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </div>
        </Link>
      ))}
    </div>
  )
}
