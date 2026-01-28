'use client'

import { useState } from 'react'

interface FilterGroup {
    id: string
    label: string
    options: { label: string; value: string }[]
}

interface SearchSidebarProps {
    filters: FilterGroup[]
    selectedFilters: Record<string, string[]>
    onFilterChange: (groupId: string, value: string) => void
}

export default function SearchSidebar({
    filters,
    selectedFilters,
    onFilterChange,
}: SearchSidebarProps) {
    const [openGroups, setOpenGroups] = useState<Record<string, boolean>>(
        filters.reduce((acc, group) => ({ ...acc, [group.id]: true }), {})
    )

    const toggleGroup = (id: string) => {
        setOpenGroups((prev) => ({ ...prev, [id]: !prev[id] }))
    }

    return (
        <aside className="w-full md:w-64 flex-shrink-0 space-y-8">
            {filters.map((group) => (
                <div key={group.id} className="border-b border-gray-200 pb-6">
                    <button
                        onClick={() => toggleGroup(group.id)}
                        className="flex w-full items-center justify-between py-2 text-left"
                    >
                        <span className="text-sm font-bold uppercase tracking-wider text-gray-900">
                            {group.label}
                        </span>
                        <svg
                            className={`h-5 w-5 transform text-gray-400 transition-transform ${openGroups[group.id] ? 'rotate-180' : ''
                                }`}
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                        >
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                        </svg>
                    </button>

                    {openGroups[group.id] && (
                        <div className="mt-4 space-y-3">
                            {group.options.map((option) => {
                                const isChecked = selectedFilters[group.id]?.includes(option.value)
                                return (
                                    <label
                                        key={option.value}
                                        className="flex cursor-pointer items-start gap-3 group"
                                    >
                                        <div className="relative flex h-5 w-5 flex-shrink-0 items-center justify-center">
                                            <input
                                                type="checkbox"
                                                className="peer h-4 w-4 rounded border-gray-300 text-accent-600 focus:ring-accent-500"
                                                checked={isChecked}
                                                onChange={() => onFilterChange(group.id, option.value)}
                                            />
                                        </div>
                                        <span className={`text-sm transition-colors ${isChecked
                                                ? 'font-semibold text-accent-600'
                                                : 'text-gray-600 group-hover:text-gray-900'
                                            }`}>
                                            {option.label}
                                        </span>
                                    </label>
                                )
                            })}
                        </div>
                    )}
                </div>
            ))}
        </aside>
    )
}
