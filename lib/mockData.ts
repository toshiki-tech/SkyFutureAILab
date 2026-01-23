// 临时静态数据，用于展示效果，后续会替换为 Sanity 数据
import type { Case } from '@/types'

export const mockCtaConfig = {
  primaryCTA: {
    text: '資料請求',
    link: '/request',
  },
  secondaryCTA: {
    text: '無料相談',
    link: '/contactus',
  },
}

export const mockServices = [
  {
    _id: '1',
    title: 'Microsoft 365導入・活用支援',
    slug: { current: 'microsoft-365-support' },
    excerpt: 'Microsoft 365の導入から活用まで、企業の生産性向上をサポートします。',
    techTags: ['Microsoft 365', 'Power Platform'],
  },
  {
    _id: '2',
    title: 'Power Platform開発・構築',
    slug: { current: 'power-platform-development' },
    excerpt: 'Power Apps、Power Automateを活用した業務自動化ソリューションを提供します。',
    techTags: ['Power Platform', 'Azure'],
  },
  {
    _id: '3',
    title: 'Dynamics 365導入・カスタマイズ',
    slug: { current: 'dynamics-365-implementation' },
    excerpt: 'CRM・ERPとしてのDynamics 365導入から、お客様の業務に合わせたカスタマイズまで対応します。',
    techTags: ['Dynamics 365', 'Dataverse / D365'],
  },
  {
    _id: '4',
    title: '生成AI導入・活用支援',
    slug: { current: 'generative-ai-support' },
    excerpt: 'Copilot、Azure OpenAI Serviceを活用した生成AI導入をサポートします。',
    techTags: ['Copilot / 生成AI', 'Azure'],
  },
  {
    _id: '5',
    title: 'セキュリティ・ガバナンス構築',
    slug: { current: 'security-governance' },
    excerpt: 'Microsoft 365、Azureのセキュリティ設定から、コンプライアンス対応まで支援します。',
    techTags: ['Security / Governance', 'Microsoft 365'],
  },
  {
    _id: '6',
    title: 'API連携・システム統合',
    slug: { current: 'api-integration' },
    excerpt: '既存システムとMicrosoft製品の連携、API開発による業務効率化を実現します。',
    techTags: ['Integration（API連携など）', 'Azure'],
  },
]

export const mockFeaturedCases: Case[] = [
  {
    _id: '1',
    title: '製造業における申請業務のデジタル化',
    slug: { current: 'manufacturing-application-digitalization' },
    problem: '申請・稟議のデジタル化',
    excerpt: 'Power Platformを活用し、従来の紙ベースの申請業務を完全デジタル化。処理時間を70%短縮。',
    techTags: ['Power Platform', 'Microsoft 365'],
    publishedAt: '2024-01-15',
  },
  {
    _id: '2',
    title: 'コールセンター業務のAI自動化',
    slug: { current: 'call-center-ai-automation' },
    problem: '問い合わせ・サポート対応',
    excerpt: 'Azure OpenAI Serviceを活用したチャットボット導入により、問い合わせ対応を24時間自動化。',
    techTags: ['Copilot / 生成AI', 'Azure'],
    publishedAt: '2024-01-20',
  },
  {
    _id: '3',
    title: '営業レポート自動生成システム',
    slug: { current: 'sales-report-automation' },
    problem: 'データ集計・レポート自動化',
    excerpt: 'Power BIとPower Automateを連携し、営業レポートの自動生成・配信を実現。',
    techTags: ['Power Platform', 'Integration（API連携など）'],
    publishedAt: '2024-02-01',
  },
]

