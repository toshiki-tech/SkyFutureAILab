import Image from 'next/image'
import SectionHero from '@/components/SectionHero'
import ClientLogoWall from '@/components/ClientLogoWall'
import { Section, SectionHeader } from '@/components/ui'

const TIMELINE = [
  { year: '2013', month: '12', title: '会社設立', text: 'スカイフューチャー株式会社設立。Dynamics CRMに特化したサービスを開始。' },
  { year: '2015', month: '06', title: 'Dynamics CRM専門化', text: 'Microsoft Dynamics CRMのスペシャリスト集団として、多くの導入実績を積み上げる。' },
  { year: '2017', month: '10', title: 'Dynamics 365移行', text: 'クラウド化の流れに合わせ、Dynamics 365への移行支援とサービス拡充を実施。' },
  { year: '2019', month: '04', title: 'Power Platform導入', text: 'Power Apps, Power BI等のローコード開発支援を開始。' },
  { year: '2021', month: '09', title: 'ISMS認証取得', text: '情報セキュリティマネジメントシステム（ISO/IEC 27001:2013）の認証を取得。' },
  { year: '2023', month: '03', title: '本社移転', text: '事業拡大に伴い、東京都豊島区西巣鴨に本社を移転。' },
]

const COMPANY_PROFILE = [
  { label: '商号', value: 'スカイフューチャー株式会社' },
  { label: '所在地', value: '〒170-0001 東京都豊島区西巣鴨2丁目1-19 双葉ビル2F' },
  { label: '設立', value: '2013年12月' },
  { label: '資本金', value: '3,000万円' },
  { label: '代表者', value: '代表取締役 中村拓実' },
  { label: '従業員数', value: '52名前後' },
  { label: '主要銀行', value: '三井住友銀行' },
  { label: '認証', value: 'ISMS (ISO27001)' },
]

const ADDRESS_QUERY = encodeURIComponent('東京都豊島区西巣鴨2-1-19 双葉ビル')

const PHILOSOPHY = [
  {
    title: '経営理念',
    headline: 'お客様から得る信頼評価を第一に重視',
    body:
      'ITプロフェッショナルとしてのサービス提供を行い、Win-Winのパートナー関係構築を目指します。事象を科学的に分析し、人材育成と自己研鑚により資質の向上をめざします。',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
      </svg>
    ),
  },
  {
    title: '社員憲章',
    headline: '仕事を「貰う」のではなく「取る」こと',
    body:
      'リーダーの立場で仕事を進め、常に探究心を持つこと。将来を見据えて着実に行動し、プロフェッショナルとして自立した行動を徹底します。',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
      </svg>
    ),
  },
  {
    title: '企業使命',
    headline: '技術者の価値向上と社会貢献を目指す',
    body:
      '技術力だけでなく、管理能力と経営能力を身につけ、責任感を高める。IT市場の変化に対応し、真の技術者として社会に貢献します。',
    icon: (
      <svg className="h-7 w-7" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.7} d="M13 10V3L4 14h7v7l9-11h-7z" />
      </svg>
    ),
  },
]

