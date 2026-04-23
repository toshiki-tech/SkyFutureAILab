'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import Breadcrumb from '@/components/Breadcrumb'
import DocumentMockup from '@/components/DocumentMockup'
import { FormField, ConsentCheckbox } from '@/components/ui'
import { validateEmail, validatePhone, validateRequired } from '@/lib/validators'

type BenefitIcon = 'star' | 'lightbulb' | 'chart' | 'yen'

const BENEFITS: { text: string; icon: BenefitIcon }[] = [
  { text: 'SkyFuture AI Lab が選ばれる3つの強み', icon: 'star' },
  { text: '生成AI導入の成功に向けた重要ポイント', icon: 'lightbulb' },
  { text: '業界別の最新AI活用事例（製造・IT・金融など）', icon: 'chart' },
  { text: 'サービスプラン・費用感の目安', icon: 'yen' },
]

const BENEFIT_ICON_PATHS: Record<BenefitIcon, string> = {
  star:
    'M11.48 3.499a.562.562 0 011.04 0l2.125 5.111a.563.563 0 00.475.345l5.518.442c.499.04.701.663.321.988l-4.204 3.602a.563.563 0 00-.182.557l1.285 5.385a.562.562 0 01-.84.61l-4.725-2.885a.562.562 0 00-.586 0L6.982 20.54a.562.562 0 01-.84-.61l1.285-5.386a.562.562 0 00-.182-.557l-4.204-3.602a.562.562 0 01.321-.988l5.518-.442a.563.563 0 00.475-.345L11.48 3.5z',
  lightbulb:
    'M12 18v-5.25m0 0a6.01 6.01 0 001.5-.189m-1.5.189a6.01 6.01 0 01-1.5-.189m3.75 7.478a12.06 12.06 0 01-4.5 0m3.75 2.355a7.5 7.5 0 01-3 0M3 16.5V16a9 9 0 119 9 9 9 0 01-9-8.5',
  chart:
    'M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z',
  yen: 'M12 6v12m-5-6h10m-10 3h10M8 6l4 6 4-6',
}

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

type FormState = {
  company: string
  lastName: string
  firstName: string
  email: string
  phone: string
  privacy: boolean
  website: string
}

type Errors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = {
  company: '',
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  privacy: false,
  website: '',
}

function validateAll(data: FormState): Errors {
  const errors: Errors = {}
  const companyErr = validateRequired(data.company, '会社名')
  if (companyErr) errors.company = companyErr
  const lastErr = validateRequired(data.lastName, 'お名前（姓）')
  if (lastErr) errors.lastName = lastErr
  const firstErr = validateRequired(data.firstName, 'お名前（名）')
  if (firstErr) errors.firstName = firstErr
  const emailErr = validateEmail(data.email)
  if (emailErr) errors.email = emailErr
  const phoneErr = validatePhone(data.phone, false)
  if (phoneErr) errors.phone = phoneErr
  if (!data.privacy) errors.privacy = '個人情報保護方針への同意が必要です'
  return errors
}