export const mockFeaturedMethods = [
  {
    _id: '1',
    title: 'Power Appsで業務アプリを迅速開発する方法',
    slug: { current: 'power-apps-rapid-development' },
    excerpt: 'ローコード開発のベストプラクティスと、実践的な開発手法を解説します。',
    techTags: ['Power Platform', 'Microsoft 365'],
  },
  {
    _id: '2',
    title: 'Copilot for Microsoft 365の効果的な活用術',
    slug: { current: 'copilot-effective-usage' },
    excerpt: '生成AIを業務に組み込むための具体的なプロンプト設計とワークフロー構築方法。',
    techTags: ['Copilot / 生成AI', 'Microsoft 365'],
  },
  {
    _id: '3',
    title: 'Azure OpenAI Serviceのセキュアな導入ガイド',
    slug: { current: 'azure-openai-secure-implementation' },
    excerpt: '企業環境での生成AI導入におけるセキュリティ考慮事項と実装パターン。',
    techTags: ['Copilot / 生成AI', 'Azure', 'Security / Governance'],
  },
]

export const mockStats = {
  consultationCount: 450,
  caseCount: 1000,
  methodCount: 500,
  contentCount: 3500,
}

export const mockPartners = [
  'Microsoft',
  'Azure',
  'Power Platform',
  'Dynamics 365',
  'OpenAI',
  'GitHub',
]

export const mockAllCases = [
  ...mockFeaturedCases,
  {
    _id: '4',
    title: 'ナレッジベースの構築と検索システム',
    slug: { current: 'knowledge-base-search' },
    problem: 'ナレッジ管理・検索',
    industry: { displayName: 'IT・システム開発', value: 'it' },
    excerpt: 'SharePointとAzure AI Searchを活用した社内ナレッジ管理システムを構築。',
    techTags: ['Microsoft 365', 'Azure', 'Copilot / 生成AI'],
    publishedAt: '2024-02-10',
  },
  {
    _id: '5',
    title: '業務プロセスの自動化による効率向上',
    slug: { current: 'business-process-automation' },
    problem: '業務効率化',
    industry: { displayName: '製造', value: 'manufacturing' },
    excerpt: 'Power Automateによる業務フロー自動化で、月次処理時間を50%削減。',
    techTags: ['Power Platform', 'Microsoft 365'],
    publishedAt: '2024-02-15',
  },
  {
    _id: '6',
    title: 'セキュアな生成AIチャットボット導入',
    slug: { current: 'secure-ai-chatbot' },
    problem: 'セキュアな生成AI導入',
    industry: { displayName: '金融・保険', value: 'finance' },
    excerpt: 'Azure OpenAI Serviceを活用し、セキュリティ要件を満たしたチャットボットを構築。',
    techTags: ['Copilot / 生成AI', 'Azure', 'Security / Governance'],
    publishedAt: '2024-02-20',
  },
]

export const mockAllMethods = [
  ...mockFeaturedMethods,
  {
    _id: '4',
    title: 'Power Automateで業務フローを自動化する実践ガイド',
    slug: { current: 'power-automate-workflow' },
    excerpt: '繰り返し業務を自動化するためのPower Automate設計パターンと実装方法。',
    techTags: ['Power Platform', 'Microsoft 365'],
  },
  {
    _id: '5',
    title: 'Dynamics 365のカスタマイズと拡張開発',
    slug: { current: 'dynamics-365-customization' },
    excerpt: 'Dynamics 365を業務要件に合わせてカスタマイズする方法とベストプラクティス。',
    techTags: ['Dynamics 365', 'Dataverse / D365'],
  },
  {
    _id: '6',
    title: 'Microsoft 365のセキュリティ設定ガイド',
    slug: { current: 'm365-security-configuration' },
    excerpt: '企業環境におけるMicrosoft 365のセキュリティ設定とガバナンス構築方法。',
    techTags: ['Microsoft 365', 'Security / Governance'],
  },
]

export const mockIndustryCategories = [
  { _id: '1', value: 'it', displayName: 'IT・システム開発', order: 1 },
  { _id: '2', value: 'manufacturing', displayName: '製造', order: 2 },
  { _id: '3', value: 'finance', displayName: '金融・保険', order: 3 },
  { _id: '4', value: 'retail', displayName: '小売・流通', order: 4 },
  { _id: '5', value: 'healthcare', displayName: '医療・福祉', order: 5 },
]

