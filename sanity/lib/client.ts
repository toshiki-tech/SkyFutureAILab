import { createClient } from 'next-sanity'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'
const apiVersion = '2024-01-01'

// 任意の空白トークンが渡るとサーバーが "Session not found" を返してしまうので
// 値が完全に有効な場合のみ付ける。public dataset なら token なしで十分。
const readToken = process.env.SANITY_API_READ_TOKEN?.trim()

export const client = createClient({
  projectId: projectId || 'dummy',
  dataset: dataset || 'production',
  apiVersion,
  // CDN 端点(apicdn.sanity.io)が過去のデプロイで 401 をキャッシュして
  // しまっていたので、直接 API 端点(api.sanity.io)を使う。force-dynamic
  // と組み合わせるとレスポンスタイムは数十ms の差で実用上問題なし。
  useCdn: false,
  ...(readToken ? { token: readToken } : {}),
})
