import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '@/lib/validators'

export const runtime = 'nodejs'

const TYPE_OPTIONS = ['AI導入相談', 'DX支援・教育', '協業のご提案', 'その他'] as const

interface ContactPayload {
  type?: string
  company?: string
  department?: string
  lastName?: string
  firstName?: string
  email?: string
  phone?: string
  content?: string
  privacy?: boolean
  website?: string // honeypot
}

function validate(p: ContactPayload): string[] {
  const errors: string[] = []
  if (!p.type || !TYPE_OPTIONS.includes(p.type as any)) errors.push('相談種別が不正です')

  const company = validateRequired(p.company || '', '会社名')
  if (company) errors.push(company)

  const lastName = validateRequired(p.lastName || '', '姓')
  if (lastName) errors.push(lastName)
  const firstName = validateRequired(p.firstName || '', '名')
  if (firstName) errors.push(firstName)

  const email = validateEmail(p.email || '')
  if (email) errors.push(email)

  const phone = validatePhone(p.phone || '', false)
  if (phone) errors.push(phone)

  const content = validateRequired(p.content || '', 'ご相談内容')
  if (content) errors.push(content)

  if (p.privacy !== true) errors.push('個人情報保護方針への同意が必要です')

  return errors
}

export async function POST(req: Request) {
  let payload: ContactPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 })
  }

  // Honeypot — bot は website 欄に値を入れがち。silently 200 を返してログだけ残す
  if (payload.website && payload.website.trim() !== '') {
    console.warn('[api/contact] honeypot triggered, dropping submission')
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const errors = validate(payload)
  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(' / ') }, { status: 400 })
  }

  const submittedAt = new Date().toISOString()
  const userAgent = req.headers.get('user-agent') || undefined
  // Vercel/Cloudflare 等で本番デプロイ時は X-Forwarded-For を見る
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    undefined

  try {
    await writeClient.create({
      _type: 'contactSubmission',
      type: payload.type,
      company: payload.company?.trim(),
      department: payload.department?.trim() || undefined,
      lastName: payload.lastName?.trim(),
      firstName: payload.firstName?.trim(),
      email: payload.email?.trim(),
      phone: payload.phone?.trim() || undefined,
      content: payload.content?.trim(),
      agreedToPrivacy: true,
      submittedAt,
      status: '未対応',
      userAgent,
      ipAddress,
    })
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (e) {
    console.error('[api/contact] Sanity write failed', e)
    return NextResponse.json(
      { error: '送信に失敗しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}
