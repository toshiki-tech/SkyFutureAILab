'use client'

import Link from 'next/link'
import Image from 'next/image'

interface SearchCardProps {
    title: string
    slug: string
    type: 'case' | 'method' | 'service'
    category?: string
    excerpt?: string
    image?: string
    techTags?: string[]
}

export default function SearchCard({
    title,
    slug,
    type,
    category,
    excerpt,
    image = '/images/cases-hero.png', // Fallback image
    techTags,
}: SearchCardProps) {
    const href = type === 'case' ? `/cases/${slug}` : type === 'method' ? `/method/${slug}` : `/service/${slug}`

    return (
        <Link href={href} className="group flex flex-col h-full bg-white rounded-xl border border-gray-100 shadow-sm hover:shadow-xl transition-all duration-300 overflow-hidden hover:-translate-y-1">
            {/* Visual Area */}
            <div className="relative aspect-[16/9] w-full overflow-hidden bg-gray-100">
                <Image
                    src={image}
                    alt={title}
                    fill
                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                />
                {category && (
                    <div className="absolute top-4 left-4">
                        <span className="px-3 py-1 text-[10px] font-bold uppercase tracking-widest text-white bg-accent-500/90 backdrop-blur-sm rounded-full shadow-sm">
                            {category}
                        </span>
                    </div>
                )}
            </div>

            {/* Content Area */}
            <div className="flex flex-col flex-grow p-6">
                <div className="mb-4 flex flex-wrap gap-2">
                    {techTags?.slice(0, 2).map((tag) => (
                        <span key={tag} className="text-[10px] font-bold text-gray-400 uppercase tracking-tight">
                            #{tag}
                        </span>
                    ))}
                </div>

                <h3 className="mb-3 text-lg font-bold text-gray-900 leading-snug group-hover:text-accent-600 transition-colors line-clamp-2">
                    {title}
                </h3>

                {excerpt && (
                    <p className="mb-6 text-sm text-gray-500 leading-relaxed line-clamp-3">
                        {excerpt}
                    </p>
                )}

                <div className="mt-auto flex items-center text-sm font-bold text-accent-600 group-hover:translate-x-1 transition-transform">
                    詳細を見る
                    <svg className="ml-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                </div>
            </div>
        </Link>
    )
}
