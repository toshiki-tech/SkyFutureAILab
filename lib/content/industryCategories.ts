import type { IndustryCategory } from '@/types'

export const mockIndustryCategories: IndustryCategory[] = [
  { _id: 'ind-it', value: 'it', displayName: 'IT・システム開発', order: 1 },
  { _id: 'ind-manufacturing', value: 'manufacturing', displayName: '製造', order: 2 },
  { _id: 'ind-finance', value: 'finance', displayName: '金融・保険', order: 3 },
  { _id: 'ind-retail', value: 'retail', displayName: '小売・流通', order: 4 },
  { _id: 'ind-healthcare', value: 'healthcare', displayName: '医療・福祉', order: 5 },
  { _id: 'ind-construction', value: 'construction', displayName: '建設・建築', order: 6 },
  { _id: 'ind-hr', value: 'hr', displayName: '人材', order: 7 },
  { _id: 'ind-real-estate', value: 'real-estate', displayName: '不動産', order: 8 },
  { _id: 'ind-education', value: 'education', displayName: '教育', order: 9 },
  { _id: 'ind-service', value: 'service', displayName: 'サービス', order: 10 },
]

/** Keyed by `value` for quick lookup in mock content. */
export const industryByValue: Record<string, IndustryCategory> = Object.fromEntries(
  mockIndustryCategories.map((i) => [i.value, i])
)
