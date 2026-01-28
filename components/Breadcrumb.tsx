import Link from 'next/link'

interface BreadcrumbItem {
  label: string
  href?: string
}

interface BreadcrumbProps {
  items: BreadcrumbItem[]
  light?: boolean
}

export default function Breadcrumb({ items, light }: BreadcrumbProps) {
  const colorClasses = light
    ? {
      list: 'text-gray-300',
      separator: 'text-gray-500',
      active: 'text-white font-medium',
      inactive: 'text-gray-300 hover:text-white',
    }
    : {
      list: 'text-gray-600',
      separator: 'text-gray-400',
      active: 'text-gray-900 font-medium',
      inactive: 'text-gray-600 hover:text-primary-600',
    }

  return (
    <nav className="mb-4" aria-label="パンくずリスト">
      <ol className={`flex flex-wrap items-center gap-2 text-sm ${colorClasses.list}`}>
        {items.map((item, index) => {
          const isLast = index === items.length - 1

          return (
            <li key={index} className="flex items-center">
              {index > 0 && (
                <span className={`mx-2 ${colorClasses.separator}`} aria-hidden="true">
                  /
                </span>
              )}
              {isLast || !item.href ? (
                <span className={isLast ? colorClasses.active : ''}>
                  {item.label}
                </span>
              ) : (
                <Link
                  href={item.href}
                  className={`${colorClasses.inactive} transition-colors`}
                >
                  {item.label}
                </Link>
              )}
            </li>
          )
        })}
      </ol>
    </nav>
  )
}
