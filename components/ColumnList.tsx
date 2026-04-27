import Link from 'next/link'
import Image from 'next/image'
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
        <div className="grid gap-6 md:gap-8 md:grid-cols-2 lg:grid-cols-3">
            {columns.map((item) => (
                <Link
                    key={item._id}
                    href={`/column/${item.slug.current}`}
                    className="group flex flex-col overflow-hidden rounded-2xl border border-gray-100 bg-white transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl hover:shadow-primary-600/10"
                >
                    {item.featuredImage?.asset?.url && (
                        <div className="relative aspect-[16/9] w-full overflow-hidden bg-gradient-to-br from-primary-50 via-white to-accent-50">
                            <Image
                                src={item.featuredImage.asset.url}
                                alt={item.featuredImage.alt || item.title}
                                fill
                                sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 33vw"
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            {item.category && (
                                <div className="absolute top-4 left-4">
                                    <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-wider text-white bg-primary-600/90 backdrop-blur-sm rounded-full shadow-sm">
                                        {item.category}
                                    </span>
                                </div>
                            )}
                        </div>
                    )}

                    <div className="flex flex-1 flex-col p-6">
                        <div className="flex items-center justify-between mb-3">
                            {!item.featuredImage?.asset?.url && item.category ? (
                                <span className="px-2.5 py-1 text-[10px] font-bold uppercase tracking-wider text-primary-700 bg-primary-50 rounded-md">
                                    {item.category}
                                </span>
                            ) : (
                                <span />
                            )}
                            <time className="text-xs text-gray-400 font-medium">
                                {item.publishedAt}
                            </time>
                        </div>
                        <h3 className="mb-3 text-lg font-bold text-gray-900 leading-snug group-hover:text-primary-600 transition-colors line-clamp-2">
                            {item.title}
                        </h3>
                        {item.excerpt && (
                            <p className="text-sm text-gray-600 leading-relaxed line-clamp-3 mb-5">
                                {item.excerpt}
                            </p>
                        )}

                        <div className="mt-auto flex items-center gap-2.5 pt-4 border-t border-gray-100">
                            <div className="h-7 w-7 rounded-full bg-gray-100 flex items-center justify-center text-[10px] font-bold text-gray-500">
                                SF
                            </div>
                            <p className="text-xs font-medium text-gray-600">
                                {item.author || 'SkyFuture 編集部'}
                            </p>
                        </div>
                    </div>

                    <div className="h-1.5 w-0 bg-gradient-to-r from-primary-500 to-accent-500 transition-all duration-500 group-hover:w-full" />
                </Link>
            ))}
        </div>
    )
}
