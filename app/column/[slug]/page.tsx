import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import type { Column } from '@/types'
import { client } from '@/sanity/lib/client'
import {
  columnBySlugQuery,
  relatedColumnsQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import StickyCTA from '@/components/StickyCTA'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { ArticleLayout, CTABlock, Card } from '@/components/ui'

export const dynamic = 'force-dynamic'

interface ColumnPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: ColumnPageProps): Promise<Metadata> {
  const column = (await client.fetch(columnBySlugQuery, {
    slug: params.slug,
  } as any)) as Column | null

  if (!column) {
    return { title: 'コラムが見つかりません | SkyFuture AI Lab' }
  }

  return {
    title: `${column.title} | SkyFuture AI Lab`,
    description: column.excerpt,
  }
}

export default async function ColumnPage({ params }: ColumnPageProps) {
  const { slug } = params

  const [column, ctaConfig] = await Promise.all([
    client.fetch(columnBySlugQuery, { slug } as any) as Promise<Column | null>,
    client.fetch(ctaConfigQuery),
  ])

  if (!column) {
    notFound()
  }

  const relatedColumns = (await client.fetch(relatedColumnsQuery, {
    excludeId: column._id,
    techTags: column.techTags || [],
    category: column.category || null,
  } as any)) as Column[]

  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'ホーム', href: '/' },
        { label: 'コラム', href: '/column' },
        { label: column.title },
      ]}
      title={column.title}
      excerpt={column.excerpt}
      featuredImage={column.featuredImage}
      meta={{
        publishedAt: column.publishedAt,
        updatedAt: column.updatedAt,
        industry: column.category,
        techTags: column.techTags,
      }}
      footer={
        <>
          {column.author && (
            <p className="text-sm text-gray-500">文: {column.author}</p>
          )}
          <CTABlock
            eyebrow="CONTACT"
            title="記事のテーマについて、実務で相談したい方へ"
            description="同じトピックで社内検討を進めている方は、30 分の無料相談をご活用ください。"
            primary={{ label: '無料で相談する', href: '/contact' }}
            secondary={{ label: '資料をダウンロード', href: '/request' }}
            tone="dark"
          />
          {relatedColumns.length > 0 && (
            <section>
              <h2 className="mb-6 text-2xl md:text-3xl font-bold text-gray-900">
                関連コラム
              </h2>
              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
                {relatedColumns.map((c) => (
                  <Card
                    key={c._id}
                    href={`/column/${c.slug.current}`}
                    interactive
                    className="h-full"
                  >
                    {c.category && (
                      <p className="mb-3 text-xs font-semibold text-accent-600">
                        {c.category}
                      </p>
                    )}
                    <h3 className="mb-2 text-base font-bold text-gray-900 leading-snug">
                      {c.title}
                    </h3>
                    {c.excerpt && (
                      <p className="text-sm text-gray-600 line-clamp-3">
                        {c.excerpt}
                      </p>
                    )}
                  </Card>
                ))}
              </div>
            </section>
          )}
        </>
      }
      sidebar={<StickyCTA ctaConfig={ctaConfig} />}
    >
      {column.content && <PortableTextRenderer value={column.content} />}
    </ArticleLayout>
  )
}
