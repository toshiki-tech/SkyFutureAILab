export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'メールアドレスを入力してください'
  if (!EMAIL_REGEX.test(v)) return '正しいメールアドレス形式で入力してください'
  return undefined
}

/**
 * 日本の電話番号バリデーション。
 * 受け付ける形式:
 *   - 国内形式: 10 桁(固定電話、例 03-1234-5678)or 11 桁(携帯、例 090-1234-5678)
 *   - 国際形式: +81-90-1234-5678(+81 を 0 に置き換え後 10〜11 桁)
 *   - ハイフン / 括弧 / 半角スペース は任意
 */
export function validatePhone(value: string, required = false): string | undefined {
  const v = value.trim()
  if (!v) return required ? '電話番号を入力してください' : undefined

  if (!/^[0-9+\-()\s]+$/.test(v)) {
    return '半角数字、ハイフン、+ 記号のみ使用できます'
  }

  // 国際形式 +81 を国内形式に正規化:
  //   +81-90-1234-5678  → 09012345678
  //   +81 70 1234 5678  → 07012345678
  let digits = v.replace(/[^0-9]/g, '')
  const compact = v.replace(/[\s()\-]/g, '')
  if (compact.startsWith('+81')) {
    digits = '0' + digits.replace(/^81/, '')
  }

  if (digits.length < 10 || digits.length > 11) {
    return '電話番号の桁数が正しくありません(例: 090-1234-5678 または +81-90-1234-5678)'
  }

  if (!digits.startsWith('0')) {
    return '日本の電話番号は 0 から始まる必要があります'
  }

  return undefined
}

export function validateRequired(value: string, fieldLabel: string): string | undefined {
  if (!value.trim()) return `${fieldLabel}を入力してください`
  return undefined
}
