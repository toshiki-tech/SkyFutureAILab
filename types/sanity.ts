export interface SanityImageAsset {
  _id: string
  url: string
}

export interface SanityImage {
  asset: SanityImageAsset
  alt?: string
}

export interface SanitySlug {
  _type?: 'slug'
  current: string
}
