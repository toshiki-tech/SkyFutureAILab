import type { Metadata } from 'next'

export const metadata: Metadata = {
  title: '資料請求 | SkyFuture AI Lab',
  description: 'サービス資料のご請求フォームです。',
}

export default function RequestDocumentPage() {
  return (
    <div className="container mx-auto px-4 py-12">
      <h1 className="text-3xl font-bold">資料請求</h1>
      <p className="mt-3 text-gray-600">
        サービス資料のご請求はこちらからお申し込みください。
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
          資料請求を送信
        </button>
      </form>
    </div>
  )
}
