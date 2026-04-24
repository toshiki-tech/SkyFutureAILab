import type { TechTag } from '@/types'

interface TechTagIconProps {
  tag?: TechTag | string
  className?: string
}

export function TechTagIcon({ tag, className = 'h-5 w-5' }: TechTagIconProps) {
  const props = {
    className,
    fill: 'none' as const,
    stroke: 'currentColor',
    viewBox: '0 0 24 24',
    strokeWidth: 1.7,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
    'aria-hidden': true,
  }

  switch (tag) {
    case 'Microsoft 365':
      return (
        <svg {...props}>
          <rect x="3.5" y="3.5" width="7.5" height="7.5" rx="1.2" />
          <rect x="13" y="3.5" width="7.5" height="7.5" rx="1.2" />
          <rect x="3.5" y="13" width="7.5" height="7.5" rx="1.2" />
          <rect x="13" y="13" width="7.5" height="7.5" rx="1.2" />
        </svg>
      )
    case 'Power Platform':
      return (
        <svg {...props}>
          <path d="M13 3L4 14h7l-1 7 9-11h-7l1-7z" />
        </svg>
      )
    case 'Copilot / 生成AI':
      return (
        <svg {...props}>
          <path d="M11 4l1.6 4.4L17 10l-4.4 1.6L11 16l-1.6-4.4L5 10l4.4-1.6L11 4z" />
          <path d="M18 15l.8 2.2L21 18l-2.2.8L18 21l-.8-2.2L15 18l2.2-.8L18 15z" />
        </svg>
      )
    case 'Azure':
      return (
        <svg {...props}>
          <path d="M7 18.5h11a4 4 0 000-8 6 6 0 00-11.6-1.4A4.5 4.5 0 007 18.5z" />
        </svg>
      )
    case 'Dataverse / D365':
      return (
        <svg {...props}>
          <ellipse cx="12" cy="5.5" rx="7.5" ry="2.5" />
          <path d="M4.5 5.5v6c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-6" />
          <path d="M4.5 11.5v6c0 1.4 3.4 2.5 7.5 2.5s7.5-1.1 7.5-2.5v-6" />
        </svg>
      )
    case 'Security / Governance':
      return (
        <svg {...props}>
          <path d="M12 3.5l7.5 2.5v6c0 4.5-3.2 7.8-7.5 8.5-4.3-.7-7.5-4-7.5-8.5v-6L12 3.5z" />
          <path d="M9 12l2 2 4-4" />
        </svg>
      )
    case 'Integration（API連携など）':
      return (
        <svg {...props}>
          <circle cx="6" cy="6" r="2.2" />
          <circle cx="18" cy="6" r="2.2" />
          <circle cx="18" cy="18" r="2.2" />
          <path d="M8.2 6h7.6M18 8.2v7.6M16.4 16.4l-8.2-8.2" />
        </svg>
      )
    default:
      return (
        <svg {...props}>
          <circle cx="12" cy="12" r="8.5" />
          <path d="M12 7.5v9M7.5 12h9" />
        </svg>
      )
  }
}