// 辅助函数：创建标准的 PortableText block
function createBlock(text: string, isBold = false, isListItem = false): any {
  return {
    _type: 'block',
    children: [
      {
        _type: 'span',
        text: text,
        marks: isBold ? ['strong'] : [],
      },
    ],
    style: 'normal',
    ...(isListItem && { listItem: 'bullet' }),
    markDefs: [],
  }
}

// 详情页数据 - 包含完整内容
export const mockCaseDetails: Record<string, any> = {
  'manufacturing-application-digitalization': {
    _id: '1',
    title: '製造業における申請業務のデジタル化',
    slug: { current: 'manufacturing-application-digitalization' },
    problem: '申請・稟議のデジタル化',
    industry: { displayName: '製造', value: 'manufacturing' },
    excerpt: 'Power Platformを活用し、従来の紙ベースの申請業務を完全デジタル化。処理時間を70%短縮。',
    techTags: ['Power Platform', 'Microsoft 365'],
    content: [
      createBlock('製造業A社では、従来の紙ベースの申請・稟議業務が非効率で、承認プロセスに時間がかかっていました。Power Platformを活用したデジタル化により、以下の成果を実現しました。'),
      createBlock('主な取り組み内容：', true),
      createBlock('• Power Appsで申請フォームを構築', false, true),
      createBlock('• Power Automateで承認フローを自動化', false, true),
      createBlock('• SharePointで申請書類を一元管理', false, true),
      createBlock('導入効果として、申請処理時間を70%短縮し、承認プロセスの透明性も向上しました。'),
    ],
  },
  'call-center-ai-automation': {
    _id: '2',
    title: 'コールセンター業務のAI自動化',
    slug: { current: 'call-center-ai-automation' },
    problem: '問い合わせ・サポート対応',
    industry: { displayName: 'サービス', value: 'service' },
    excerpt: 'Azure OpenAI Serviceを活用したチャットボット導入により、問い合わせ対応を24時間自動化。',
    techTags: ['Copilot / 生成AI', 'Azure'],
    content: [
      createBlock('サービス業B社のコールセンターでは、問い合わせ対応に多くのリソースを割いていました。Azure OpenAI Serviceを活用したチャットボットを導入し、以下の改善を実現しました。'),
      createBlock('導入内容：', true),
      createBlock('• Azure OpenAI Serviceでチャットボットを構築', false, true),
      createBlock('• 社内ナレッジベースと連携', false, true),
      createBlock('• 24時間365日の自動対応を実現', false, true),
      createBlock('結果として、問い合わせ対応の自動化率が80%に達し、コスト削減と顧客満足度の向上を両立しました。'),
    ],
  },
  'sales-report-automation': {
    _id: '3',
    title: '営業レポート自動生成システム',
    slug: { current: 'sales-report-automation' },
    problem: 'データ集計・レポート自動化',
    industry: { displayName: '小売・流通', value: 'retail' },
    excerpt: 'Power BIとPower Automateを連携し、営業レポートの自動生成・配信を実現。',
    techTags: ['Power Platform', 'Integration（API連携など）'],
    content: [
      createBlock('小売業C社では、月次営業レポートの作成に多くの時間を要していました。Power BIとPower Automateを連携した自動化システムを構築しました。'),
      createBlock('システム構成：', true),
      createBlock('• Power BIでデータ可視化', false, true),
      createBlock('• Power Automateで自動レポート生成', false, true),
      createBlock('• Teamsで自動配信', false, true),
      createBlock('これにより、レポート作成時間を90%削減し、営業チームはより戦略的な業務に集中できるようになりました。'),
    ],
  },
  'knowledge-base-search': {
    _id: '4',
    title: 'ナレッジベースの構築と検索システム',
    slug: { current: 'knowledge-base-search' },
    problem: 'ナレッジ管理・検索',
    industry: { displayName: 'IT・システム開発', value: 'it' },
    excerpt: 'SharePointとAzure AI Searchを活用した社内ナレッジ管理システムを構築。',
    techTags: ['Microsoft 365', 'Azure', 'Copilot / 生成AI'],
    content: [
      createBlock('IT企業D社では、社内のナレッジが分散しており、必要な情報を探すのに時間がかかっていました。SharePointとAzure AI Searchを活用した統合ナレッジ管理システムを構築しました。'),
      createBlock('システムの特徴：', true),
      createBlock('• SharePointでナレッジを一元管理', false, true),
      createBlock('• Azure AI Searchで高度な検索機能を実現', false, true),
      createBlock('• Copilotと連携し、自然言語での検索を可能に', false, true),
      createBlock('これにより、情報検索時間を60%短縮し、社員の生産性が大幅に向上しました。'),
    ],
  },
  'business-process-automation': {
    _id: '5',
    title: '業務プロセスの自動化による効率向上',
    slug: { current: 'business-process-automation' },
    problem: '業務効率化',
    industry: { displayName: '製造', value: 'manufacturing' },
    excerpt: 'Power Automateによる業務フロー自動化で、月次処理時間を50%削減。',
    techTags: ['Power Platform', 'Microsoft 365'],
    content: [
      createBlock('製造業E社では、月次の業務処理に多くの時間を要していました。Power Automateを活用した業務フロー自動化により、大幅な効率化を実現しました。'),
      createBlock('自動化した業務：', true),
      createBlock('• 月次レポートの自動生成', false, true),
      createBlock('• データ集計と分析の自動化', false, true),
      createBlock('• 承認フローの自動化', false, true),
      createBlock('結果として、月次処理時間を50%削減し、業務効率が大幅に向上しました。'),
    ],
  },
  'secure-ai-chatbot': {
    _id: '6',
    title: 'セキュアな生成AIチャットボット導入',
    slug: { current: 'secure-ai-chatbot' },
    problem: 'セキュアな生成AI導入',
    industry: { displayName: '金融・保険', value: 'finance' },
    excerpt: 'Azure OpenAI Serviceを活用し、セキュリティ要件を満たしたチャットボットを構築。',
    techTags: ['Copilot / 生成AI', 'Azure', 'Security / Governance'],
    content: [
      createBlock('金融業F社では、顧客サポートの効率化とセキュリティ要件の両立が課題でした。Azure OpenAI Serviceを活用し、セキュリティ要件を満たしたチャットボットを構築しました。'),
      createBlock('セキュリティ対策：', true),
      createBlock('• プライベートエンドポイントの設定', false, true),
      createBlock('• データ保持ポリシーの実装', false, true),
      createBlock('• アクセス制御と監査ログの設定', false, true),
      createBlock('これにより、セキュリティ要件を満たしながら、顧客サポートの効率を向上させることができました。'),
    ],
  },
}

