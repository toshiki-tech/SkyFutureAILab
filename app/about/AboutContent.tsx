'use client'

import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import SectionHero from '@/components/SectionHero'

function ClientLogo({ client }: { client: { name: string; slug: string } }) {
    const [imageError, setImageError] = useState(false)

    return (
        <div className="group relative overflow-hidden rounded-2xl border border-gray-100 bg-white p-8 shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-accent-100 flex flex-col items-center justify-center min-h-[160px]">
            {/* Hover Overlay */}
            <div className="absolute inset-0 bg-accent-500/0 transition-colors duration-300 group-hover:bg-accent-500/5 pointer-events-none"></div>
            <div className="relative h-16 w-full flex items-center justify-center grayscale group-hover:grayscale-0 transition-all duration-300">
                {!imageError ? (
                    <Image
                        src={`/images/logos/${client.slug}.png`}
                        alt={client.name}
                        fill
                        className="object-contain p-2"
                        onError={() => setImageError(true)}
                    />
                ) : (
                    <div className="text-center font-bold text-gray-400 group-hover:text-primary-600 transition-colors">
                        {client.slug === 'microsoft' ? (
                            <div className="flex items-center gap-2">
                                <div className="grid grid-cols-2 gap-0.5 w-6 h-6">
                                    <div className="bg-[#f25022] w-full h-full"></div>
                                    <div className="bg-[#7fbb00] w-full h-full"></div>
                                    <div className="bg-[#00a1f1] w-full h-full"></div>
                                    <div className="bg-[#ffbb00] w-full h-full"></div>
                                </div>
                                <span className="text-xl">Microsoft</span>
                            </div>
                        ) : client.name}
                    </div>
                )}
            </div>
        </div>
    )
}

