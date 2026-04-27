import { NextResponse } from 'next/server'
import { writeClient } from '@/sanity/lib/writeClient'
import {
  validateEmail,
  validatePhone,
  validateRequired,
} from '@/lib/validators'

export const runtime = 'nodejs'

interface RequestPayload {
  company?: string
  lastName?: string
  firstName?: string
  email?: string
  phone?: string
  privacy?: boolean
  website?: string // honeypot
}

function validate(p: RequestPayload): string[] {
  const errors: string[] = []

  const company = validateRequired(p.company || '', '会社名')
  if (company) errors.push(company)

  const lastName = validateRequired(p.lastName || '', 'お名前(姓)')
  if (lastName) errors.push(lastName)
  const firstName = validateRequired(p.firstName || '', 'お名前(名)')
  if (firstName) errors.push(firstName)

  const email = validateEmail(p.email || '')
  if (email) errors.push(email)

  const phone = validatePhone(p.phone || '', false)
  if (phone) errors.push(phone)

  if (p.privacy !== true) errors.push('個人情報保護方針への同意が必要です')

  return errors
}

export async function POST(req: Request) {
  let payload: RequestPayload
  try {
    payload = await req.json()
  } catch {
    return NextResponse.json({ error: 'リクエストの形式が不正です' }, { status: 400 })
  }

  if (payload.website && payload.website.trim() !== '') {
    console.warn('[api/request] honeypot triggered, dropping submission')
    return NextResponse.json({ ok: true }, { status: 200 })
  }

  const errors = validate(payload)
  if (errors.length > 0) {
    return NextResponse.json({ error: errors.join(' / ') }, { status: 400 })
  }

  const submittedAt = new Date().toISOString()
  const userAgent = req.headers.get('user-agent') || undefined
  const ipAddress =
    req.headers.get('x-forwarded-for')?.split(',')[0]?.trim() ||
    req.headers.get('x-real-ip') ||
    undefined

  try {
    await writeClient.create({
      _type: 'requestSubmission',
      company: payload.company?.trim(),
      lastName: payload.lastName?.trim(),
      firstName: payload.firstName?.trim(),
      email: payload.email?.trim(),
      phone: payload.phone?.trim() || undefined,
      agreedToPrivacy: true,
      submittedAt,
      status: '未対応',
      userAgent,
      ipAddress,
    })
    return NextResponse.json({ ok: true }, { status: 200 })
  } catch (e) {
    console.error('[api/request] Sanity write failed', e)
    return NextResponse.json(
      { error: '送信に失敗しました。しばらくしてから再度お試しください。' },
      { status: 500 }
    )
  }
}