export const mockMethodDetails: Record<string, any> = {
  'power-apps-rapid-development': {
    _id: '1',
    title: 'Power Appsで業務アプリを迅速開発する方法',
    slug: { current: 'power-apps-rapid-development' },
    excerpt: 'ローコード開発のベストプラクティスと、実践的な開発手法を解説します。',
    techTags: ['Power Platform', 'Microsoft 365'],
    content: [
      createBlock('Power Appsを使ったローコード開発では、適切な設計とベストプラクティスの実践が重要です。'),
      createBlock('開発のポイント：', true),
      createBlock('1. データモデルの設計', false, true),
      createBlock('2. ユーザーエクスペリエンスの最適化', false, true),
      createBlock('3. セキュリティとガバナンスの考慮', false, true),
      createBlock('これらのポイントを押さえることで、効率的で保守性の高いアプリケーションを開発できます。'),
    ],
  },
  'copilot-effective-usage': {
    _id: '2',
    title: 'Copilot for Microsoft 365の効果的な活用術',
    slug: { current: 'copilot-effective-usage' },
    excerpt: '生成AIを業務に組み込むための具体的なプロンプト設計とワークフロー構築方法。',
    techTags: ['Copilot / 生成AI', 'Microsoft 365'],
    content: [
      createBlock('Copilot for Microsoft 365を効果的に活用するには、適切なプロンプト設計とワークフローの構築が鍵となります。'),
      createBlock('活用のポイント：', true),
      createBlock('• 具体的で明確なプロンプトの作成', false, true),
      createBlock('• コンテキスト情報の提供', false, true),
      createBlock('• 反復的な改善プロセス', false, true),
      createBlock('これらのポイントを実践することで、Copilotの効果を最大限に引き出すことができます。'),
    ],
  },
  'azure-openai-secure-implementation': {
    _id: '3',
    title: 'Azure OpenAI Serviceのセキュアな導入ガイド',
    slug: { current: 'azure-openai-secure-implementation' },
    excerpt: '企業環境での生成AI導入におけるセキュリティ考慮事項と実装パターン。',
    techTags: ['Copilot / 生成AI', 'Azure', 'Security / Governance'],
    content: [
      createBlock('企業環境でAzure OpenAI Serviceを導入する際は、セキュリティとガバナンスを最優先に考慮する必要があります。'),
      createBlock('セキュリティ対策：', true),
      createBlock('• ネットワーク分離とプライベートエンドポイントの設定', false, true),
      createBlock('• データ保持ポリシーの設定', false, true),
      createBlock('• アクセス制御とロールベースの権限管理', false, true),
      createBlock('これらの対策を実装することで、企業環境での安全な生成AI活用が可能になります。'),
    ],
  },
  'power-automate-workflow': {
    _id: '4',
    title: 'Power Automateで業務フローを自動化する実践ガイド',
    slug: { current: 'power-automate-workflow' },
    excerpt: '繰り返し業務を自動化するためのPower Automate設計パターンと実装方法。',
    techTags: ['Power Platform', 'Microsoft 365'],
    content: [
      createBlock('Power Automateを活用した業務フロー自動化の実践的なガイドです。'),
      createBlock('設計のポイント：', true),
      createBlock('• フローの明確な定義', false, true),
      createBlock('• エラーハンドリングの実装', false, true),
      createBlock('• パフォーマンスの最適化', false, true),
    ],
  },
  'dynamics-365-customization': {
    _id: '5',
    title: 'Dynamics 365のカスタマイズと拡張開発',
    slug: { current: 'dynamics-365-customization' },
    excerpt: 'Dynamics 365を業務要件に合わせてカスタマイズする方法とベストプラクティス。',
    techTags: ['Dynamics 365', 'Dataverse / D365'],
    content: [
      createBlock('Dynamics 365のカスタマイズと拡張開発について解説します。'),
      createBlock('カスタマイズのポイント：', true),
      createBlock('• カスタムエンティティの作成', false, true),
      createBlock('• ワークフローの構築', false, true),
      createBlock('• プラグイン開発', false, true),
    ],
  },
  'm365-security-configuration': {
    _id: '6',
    title: 'Microsoft 365のセキュリティ設定ガイド',
    slug: { current: 'm365-security-configuration' },
    excerpt: '企業環境におけるMicrosoft 365のセキュリティ設定とガバナンス構築方法。',
    techTags: ['Microsoft 365', 'Security / Governance'],
    content: [
      createBlock('Microsoft 365のセキュリティ設定について、実践的なガイドを提供します。'),
      createBlock('設定のポイント：', true),
      createBlock('• 条件付きアクセスの設定', false, true),
      createBlock('• データ損失防止（DLP）の実装', false, true),
      createBlock('• 監査ログの設定', false, true),
    ],
  },
}

