import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import { serviceBySlugQuery, ctaConfigQuery } from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import { mockServiceDetails, mockCtaConfig } from '@/lib/content'
import type { Service } from '@/types'
import StickyCTA from '@/components/StickyCTA'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { ArticleLayout, CTABlock } from '@/components/ui'

interface ServicePageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: ServicePageProps): Promise<Metadata> {
  const service =
    (await client.fetch(serviceBySlugQuery, { slug: params.slug }).catch(() => null)) ||
    mockServiceDetails[params.slug]

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

  const [sanityService, sanityCtaConfig] = await Promise.all([
    client.fetch(serviceBySlugQuery, { slug }).catch(() => null),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  const service = (sanityService || mockServiceDetails[slug]) as unknown as Service
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  if (!service) {
    notFound()
  }

  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'ホーム', href: '/' },
        { label: 'サービス', href: '/service' },
        { label: service.title },
      ]}
      title={service.title}
      excerpt={service.excerpt}
      meta={{
        publishedAt: service.publishedAt,
        updatedAt: service.updatedAt,
        techTags: service.techTags,
      }}
      footer={
        <CTABlock
          eyebrow="CONTACT"
          title="このサービスについて詳しく聞きたい方へ"
          description="御社の状況に合わせた進め方・費用感を 30 分の無料相談でご案内します。"
          primary={{ label: '無料で相談する', href: '/contact' }}
          secondary={{ label: '資料をダウンロード', href: '/request' }}
          tone="dark"
        />
      }
      sidebar={<StickyCTA ctaConfig={ctaConfig} />}
    >
      {service.content && <PortableTextRenderer value={service.content} />}
    </ArticleLayout>
  )
}
