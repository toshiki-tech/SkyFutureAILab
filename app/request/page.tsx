'use client'

import { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import DocumentMockup from '@/components/DocumentMockup'

const BENEFITS = [
  'SkyFuture AI Lab が選ばれる3つの強み',
  '生成AI導入の成功に向けた重要ポイント',
  '業界別の最新AI活用事例（製造・IT・金融など）',
  'サービスプラン・費用感の目安',
]

const TARGETS = [
  'AI導入を検討しているが、何から始めればいいか分からない方',
  '現場の業務効率化・コスト削減を具体的に進めたい方',
  '自社環境に最適なAIモデルの選定ポイントを知りたい方',
]

const LOGOS = [
  { name: 'Microsoft', path: '/images/logos/microsoft.png' },
  { name: 'Avanade', path: '/images/logos/avanade.png' },
  { name: 'Accenture', path: '/images/logos/accenture.png' },
  { name: 'NTT Com', path: '/images/logos/ntt-com.png' },
  { name: 'SCSK', path: '/images/logos/scsk.png' },
  { name: 'JBS', path: '/images/logos/jbs.png' },
]

export default function RequestDocumentPage() {
  const [step, setStep] = useState(1)
  const [formData, setFormData] = useState({
    companyName: '',
    department: '',
    name: '',
    email: '',
    phone: '',
    message: '',
  })

  return (
    <div className="min-h-screen bg-white">
      {/* Hero Section / Header Area */}
      <div className="bg-[#F8FAFC] border-b border-gray-100">
        <div className="container mx-auto px-6 pt-8 pb-12 max-w-7xl">
          <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '資料請求' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-bold rounded-full mb-4">
              RESOURCES
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-primary-900 leading-tight">
              AI導入の第一歩を支える<br />
              综合サービス紹介資料
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 relative">

          {/* Left Column: Content */}
          <div className="flex-grow lg:max-w-[60%]">
            {/* Visual */}
            <div className="mb-12 flex justify-center lg:justify-start">
              <DocumentMockup />
            </div>

            {/* Content Lists */}
            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-accent-500 rounded-full"></span>
                  本資料でわかること
                </h2>
                <ul className="grid gap-4">
                  {BENEFITS.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="bg-accent-500 text-white rounded-full p-1 mt-0.5">
                        <svg className="w-3 h-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium">{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              <section>
                <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-accent-500 rounded-full"></span>
                  このような方におすすめ
                </h2>
                <ul className="space-y-4">
                  {TARGETS.map((item, i) => (
                    <li key={i} className="flex items-start gap-3 text-gray-600">
                      <div className="w-1.5 h-1.5 bg-gray-300 rounded-full mt-2 flex-shrink-0"></div>
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </section>

              {/* Trust Section */}
              <section className="pt-8 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center lg:text-left">
                  TRUSTED BY INDUSTRY LEADERS
                </p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  {LOGOS.map((logo) => (
                    <div key={logo.name} className="relative h-8 w-full">
                      <Image
                        src={logo.path}
                        alt={logo.name}
                        fill
                        className="object-contain"
                      />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Sticky Form */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="lg:sticky lg:top-24 bg-white rounded-2xl shadow-2xl border border-gray-100 overflow-hidden">
              <div className="bg-primary-900 p-6 text-white text-center">
                <h3 className="text-lg font-bold">資料請求フォーム</h3>
                <p className="text-xs text-primary-300 mt-1">最短1分で入力完了します</p>
              </div>

              <div className="p-8">
                {/* Step Indicator */}
                <div className="mb-8 flex items-center justify-center gap-4">
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step >= 1 ? 'bg-accent-500 text-white' : 'bg-gray-100 text-gray-400'}`}>1</div>
                  <div className="h-px w-8 bg-gray-200"></div>
                  <div className={`flex items-center justify-center w-8 h-8 rounded-full text-xs font-bold transition-colors ${step >= 2 ? 'bg-accent-500 text-white' : 'bg-gray-100 text-gray-400'}`}>2</div>
                </div>

                <form className="space-y-5">
                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                      会社名 <span className="text-accent-600 !lowercase tracking-normal">(必須)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="株式会社 スカイフューチャー"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                      お名前 <span className="text-accent-600 !lowercase tracking-normal">(必須)</span>
                    </label>
                    <input
                      type="text"
                      placeholder="山田 太郎"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none"
                    />
                  </div>

                  <div className="space-y-2">
                    <label className="text-xs font-bold text-gray-500 uppercase flex items-center gap-2">
                      メールアドレス <span className="text-accent-600 !lowercase tracking-normal">(必須)</span>
                    </label>
                    <input
                      type="email"
                      placeholder="name@company.com"
                      className="w-full px-4 py-3 bg-gray-50 border border-gray-200 rounded-lg focus:ring-2 focus:ring-accent-500 focus:border-transparent transition-all outline-none"
                    />
                    <p className="text-[10px] text-gray-400">※企業ドメインのアドレスを入力してください</p>
                  </div>

                  <div className="pt-4">
                    <button
                      type="button"
                      className="w-full bg-accent-600 hover:bg-accent-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-accent-500/30 transition-all flex items-center justify-center gap-2 text-sm"
                    >
                      同意して資料をダウンロード
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                    <p className="mt-4 text-[10px] text-gray-400 text-center leading-relaxed">
                      送信することで、弊社の<Link href="#" className="underline hover:text-accent-600">プライバシーポリシー</Link>に同意したものとみなされます。
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>

        </div>
      </div>
    </div>
  )
}
