import { defineField, defineType } from 'sanity'

const techTagOptions = [
  { title: 'Microsoft 365', value: 'Microsoft 365' },
  { title: 'Power Platform', value: 'Power Platform' },
  { title: 'Copilot / 生成AI', value: 'Copilot / 生成AI' },
  { title: 'Azure', value: 'Azure' },
  { title: 'Dataverse / D365', value: 'Dataverse / D365' },
  { title: 'Security / Governance', value: 'Security / Governance' },
  { title: 'Integration（API連携など）', value: 'Integration（API連携など）' },
]

export default defineType({
  name: 'service',
  title: 'サービス',
  type: 'document',
  fields: [
    defineField({
      name: 'title',
      title: 'タイトル',
      type: 'string',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'slug',
      title: 'スラッグ',
      type: 'slug',
      options: {
        source: 'title',
        maxLength: 96,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'excerpt',
      title: '抜粋',
      type: 'text',
      rows: 3,
    }),
    defineField({
      name: 'content',
      title: '本文',
      type: 'array',
      of: [
        { type: 'block' },
        {
          type: 'image',
          fields: [
            {
              name: 'alt',
              type: 'string',
              title: '代替テキスト',
            },
          ],
        },
      ],
    }),
    defineField({
      name: 'featuredImage',
      title: '特徴画像',
      type: 'image',
      options: { hotspot: true },
      fields: [
        {
          name: 'alt',
          type: 'string',
          title: '代替テキスト',
        },
      ],
    }),
    defineField({
      name: 'techTags',
      title: '技術タグ',
      type: 'array',
      of: [{ type: 'string' }],
      options: {
        list: techTagOptions,
      },
    }),
    defineField({
      name: 'publishedAt',
      title: '公開日',
      type: 'datetime',
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'updatedAt',
      title: '更新日',
      type: 'datetime',
    }),
    defineField({
      name: 'seo',
      title: 'SEO設定',
      type: 'object',
      fields: [
        {
          name: 'title',
          title: 'SEOタイトル',
          type: 'string',
          description: '空欄の場合は記事タイトルが使用されます',
        },
        {
          name: 'description',
          title: 'SEO説明',
          type: 'text',
          rows: 3,
          description: '空欄の場合は抜粋が使用されます',
        },
        {
          name: 'ogImage',
          title: 'OG画像',
          type: 'image',
          options: { hotspot: true },
        },
      ],
    }),
  ],
  preview: {
    select: {
      title: 'title',
      media: 'featuredImage',
    },
    prepare({ title, media }) {
      return {
        title,
        media,
      }
    },
  },
})
