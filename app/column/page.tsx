import type { Metadata } from 'next'
import SectionHero from '@/components/SectionHero'
import ColumnList from '@/components/ColumnList'
import { SectionHeader, CTABlock } from '@/components/ui'
import type { Column } from '@/types'
import { mockAllColumns } from '@/lib/content'

export const metadata: Metadata = {
  title: 'コラム | SkyFuture AI Lab',
  description: 'Microsoft 365・Power Platform・生成AI の最新トレンドや活用ノウハウをお届けする、SkyFuture AI Lab の専門コラムです。',
}

export default function ColumnPage() {
  const columns = mockAllColumns as unknown as Column[]

  return (
    <div className="bg-white">
      <SectionHero
        title="コラム"
        description="技術の深掘りからビジネス戦略まで、DX を成功に導くためのナレッジを定期的に発信しています。"
        bgImage="/images/method-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: 'コラム' },
        ]}
      />

      <div className="container mx-auto px-4 sm:px-6 py-10 md:py-20 max-w-7xl">
        <SectionHeader
          eyebrow="LATEST COLUMN"
          title="最新の記事"
          description="生成 AI・Power Platform・Microsoft 365 を中心に、意思決定に役立つ視点を発信します。"
          align="left"
        />

        <ColumnList columns={columns} />

        <div className="mt-16 md:mt-24">
          <CTABlock
            eyebrow="CONTACT"
            title="記事の内容をもっと詳しく知りたい方へ"
            description="貴社の状況に合わせた個別相談も承っています。"
            primary={{ label: '無料で相談する', href: '/contact' }}
            secondary={{ label: '資料をダウンロード', href: '/request' }}
            tone="dark"
          />
        </div>
      </div>
    </div>
  )
}
