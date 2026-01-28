import type { Metadata } from 'next'
import AboutContent from './AboutContent'

export const metadata: Metadata = {
  title: '会社紹介 | SkyFuture AI Lab',
  description: 'スカイフューチャー株式会社の会社紹介ページです。Dynamics 365を中心とするMS製品のコンサルティング、導入支援、開発、保守、トレーニングの一連のワンストップソリューションを提供しています。',
}

export default function CompanyPage() {
  return <AboutContent />
}
