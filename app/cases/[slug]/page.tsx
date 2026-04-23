import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  caseBySlugQuery,
  relatedMethodsQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import { mockCaseDetails, mockCtaConfig, mockFeaturedMethods } from '@/lib/content'
import type { Case } from '@/types'
import StickyCTA from '@/components/StickyCTA'
import RelatedMethods from '@/components/RelatedMethods'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { ArticleLayout, CTABlock } from '@/components/ui'

interface CasePageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: CasePageProps): Promise<Metadata> {
  const caseData =
    (await client.fetch(caseBySlugQuery, { slug: params.slug }).catch(() => null)) ||
    mockCaseDetails[params.slug]

  if (!caseData) {
    return { title: '事例が見つかりません | SkyFuture AI Lab' }
  }

  return {
    title: `${caseData.title} | SkyFuture AI Lab`,
    description: caseData.excerpt,
  }
}

export default async function CasePage({ params }: CasePageProps) {
  const { slug } = params

  const [sanityCase, sanityCtaConfig] = await Promise.all([
    client.fetch(caseBySlugQuery, { slug }).catch(() => null),
    client.fetch(ctaConfigQuery).catch(() => null),
  ])

  const caseData = (sanityCase || mockCaseDetails[slug]) as unknown as Case
  const ctaConfig = sanityCtaConfig || mockCtaConfig

  if (!caseData) {
    notFound()
  }

  let relatedMethods = []
  if (sanityCase && sanityCase.techTags?.length > 0) {
    relatedMethods = await client
      .fetch(relatedMethodsQuery, {
        excludeId: sanityCase._id,
        techTags: sanityCase.techTags,
      })
      .catch(() => [])
  }
  if (relatedMethods.length === 0) {
    relatedMethods = mockFeaturedMethods
      .filter((method) =>
        method.techTags?.some((tag) => (caseData.techTags as string[])?.includes(tag))
      )
      .slice(0, 3)
  }

  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'ホーム', href: '/' },
        { label: '事例', href: '/cases' },
        { label: caseData.title },
      ]}
      title={caseData.title}
      excerpt={caseData.excerpt}
      meta={{
        publishedAt: caseData.publishedAt,
        updatedAt: caseData.updatedAt,
        industry: caseData.industry?.displayName,
        problem: caseData.problem,
        techTags: caseData.techTags,
      }}
      footer={
        <>
          <CTABlock
            eyebrow="CONTACT"
            title="同様の課題でお困りの方へ"
            description="30 分の無料相談、または詳細な資料ダウンロードをご用意しています。"
            primary={{ label: '無料で相談する', href: '/contact' }}
            secondary={{ label: '資料をダウンロード', href: '/request' }}
            tone="dark"
          />
          {relatedMethods?.length > 0 && <RelatedMethods methods={relatedMethods} />}
        </>
      }
      sidebar={<StickyCTA ctaConfig={ctaConfig} />}
    >
      {caseData.content && <PortableTextRenderer value={caseData.content} />}
    </ArticleLayout>
  )
}