export default function AboutContent() {
  return (
    <div>
      <SectionHero
        title="未来を、AIと共創する。"
        description="Microsoft 365・Power Platform・生成AI。テクノロジーの力で、企業のデジタルトランスフォーメーションを加速させます。"
        bgImage="/images/about-hero.png"
        breadcrumbs={[
          { label: 'ホーム', href: '/' },
          { label: '会社紹介' },
        ]}
      />

      {/* イントロダクション */}
      <Section bg="white" size="lg" width="default">
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="mb-8 text-3xl md:text-4xl font-bold text-gray-900 tracking-tight leading-tight">
            2013年の創業から、<br />
            Microsoftソリューションの可能性を追求し続けています。
          </h2>
          <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
            <p>
              スカイフューチャー株式会社は、Dynamics 365を中心とするMicrosoftエコシステムのスペシャリストとして、
              コンサルティングから開発、保守、トレーニングまで、一貫したワンストップソリューションを提供しています。
            </p>
            <p>
              私たちは単なる「開発会社」ではありません。お客様のビジネスの本質を理解し、
              最新のAI技術とクラウドソリューションを組み合わせて、持続可能な未来を築くためのパートナーです。
            </p>
          </div>
        </div>
      </Section>

      {/* 社長ご挨拶 */}
      <Section bg="gray" size="xl">
        <SectionHeader
          eyebrow="MESSAGE"
          title="社長ご挨拶"
          align="center"
        />

        <div className="mx-auto max-w-6xl rounded-3xl bg-white p-6 lg:p-12 shadow-lg shadow-gray-200/60 ring-1 ring-gray-100">
          <div className="grid lg:grid-cols-5 gap-10 lg:gap-14 items-center">
            <div className="lg:col-span-2">
              <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-md">
                <Image
                  src="/images/ceo-portrait.png"
                  alt="Representative Director 中村拓実"
                  fill
                  sizes="(max-width: 1024px) 100vw, 40vw"
                  className="object-cover"
                />
                <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/85 via-gray-900/50 to-transparent p-6 text-white">
                  <p className="text-xs font-bold uppercase tracking-[0.2em] opacity-90">
                    Representative Director
                  </p>
                  <p className="mt-1 text-2xl md:text-3xl font-bold">中村 拓実</p>
                </div>
              </div>
            </div>

            <div className="lg:col-span-3 space-y-6">
              <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                「技術者は、技術者のままではいけない」
              </h3>
              <div className="space-y-5 text-base md:text-lg text-gray-600 leading-relaxed">
                <p>
                  技術者は技術者のままにいるだけでは不十分で、技術力に管理能力、そして経営力を身に付けて、自ら責任感を高めていくことがとても重要です。
                </p>
                <p>
                  IT市場は常に変化しています。私たちが信じているのは、市場の変化はどうであれ、真の技術者が必ず必要とされているということです。情報システムの進化、ソフトウェアの高度化・高品質化と開発簡易化の潮流は止まるはずがなく、今現在の厳しい市場状況こそ、進化に合うシステムとそのようなシステムを支える技術者達を選別していると考えています。
                </p>
                <p>
                  SkyFutureの創業の真意は、現在の自己価値を高めたい、自分の将来に投資したいという責任感のある技術者を集め、誠実でまじめに社会に奉仕する心を全社一同にし、お客様により良い製品、より良いサービスを提供していくことにあります。
                </p>
                <p>
                  2013年に誕生して以来、困難に屈することなく、夢を持って、同じ志を持つ同士を集めながら、IT製品と技術者サービスの提供を通して、社会に貢献できるよう努力し続けてまいります。
                </p>
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 企業理念 */}
      <Section bg="white" size="xl">
        <SectionHeader
          eyebrow="PHILOSOPHY"
          title="企業理念"
          description="技術と誠実さで、お客様と共に未来を築く。私たちが大切にしている 3 つの軸。"
          align="center"
        />

        <div className="grid gap-6 md:gap-8 lg:grid-cols-3">
          {PHILOSOPHY.map((item) => (
            <div
              key={item.title}
              className="group relative rounded-2xl bg-white p-8 lg:p-10 ring-1 ring-gray-200/70 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg hover:shadow-accent-500/10 hover:ring-accent-200"
            >
              <div className="mb-6 flex h-14 w-14 items-center justify-center rounded-xl bg-gradient-to-br from-accent-50 to-accent-100/70 text-accent-600 ring-1 ring-inset ring-accent-200/60 transition-all duration-300 group-hover:from-accent-500 group-hover:to-accent-600 group-hover:text-white group-hover:ring-accent-600">
                {item.icon}
              </div>
              <h3 className="mb-3 text-xl md:text-2xl font-bold text-gray-900">{item.title}</h3>
              <p className="mb-5 text-sm md:text-base font-bold text-accent-700">{item.headline}</p>
              <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.body}</p>
            </div>
          ))}
        </div>
      </Section>

      {/* 会社の歩み */}
      <Section bg="gray" size="xl">
        <SectionHeader
          eyebrow="HISTORY"
          title="会社の歩み"
          description="2013 年の創業から現在まで、Microsoft ソリューション専業の道を歩んできました。"
          align="center"
        />

        <div className="mx-auto max-w-4xl">
          <div className="relative ml-4 border-l-2 border-primary-100 md:ml-0 md:border-l-0 md:before:absolute md:before:left-1/2 md:before:h-full md:before:w-0.5 md:before:bg-primary-100">
            {TIMELINE.map((item, i) => (
              <div
                key={item.year + item.month}
                className={`relative mb-12 md:flex md:items-center md:justify-between ${
                  i % 2 === 0 ? 'md:flex-row-reverse' : ''
                }`}
              >
                <div className="hidden md:block md:w-[45%]"></div>
                <div className="absolute left-[-9px] z-10 flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 shadow-[0_0_0_4px_rgba(37,99,235,0.12)] md:left-1/2 md:-translate-x-1/2"></div>
                <div className="w-full rounded-2xl bg-white p-6 shadow-sm ring-1 ring-gray-200/70 transition-all hover:-translate-y-0.5 hover:shadow-md hover:ring-primary-200 md:w-[45%]">
                  <div className="mb-2 flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                    <span className="text-sm font-bold text-gray-400">/{item.month}</span>
                  </div>
                  <h3 className="mb-2 text-lg md:text-xl font-bold text-gray-900">{item.title}</h3>
                  <p className="text-sm md:text-base text-gray-600 leading-relaxed">{item.text}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </Section>

      {/* 会社情報 + アクセス */}
      <Section bg="white" size="xl">
        <SectionHeader
          eyebrow="COMPANY"
          title="会社情報"
          align="center"
        />

        <div className="grid gap-6 lg:gap-8 lg:grid-cols-5">
          {/* 会社概要テーブル */}
          <div className="lg:col-span-2">
            <div className="h-full overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/70 shadow-sm">
              <div className="flex items-center gap-2 border-b border-gray-100 bg-gray-50/60 px-6 py-4">
                <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
                <h3 className="text-base font-bold text-gray-900">企業プロフィール</h3>
              </div>
              <dl className="divide-y divide-gray-100">
                {COMPANY_PROFILE.map((item) => (
                  <div key={item.label} className="px-6 py-4">
                    <dt className="text-xs font-bold uppercase tracking-[0.18em] text-primary-600">
                      {item.label}
                    </dt>
                    <dd className="mt-1 text-sm md:text-base font-medium text-gray-900">
                      {item.value}
                    </dd>
                  </div>
                ))}
              </dl>
            </div>
          </div>

          {/* アクセスマップ */}
          <div className="lg:col-span-3">
            <div className="flex h-full flex-col overflow-hidden rounded-2xl bg-white ring-1 ring-gray-200/70 shadow-sm">
              <div className="flex items-center justify-between border-b border-gray-100 bg-gray-50/60 px-6 py-4">
                <div className="flex items-center gap-2">
                  <svg className="h-5 w-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.8} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <h3 className="text-base font-bold text-gray-900">アクセス</h3>
                </div>
                <a
                  href={`https://www.google.com/maps/search/?api=1&query=${ADDRESS_QUERY}`}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="text-sm font-semibold text-primary-600 transition-colors hover:text-primary-700"
                >
                  Googleマップで見る →
                </a>
              </div>
              <div className="relative min-h-[360px] flex-grow">
                <iframe
                  src={`https://www.google.com/maps?q=${ADDRESS_QUERY}&output=embed`}
                  width="100%"
                  height="100%"
                  style={{ border: 0 }}
                  allowFullScreen
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="スカイフューチャー株式会社 所在地"
                  className="absolute inset-0"
                />
              </div>
            </div>
          </div>
        </div>
      </Section>

      {/* 主要取引先 */}
      <Section bg="gray" size="xl">
        <SectionHeader
          eyebrow="PARTNERS"
          title="主要取引先"
          description="豊富な実績と信頼のパートナーシップを基盤に、Microsoft エコシステムの DX を推進しています。"
          align="center"
        />
        <ClientLogoWall variant="card" columns="four" />
      </Section>
    </div>
  )
}
