import type { Metadata } from 'next'
import { notFound } from 'next/navigation'
import { mockMethodDetails, mockCtaConfig, mockFeaturedCases } from '@/lib/mockData'
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
  // 暂时使用静态数据，后续会替换为 Sanity 数据
  const methodData = mockMethodDetails[params.slug]

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

export default function MethodPage({ params }: MethodPageProps) {
  // 暂时使用静态数据，后续会替换为 Sanity 数据
  const methodData = mockMethodDetails[params.slug]
  const ctaConfig = mockCtaConfig

  if (!methodData) {
    notFound()
  }

  // 简单的相关事例推荐（基于 techTags 交集）
  const relatedCases = mockFeaturedCases.filter((caseItem) =>
    caseItem.techTags?.some((tag) => methodData.techTags?.includes(tag))
  ).slice(0, 3)

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
              {methodData.techTags?.map((tag) => (
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
