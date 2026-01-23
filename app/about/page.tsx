import type { Metadata } from 'next'
import Breadcrumb from '@/components/Breadcrumb'

export const metadata: Metadata = {
  title: '会社紹介 | SkyFuture AI Lab',
  description: 'スカイフューチャー株式会社の会社紹介ページです。Dynamics 365を中心とするMS製品のコンサルティング、導入支援、開発、保守、トレーニングの一連のワンストップソリューションを提供しています。',
}

export default function CompanyPage() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-50 to-white">
      <div className="container mx-auto px-6 py-20 max-w-7xl">
        <Breadcrumb
          items={[
            { label: 'ホーム', href: '/' },
            { label: '会社紹介' },
          ]}
        />

        {/* 主标题区域 */}
        <div className="mb-20 max-w-5xl">
          <h1 className="mb-8 text-5xl md:text-6xl font-bold text-gray-900 leading-tight tracking-tight">
            会社案内
          </h1>
        </div>

        {/* 会社情報セクション */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-primary-500 to-primary-700 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
              </svg>
            </div>
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-900 tracking-tight">会社情報</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full"></div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-12 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                当社は、ソフトウェア開発を主な事業として2013年に設立しました。
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                Dynamics 365を中心とするMS製品のコンサルティング、導入支援、開発、保守、トレーニングの一連のワンストップソリューションを提供して参りました。
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                我が社は、これまでの経験と実績を踏まえて、さらなる発展を図るとともに、業種を超えて多くの皆様との連携を強化し、相互の発展を図ることを目指します。
              </p>
            </div>
          </div>
        </section>

        {/* 会社概要セクション */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-accent-500 to-accent-700 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </div>
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-900 tracking-tight">会社概要</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full"></div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2">
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-primary-100">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">商号</h3>
              <p className="text-xl font-semibold text-gray-900">スカイフューチャー株式会社</p>
              <p className="text-lg text-gray-600 mt-1">(Sky Future Co., Ltd)</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-accent-100">
                <svg className="h-6 w-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">住所</h3>
              <p className="text-lg text-gray-900 leading-relaxed">
                〒170-0001<br />
                東京都豊島区西巣鴨2丁目1-19<br />
                双葉ビル２F<br />
                <span className="text-sm text-gray-500">（大塚駅 徒歩9分）</span>
              </p>
              <p className="text-xs text-gray-400 mt-2">
                ※2024/03/04 東京都豊島区池袋2-61-8 アゼリア青新ビル403号から本店移転
              </p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-blue-100">
                <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">設立年月</h3>
              <p className="text-2xl font-bold text-gray-900">2013年12月</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">資本金</h3>
              <p className="text-2xl font-bold text-gray-900">3,000万円</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-purple-100">
                <svg className="h-6 w-6 text-purple-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">主要取引銀行</h3>
              <p className="text-xl font-semibold text-gray-900">三井住友銀行</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-indigo-100">
                <svg className="h-6 w-6 text-indigo-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">代表取締役</h3>
              <p className="text-xl font-semibold text-gray-900">中村拓実</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-teal-100">
                <svg className="h-6 w-6 text-teal-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">社員数</h3>
              <p className="text-2xl font-bold text-gray-900">42人</p>
              <p className="text-sm text-gray-500 mt-1">（2024年04月01日現在）</p>
            </div>
            <div className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1">
              <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-red-100">
                <svg className="h-6 w-6 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                </svg>
              </div>
              <h3 className="mb-4 text-sm font-semibold text-gray-500 uppercase tracking-wide">電話</h3>
              <p className="text-2xl font-bold text-primary-600">03-5972-1521</p>
            </div>
          </div>

          {/* 技術資格 */}
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary-100">
                <svg className="h-6 w-6 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">技術資格</h3>
            </div>
            <ul className="space-y-3">
              <li className="flex items-start">
                <span className="mr-3 text-primary-600">•</span>
                <span className="text-lg text-gray-700">Microsoft Dynamics 365 Customization and Configuration</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-600">•</span>
                <span className="text-lg text-gray-700">Microsoft Dynamics CRM 2016 Online Deployment</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-600">•</span>
                <span className="text-lg text-gray-700">Microsoft Dynamics CRM 2013 インストールと展開</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-600">•</span>
                <span className="text-lg text-gray-700">Microsoft Dynamics CRM 2011 アプリケーション</span>
              </li>
              <li className="flex items-start">
                <span className="mr-3 text-primary-600">•</span>
                <span className="text-lg text-gray-700">Microsoft Dynamics CRM 2011 拡張</span>
              </li>
            </ul>
          </div>

          {/* 主要取引先 - Logo 跑马灯 */}
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 shadow-md overflow-hidden">
            <div className="mb-6 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent-100">
                <svg className="h-6 w-6 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">主要取引先</h3>
            </div>
            <div className="relative overflow-hidden py-4 -mx-2">
              <div className="flex animate-scroll">
                {[
                  '日本ビジネスシステムズ株式会社',
                  'NTTコミュニケーションズ（株）',
                  '株式会社シーイーシー',
                  'SCSK（株）',
                  '東京コンピュータサービス株式会社',
                  '株式会社エスピック',
                  '株式会社ユーコット・インフォテクノ',
                ].map((company, index) => (
                  <div
                    key={`${company}-${index}`}
                    className="flex-shrink-0 mx-6 flex items-center justify-center h-20 px-8 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-lg font-medium text-gray-700 whitespace-nowrap">{company}</span>
                  </div>
                ))}
                {/* 重复一遍以实现无缝循环 */}
                {[
                  '日本ビジネスシステムズ株式会社',
                  'NTTコミュニケーションズ（株）',
                  '株式会社シーイーシー',
                  'SCSK（株）',
                  '東京コンピュータサービス株式会社',
                  '株式会社エスピック',
                  '株式会社ユーコット・インフォテクノ',
                ].map((company, index) => (
                  <div
                    key={`${company}-dup-${index}`}
                    className="flex-shrink-0 mx-6 flex items-center justify-center h-20 px-8 bg-gradient-to-br from-gray-50 to-white rounded-lg border border-gray-200 shadow-sm hover:shadow-md transition-shadow"
                  >
                    <span className="text-lg font-medium text-gray-700 whitespace-nowrap">{company}</span>
                  </div>
                ))}
              </div>
            </div>
            <p className="mt-6 text-center text-sm text-gray-500">等多数</p>
          </div>

          {/* 資格 */}
          <div className="mt-10 rounded-xl border border-gray-200 bg-white p-8 shadow-md">
            <div className="mb-4 flex items-center gap-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-green-100">
                <svg className="h-6 w-6 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                </svg>
              </div>
              <h3 className="text-2xl font-semibold text-gray-900">資格</h3>
            </div>
            <p className="text-xl font-semibold text-primary-600">ISMS(ISO/IEC 27001:2013)</p>
          </div>
        </section>

        {/* 社長ご挨拶セクション */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-yellow-500 to-orange-600 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
              </svg>
            </div>
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-900 tracking-tight">社長ご挨拶</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full"></div>
            </div>
          </div>
          <div className="rounded-2xl border border-gray-200 bg-white p-12 shadow-lg">
            <div className="prose prose-lg max-w-none">
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                技術者は技術者のままにいるだけでは不十分で、技術力に管理能力、そして経営力を身に付けて、自ら責任感を高めていくことがとても重要です。
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                IT市場は常に変化しています、私たち信じているのは、市場の変化はどうであれ、真の技術者が必ず必要とされている、情報システムの進化、ソフトウェアの高度化・高品質化と開発簡易化の潮流は止まるはずがなく、今現在の厳しい市場状況こそ、進化に合うシステムとそのようなシステムを支える技術者達を選んでいる。
              </p>
              <p className="text-xl text-gray-700 leading-relaxed mb-6">
                SkyFutureの創業者は会社を設立する真意は、現在の自己価値を高めたい、自分の将来に投資したい責任感のある技術者を集め、誠実でまじめに社会に奉仕する心を全社一同にし、お客様により良い製品、より良いサービスを提供して行きます。
              </p>
              <p className="text-xl text-gray-700 leading-relaxed">
                SkyFuture会社は、2013年誕生し、困難に屈することなく、夢を持って、同じ志を持つ同士を集めながら、規模を拡大し、業界にIT製品と技術者サービスの提供を通して、社会に貢献できるように努力していこうと私たちの理想です。
                私たち創業メンバーは、この理想がお客さんの価値、そして大多数の技術者の長期価値を実現するために不断に努力すれば、SkyFuture会社はきっと発展でき、お客様と社員がきっと幸せになると信じています。
              </p>
            </div>
            <div className="mt-10 pt-8 border-t border-gray-200">
              <p className="text-xl font-semibold text-gray-900">スカイフューチャー株式会社</p>
              <p className="text-lg text-gray-600 mt-2">代表取締役社長 中村 拓実</p>
            </div>
          </div>
        </section>

        {/* 経営理念セクション */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-indigo-500 to-purple-600 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
              </svg>
            </div>
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-900 tracking-tight">経営理念</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full"></div>
            </div>
          </div>
          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[
              { text: 'お客様から得る信頼評価を第一に重視', icon: 'trust' },
              { text: '常にITプロフェッショナルとしてのサービス提供', icon: 'professional' },
              { text: 'Win-Winのパートナー関係構築', icon: 'partnership' },
              { text: '事象をロジック的に分析し、自然原理を尊重して科学的に行動', icon: 'analysis' },
              { text: '人材の育成と社員の自己研鑚による、資質の向上をめざします。', icon: 'growth' },
            ].map((principle, index) => (
              <div
                key={index}
                className="rounded-xl border border-gray-200 bg-white p-8 shadow-md hover:shadow-lg transition-all hover:-translate-y-1"
              >
                <div className="mb-4 flex h-12 w-12 items-center justify-center rounded-lg bg-gradient-to-br from-primary-500 to-primary-700 text-white shadow-md">
                  {principle.icon === 'trust' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                    </svg>
                  )}
                  {principle.icon === 'professional' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  )}
                  {principle.icon === 'partnership' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
                    </svg>
                  )}
                  {principle.icon === 'analysis' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                    </svg>
                  )}
                  {principle.icon === 'growth' && (
                    <svg className="h-6 w-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
                    </svg>
                  )}
                </div>
                <p className="text-lg text-gray-700 leading-relaxed">{principle.text}</p>
              </div>
            ))}
          </div>
        </section>

        {/* 社員憲章セクション - 牌匾样式 */}
        <section className="mb-24">
          <div className="mb-12 flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-gradient-to-br from-teal-500 to-cyan-600 shadow-lg">
              <svg className="h-8 w-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
              </svg>
            </div>
            <div>
              <h2 className="mb-2 text-4xl font-bold text-gray-900 tracking-tight">社員憲章</h2>
              <div className="h-1 w-24 bg-gradient-to-r from-primary-600 to-primary-700 rounded-full"></div>
            </div>
          </div>
          {/* 牌匾样式容器 */}
          <div className="relative rounded-2xl border-4 border-amber-800 bg-gradient-to-br from-amber-50 via-amber-100 to-amber-50 p-12 shadow-2xl">
            {/* 牌匾装饰 - 顶部 */}
            <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2">
              <div className="flex items-center gap-2">
                <div className="h-3 w-3 rounded-full bg-amber-600"></div>
                <div className="h-1 w-24 bg-gradient-to-r from-amber-600 via-amber-500 to-amber-600"></div>
                <div className="h-3 w-3 rounded-full bg-amber-600"></div>
              </div>
            </div>
            {/* 牌匾装饰 - 两侧 */}
            <div className="absolute top-8 left-0 bottom-8 w-2 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-700 rounded-r-full"></div>
            <div className="absolute top-8 right-0 bottom-8 w-2 bg-gradient-to-b from-amber-700 via-amber-600 to-amber-700 rounded-l-full"></div>
            
            {/* 内容区域 */}
            <div className="relative">
              <div className="mb-8 text-center">
                <h3 className="text-3xl font-bold text-amber-900 mb-2 tracking-wide">社員憲章</h3>
                <div className="h-0.5 w-32 bg-amber-700 mx-auto"></div>
              </div>
              
              <div className="space-y-6">
                {[
                  { text: '仕事を貰えるではなく、仕事を取ること。', icon: 'initiative', number: '一' },
                  { text: 'リーダーの立場で仕事を進めること。', icon: 'leadership', number: '二' },
                  { text: '常に探究心を持つこと。', icon: 'curiosity', number: '三' },
                  { text: '定期的に将来のことを考えて着実に行動すること。', icon: 'future', number: '四' },
                ].map((charter, index) => (
                  <div
                    key={index}
                    className="flex items-start gap-6 p-6 bg-white/80 rounded-lg border border-amber-200 shadow-sm hover:shadow-md transition-all"
                  >
                    <div className="flex-shrink-0 flex items-center justify-center w-16 h-16 rounded-full bg-gradient-to-br from-amber-500 to-amber-700 text-white shadow-lg">
                      <span className="text-2xl font-bold">{charter.number}</span>
                    </div>
                    <div className="flex-1 pt-2">
                      <p className="text-xl text-gray-800 leading-relaxed font-medium">{charter.text}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </div>
    </div>
  )
}
