'use client'

import { useEffect } from 'react'

export default function Error({
  error,
  reset,
}: {
  error: Error & { digest?: string }
  reset: () => void
}) {
  useEffect(() => {
    console.error(error)
  }, [error])

  return (
    <div className="flex min-h-screen flex-col items-center justify-center bg-gray-50 px-6">
      <div className="max-w-md text-center">
        <h1 className="mb-4 text-4xl font-bold text-gray-900">エラーが発生しました</h1>
        <p className="mb-8 text-lg text-gray-600">
          申し訳ございませんが、予期しないエラーが発生しました。
        </p>
        <button
          onClick={reset}
          className="rounded-lg bg-primary-600 px-6 py-3 text-white font-semibold hover:bg-primary-700 transition-colors"
        >
          もう一度試す
        </button>
      </div>
    </div>
  )
}
