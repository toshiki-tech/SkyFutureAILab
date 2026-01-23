import { groq } from 'next-sanity'

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
    content,
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
    content,
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
    content,
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

// 搜索查询 - 支持全文搜索
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
    }
  }
`
