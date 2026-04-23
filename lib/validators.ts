export const EMAIL_REGEX = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/

export function validateEmail(value: string): string | undefined {
  const v = value.trim()
  if (!v) return 'メールアドレスを入力してください'
  if (!EMAIL_REGEX.test(v)) return '正しいメールアドレス形式で入力してください'
  return undefined
}

export function validatePhone(value: string, required = false): string | undefined {
  const v = value.trim()
  if (!v) return required ? '電話番号を入力してください' : undefined
  const digits = v.replace(/[^0-9]/g, '')
  if (digits.length < 10 || digits.length > 11) {
    return '電話番号は 10〜11 桁で入力してください'
  }
  if (!/^[0-9+\-()\s]+$/.test(v)) {
    return '半角数字、ハイフン、+ 記号のみ使用できます'
  }
  return undefined
}

export function validateRequired(value: string, fieldLabel: string): string | undefined {
  if (!value.trim()) return `${fieldLabel}を入力してください`
  return undefined
}
