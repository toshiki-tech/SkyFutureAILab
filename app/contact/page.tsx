'use client'

import React, { useState } from 'react'
import Image from 'next/image'
import Link from 'next/link'

// フォームのステップ定義
type Step = 1 | 2 | 3

export default function ContactPage() {
  const [step, setStep] = useState<Step>(1)
  const [formData, setFormData] = useState({
    type: 'consulting',
    company: '',
    department: '',
    lastName: '',
    firstName: '',
    email: '',
    phone: '',
    content: '',
    privacy: false
  })

  // 入力変更ハンドラ
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target
    if (type === 'checkbox') {
      const checked = (e.target as HTMLInputElement).checked
      setFormData(prev => ({ ...prev, [name]: checked }))
    } else {
      setFormData(prev => ({ ...prev, [name]: value }))
    }
  }

  // 送信処理（モック）
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (step === 2) {
      setStep(3)
    }
  }

  const nextStep = () => setStep(2)
  const prevStep = () => setStep(1)

  return (
    <div className="min-h-screen bg-[#F8FAFC]">
      {/* ヒーローセクション */}
      <div className="bg-gradient-to-br from-[#1A213E] to-[#2D3661] py-16 text-white text-center">
        <h1 className="mb-4 text-4xl font-bold tracking-tight">Contact</h1>
        <p className="text-xl text-blue-100/80">ご相談・お問い合わせフォーム</p>
      </div>

      <div className="container mx-auto max-w-7xl px-6 py-16">
        <div className="grid gap-16 lg:grid-cols-2">

          {/* 左カラム：情報と信頼 */}
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
                  '社内教育やガバナンス構築に困っている'
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
                className="object-contain p-8"
              />
            </div>

            {/* 信頼性を示すセクション */}
            <div>
              <p className="mb-6 text-sm font-bold text-gray-400 uppercase tracking-widest text-center lg:text-left">
                SUPPORTING VARIOUS APPLICATIONS
              </p>
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-8 opacity-60">
                {['Microsoft 365', 'Power Platform', 'Dynamics 365', 'Azure OpenAI', 'Copilot'].map(tech => (
                  <span key={tech} className="text-xl font-bold text-gray-500">{tech}</span>
                ))}
              </div>
            </div>
          </div>

          {/* 右カラム：フォーム本体 */}
          <div className="relative">
            {step !== 3 ? (
              <div className="sticky top-24 rounded-3xl bg-white p-8 shadow-2xl shadow-blue-900/10 border border-gray-100">
                {/* ステップ表示 */}
                <div className="mb-10">
                  <div className="flex justify-between items-center px-4 relative">
                    <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0"></div>
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= 1 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>1</div>
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= 2 ? 'bg-blue-600 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>2</div>
                    <div className={`relative z-10 w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all duration-300 ${step >= 3 ? 'bg-green-500 text-white shadow-lg' : 'bg-white border-2 border-gray-200 text-gray-400'}`}>✓</div>
                  </div>
                  <div className="flex justify-between mt-2 text-[10px] sm:text-xs font-bold text-gray-400 uppercase tracking-wider">
                    <span className={step >= 1 ? 'text-blue-600' : ''}>会社情報</span>
                    <span className={step >= 2 ? 'text-blue-600' : ''}>お客様・内容</span>
                    <span className={step >= 3 ? 'text-blue-600' : ''}>送信完了</span>
                  </div>
                </div>

                <form onSubmit={handleSubmit} className="space-y-6">
                  {step === 1 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">お問い合わせ種別 <span className="ml-1 text-red-500">必須</span></label>
                        <div className="grid grid-cols-2 gap-4">
                          {['AI導入相談', 'DX支援・教育', '協業のご提案', 'その他'].map(type => (
                            <label key={type} className={`relative flex cursor-pointer items-center justify-center rounded-xl border-2 p-4 transition-all duration-200 ${formData.type === type ? 'border-blue-600 bg-blue-50 text-blue-600' : 'border-gray-100 hover:border-gray-200'}`}>
                              <input type="radio" name="type" value={type} className="sr-only" onChange={handleChange} checked={formData.type === type} />
                              <span className="text-sm font-bold">{type}</span>
                            </label>
                          ))}
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">会社名 <span className="ml-1 text-red-500">必須</span></label>
                        <input name="company" value={formData.company} onChange={handleChange} placeholder="株式会社スカイフューチャー" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all" required />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">部署名 <span className="ml-1 text-gray-400">任意</span></label>
                        <input name="department" value={formData.department} onChange={handleChange} placeholder="DX推進部" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all" />
                      </div>

                      <button type="button" onClick={nextStep} className="w-full rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95">
                        次へ進む
                      </button>
                    </div>
                  )}

                  {step === 2 && (
                    <div className="space-y-6 animate-in fade-in slide-in-from-right-4 duration-500">
                      <div className="grid grid-cols-2 gap-4">
                        <div>
                          <label className="mb-2 block text-sm font-bold text-gray-700">姓 <span className="ml-1 text-red-500">必須</span></label>
                          <input name="lastName" value={formData.lastName} onChange={handleChange} placeholder="山田" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all" required />
                        </div>
                        <div>
                          <label className="mb-2 block text-sm font-bold text-gray-700">名 <span className="ml-1 text-red-500">必須</span></label>
                          <input name="firstName" value={formData.firstName} onChange={handleChange} placeholder="太郎" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all" required />
                        </div>
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">メールアドレス <span className="ml-1 text-red-500">必須</span></label>
                        <input type="email" name="email" value={formData.email} onChange={handleChange} placeholder="name@company.com" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all" required />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">電話番号 <span className="ml-1 text-gray-400">任意</span></label>
                        <input type="tel" name="phone" value={formData.phone} onChange={handleChange} placeholder="03-1234-5678" className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all" />
                      </div>

                      <div>
                        <label className="mb-2 block text-sm font-bold text-gray-700">ご相談内容 <span className="ml-1 text-red-500">必須</span></label>
                        <textarea name="content" value={formData.content} onChange={handleChange} placeholder="具体的な課題、検討時期、ご予算などお気軽にご記入ください" rows={5} className="w-full rounded-xl border border-gray-200 bg-gray-50 px-4 py-3 focus:border-blue-600 focus:bg-white focus:outline-none transition-all resize-none" required />
                      </div>

                      <div className="flex items-center gap-3">
                        <input type="checkbox" id="privacy" name="privacy" checked={formData.privacy} onChange={handleChange} className="h-5 w-5 rounded border-gray-300 text-blue-600 focus:ring-blue-500" required />
                        <label htmlFor="privacy" className="text-sm text-gray-600">
                          <Link href="/privacy" className="text-blue-600 underline">プライバシーポリシー</Link>に同意する
                        </label>
                      </div>

                      <div className="flex gap-4">
                        <button type="button" onClick={prevStep} className="flex-1 rounded-2xl border-2 border-gray-200 py-4 font-bold text-gray-400 hover:bg-gray-50 transition-all">
                          戻る
                        </button>
                        <button type="submit" className="flex-[2] rounded-2xl bg-blue-600 py-4 text-lg font-bold text-white shadow-xl hover:bg-blue-700 transition-all hover:scale-[1.02] active:scale-95">
                          同意して送信する
                        </button>
                      </div>
                    </div>
                  )}
                </form>
              </div>
            ) : (
              <div className="sticky top-24 rounded-3xl bg-white p-12 text-center shadow-2xl shadow-blue-900/10 border border-gray-100 animate-in zoom-in-95 duration-500">
                <div className="mb-6 flex justify-center">
                  <div className="flex h-20 w-20 items-center justify-center rounded-full bg-green-100 text-green-500">
                    <svg className="h-10 w-10" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={3} d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                </div>
                <h2 className="mb-4 text-3xl font-bold text-gray-900">送信が完了しました</h2>
                <p className="mb-8 text-gray-600 leading-relaxed text-lg">
                  お問い合わせありがとうございます。<br />
                  担当者より、折り返しご連絡を差し上げます。
                </p>
                <Link href="/" className="inline-block rounded-2xl bg-gray-900 px-10 py-4 font-bold text-white hover:bg-gray-800 transition-all hover:scale-105 shadow-xl">
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
