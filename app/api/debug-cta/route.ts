import { NextResponse } from 'next/server'
import { client } from '@/sanity/lib/client'
import { ctaConfigQuery } from '@/lib/sanity/queries'

export const runtime = 'nodejs'
export const dynamic = 'force-dynamic'

/**
 * 一時的なデバッグエンドポイント。Vercel runtime が ctaConfig を
 * 取得できているかどうか確認するためのもの。確認後に削除する。
 */
export async function GET() {
  const env = {
    NEXT_PUBLIC_SANITY_PROJECT_ID: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || null,
    NEXT_PUBLIC_SANITY_DATASET: process.env.NEXT_PUBLIC_SANITY_DATASET || null,
    SANITY_API_READ_TOKEN_present: !!process.env.SANITY_API_READ_TOKEN,
    NODE_ENV: process.env.NODE_ENV,
    VERCEL_ENV: process.env.VERCEL_ENV || null,
  }

  let result: any = null
  let errorInfo: any = null
  try {
    result = await client.fetch(ctaConfigQuery)
  } catch (e: any) {
    errorInfo = {
      message: e?.message || String(e),
      statusCode: e?.statusCode,
      errorCode: e?.response?.body?.errorCode,
      url: e?.response?.url,
    }
  }

  // 二度引きで cache の影響を排除
  let result2: any = null
  let errorInfo2: any = null
  try {
    result2 = await client.fetch(ctaConfigQuery)
  } catch (e: any) {
    errorInfo2 = {
      message: e?.message || String(e),
      statusCode: e?.statusCode,
      errorCode: e?.response?.body?.errorCode,
    }
  }

  return NextResponse.json({
    env,
    result,
    errorInfo,
    result2,
    errorInfo2,
    note: 'expected: result.primaryCTA.text === "無料で資料をダウンロード"',
  })
}
