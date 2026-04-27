import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'linkCard',
  title: '内部リンクカード(関連事例/メソッド/サービス/コラム)',
  type: 'object',
  fields: [
    defineField({
      name: 'reference',
      title: 'リンク先ドキュメント',
      type: 'reference',
      to: [
        { type: 'case' },
        { type: 'method' },
        { type: 'service' },
        { type: 'column' },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'label',
      title: '上部ラベル(任意・例:関連事例)',
      type: 'string',
    }),
    defineField({
      name: 'note',
      title: '補足コメント(任意・カード下部に表示)',
      type: 'string',
    }),
  ],
  preview: {
    select: { title: 'reference.title', label: 'label' },
    prepare({ title, label }) {
      return {
        title: title || '(参照未設定)',
        subtitle: label ? `LinkCard · ${label}` : 'LinkCard',
      }
    },
  },
})
