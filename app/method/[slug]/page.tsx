import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  methodBySlugQuery,
  relatedCasesQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import { mockMethodDetails, mockCtaConfig, mockFeaturedCases } from '@/lib/mockData'
import type { Method } from '@/types'
import Breadcrumb from '@/components/Breadcrumb'
import StickyCTA from '@/components/StickyCTA'
import RelatedCases from '@/components/RelatedCases'
import PortableTextRenderer from '@/components/PortableTextRenderer'

interface MethodPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: MethodPageProps): Promise<Metadata> {
  // Sanityからデータを取得
  const methodData = await client.fetch(methodBySlugQuery, { slug: params.slug }).catch(() => null)
    || mockMethodDetails[params.slug]

  if (!methodData) {
    return {
      title: 'メソッドが見つかりません | SkyFuture AI Lab',
    }
  }

  return {
    title: `${methodData.title} | SkyFuture AI Lab`,
    description: methodData.excerpt,
  }
}

export default async function MethodPage({ params }: MethodPageProps) {
  const { slug } = params

  // Sanityからデータを取得
  const [sanityMethod, sanityCtaConfig] = await Promise.all([
    client.fetch(methodBySlugQuery, { slug }).catch(() => null),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  const methodData = (sanityMethod || mockMethodDetails[slug]) as unknown as Method
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  if (!methodData) {
    notFound()
  }

  // 関連事例の取得
  let relatedCases = []
  if (sanityMethod && sanityMethod.techTags?.length > 0) {
    relatedCases = await client.fetch(relatedCasesQuery, {
      excludeId: sanityMethod._id,
      techTags: sanityMethod.techTags,
    }).catch(() => [])
  }

  // Sanityから取得できなかった場合、または推薦結果が空の場合はモックデータから推荐
  if (relatedCases.length === 0) {
    relatedCases = mockFeaturedCases.filter((caseItem) =>
      caseItem.techTags?.some((tag) => (methodData.techTags as any[])?.includes(tag))
    ).slice(0, 3)
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'メソッド', href: '/method' },
          { label: methodData.title },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-4">
        <article className="lg:col-span-3">
          <header className="mb-12">
            <div className="mb-6 flex flex-wrap gap-3">
              {methodData.techTags && methodData.techTags.length > 0 && methodData.techTags.map((tag) => (
                <span
                  key={tag}
                  className="px-4 py-2 text-sm font-medium text-accent-700 bg-accent-50 rounded-full"
                >
                  {tag}
                </span>
              ))}
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 tracking-tight">{methodData.title}</h1>
            {methodData.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{methodData.excerpt}</p>
            )}
          </header>

          {methodData.content && (
            <div className="prose prose-lg max-w-none mb-16">
              <PortableTextRenderer value={methodData.content} />
            </div>
          )}

          {relatedCases?.length > 0 && <RelatedCases cases={relatedCases} />}
        </article>

        <aside className="lg:col-span-1">
          <div className="lg:sticky lg:top-6">
            <StickyCTA ctaConfig={ctaConfig} />
          </div>
        </aside>
      </div>
      {/* 移动端底部间距，避免被 sticky CTA 遮挡 */}
      <div className="lg:hidden h-24"></div>
    </div>
  )
}
