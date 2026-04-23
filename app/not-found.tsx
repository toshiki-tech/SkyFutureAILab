import Link from 'next/link'
import { Button } from '@/components/ui'
import { NAV_LINKS } from '@/lib/constants'

export default function NotFound() {
  return (
    <div className="flex min-h-[70vh] flex-col items-center justify-center bg-gradient-to-b from-gray-50 to-white px-6 py-16">
      <div className="w-full max-w-2xl text-center">
        <p className="mb-2 text-sm font-bold tracking-[0.3em] text-accent-600">
          NOT FOUND
        </p>
        <h1 className="mb-4 text-6xl font-bold text-gray-900 md:text-7xl">404</h1>
        <h2 className="mb-4 text-xl font-semibold text-gray-800 md:text-2xl">
          ページが見つかりません
        </h2>
        <p className="mb-10 text-base text-gray-600 md:text-lg">
          お探しのページは移動または削除された可能性があります。
          <br />
          下記からお探しの情報にアクセスしてください。
        </p>

        <form
          action="/search"
          method="get"
          className="mx-auto mb-10 flex w-full max-w-md overflow-hidden rounded-xl border border-gray-200 bg-white shadow-sm focus-within:border-accent-500 focus-within:ring-2 focus-within:ring-accent-500/20"
          role="search"
        >
          <label htmlFor="nf-search" className="sr-only">
            サイト内検索
          </label>
          <input
            id="nf-search"
            name="q"
            type="search"
            placeholder="キーワードで検索"
            className="flex-1 bg-transparent px-4 py-3 text-sm text-gray-900 placeholder:text-gray-400 focus:outline-none"
          />
          <button
            type="submit"
            className="flex items-center justify-center bg-primary-900 px-5 text-white transition hover:bg-primary-800"
            aria-label="検索する"
          >
            <svg className="h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
            </svg>
          </button>
        </form>

        <div className="mb-10">
          <p className="mb-4 text-xs font-bold uppercase tracking-widest text-gray-400">
            人気のページ
          </p>
          <div className="flex flex-wrap items-center justify-center gap-3">
            {NAV_LINKS.filter((link) => link.href !== '/').map((link) => (
              <Link
                key={link.href}
                href={link.href}
                className="rounded-lg border border-gray-200 bg-white px-4 py-2 text-sm font-medium text-gray-700 transition hover:border-accent-500 hover:text-accent-600"
              >
                {link.label}
              </Link>
            ))}
          </div>
        </div>

        <div className="flex flex-wrap items-center justify-center gap-3">
          <Button href="/" variant="primary" size="md">
            ホームに戻る
          </Button>
          <Button href="/contact" variant="outline" size="md">
            直接ご相談する
          </Button>
        </div>
      </div>
    </div>
  )
}
