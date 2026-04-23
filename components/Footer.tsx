import Link from 'next/link'

export default function Footer() {
  return (
    <footer className="border-t border-gray-200 bg-white mt-16">
      <div className="container mx-auto px-6 py-12 md:py-16 max-w-7xl">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
          <div className="flex flex-col gap-3">
            <p className="text-sm text-gray-600">© sky-future.com All rights reserved.</p>
            <p className="text-sm text-gray-600 leading-relaxed">
              Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援
            </p>
          </div>
          <div className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-gray-600">
            <Link href="/about" className="hover:text-primary-600 transition-colors whitespace-nowrap">
              会社紹介
            </Link>
            <Link href="/contact" className="hover:text-primary-600 transition-colors whitespace-nowrap">
              お問い合わせ
            </Link>
            <Link href="/request" className="hover:text-primary-600 transition-colors whitespace-nowrap">
              資料請求
            </Link>
            <Link href="/privacy" className="hover:text-primary-600 transition-colors whitespace-nowrap">
              プライバシーポリシー
            </Link>
            <Link href="/terms" className="hover:text-primary-600 transition-colors whitespace-nowrap">
              利用規約
            </Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
