import Link from 'next/link'
import type { Method } from '@/types'

interface RelatedMethodsProps {
  methods: Method[]
}

export default function RelatedMethods({ methods }: RelatedMethodsProps) {
  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">関連メソッド</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {methods.map((item) => (
          <Link
            key={item._id}
            href={`/method/${item.slug.current}`}
            className="group rounded-xl border border-gray-200/50 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-accent-200"
          >
            <div className="mb-3 flex flex-wrap gap-2">
              {item.techTags?.slice(0, 2).map((tag) => (
                <span
                  key={tag}
                  className="px-2 py-1 text-xs font-medium text-accent-700 bg-accent-50 rounded-md"
                >
                  {tag}
                </span>
              ))}
            </div>
            <div className="font-semibold text-gray-900 group-hover:text-accent-600 transition-colors">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