export default function RequestDocumentPage() {
  const [data, setData] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [submitted, setSubmitted] = useState(false)

  const update = <K extends keyof FormState>(key: K, value: FormState[K]) => {
    setData((prev) => ({ ...prev, [key]: value }))
    if (errors[key]) {
      setErrors((prev) => {
        const next = { ...prev }
        delete next[key]
        return next
      })
    }
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const errs = validateAll(data)
    if (Object.keys(errs).length > 0) {
      setErrors(errs)
      return
    }
    if (data.website) {
      return
    }
    console.log('[request] submit', { ...data, website: undefined })
    setSubmitted(true)
  }

  return (
    <div className="min-h-screen bg-white">
      <div className="bg-[#F8FAFC] border-b border-gray-100">
        <div className="container mx-auto px-6 pt-8 pb-12 max-w-7xl">
          <Breadcrumb items={[{ label: 'ホーム', href: '/' }, { label: '資料請求' }]} />
          <div className="mt-8 max-w-3xl">
            <span className="inline-block px-3 py-1 bg-accent-100 text-accent-700 text-xs font-bold rounded-full mb-4">
              RESOURCES
            </span>
            <h1 className="text-3xl md:text-5xl font-black text-primary-900 leading-tight">
              AI導入の第一歩を支える<br />
              総合サービス紹介資料
            </h1>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-6 py-16 max-w-7xl">
        <div className="flex flex-col lg:flex-row gap-16 relative">
          {/* Left Column: Content */}
          <div className="flex-grow lg:max-w-[60%]">
            <div className="mb-12 flex justify-center lg:justify-start">
              <DocumentMockup />
            </div>

            <div className="space-y-12">
              <section>
                <h2 className="text-xl font-bold text-primary-900 mb-6 flex items-center gap-3">
                  <span className="w-1.5 h-6 bg-accent-500 rounded-full"></span>
                  本資料でわかること
                </h2>
                <ul className="grid gap-4">
                  {BENEFITS.map((item, i) => (
                    <li key={i} className="flex items-start gap-4 p-4 bg-gray-50 rounded-xl border border-gray-100">
                      <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-accent-100 text-accent-600">
                        <svg className="h-5 w-5" fill="none" stroke="currentColor" strokeWidth={1.8} viewBox="0 0 24 24">
                          <path strokeLinecap="round" strokeLinejoin="round" d={BENEFIT_ICON_PATHS[item.icon]} />
                        </svg>
                      </div>
                      <span className="text-gray-700 font-medium leading-relaxed pt-1.5">{item.text}</span>
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

              <section className="pt-8 border-t border-gray-100">
                <p className="text-sm font-bold text-gray-400 uppercase tracking-widest mb-6 text-center lg:text-left">
                  TRUSTED BY INDUSTRY LEADERS
                </p>
                <div className="grid grid-cols-3 md:grid-cols-6 gap-8 items-center opacity-70 grayscale hover:grayscale-0 transition-all duration-500">
                  {LOGOS.map((logo) => (
                    <div key={logo.name} className="relative h-8 w-full">
                      <Image src={logo.path} alt={logo.name} fill className="object-contain" />
                    </div>
                  ))}
                </div>
              </section>
            </div>
          </div>

          {/* Right Column: Sticky Form */}
          <div className="lg:w-[400px] flex-shrink-0">
            <div className="lg:sticky lg:top-24 space-y-4">
              <div className="flex items-center gap-3 rounded-2xl border border-accent-200 bg-accent-50 px-5 py-4 text-accent-700">
                <svg className="h-5 w-5 flex-shrink-0" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
                <div className="text-xs font-semibold leading-relaxed">
                  <span className="block text-sm font-bold">3 分で完了 / 即時ダウンロード</span>
                  <span className="text-accent-600">入力後すぐに PDF をお送りします（メール配信）</span>
                </div>
              </div>

              {!submitted ? (
                <div className="bg-white rounded-2xl shadow-2xl border border-gray-100">
                  <div className="bg-primary-900 p-6 text-white text-center rounded-t-2xl">
                    <h3 className="text-lg font-bold">資料請求フォーム</h3>
                    <p className="text-xs text-primary-300 mt-1">最短 3 分で入力完了します</p>
                  </div>

                  <form onSubmit={handleSubmit} className="p-8 space-y-5" noValidate>
                    {/* Honeypot */}
                    <div aria-hidden="true" className="hidden">
                      <label htmlFor="request-website">Website</label>
                      <input
                        id="request-website"
                        name="website"
                        type="text"
                        tabIndex={-1}
                        autoComplete="off"
                        value={data.website}
                        onChange={(e) => update('website', e.target.value)}
                      />
                    </div>

                    <FormField
                      id="request-company"
                      name="company"
                      label="会社名"
                      required
                      autoComplete="organization"
                      placeholder="株式会社スカイフューチャー"
                      value={data.company}
                      onChange={(v) => update('company', v)}
                      error={errors.company}
                    />

                    <div className="grid grid-cols-2 gap-3">
                      <FormField
                        id="request-lastName"
                        name="lastName"
                        label="姓"
                        required
                        autoComplete="family-name"
                        placeholder="山田"
                        value={data.lastName}
                        onChange={(v) => update('lastName', v)}
                        error={errors.lastName}
                      />
                      <FormField
                        id="request-firstName"
                        name="firstName"
                        label="名"
                        required
                        autoComplete="given-name"
                        placeholder="太郎"
                        value={data.firstName}
                        onChange={(v) => update('firstName', v)}
                        error={errors.firstName}
                      />
                    </div>

                    <FormField
                      id="request-email"
                      name="email"
                      type="email"
                      label="メールアドレス"
                      required
                      autoComplete="email"
                      placeholder="name@company.com"
                      hint="企業ドメインのメールアドレスを推奨します"
                      value={data.email}
                      onChange={(v) => update('email', v)}
                      error={errors.email}
                    />

                    <FormField
                      id="request-phone"
                      name="phone"
                      type="tel"
                      label="電話番号"
                      autoComplete="tel"
                      placeholder="03-1234-5678"
                      value={data.phone}
                      onChange={(v) => update('phone', v)}
                      error={errors.phone}
                    />

                    <ConsentCheckbox
                      id="request-privacy"
                      name="privacy"
                      checked={data.privacy}
                      onChange={(c) => update('privacy', c)}
                      error={errors.privacy}
                    />

                    <button
                      type="submit"
                      disabled={!data.privacy}
                      className="w-full bg-accent-600 hover:bg-accent-700 text-white font-bold py-4 rounded-xl shadow-lg shadow-accent-500/30 transition-all flex items-center justify-center gap-2 text-sm disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:shadow-none"
                    >
                      同意して資料をダウンロード
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </button>
                  </form>
                </div>
              ) : (
                <div
                  className="rounded-2xl bg-white p-10 text-center shadow-2xl border border-gray-100 animate-in zoom-in-95 duration-500"
                  role="status"
                  aria-live="polite"
                >
                  <div className="mb-5 flex justify-center">
                    <div className="flex h-16 w-16 items-center justify-center rounded-full bg-success-50 text-success-700">
                      <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                  </div>
                  <h3 className="mb-3 text-2xl font-bold text-gray-900">送信完了</h3>
                  <p className="mb-6 text-sm text-gray-600 leading-relaxed">
                    ご入力いただいたメールアドレス宛に、<br />
                    資料のダウンロードリンクをお送りしました。<br />
                    3 営業日以内にご返信します。
                  </p>
                  <Link
                    href="/"
                    className="inline-block rounded-xl bg-primary-900 px-8 py-3 text-sm font-bold text-white hover:bg-primary-800 transition-all hover:scale-105 shadow-lg"
                  >
                    トップページへ戻る
                  </Link>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
