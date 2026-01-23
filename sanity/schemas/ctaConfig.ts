import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'ctaConfig',
  title: 'CTA設定',
  type: 'document',
  fields: [
    defineField({
      name: 'primaryCTA',
      title: 'プライマリCTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'テキスト',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'リンク',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'secondaryCTA',
      title: 'セカンダリCTA',
      type: 'object',
      fields: [
        {
          name: 'text',
          title: 'テキスト',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
        {
          name: 'link',
          title: 'リンク',
          type: 'string',
          validation: (Rule) => Rule.required(),
        },
      ],
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: {
      primaryText: 'primaryCTA.text',
      secondaryText: 'secondaryCTA.text',
    },
    prepare({ primaryText, secondaryText }) {
      return {
        title: 'CTA設定',
        subtitle: `${primaryText} / ${secondaryText}`,
      }
    },
  },
})
