import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import ColumnList from '@/components/ColumnList'
import type { Column } from '@/types'
import { mockAllColumns } from '@/lib/mockData'

export const metadata: Metadata = {
    title: 'コラム | SkyFuture AI Lab',
    description: 'Microsoft 365・Power Platform・生成AI の最新トレンドや活用ノウハウをお届けする、SkyFuture AI Lab の専門コラムです。',
}

export default function ColumnPage() {
    // 暂时使用静态数据，后续会替换为 Sanity 数据
    const columns = mockAllColumns as unknown as Column[]

    return (
        <div className="bg-white">
            <SectionHero
                title="コラム"
                description="最先端のテクノロジーと DX への洞察。生成AI・クラウド・業務改革の最前線を、専門的な視点で解説します。"
                bgImage="/images/method-hero.png" // 暂时复用 method 背景，后续可更换
                breadcrumbs={[
                    { label: 'ホーム', href: '/' },
                    { label: 'コラム' },
                ]}
            />

            <div className="container mx-auto px-4 sm:px-6 py-12 md:py-24 max-w-7xl">
                <div className="mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-gray-100 pb-8">
                    <div className="max-w-2xl">
                        <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4">最新の記事</h2>
                        <p className="text-gray-600 leading-relaxed">
                            技術的な深掘りからビジネス戦略まで、DXを成功に導くためのナレッジを定期的に発信しています。
                        </p>
                    </div>
                    <div className="flex gap-2 text-sm">
                        <span className="px-4 py-2 bg-primary-600 text-white font-bold rounded-lg shadow-lg shadow-primary-600/20">
                            すべて見る
                        </span>
                    </div>
                </div>

                <ColumnList columns={columns} />

                {/* Pagination Placeholder */}
                <div className="mt-20 flex justify-center">
                    <nav className="flex items-center gap-2">
                        <span className="h-10 w-10 flex items-center justify-center rounded-lg bg-primary-50 text-primary-600 font-bold border border-primary-200">1</span>
                        {/* Add more pages when data increases */}
                    </nav>
                </div>
            </div>
        </div>
    )
}
