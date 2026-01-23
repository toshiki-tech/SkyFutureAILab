import Link from 'next/link'
import type { Case } from '@/types'

interface RelatedCasesProps {
  cases: Case[]
}

export default function RelatedCases({ cases }: RelatedCasesProps) {
  return (
    <section className="mt-16 border-t border-gray-200 pt-10">
      <h2 className="mb-6 text-2xl font-bold text-gray-900">関連事例</h2>
      <div className="grid gap-4 md:grid-cols-3">
        {cases.map((item) => (
          <Link
            key={item._id}
            href={`/cases/${item.slug.current}`}
            className="group rounded-xl border border-gray-200/50 bg-white p-5 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-md hover:border-primary-200"
          >
            <span className="inline-block mb-3 px-2 py-1 text-xs font-medium text-primary-700 bg-primary-50 rounded-md">
              {item.problem}
            </span>
            <div className="font-semibold text-gray-900 group-hover:text-primary-600 transition-colors">
              {item.title}
            </div>
          </Link>
        ))}
      </div>
    </section>
  )
}
