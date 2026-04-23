import type { ChangeEvent } from 'react'
import { cn } from '@/lib/utils'

type CommonProps = {
  id: string
  name: string
  label: string
  required?: boolean
  value: string
  onChange: (value: string) => void
  error?: string
  hint?: string
  placeholder?: string
  autoComplete?: string
  className?: string
}

type InputProps = CommonProps & {
  type?: 'text' | 'email' | 'tel'
  rows?: never
}

type TextareaProps = CommonProps & {
  type: 'textarea'
  rows?: number
}

type FormFieldProps = InputProps | TextareaProps

export function FormField(props: FormFieldProps) {
  const {
    id,
    name,
    label,
    required,
    value,
    onChange,
    error,
    hint,
    placeholder,
    autoComplete,
    className,
  } = props

  const hintId = hint ? `${id}-hint` : undefined
  const errorId = error ? `${id}-error` : undefined
  const describedBy = [hintId, errorId].filter(Boolean).join(' ') || undefined

  const handleChange = (
    e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => onChange(e.target.value)

  const baseInputClasses = cn(
    'w-full rounded-xl border bg-gray-50 px-4 py-3 transition-all outline-none',
    'focus:bg-white focus:border-accent-500 focus:ring-2 focus:ring-accent-500/20',
    error
      ? 'border-error-500 bg-error-50'
      : 'border-gray-200',
  )

  return (
    <div className={cn('space-y-2', className)}>
      <label
        htmlFor={id}
        className="block text-sm font-bold text-gray-700"
      >
        {label}
        {required ? (
          <span className="ml-1 text-error-500" aria-hidden="true">
            *
          </span>
        ) : (
          <span className="ml-1 text-xs font-normal text-gray-400">（任意）</span>
        )}
      </label>

      {props.type === 'textarea' ? (
        <textarea
          id={id}
          name={name}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          rows={props.rows ?? 5}
          required={required}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={cn(baseInputClasses, 'resize-none')}
        />
      ) : (
        <input
          id={id}
          name={name}
          type={props.type ?? 'text'}
          value={value}
          onChange={handleChange}
          placeholder={placeholder}
          required={required}
          autoComplete={autoComplete}
          aria-required={required || undefined}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={baseInputClasses}
        />
      )}

      {hint && !error && (
        <p id={hintId} className="text-xs text-gray-500">
          {hint}
        </p>
      )}
      {error && (
        <p
          id={errorId}
          role="alert"
          className="flex items-start gap-1.5 text-xs font-medium text-error-600"
        >
          <svg
            className="mt-0.5 h-3.5 w-3.5 flex-shrink-0"
            fill="currentColor"
            viewBox="0 0 20 20"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z"
              clipRule="evenodd"
            />
          </svg>
          <span>{error}</span>
        </p>
      )}
    </div>
  )
}
