import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  caseBySlugQuery,
  relatedMethodsQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import { mockCaseDetails, mockCtaConfig, mockFeaturedMethods } from '@/lib/mockData'
import type { Case } from '@/types'
import Breadcrumb from '@/components/Breadcrumb'
import StickyCTA from '@/components/StickyCTA'
import RelatedMethods from '@/components/RelatedMethods'
import PortableTextRenderer from '@/components/PortableTextRenderer'

interface CasePageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  // Sanityからデータを取得
  const caseData = await client.fetch(caseBySlugQuery, { slug: params.slug }).catch(() => null)
    || mockCaseDetails[params.slug]

  if (!caseData) {
    return {
      title: '事例が見つかりません | SkyFuture AI Lab',
    }
  }

  return {
    title: `${caseData.title} | SkyFuture AI Lab`,
    description: caseData.excerpt,
  }
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = params

  // Sanityからデータを取得
  const [sanityCase, sanityCtaConfig] = await Promise.all([
    client.fetch(caseBySlugQuery, { slug }).catch(() => null),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  const caseData = (sanityCase || mockCaseDetails[slug]) as unknown as Case
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  if (!caseData) {
    notFound()
  }

  // 関連メソッドの取得
  let relatedMethods = []
  if (sanityCase && sanityCase.techTags?.length > 0) {
    relatedMethods = await client.fetch(relatedMethodsQuery, {
      excludeId: sanityCase._id,
      techTags: sanityCase.techTags,
    }).catch(() => [])
  }

  // Sanityから取得できなかった場合、または推薦結果が空の場合はモックデータから推荐
  if (relatedMethods.length === 0) {
    relatedMethods = mockFeaturedMethods.filter((method) =>
      method.techTags?.some((tag) => (caseData.techTags as any[])?.includes(tag))
    ).slice(0, 3)
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: '事例', href: '/cases' },
          { label: caseData.title },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-4">
        <article className="lg:col-span-3">
          <header className="mb-12">
            <div className="mb-6 flex flex-wrap gap-3">
              <span className="px-4 py-2 text-sm font-medium text-primary-700 bg-primary-50 rounded-full">
                {caseData.problem}
              </span>
              {caseData.industry?.displayName && (
                <span className="px-4 py-2 text-sm font-medium text-gray-600 bg-gray-100 rounded-full">
                  {caseData.industry.displayName}
                </span>
              )}
            </div>
            <h1 className="mb-6 text-5xl font-bold text-gray-900 tracking-tight">{caseData.title}</h1>
            {caseData.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{caseData.excerpt}</p>
            )}
            {caseData.techTags && caseData.techTags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {caseData.techTags.map((tag) => (
                  <span
                    key={tag}
                    className="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 rounded-md"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            )}
          </header>

          {caseData.content && (
            <div className="prose prose-lg max-w-none mb-16">
              <PortableTextRenderer value={caseData.content} />
            </div>
          )}

          {relatedMethods?.length > 0 && (
            <RelatedMethods methods={relatedMethods} />
          )}
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