export default function AboutContent() {
    const [isMounted, setIsMounted] = useState(false)

    useEffect(() => {
        setIsMounted(true)
    }, [])

    return (
        <div className="min-h-screen bg-[#F8FAFC]">
            <SectionHero
                title="未来を、AIと共創する。"
                description="Microsoft 365・Power Platform・生成AI。テクノロジーの力で、企業のデジタルトランスフォーメーションを加速させます。"
                bgImage="/images/about-hero.png"
                breadcrumbs={[
                    { label: 'ホーム', href: '/' },
                    { label: '会社紹介' },
                ]}
            />

            <div className="container mx-auto px-6 py-12 max-w-7xl">

                {/* イントロダクション */}
                <section className="py-20 border-b border-gray-100">
                    <div className="mx-auto max-w-4xl text-center">
                        <h2 className="mb-8 text-3xl font-bold text-gray-900 md:text-5xl tracking-tight leading-tight">
                            2013年の創業から、<br />Microsoftソリューションの可能性を追求し続けています。
                        </h2>
                        <div className="prose prose-lg mx-auto text-gray-600 leading-loose">
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
                </section>

                {/* 社長ご挨拶 */}
                <section className="py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">社長ご挨拶</h2>
                        <div className="mt-2 h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid lg:grid-cols-2 gap-16 items-center bg-white rounded-[3rem] p-8 lg:p-16 shadow-2xl shadow-primary-900/5">
                        <div className="relative aspect-[4/5] w-full overflow-hidden rounded-2xl shadow-xl">
                            <Image
                                src="/images/ceo-portrait.png"
                                alt="Representative Director 中村拓実"
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-gray-900/80 to-transparent p-8 text-white">
                                <p className="text-sm font-bold uppercase tracking-widest opacity-80">Representative Director</p>
                                <p className="text-3xl font-bold">中村 拓実</p>
                            </div>
                        </div>

                        <div className="space-y-8">
                            <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-tight break-keep overflow-wrap-normal">
                                「技術者は、技術者のままではいけない」
                            </h3>
                            <div className="space-y-6 text-lg text-gray-600 leading-relaxed">
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
                </section>

                {/* 企業理念 */}
                <section className="py-24 bg-gray-50 -mx-6 px-6 rounded-[4rem]">
                    <div className="container mx-auto max-w-7xl">
                        <div className="mb-16 text-center">
                            <h2 className="text-4xl font-bold text-gray-900 tracking-tight">企業理念</h2>
                            <div className="mt-2 h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                        </div>

                        <div className="grid gap-8 lg:grid-cols-3">
                            {/* 経営理念 */}
                            <div className="group relative rounded-3xl bg-white p-10 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z" />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-900">経営理念</h3>
                                <p className="mb-6 font-bold text-accent-600">お客様から得る信頼評価を第一に重視</p>
                                <p className="text-gray-600 leading-relaxed">
                                    ITプロフェッショナルとしてのサービス提供を行い、Win-Winのパートナー関係構築を目指します。事象を科学的に分析し、人材育成と自己研鑚により資質の向上をめざします。
                                </p>
                            </div>

                            {/* 社員憲章 */}
                            <div className="group relative rounded-3xl bg-white p-10 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-accent-50 text-accent-600 group-hover:bg-accent-600 group-hover:text-white transition-colors">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 6.253v13m0-13C10.832 5.477 9.246 5 7.5 5S4.168 5.477 3 6.253v13C4.168 18.477 5.754 18 7.5 18s3.332.477 4.5 1.253m0-13C13.168 5.477 14.754 5 16.5 5c1.747 0 3.332.477 4.5 1.253v13C19.832 18.477 18.247 18 16.5 18c-1.746 0-3.332.477-4.5 1.253" />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-900">社員憲章</h3>
                                <p className="mb-6 font-bold text-accent-600">仕事を「貰う」のではなく「取る」こと</p>
                                <p className="text-gray-600 leading-relaxed">
                                    リーダーの立場で仕事を進め、常に探究心を持つこと。将来を見据えて着実に行動し、プロフェッショナルとして自立した行動を徹底します。
                                </p>
                            </div>

                            {/* 企業使命 */}
                            <div className="group relative rounded-3xl bg-white p-10 shadow-xl transition-all hover:-translate-y-2 hover:shadow-2xl">
                                <div className="mb-8 flex h-14 w-14 items-center justify-center rounded-2xl bg-green-50 text-green-600 group-hover:bg-green-600 group-hover:text-white transition-colors">
                                    <svg className="h-8 w-8" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                                    </svg>
                                </div>
                                <h3 className="mb-4 text-2xl font-bold text-gray-900">企業使命</h3>
                                <p className="mb-6 font-bold text-green-600">技術者の価値向上と社会貢献を目指す</p>
                                <p className="text-gray-600 leading-relaxed">
                                    技術力だけでなく、管理能力と経営能力を身につけ、責任感を高める。IT市場の変化に対応し、真の技術者として社会に貢献します。
                                </p>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 会社の歩み */}
                <section className="py-24">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">会社の歩み</h2>
                        <div className="mt-2 h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="mx-auto max-w-4xl">
                        <div className="relative border-l-2 border-primary-100 ml-4 md:ml-0 md:before:absolute md:before:left-1/2 md:before:h-full md:before:w-0.5 md:before:bg-primary-100 md:border-l-0">
                            {[
                                { year: '2013', month: '12', title: '会社設立', text: 'スカイフューチャー株式会社設立。Dynamics CRMに特化したサービスを開始。' },
                                { year: '2015', month: '06', title: 'Dynamics CRM専門化', text: 'Microsoft Dynamics CRMのスペシャリスト集団として、多くの導入実績を積み上げる。' },
                                { year: '2017', month: '10', title: 'Dynamics 365移行', text: 'クラウド化の流れに合わせ、Dynamics 365への移行支援とサービス拡充を実施。' },
                                { year: '2019', month: '04', title: 'Power Platform導入', text: 'Power Apps, Power BI等のローコード開発支援を開始。' },
                                { year: '2021', month: '09', title: 'ISMS認証取得', text: '情報セキュリティマネジメントシステム（ISO/IEC 27001:2013）の認証を取得。' },
                                { year: '2023', month: '03', title: '本社移転', text: '事業拡大に伴い、東京都豊島区西巣鴨に本社を移転。' },
                            ].map((item, i) => (
                                <div key={i} className={`relative mb-12 md:flex md:justify-between items-center ${i % 2 === 0 ? 'md:flex-row-reverse' : ''}`}>
                                    <div className="hidden md:block w-[45%]"></div>
                                    <div className="absolute left-[-9px] md:left-1/2 md:translate-x-[-50%] flex h-4 w-4 items-center justify-center rounded-full bg-primary-600 shadow-[0_0_0_4px_rgba(37,99,235,0.1)] z-10"></div>
                                    <div className="w-full md:w-[45%] rounded-2xl bg-white p-6 shadow-lg border border-gray-100 transition-all hover:border-primary-200">
                                        <div className="mb-2 flex items-center gap-2">
                                            <span className="text-2xl font-bold text-primary-600">{item.year}</span>
                                            <span className="text-sm font-bold text-gray-400">/{item.month}</span>
                                        </div>
                                        <h3 className="mb-2 text-xl font-bold text-gray-900">{item.title}</h3>
                                        <p className="text-gray-600 leading-relaxed">{item.text}</p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* 会社概要 & アクセス */}
                <section className="mb-32">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">会社情報</h2>
                        <div className="mt-2 h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                    </div>

                    <div className="grid gap-8 lg:grid-cols-5">
                        {/* 会社概要テーブル */}
                        <div className="lg:col-span-2">
                            <div className="h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50">
                                <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <svg className="h-5 w-5 text-primary-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                        企業プロフィール
                                    </h3>
                                </div>
                                <table className="w-full text-left">
                                    <tbody className="divide-y divide-gray-100">
                                        {[
                                            { label: '商号', value: 'スカイフューチャー株式会社' },
                                            { label: '所在地', value: '〒170-0001 東京都豊島区西巣鴨2丁目1-19 双葉ビル2F' },
                                            { label: '設立', value: '2013年12月' },
                                            { label: '資本金', value: '3,000万円' },
                                            { label: '代表者', value: '代表取締役 中村拓実' },
                                            { label: '従業員数', value: '42名 (2024年4月現在)' },
                                            { label: '主要銀行', value: '三井住友銀行' },
                                            { label: '認証', value: 'ISMS (ISO27001)' },
                                        ].map((item, i) => (
                                            <tr key={i} className="flex flex-col border-none">
                                                <th className="px-8 pt-4 pb-1 text-xs font-bold text-primary-600 uppercase tracking-widest">
                                                    {item.label}
                                                </th>
                                                <td className="px-8 pb-4 pt-1 text-base font-medium text-gray-900 border-none">
                                                    {item.value}
                                                </td>
                                            </tr>
                                        ))}
                                    </tbody>
                                </table>
                            </div>
                        </div>

                        {/* アクセスマップ */}
                        <div className="lg:col-span-3">
                            <div className="h-full overflow-hidden rounded-3xl border border-gray-200 bg-white shadow-xl shadow-gray-200/50 flex flex-col">
                                <div className="bg-gray-50/50 px-8 py-4 border-b border-gray-100 flex justify-between items-center">
                                    <h3 className="font-bold text-gray-900 flex items-center gap-2">
                                        <svg className="h-5 w-5 text-accent-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                        </svg>
                                        アクセス
                                    </h3>
                                    <a
                                        href="https://maps.google.com/?q=〒170-0001 東京都豊島区西巣鴨2丁目1-19 双葉ビル"
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="text-sm font-bold text-primary-600 hover:text-primary-700 transition-colors"
                                    >
                                        Googleマップで見る →
                                    </a>
                                </div>
                                <div className="flex-grow min-h-[400px] w-full relative">
                                    {isMounted && (
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3238.563!2d139.728!3d35.742!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x6018928000000001%3A0x0!2z44CSMTcwLTAwMDEg5p2x5Lqs6YO96LGK5bO25Yy66KW_5bej6bSY77yS5LiB55uu77yR77yN77yR77yZIOWPjOitieiビル!5e0!3m2!1sja!2sjp!4v1700000000000!5m2!1sja!2sjp"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen={true}
                                            loading="lazy"
                                            title="スカイフューチャー株式会社 所在地"
                                            className="absolute inset-0"
                                        ></iframe>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </section>

                {/* 主要取引先 */}
                <section className="mb-32">
                    <div className="mb-16 text-center">
                        <h2 className="text-4xl font-bold text-gray-900 tracking-tight">主要取引先</h2>
                        <div className="mt-2 h-1 w-20 bg-primary-600 mx-auto rounded-full"></div>
                        <p className="mt-4 text-gray-500">豊富な実績と信頼のパートナーシップ</p>
                    </div>
                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                        {[
                            { name: 'アバナード株式会社', slug: 'avanade' },
                            { name: 'SCSK株式会社', slug: 'scsk' },
                            { name: 'NTTコミュニケーションズ株式会社', slug: 'ntt-com' },
                            { name: '株式会社シーイーシー', slug: 'cec' },
                            { name: 'アクセンチュア株式会社', slug: 'accenture' },
                            { name: 'NTTコムウェア株式会社', slug: 'ntt-comware' },
                            { name: '日本マイクロソフト株式会社', slug: 'microsoft' },
                            { name: '日本ビジネスシステムズ株式会社', slug: 'jbs' },
                        ].map((client, i) => (
                            <ClientLogo key={i} client={client} />
                        ))}
                    </div>
                </section>
            </div>
        </div>
    )
}
