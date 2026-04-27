import { defineField, defineType } from 'sanity'

const STATUS_OPTIONS = [
  { title: '未対応', value: '未対応' },
  { title: '対応中', value: '対応中' },
  { title: '完了', value: '完了' },
  { title: '不要対応(スパムなど)', value: '不要対応' },
]

const TYPE_OPTIONS = [
  { title: 'AI導入相談', value: 'AI導入相談' },
  { title: 'DX支援・教育', value: 'DX支援・教育' },
  { title: '協業のご提案', value: '協業のご提案' },
  { title: 'その他', value: 'その他' },
]

export default defineType({
  name: 'contactSubmission',
  title: 'お問い合わせ(無料相談)',
  type: 'document',
  // Studio 経由で手動作成は不要
  groups: [
    { name: 'submission', title: '送信内容', default: true },
    { name: 'tracking', title: '対応状況' },
  ],
  fields: [
    defineField({
      name: 'status',
      title: 'ステータス',
      type: 'string',
      group: 'tracking',
      options: { list: STATUS_OPTIONS, layout: 'radio' },
      initialValue: '未対応',
    }),
    defineField({
      name: 'internalNotes',
      title: '社内メモ',
      type: 'text',
      group: 'tracking',
      rows: 4,
      description: '対応経緯・連絡履歴などを記録',
    }),

    // 以下は API 書き込み専用 — Studio では編集不可
    defineField({
      name: 'type',
      title: '相談種別',
      type: 'string',
      group: 'submission',
      options: { list: TYPE_OPTIONS },
      readOnly: true,
    }),
    defineField({
      name: 'company',
      title: '会社名',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'department',
      title: '部署',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'lastName',
      title: '姓',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'firstName',
      title: '名',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'email',
      title: 'メールアドレス',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'phone',
      title: '電話番号',
      type: 'string',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'content',
      title: 'ご相談内容',
      type: 'text',
      group: 'submission',
      rows: 6,
      readOnly: true,
    }),
    defineField({
      name: 'agreedToPrivacy',
      title: '個人情報保護方針への同意',
      type: 'boolean',
      group: 'submission',
      readOnly: true,
      description: '送信時点で同意済み(法務上の証跡)',
    }),
    defineField({
      name: 'submittedAt',
      title: '送信日時',
      type: 'datetime',
      group: 'submission',
      readOnly: true,
    }),
    defineField({
      name: 'userAgent',
      title: 'User-Agent',
      type: 'string',
      group: 'submission',
      readOnly: true,
      description: 'ブラウザ情報(スパム判定の参考)',
    }),
    defineField({
      name: 'ipAddress',
      title: 'IP アドレス',
      type: 'string',
      group: 'submission',
      readOnly: true,
      description: '送信元 IP(スパム判定の参考)',
    }),
  ],
  preview: {
    select: {
      lastName: 'lastName',
      firstName: 'firstName',
      company: 'company',
      type: 'type',
      status: 'status',
      submittedAt: 'submittedAt',
    },
    prepare({ lastName, firstName, company, type, status, submittedAt }) {
      const name = [lastName, firstName].filter(Boolean).join(' ')
      const date = submittedAt
        ? new Date(submittedAt).toLocaleString('ja-JP', {
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
          })
        : ''
      return {
        title: `${company || '(会社名なし)'} / ${name || '(名前なし)'}`,
        subtitle: `[${status || '未対応'}] ${type || ''} · ${date}`,
      }
    },
  },
  orderings: [
    {
      title: '送信日時(新しい順)',
      name: 'submittedAtDesc',
      by: [{ field: 'submittedAt', direction: 'desc' }],
    },
    {
      title: 'ステータス',
      name: 'statusAsc',
      by: [
        { field: 'status', direction: 'asc' },
        { field: 'submittedAt', direction: 'desc' },
      ],
    },
  ],
})
