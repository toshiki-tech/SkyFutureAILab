'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'
import { FormField, ConsentCheckbox } from '@/components/ui'
import { validateEmail, validatePhone, validateRequired } from '@/lib/validators'

type Step = 1 | 2 | 3 | 4

const STEP_LABELS: Record<1 | 2 | 3, string> = {
  1: '会社情報',
  2: 'お客様情報',
  3: 'ご相談内容',
}

type FormState = {
  type: string
  company: string
  department: string
  lastName: string
  firstName: string
  email: string
  phone: string
  content: string
  privacy: boolean
  website: string
}

type Errors = Partial<Record<keyof FormState, string>>

const INITIAL: FormState = {
  type: 'AI導入相談',
  company: '',
  department: '',
  lastName: '',
  firstName: '',
  email: '',
  phone: '',
  content: '',
  privacy: false,
  website: '',
}

function validateStep(step: 1 | 2 | 3, data: FormState): Errors {
  const errors: Errors = {}
  if (step === 1) {
    const err = validateRequired(data.company, '会社名')
    if (err) errors.company = err
  }
  if (step === 2) {
    const lastErr = validateRequired(data.lastName, '姓')
    if (lastErr) errors.lastName = lastErr
    const firstErr = validateRequired(data.firstName, '名')
    if (firstErr) errors.firstName = firstErr
    const emailErr = validateEmail(data.email)
    if (emailErr) errors.email = emailErr
    const phoneErr = validatePhone(data.phone, false)
    if (phoneErr) errors.phone = phoneErr
  }
  if (step === 3) {
    const contentErr = validateRequired(data.content, 'ご相談内容')
    if (contentErr) errors.content = contentErr
    if (!data.privacy) errors.privacy = '個人情報保護方針への同意が必要です'
  }
  return errors
}

