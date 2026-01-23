import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'industryCategory',
  title: '業種カテゴリ',
  type: 'document',
  fields: [
    defineField({
      name: 'value',
      title: '値',
      type: 'string',
      description: 'URLやフィルタで使う一意の値',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'displayName',
      title: '表示名',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'description',
      title: '説明',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'order',
      title: '並び順',
      type: 'number',
      initialValue: 0,
    }),
  ],
  preview: {
    select: {
      title: 'displayName',
      subtitle: 'value',
    },
  },
})
