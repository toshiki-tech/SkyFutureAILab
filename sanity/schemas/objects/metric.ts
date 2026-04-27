import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'metric',
  title: '数値カード(KPI/効果指標)',
  type: 'object',
  description: '導入効果や指標を 2〜4 個並べて表示するブロック',
  fields: [
    defineField({
      name: 'items',
      title: '指標',
      type: 'array',
      of: [
        {
          type: 'object',
          name: 'metricItem',
          fields: [
            defineField({
              name: 'value',
              title: '数値(例:80%、3.5h、¥1.2M)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'label',
              title: 'ラベル(例:工数削減)',
              type: 'string',
              validation: (Rule) => Rule.required(),
            }),
            defineField({
              name: 'note',
              title: '補足(任意・1 行)',
              type: 'string',
            }),
          ],
          preview: {
            select: { value: 'value', label: 'label' },
            prepare({ value, label }) {
              return { title: `${value} — ${label}` }
            },
          },
        },
      ],
      validation: (Rule) => Rule.min(1).max(4),
    }),
  ],
  preview: {
    select: { items: 'items' },
    prepare({ items }) {
      const count = Array.isArray(items) ? items.length : 0
      return { title: `数値カード(${count} 項目)` }
    },
  },
})
