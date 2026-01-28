import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, ctaConfigQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import { mockServiceDetails, mockCtaConfig } from '@/lib/mockData'
import type { Service } from '@/types'
import Breadcrumb from '@/components/Breadcrumb'
import StickyCTA from '@/components/StickyCTA'
import PortableTextRenderer from '@/components/PortableTextRenderer'

interface ServicePageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  // Sanityからデータを取得
  const service = await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)
    || mockServiceDetails[params.slug]

  if (!service) {
    return { title: 'サービスが見つかりません | SkyFuture AI Lab' }
  }

  return {
    title: `${service.title} | SkyFuture AI Lab`,
    description: service.excerpt,
  }
}

export default async function ServicePage({ params }: ServicePageProps) {
  const { slug } = params

  // Sanityからデータを取得
  const [sanityService, sanityCtaConfig] = await Promise.all([
    client.fetch(serviceBySlugQuery, { slug }).catch(() => null),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  // Sanityデータがある場合はそちらを利用し、ない場合はモックデータを使用する
  const service = (sanityService || mockServiceDetails[slug]) as unknown as Service
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  if (!service) {
    notFound()
  }

  return (
    <div className="container mx-auto px-6 py-20 max-w-7xl">
      <Breadcrumb
        items={[
          { label: 'ホーム', href: '/' },
          { label: 'サービス', href: '/service' },
          { label: service.title },
        ]}
      />
      <div className="grid gap-12 lg:grid-cols-4">
        <article className="lg:col-span-3">
          <header className="mb-12">
            <h1 className="mb-6 text-5xl font-bold text-gray-900 tracking-tight">{service.title}</h1>
            {service.excerpt && (
              <p className="text-xl text-gray-600 leading-relaxed mb-8">{service.excerpt}</p>
            )}
            {service.techTags && service.techTags.length > 0 && (
              <div className="mt-8 flex flex-wrap gap-3">
                {service.techTags.map((tag) => (
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

          {service.content && (
            <div className="prose prose-lg max-w-none">
              <PortableTextRenderer value={service.content} />
            </div>
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
