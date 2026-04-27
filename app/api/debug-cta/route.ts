import { NextResponse } from 'next/server'
import { createClient } from 'next-sanity'
import { client } from '@/sanity/lib/client'
import { ctaConfigQuery } from '@/lib/sanity/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || ''
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

export async function GET() {
  // 1. 既存 client(共有インスタンス、useCdn: false、token なし)
  let viaSharedClient: any = null
  try {
    viaSharedClient = await client.fetch(ctaConfigQuery)
  } catch (e: any) {
    viaSharedClient = { __error: e?.message, statusCode: e?.statusCode }
  }

  // 2. 都度作る client(同じ config)
  const freshClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: false,
  })
  let viaFreshClient: any = null
  try {
    viaFreshClient = await freshClient.fetch(ctaConfigQuery)
  } catch (e: any) {
    viaFreshClient = { __error: e?.message, statusCode: e?.statusCode }
  }

  // 3. useCdn: true(CDN)で試す
  const cdnClient = createClient({
    projectId,
    dataset,
    apiVersion: '2024-01-01',
    useCdn: true,
  })
  let viaCdnClient: any = null
  try {
    viaCdnClient = await cdnClient.fetch(ctaConfigQuery)
  } catch (e: any) {
    viaCdnClient = { __error: e?.message, statusCode: e?.statusCode }
  }

  // 4. Native fetch で API 直叩き(next-sanity をバイパス)
  const apiUrl = `https://${projectId}.api.sanity.io/v2024-01-01/data/query/${dataset}?query=${encodeURIComponent(ctaConfigQuery)}`
  let viaNativeApi: any = null
  try {
    const res = await fetch(apiUrl, { cache: 'no-store' })
    viaNativeApi = {
      status: res.status,
      body: await res.json(),
    }
  } catch (e: any) {
    viaNativeApi = { __error: e?.message }
  }

  // 5. シンプル query(どんな case でもいい)で client が動くか確認
  let casesCount: any = null
  try {
    casesCount = await client.fetch(`count(*[_type == "case"])`)
  } catch (e: any) {
    casesCount = { __error: e?.message }
  }

  return NextResponse.json({
    apiUrl,
    viaSharedClient,
    viaFreshClient,
    viaCdnClient,
    viaNativeApi,
    casesCount,
  }, { headers: { 'cache-control': 'no-store' } })
}
