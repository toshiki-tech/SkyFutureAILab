export type SiteStats = {
  consultationCount: number
  caseCount: number
  methodCount: number
  contentCount: number
}

export const mockStats: SiteStats = {
  consultationCount: 450,
  caseCount: 1000,
  methodCount: 500,
  contentCount: 3500,
}

export const mockPartners: string[] = [
  'Microsoft',
  'Azure',
  'Power Platform',
  'Dynamics 365',
  'OpenAI',
  'GitHub',
]
