import type { SanityImage } from './sanity'

export type CaseProblem =
  | '業務効率化'
  | '申請・稟議のデジタル化'
  | '問い合わせ・サポート対応'
  | 'データ集計・レポート自動化'
  | 'ナレッジ管理・検索'
  | 'セキュアな生成AI導入'

export type TechTag =
  | 'Microsoft 365'
  | 'Power Platform'
  | 'Copilot / 生成AI'
  | 'Azure'
  | 'Dataverse / D365'
  | 'Security / Governance'
  | 'Integration（API連携など）'

export interface IndustryCategory {
  _id: string
  value: string
  displayName: string
  description?: string
  order?: number
}

export interface SeoFields {
  title?: string
  description?: string
  ogImage?: string
}

export interface Case {
  _id: string
  title: string
  slug: { current: string }
  problem: CaseProblem
  industry?: IndustryCategory
  techTags?: TechTag[]
  excerpt?: string
  content?: unknown[]
  featuredImage?: SanityImage
  publishedAt: string
  updatedAt?: string
  featured?: boolean
  seo?: SeoFields
}

export interface Method {
  _id: string
  title: string
  slug: { current: string }
  techTags: TechTag[]
  excerpt?: string
  content?: unknown[]
  featuredImage?: SanityImage
  publishedAt: string
  updatedAt?: string
  featured?: boolean
  seo?: SeoFields
}

export interface Service {
  _id: string
  title: string
  slug: { current: string }
  excerpt?: string
  content?: unknown[]
  featuredImage?: SanityImage
  techTags?: TechTag[]
  publishedAt: string
  updatedAt?: string
  seo?: SeoFields
}

export interface CtaConfig {
  primaryCTA: {
    text: string
    link: string
  }
  secondaryCTA: {
    text: string
    link: string
  }
}
