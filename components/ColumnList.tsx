import Link from 'next/link'
import type { Column } from '@/types'

interface ColumnListProps {
    columns: Column[]
}

export default function ColumnList({ columns }: ColumnListProps) {
    if (!columns || columns.length === 0) {
        return (
            <div className="text-center py-12 text-gray-500">
                <p>記事が見つかりませんでした。</p>
            </div>
        )
    }

    return (
        <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((item) => (
                <Link
                    key={item._id}
                    href={`/column/${item.slug.current}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-600/10"
                >
                    {/* Card Header/Category */}
                    <div className="p-6 pb-0 flex items-center justify-between">
                        <span className="px-3 py-1 text-xs font-bold uppercase tracking-wider text-primary-600 bg-primary-50 rounded-full">
                            {item.category || 'コラム'}
                        </span>
                        <time className="text-xs text-gray-400 font-medium">{item.publishedAt}</time>
                    </div>

                    {/* Card Body */}
                    <div className="flex-1 p-6">
                        <h3 className="mb-4 text-xl font-bold text-gray-900 leading-tight group-hover:text-primary-600 transition-colors">
                            {item.title}
                        </h3>
                        {item.excerpt && (
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-6">
                                {item.excerpt}
                            </p>
                        )}

                        {/* Author / Info */}
                        <div className="mt-auto flex items-center gap-3 pt-6 border-t border-gray-50">
                            <div className="h-8 w-8 rounded-full bg-gray-100 flex items-center justify-center text-xs font-bold text-gray-500">
                                SF
                            </div>
                            <div>
                                <p className="text-xs font-bold text-gray-900">{item.author || 'SkyFuture 編集部'}</p>
                                <p className="text-[10px] text-gray-400">Technology Insider</p>
                            </div>
                        </div>
                    </div>

                    {/* Decorative Bottom Bar */}
                    <div className="h-1.5 w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 group-hover:w-full" />
                </Link>
            ))}
        </div>
    )
}
