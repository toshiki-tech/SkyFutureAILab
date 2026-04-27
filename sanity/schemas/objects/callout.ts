import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'callout',
  title: 'Callout(注意/補足ボックス)',
  type: 'object',
  fields: [
    defineField({
      name: 'tone',
      title: 'トーン',
      type: 'string',
      options: {
        list: [
          { title: 'Info(青・補足)', value: 'info' },
          { title: 'Tip(緑・ヒント)', value: 'tip' },
          { title: 'Warning(黄・注意)', value: 'warning' },
          { title: 'Danger(赤・警告)', value: 'danger' },
        ],
        layout: 'radio',
      },
      initialValue: 'info',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'title',
      title: '見出し(任意)',
      type: 'string',
    }),
    defineField({
      name: 'body',
      title: '本文',
      type: 'array',
      of: [{ type: 'block', styles: [{ title: 'Normal', value: 'normal' }] }],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { tone: 'tone', title: 'title' },
    prepare({ tone, title }) {
      return {
        title: title || `Callout(${tone})`,
        subtitle: `tone: ${tone}`,
      }
    },
  },
})
