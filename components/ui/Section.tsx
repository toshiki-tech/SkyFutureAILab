import type { HTMLAttributes, ReactNode, ElementType } from 'react'
import { cn } from '@/lib/utils'

type SectionProps = HTMLAttributes<HTMLElement> & {
  as?: ElementType
  size?: 'sm' | 'md' | 'lg' | 'xl'
  width?: 'narrow' | 'default' | 'wide' | 'full'
  bg?: 'white' | 'gray' | 'primary' | 'accent-soft'
  children: ReactNode
}

const sizeClasses: Record<NonNullable<SectionProps['size']>, string> = {
  sm: 'py-10 md:py-14',
  md: 'py-14 md:py-20',
  lg: 'py-16 md:py-24',
  xl: 'py-20 md:py-32',
}

const widthClasses: Record<NonNullable<SectionProps['width']>, string> = {
  narrow: 'max-w-3xl',
  default: 'max-w-5xl',
  wide: 'max-w-7xl',
  full: 'max-w-none',
}

const bgClasses: Record<NonNullable<SectionProps['bg']>, string> = {
  white: 'bg-white',
  gray: 'bg-gray-50',
  primary: 'bg-primary-900 text-white',
  'accent-soft': 'bg-accent-50',
}

export function Section({
  as: Tag = 'section',
  size = 'lg',
  width = 'wide',
  bg = 'white',
  className,
  children,
  ...rest
}: SectionProps) {
  return (
    <Tag className={cn(bgClasses[bg], sizeClasses[size], className)} {...rest}>
      <div className={cn('mx-auto px-4 sm:px-6 lg:px-8', widthClasses[width])}>
        {children}
      </div>
    </Tag>
  )
}
