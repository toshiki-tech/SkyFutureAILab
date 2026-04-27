import type { Metadata } from 'next'
import { client } from '@/sanity/lib/client'
import {
  methodBySlugQuery,
  relatedCasesQuery,
  ctaConfigQuery,
} from '@/lib/sanity/queries'
import { notFound } from 'next/navigation'
import type { Method } from '@/types'
import StickyCTA from '@/components/StickyCTA'
import RelatedCases from '@/components/RelatedCases'
import PortableTextRenderer from '@/components/PortableTextRenderer'
import { ArticleLayout, CTABlock } from '@/components/ui'

export const revalidate = 60

interface MethodPageProps {
  params: { slug: string }
}

export async function generateMetadata({
  params,
}: MethodPageProps): Promise<Metadata> {
  const methodData = (await client.fetch(methodBySlugQuery, {
    slug: params.slug,
  } as any)) as Method | null

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

  const [methodData, ctaConfig] = await Promise.all([
    client.fetch(methodBySlugQuery, { slug } as any) as Promise<Method | null>,
    client.fetch(ctaConfigQuery),
  ])

  if (!methodData) {
    notFound()
  }

  const relatedCases = methodData.techTags?.length
    ? await client.fetch(relatedCasesQuery, {
        excludeId: methodData._id,
        techTags: methodData.techTags,
      } as any)
    : []

  return (
    <ArticleLayout
      breadcrumbs={[
        { label: 'ホーム', href: '/' },
        { label: 'メソッド', href: '/method' },
        { label: methodData.title },
      ]}
      title={methodData.title}
      excerpt={methodData.excerpt}
      featuredImage={methodData.featuredImage}
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
