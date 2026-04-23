import Link from 'next/link'
import { cn } from '@/lib/utils'

type ConsentCheckboxProps = {
  id?: string
  name?: string
  checked: boolean
  onChange: (checked: boolean) => void
  error?: string
  className?: string
}

export function ConsentCheckbox({
  id = 'privacy-consent',
  name = 'privacy',
  checked,
  onChange,
  error,
  className,
}: ConsentCheckboxProps) {
  const errorId = error ? `${id}-error` : undefined

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className={cn(
          'flex cursor-pointer items-start gap-3 rounded-xl border px-4 py-3 transition-colors',
          error
            ? 'border-error-500 bg-error-50'
            : 'border-gray-200 bg-gray-50 hover:border-accent-500',
        )}
      >
        <input
          id={id}
          name={name}
          type="checkbox"
          checked={checked}
          onChange={(e) => onChange(e.target.checked)}
          required
          aria-required="true"
          aria-invalid={error ? true : undefined}
          aria-describedby={errorId}
          className="mt-0.5 h-5 w-5 flex-shrink-0 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
        />
        <span className="text-sm leading-relaxed text-gray-700">
          <Link
            href="/privacy"
            className="font-semibold text-accent-600 underline underline-offset-4 hover:text-accent-700"
            target="_blank"
            rel="noopener"
          >
            個人情報保護方針
          </Link>
          に同意します
          <span className="ml-1 text-error-500" aria-hidden="true">
            *
          </span>
        </span>
      </label>
      {error && (
        <p
          id={errorId}
          role="alert"
          className="text-xs font-medium text-error-600"
        >
          {error}
        </p>
      )}
    </div>
  )
}
