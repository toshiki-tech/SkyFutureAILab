import { defineField, defineType } from 'sanity'

export default defineType({
  name: 'codeBlock',
  title: 'コードブロック',
  type: 'object',
  fields: [
    defineField({
      name: 'language',
      title: '言語',
      type: 'string',
      options: {
        list: [
          { title: 'Plain text', value: 'text' },
          { title: 'TypeScript', value: 'typescript' },
          { title: 'JavaScript', value: 'javascript' },
          { title: 'JSON', value: 'json' },
          { title: 'Bash / Shell', value: 'bash' },
          { title: 'PowerShell', value: 'powershell' },
          { title: 'Python', value: 'python' },
          { title: 'C#', value: 'csharp' },
          { title: 'SQL', value: 'sql' },
          { title: 'YAML', value: 'yaml' },
          { title: 'GROQ', value: 'groq' },
          { title: 'Power Fx', value: 'powerfx' },
        ],
      },
      initialValue: 'text',
    }),
    defineField({
      name: 'filename',
      title: 'ファイル名(任意)',
      type: 'string',
    }),
    defineField({
      name: 'code',
      title: 'コード',
      type: 'text',
      rows: 10,
      validation: (Rule) => Rule.required(),
    }),
  ],
  preview: {
    select: { language: 'language', filename: 'filename', code: 'code' },
    prepare({ language, filename, code }) {
      const firstLine = (code || '').split('\n')[0].slice(0, 60)
      return {
        title: filename || `${language || 'code'}`,
        subtitle: firstLine,
      }
    },
  },
})
