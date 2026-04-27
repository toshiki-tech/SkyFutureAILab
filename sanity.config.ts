import { defineConfig } from 'sanity'
import { deskTool } from 'sanity/desk'
import { visionTool } from '@sanity/vision'
import { schemaTypes } from './sanity/schemas'
import StudioLogo from './sanity/components/StudioLogo'

const projectId = process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || 'your-project-id'
const dataset = process.env.NEXT_PUBLIC_SANITY_DATASET || 'production'

if (!process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || !process.env.NEXT_PUBLIC_SANITY_DATASET) {
  console.warn(
    'Sanity projectId/dataset missing. Using placeholders. Set NEXT_PUBLIC_SANITY_PROJECT_ID and NEXT_PUBLIC_SANITY_DATASET in .env.local'
  )
}

export default defineConfig({
  name: 'default',
  title: 'SkyFuture AI Lab',
  projectId,
  dataset,
  basePath: '/studio',
  studio: {
    components: {
      logo: StudioLogo,
    },
  },
  plugins: [
    deskTool({
      structure: (S) =>
        S.list()
          .title('SkyFuture AI Lab')
          .items([
            S.listItem()
              .id('content')
              .title('📝 コンテンツ')
              .child(
                S.list()
                  .id('contentList')
                  .title('コンテンツ')
                  .items([
                    S.documentTypeListItem('case').title('事例'),
                    S.documentTypeListItem('method').title('メソッド'),
                    S.documentTypeListItem('service').title('サービス'),
                    S.documentTypeListItem('column').title('コラム'),
                    S.divider(),
                    S.documentTypeListItem('industryCategory').title('業種カテゴリ'),
                  ])
              ),
            S.divider(),
            S.listItem()
              .id('submissions')
              .title('📨 送信フォーム')
              .child(
                S.list()
                  .id('submissionsList')
                  .title('送信フォーム')
                  .items([
                    S.listItem()
                      .id('contactSubmissions')
                      .title('お問い合わせ(無料相談)')
                      .schemaType('contactSubmission')
                      .child(
                        S.documentTypeList('contactSubmission')
                          .title('お問い合わせ(無料相談)')
                          .defaultOrdering([
                            { field: 'submittedAt', direction: 'desc' },
                          ])
                      ),
                    S.listItem()
                      .id('requestSubmissions')
                      .title('資料請求')
                      .schemaType('requestSubmission')
                      .child(
                        S.documentTypeList('requestSubmission')
                          .title('資料請求')
                          .defaultOrdering([
                            { field: 'submittedAt', direction: 'desc' },
                          ])
                      ),
                  ])
              ),
            S.divider(),
            S.listItem()
              .id('settings')
              .title('⚙️ サイト設定')
              .child(
                S.list()
                  .id('settingsList')
                  .title('サイト設定')
                  .items([
                    S.listItem()
                      .id('ctaConfigItem')
                      .title('CTA 設定')
                      .child(
                        S.document()
                          .schemaType('ctaConfig')
                          .documentId('ctaConfig')
                      ),
                  ])
              ),
          ]),
    }),
    visionTool(),
  ],
  schema: {
    types: schemaTypes,
  },
})