export default function ContactPage() {
  const [step, setStep] = useState<Step>(1)
  const [data, setData] = useState<FormState>(INITIAL)
  const [errors, setErrors] = useState<Errors>({})
  const [submitting, setSubmitting] = useState(false)
  const [submitError, setSubmitError] = useState<string | null>(null)

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

  const goNext = () => {
    if (step >= 3) return
    const e = validateStep(step as 1 | 2 | 3, data)
    if (Object.keys(e).length > 0) {
      setErrors(e)
      return
    }
    setErrors({})
    setStep((step + 1) as Step)
  }
  const goPrev = () => {
    if (step <= 1) return
    setErrors({})
    setStep((step - 1) as Step)
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (step !== 3 || submitting) return
    const allErrors: Errors = {
      ...validateStep(1, data),
      ...validateStep(2, data),
      ...validateStep(3, data),
    }
    if (Object.keys(allErrors).length > 0) {
      setErrors(allErrors)
      return
    }

    setSubmitError(null)
    setSubmitting(true)
    try {
      const res = await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          type: data.type,
          company: data.company,
          department: data.department,
          lastName: data.lastName,
          firstName: data.firstName,
          email: data.email,
          phone: data.phone,
          content: data.content,
          privacy: data.privacy,
          website: data.website,
        }),
      })
      if (!res.ok) {
        const body = await res.json().catch(() => ({}))
        setSubmitError(body?.error || '送信に失敗しました。しばらくしてから再度お試しください。')
        return
      }
      setStep(4)
    } catch (err) {
      setSubmitError('ネットワークエラーが発生しました。接続を確認のうえ、再度お試しください。')
    } finally {
      setSubmitting(false)
    }
  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLFormElement>) => {
    if (e.key !== 'Enter') return
    const target = e.target as HTMLElement
    if (target.tagName === 'TEXTAREA') return
    if (step !== 3) {
      e.preventDefault()
    }
  }

  const isInputStep = step >= 1 && step <= 3

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      <div className="bg-gradient-to-br from-[#1A213E] to-[#2D3661] py-16 text-white text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-xl text-blue-100/80">ご相談・お問い合わせフォーム</p>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-2">
          <div className="space-y-12">
            <div>
              <h2 className="mb-6 text-3xl font-bold text-gray-900 leading-tight">
                AI導入・DX支援のプロが<br />
                貴社の課題を直接伺います
              </h2>
              <p className="text-lg text-gray-600 mb-8 leading-relaxed">
                現在の課題、やりたいこと、まだ具体的でないお悩みでも構いません。原則として、1営業日以内に担当者よりご連絡いたします。
              </p>

              <ul className="space-y-4">
                {[
                  '要件が固まっていない状態での壁打ちをしたい',
                  '具体的な費用感やスケジュールを知りたい',
                  '導入済みのツールの活用方法を相談したい',
                  '社内教育やガバナンス構築に困っている',
                ].map((text, i) => (
                  <li key={i} className="flex items-start gap-3">
                    <div className="flex-shrink-0 mt-1">
                      <svg className="h-6 w-6 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <span className="text-gray-700 font-medium leading-relaxed">{text}</span>
                  </li>
                ))}
              </ul>
            </div>

            <div className="relative aspect-video w-full overflow-hidden rounded-2xl bg-white shadow-xl">
              <Image
                src="/images/contact-illustration.png"
                alt="Business Consultation"
                fill
                sizes="(max-width: 1024px) 100vw, 50vw"
                className="object-contain p-8"
              />
            </div>

            <div>
              <p className="mb-6 text-sm font-bold text-gray-400 uppercase tracking-widest text-center lg:text-left">
                SUPPORTING VARIOUS APPLICATIONS
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
                {['Microsoft 365', 'Power Platform', 'Dynamics 365', 'Azure OpenAI', 'Copilot'].map((tech) => (
                  <span key={tech} className="text-xl font-bold text-gray-500">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          <div className="relative">
            {isInputStep ? (
              <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-2xl shadow-blue-900/10 border border-gray-100">
                <div className="mb-10">
                  <div className="mb-3 flex items-center justify-between text-xs font-bold text-gray-400 uppercase tracking-widest">
                    <span>Step {step} / 3</span>
                    <span className="text-accent-600">{STEP_LABELS[step as 1 | 2 | 3]}</span>
                  </div>
                  <div className="flex items-center gap-2" aria-hidden="true">
                    {[1, 2, 3].map((n) => (
                      <div
                        key={n}
                        className={`h-1.5 flex-1 rounded-full transition-colors duration-300 ${
                          step >= n ? 'bg-accent-500' : 'bg-gray-200'
                        }`}
                      />
                    ))}
                  </div>
                </div>

                <form
                  onSubmit={handleSubmit}
                  onKeyDown={handleKeyDown}
                  className="space-y-6"
                  noValidate
                >
                  {/* Honeypot */}
                  <div aria-hidden="true" className="hidden">
                    <label htmlFor="contact-website">Website</label>
                    <input
                      id="contact-website"
                      name="website"
                      type="text"
                      tabIndex={-1}
                      autoComplete="off"
                      value={data.website}
                      onChange={(e) => update('website', e.target.value)}
                    />
                  </div>

                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <fieldset className="space-y-2">
                        <legend className="block text-sm font-bold text-gray-700">
                          お問い合わせ種別
                          <span className="ml-1 text-error-500" aria-hidden="true">*</span>
                        </legend>
                        <div className="grid grid-cols-2 gap-4">
                          {['AI導入相談', 'DX支援・教育', '協業のご提案', 'その他'].map((type) => (
                            <label
                              key={type}
                              className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 p-4 transition-all duration-200 ${
                                data.type === type
                                  ? 'border-accent-500 bg-accent-50 text-accent-700'
                                  : 'border-gray-100 hover:border-gray-300'
                              }`}
                            >
                              <input
                                type="radio"
                                name="type"
                                value={type}
                                className="sr-only"
                                checked={data.type === type}
                                onChange={() => update('type', type)}
                              />
                              <span className="text-sm font-bold">{type}</span>
                            </label>
                          ))}
                        </div>
                      </fieldset>

                      <FormField
                        id="contact-company"
                        name="company"
                        label="会社名"
                        required
                        autoComplete="organization"
                        placeholder="株式会社スカイフューチャー"
                        value={data.company}
                        onChange={(v) => update('company', v)}
                        error={errors.company}
                      />

                      <FormField
                        id="contact-department"
                        name="department"
                        label="部署名"
                        autoComplete="organization-title"
                        placeholder="DX推進部"
                        value={data.department}
                        onChange={(v) => update('department', v)}
                      />

                      <button
                        type="button"
                        onClick={goNext}
                        className="w-full rounded-2xl bg-primary-900 py-4 text-lg font-bold text-white shadow-xl hover:bg-primary-800 transition-all hover:scale-[1.02] active:scale-95"
                      >
                        次へ進む
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-2 gap-4">
                        <FormField
                          id="contact-lastName"
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
                          id="contact-firstName"
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
                        id="contact-email"
                        name="email"
                        type="email"
                        label="メールアドレス"
                        required
                        autoComplete="email"
                        placeholder="name@company.com"
                        value={data.email}
                        onChange={(v) => update('email', v)}
                        error={errors.email}
                      />

                      <FormField
                        id="contact-phone"
                        name="phone"
                        type="tel"
                        label="電話番号"
                        autoComplete="tel"
                        placeholder="03-1234-5678"
                        value={data.phone}
                        onChange={(v) => update('phone', v)}
                        error={errors.phone}
                      />

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={goPrev}
                          className="flex-1 rounded-2xl border-2 border-gray-200 py-4 font-bold text-gray-500 hover:bg-gray-50 transition-all"
                        >
                          戻る
                        </button>
                        <button
                          type="button"
                          onClick={goNext}
                          className="flex-[2] rounded-2xl bg-primary-900 py-4 text-lg font-bold text-white shadow-xl hover:bg-primary-800 transition-all hover:scale-[1.02] active:scale-95"
                        >
                          次へ進む
                        </button>
                      </div>
                    </div>
                  )}

                  {step === 3 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <FormField
                        id="contact-content"
                        name="content"
                        type="textarea"
                        label="ご相談内容"
                        required
                        placeholder="具体的な課題、検討時期、ご予算などお気軽にご記入ください"
                        rows={6}
                        value={data.content}
                        onChange={(v) => update('content', v)}
                        error={errors.content}
                      />

                      <ConsentCheckbox
                        id="contact-privacy"
                        name="privacy"
                        checked={data.privacy}
                        onChange={(c) => update('privacy', c)}
                        error={errors.privacy}
                      />

                      {submitError && (
                        <div
                          role="alert"
                          className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
                        >
                          {submitError}
                        </div>
                      )}

                      <div className="flex gap-4">
                        <button
                          type="button"
                          onClick={goPrev}
                          disabled={submitting}
                          className="flex-1 rounded-2xl border-2 border-gray-200 py-4 font-bold text-gray-500 hover:bg-gray-50 transition-all disabled:cursor-not-allowed disabled:opacity-50"
                        >
                          戻る
                        </button>
                        <button
                          type="submit"
                          disabled={!data.privacy || submitting}
                          className="flex-[2] rounded-2xl bg-accent-600 py-4 text-lg font-bold text-white shadow-xl transition-all hover:bg-accent-700 hover:scale-[1.02] active:scale-95 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:text-gray-500 disabled:hover:scale-100 disabled:shadow-none"
                        >
                          {submitting ? '送信中...' : '同意して送信する'}
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div
                className="sticky top-24 rounded-3xl bg-white p-12 text-center shadow-2xl shadow-blue-900/10 border border-gray-100 animate-in zoom-in-95 duration-500"
                role="status"
                aria-live="polite"
              >
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-success-50 text-success-700">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">送信完了</h2>
                <p className="mb-8 text-gray-600 leading-relaxed text-lg">
                  3 営業日以内にご返信します。<br />
                  お急ぎの場合はお電話でもご連絡ください。
                </p>
                <Link
                  href="/"
                  className="inline-block rounded-2xl bg-primary-900 px-10 py-4 font-bold text-white hover:bg-primary-800 transition-all hover:scale-105 shadow-xl"
                >
                  トップページへ戻る
                </Link>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  )
}
