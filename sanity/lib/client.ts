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
  useCdn: process.env.NODE_ENV === 'production',
  ...(readToken ? { token: readToken } : {}),
})
