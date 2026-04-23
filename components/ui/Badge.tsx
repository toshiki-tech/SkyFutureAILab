import type { ReactNode } from 'react'
import { cn } from '@/lib/utils'

type BadgeProps = {
  children: ReactNode
  variant?: 'industry' | 'problem' | 'tag' | 'success' | 'warning' | 'error'
  className?: string
}

const variants = {
  industry: 'bg-primary-900 text-white',
  problem: 'bg-accent-500 text-white',
  tag: 'bg-white text-primary-700 border border-gray-200',
  success: 'bg-success-50 text-success-700 border border-success-500/20',
  warning: 'bg-warning-50 text-warning-700 border border-warning-500/20',
  error: 'bg-error-50 text-error-700 border border-error-500/20',
}

export function Badge({ children, variant = 'tag', className }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center px-2.5 py-1 text-xs font-semibold rounded-md',
        variants[variant],
        className
      )}
    >
      {children}
    </span>
  )
}