export const mockServiceDetails: Record<string, any> = {
  'microsoft-365-support': {
    _id: '1',
    title: 'Microsoft 365導入・活用支援',
    slug: { current: 'microsoft-365-support' },
    excerpt: 'Microsoft 365の導入から活用まで、企業の生産性向上をサポートします。',
    techTags: ['Microsoft 365', 'Power Platform'],
    content: [
      createBlock('Microsoft 365の導入から活用まで、包括的なサポートを提供します。'),
      createBlock('サービス内容：', true),
      createBlock('• 導入計画の策定', false, true),
      createBlock('• 移行支援', false, true),
      createBlock('• ユーザー研修', false, true),
      createBlock('• 運用サポート', false, true),
      createBlock('お客様の環境に合わせた最適な導入プランをご提案し、スムーズな移行をサポートします。'),
    ],
  },
  'power-platform-development': {
    _id: '2',
    title: 'Power Platform開発・構築',
    slug: { current: 'power-platform-development' },
    excerpt: 'Power Apps、Power Automateを活用した業務自動化ソリューションを提供します。',
    techTags: ['Power Platform', 'Azure'],
    content: [
      createBlock('Power Platformを活用した業務自動化ソリューションの開発から構築まで対応します。'),
      createBlock('開発内容：', true),
      createBlock('• Power Appsによる業務アプリ開発', false, true),
      createBlock('• Power Automateによるワークフロー自動化', false, true),
      createBlock('• Power BIによるデータ分析', false, true),
      createBlock('ローコード開発により、迅速かつ効率的なソリューション構築を実現します。'),
    ],
  },
  'dynamics-365-implementation': {
    _id: '3',
    title: 'Dynamics 365導入・カスタマイズ',
    slug: { current: 'dynamics-365-implementation' },
    excerpt: 'CRM・ERPとしてのDynamics 365導入から、お客様の業務に合わせたカスタマイズまで対応します。',
    techTags: ['Dynamics 365', 'Dataverse / D365'],
    content: [
      createBlock('Dynamics 365の導入からカスタマイズまで、お客様の業務要件に合わせたソリューションを提供します。'),
      createBlock('対応内容：', true),
      createBlock('• Dynamics 365 Sales / Customer Service の導入', false, true),
      createBlock('• 業務フローのカスタマイズ', false, true),
      createBlock('• 既存システムとの統合', false, true),
      createBlock('お客様の業務プロセスに最適化されたCRM・ERPシステムを構築します。'),
    ],
  },
  'generative-ai-support': {
    _id: '4',
    title: '生成AI導入・活用支援',
    slug: { current: 'generative-ai-support' },
    excerpt: 'Copilot、Azure OpenAI Serviceを活用した生成AI導入をサポートします。',
    techTags: ['Copilot / 生成AI', 'Azure'],
    content: [
      createBlock('生成AIの導入から活用まで、包括的なサポートを提供します。'),
      createBlock('サポート内容：', true),
      createBlock('• Copilot for Microsoft 365の導入支援', false, true),
      createBlock('• Azure OpenAI Serviceの構築', false, true),
      createBlock('• プロンプト設計のサポート', false, true),
      createBlock('• 活用研修の提供', false, true),
    ],
  },
  'security-governance': {
    _id: '5',
    title: 'セキュリティ・ガバナンス構築',
    slug: { current: 'security-governance' },
    excerpt: 'Microsoft 365、Azureのセキュリティ設定から、コンプライアンス対応まで支援します。',
    techTags: ['Security / Governance', 'Microsoft 365'],
    content: [
      createBlock('セキュリティとガバナンスの構築をサポートします。'),
      createBlock('対応内容：', true),
      createBlock('• セキュリティポリシーの設定', false, true),
      createBlock('• コンプライアンス対応', false, true),
      createBlock('• 監査とレポート', false, true),
    ],
  },
  'api-integration': {
    _id: '6',
    title: 'API連携・システム統合',
    slug: { current: 'api-integration' },
    excerpt: '既存システムとMicrosoft製品の連携、API開発による業務効率化を実現します。',
    techTags: ['Integration（API連携など）', 'Azure'],
    content: [
      createBlock('API連携とシステム統合のサポートを提供します。'),
      createBlock('対応内容：', true),
      createBlock('• REST API / Graph APIの開発', false, true),
      createBlock('• 既存システムとの統合', false, true),
      createBlock('• データ同期の実装', false, true),
    ],
  },
}
