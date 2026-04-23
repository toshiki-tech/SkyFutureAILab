import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  methodBySlugQuery,
  relatedCasesQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import {
  mockMethodDetails,
  mockCtaConfig,
  mockFeaturedCases,
} from '@/lib/content'
import type { Method } from '@/types'
import StickyCTA from '@/components/StickyCTA'
import RelatedCases from '@/components/RelatedCases'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { ArticleLayout, CTABlock } from '@/components/ui'

interface MethodPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: MethodPageProps): Promise<Metadata> {
  const methodData =
    (await client.fetch(methodBySlugQuery, { slug: params.slug }).catch(() => null)) ||
    mockMethodDetails[params.slug]

  if (!methodData) {
    return { title: 'メソッドが見つかりません | SkyFuture AI Lab' }
  }

  return {
    title: `${methodData.title} | SkyFuture AI Lab`,
    description: methodData.excerpt,
  }
}

export default async function MethodPage({ params }: MethodPageProps) {
  const { slug } = params

  const [sanityMethod, sanityCtaConfig] = await Promise.all([
    client.fetch(methodBySlugQuery, { slug }).catch(() => null),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  const methodData = (sanityMethod || mockMethodDetails[slug]) as unknown as Method
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  if (!methodData) {
    notFound()
  }

  let relatedCases = []
  if (sanityMethod && sanityMethod.techTags?.length > 0) {
    relatedCases = await client
      .fetch(relatedCasesQuery, {
        excludeId: sanityMethod._id,
        techTags: sanityMethod.techTags,
      })
      .catch(() => [])
  }
  if (relatedCases.length === 0) {
    relatedCases = mockFeaturedCases
      .filter((caseItem) =>
        caseItem.techTags?.some((tag) => (methodData.techTags as string[])?.includes(tag))
      )
      .slice(0, 3)
  }

  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'ホーム', href: '/' },
        { label: 'メソッド', href: '/method' },
        { label: methodData.title },
      ]}
      title={methodData.title}
      excerpt={methodData.excerpt}
      meta={{
        publishedAt: methodData.publishedAt,
        updatedAt: methodData.updatedAt,
        techTags: methodData.techTags,
      }}
      footer={
        <>
          <CTABlock
            eyebrow="CONTACT"
            title="このメソッドを貴社で試してみませんか"
            description="30 分の無料相談で、自社の業務への適用方法をすり合わせできます。"
            primary={{ label: '無料で相談する', href: '/contact' }}
            secondary={{ label: '資料をダウンロード', href: '/request' }}
            tone="dark"
          />
          {relatedCases?.length > 0 && <RelatedCases cases={relatedCases} />}
        </>
      }
      sidebar={<StickyCTA ctaConfig={ctaConfig} />}
    >
      {methodData.content && <PortableTextRenderer value={methodData.content} />}
    </ArticleLayout>
  )
}
