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

const categoryOptions = [
  { title: '生成AI活用', value: '生成AI活用' },
  { title: 'Power Platform', value: 'Power Platform' },
  { title: 'Microsoft 365', value: 'Microsoft 365' },
  { title: 'Dynamics 365', value: 'Dynamics 365' },
  { title: 'セキュリティ', value: 'セキュリティ' },
  { title: 'DX 戦略', value: 'DX 戦略' },
  { title: '導入事例の裏側', value: '導入事例の裏側' },
]

export default defineType({
  name: 'column',
  title: 'コラム',
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
      name: 'category',
      title: 'カテゴリ',
      type: 'string',
      options: {
        list: categoryOptions,
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'author',
      title: '著者',
      type: 'string',
      initialValue: 'SkyFuture 編集部',
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
        { type: 'callout' },
        { type: 'linkCard' },
        { type: 'metric' },
        { type: 'codeBlock' },
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
      name: 'featured',
      title: 'おすすめコラム',
      type: 'boolean',
      description: 'ホームページに表示するかどうか',
      initialValue: false,
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
      category: 'category',
      media: 'featuredImage',
    },
    prepare({ title, category, media }) {
      return {
        title,
        subtitle: category,
        media,
      }
    },
  },
})
