export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'メールアドレスを入力してください'
  if (!EMAIL_REGEX.test(v)) return '正しいメールアドレス形式で入力してください'
  return undefined
}

/**
 * 電話番号バリデーション(E.164 国際標準)。
 * 国際的なお問い合わせを想定し、特定の国に縛らない緩めのチェック。
 *
 * 受け付ける形式:
 *   - 国内 10〜11 桁: 03-1234-5678 / 090-1234-5678 / 13812345678
 *   - 国際形式: +81-90-1234-5678 / +86-138-1234-5678 / +1-212-555-1234
 *   - ハイフン / 括弧 / 半角スペース / + 記号 任意
 *
 * 数字のみで 7〜15 桁(E.164 仕様)であれば pass。
 * スパム防止と入力ミス検知が目的で、真正な国際番号は弾かない方針。
 */
export function validatePhone(value: string, required = false): string | undefined {
  const v = value.trim()
  if (!v) return required ? '電話番号を入力してください' : undefined

  if (!/^[0-9+\-()\s]+$/.test(v)) {
    return '半角数字、ハイフン、+ 記号、半角スペースのみ使用できます'
  }

  const digits = v.replace(/[^0-9]/g, '')

  if (digits.length < 7 || digits.length > 15) {
    return '電話番号の桁数が正しくありません(例: 090-1234-5678 または +86-138-1234-5678)'
  }

  return undefined
}

export function validateRequired(value: string, fieldLabel: string): string | undefined {
  if (!value.trim()) return `${fieldLabel}を入力してください`
  return undefined
}
