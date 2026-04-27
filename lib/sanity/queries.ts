import { groq } from 'next-sanity'

// 本文内 linkCard を参照解決するための共通プロジェクション。
// content フィールドを使う詳細クエリは `${contentProjection}` で展開する。
const contentProjection = `
  content[]{
    ...,
    _type == "linkCard" => {
      ...,
      "reference": reference->{
        _id,
        _type,
        title,
        slug,
        excerpt,
        featuredImage {
          asset-> { _id, url },
          alt
        }
      }
    }
  }
`

export const ctaConfigQuery = groq`
  *[_type == "ctaConfig"][0] {
    primaryCTA,
    secondaryCTA
  }
`

export const industryCategoriesQuery = groq`
  *[_type == "industryCategory"] | order(order asc, displayName asc) {
    _id,
    value,
    displayName,
    description,
    order
  }
`

export const casesQuery = groq`
  *[
    _type == "case"
    && (!defined($problem) || problem == $problem)
    && (!defined($industry) || industry->value == $industry)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    problem,
    "industry": industry->{
      _id,
      value,
      displayName
    },
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt,
    updatedAt,
    featured,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const caseBySlugQuery = groq`
  *[_type == "case" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    problem,
    "industry": industry->{
      _id,
      value,
      displayName
    },
    techTags,
    excerpt,
    ${contentProjection},
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt,
    updatedAt,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const featuredCasesQuery = groq`
  *[_type == "case" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    problem,
    "industry": industry->{
      _id,
      value,
      displayName
    },
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt
  }
`

export const methodsQuery = groq`
  *[
    _type == "method"
    && (!defined($techTag) || $techTag in techTags)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt,
    updatedAt,
    featured,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const methodBySlugQuery = groq`
  *[_type == "method" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    techTags,
    excerpt,
    ${contentProjection},
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt,
    updatedAt,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const featuredMethodsQuery = groq`
  *[_type == "method" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt
  }
`

export const relatedMethodsQuery = groq`
  *[
    _type == "method"
    && _id != $excludeId
    && count(techTags[@ in $techTags]) > 0
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt
  }
`

export const relatedCasesQuery = groq`
  *[
    _type == "case"
    && _id != $excludeId
    && count(techTags[@ in $techTags]) > 0
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    problem,
    "industry": industry->{
      _id,
      value,
      displayName
    },
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt
  }
`

export const servicesQuery = groq`
  *[_type == "service"] | order(publishedAt desc) {
    _id,
    title,
    slug,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    techTags,
    publishedAt,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const serviceBySlugQuery = groq`
  *[_type == "service" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    excerpt,
    ${contentProjection},
    featuredImage {
      asset-> { _id, url },
      alt
    },
    techTags,
    publishedAt,
    updatedAt,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

// コラム
export const columnsQuery = groq`
  *[
    _type == "column"
    && (!defined($category) || category == $category)
    && (!defined($techTag) || $techTag in techTags)
  ] | order(publishedAt desc) {
    _id,
    title,
    slug,
    category,
    author,
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt,
    updatedAt,
    featured,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const columnBySlugQuery = groq`
  *[_type == "column" && slug.current == $slug][0] {
    _id,
    title,
    slug,
    category,
    author,
    techTags,
    excerpt,
    ${contentProjection},
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt,
    updatedAt,
    "seo": {
      "title": coalesce(seo.title, title),
      "description": coalesce(seo.description, excerpt),
      "ogImage": coalesce(seo.ogImage, featuredImage).asset->url
    }
  }
`

export const featuredColumnsQuery = groq`
  *[_type == "column" && featured == true] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    category,
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt
  }
`

export const relatedColumnsQuery = groq`
  *[
    _type == "column"
    && _id != $excludeId
    && (
      count(techTags[@ in $techTags]) > 0
      || category == $category
    )
  ] | order(publishedAt desc) [0...3] {
    _id,
    title,
    slug,
    category,
    techTags,
    excerpt,
    featuredImage {
      asset-> { _id, url },
      alt
    },
    publishedAt
  }
`

// 検索クエリ - 全文検索対応
export const searchQuery = groq`
  {
    "cases": *[_type == "case" && (
      title match $query + "*" ||
      excerpt match $query + "*" ||
      pt::text(content) match $query + "*" ||
      problem match $query + "*" ||
      $query in techTags
    )] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      problem,
      "industry": industry->{
        _id,
        value,
        displayName
      },
      techTags,
      excerpt,
      featuredImage {
        asset-> { _id, url },
        alt
      },
      publishedAt
    },
    "methods": *[_type == "method" && (
      title match $query + "*" ||
      excerpt match $query + "*" ||
      pt::text(content) match $query + "*" ||
      $query in techTags
    )] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      techTags,
      excerpt,
      featuredImage {
        asset-> { _id, url },
        alt
      },
      publishedAt
    },
    "services": *[_type == "service" && (
      title match $query + "*" ||
      excerpt match $query + "*" ||
      pt::text(content) match $query + "*" ||
      $query in techTags
    )] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      excerpt,
      techTags,
      featuredImage {
        asset-> { _id, url },
        alt
      },
      publishedAt
    },
    "columns": *[_type == "column" && (
      title match $query + "*" ||
      excerpt match $query + "*" ||
      pt::text(content) match $query + "*" ||
      category match $query + "*" ||
      $query in techTags
    )] | order(publishedAt desc) {
      _id,
      _type,
      title,
      slug,
      category,
      techTags,
      excerpt,
      featuredImage {
        asset-> { _id, url },
        alt
      },
      publishedAt
    }
  }
`
