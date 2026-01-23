import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '無料相談 | SkyFuture AI Lab',
  description: '無料相談フォームです。',
}

export default function FreeConsultationPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">無料相談</h1>
      <p className="mt-3 text-gray-600">
        Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援に関するご相談はこちらから。
      </p>
      <form className="mt-8 grid gap-4 max-w-xl">
        <label className="grid gap-2 text-sm">
          会社名
          <input className="rounded border border-gray-300 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm">
          ご担当者名
          <input className="rounded border border-gray-300 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm">
          メールアドレス
          <input type="email" className="rounded border border-gray-300 px-3 py-2" />
        </label>
        <label className="grid gap-2 text-sm">
          ご相談内容
          <textarea className="rounded border border-gray-300 px-3 py-2" rows={4} />
        </label>
        <button
          type="submit"
          className="rounded bg-blue-600 px-4 py-2 text-sm font-semibold text-white"
        >
          無料相談を送信
        </button>
      </form>
    </div>
  )
}
