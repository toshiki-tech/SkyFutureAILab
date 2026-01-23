import { defineField, defineType } from 'sanity'

const problemOptions = [
  { title: '業務効率化', value: '業務効率化' },
  { title: '申請・稟議のデジタル化', value: '申請・稟議のデジタル化' },
  { title: '問い合わせ・サポート対応', value: '問い合わせ・サポート対応' },
  { title: 'データ集計・レポート自動化', value: 'データ集計・レポート自動化' },
  { title: 'ナレッジ管理・検索', value: 'ナレッジ管理・検索' },
  { title: 'セキュアな生成AI導入', value: 'セキュアな生成AI導入' },
]

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
  name: 'case',
  title: '事例',
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
      name: 'problem',
      title: '課題分類',
      type: 'string',
      options: {
        list: problemOptions,
        layout: 'radio',
      },
      validation: (Rule) => Rule.required(),
    }),
    defineField({
      name: 'industry',
      title: '業種カテゴリ',
      type: 'reference',
      to: [{ type: 'industryCategory' }],
      validation: (Rule) => Rule.required(),
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
      title: 'おすすめ事例',
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
      problem: 'problem',
      media: 'featuredImage',
    },
    prepare({ title, problem, media }) {
      return {
        title,
        subtitle: problem,
        media,
      }
    },
  },
})
