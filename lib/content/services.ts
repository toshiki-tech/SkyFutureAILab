import type { Service } from '@/types'
import { p, bullet, h3 } from './portableText'

const allServices: Service[] = [
  {
    _id: 'svc-copilot-implementation',
    title: 'Copilot 導入支援',
    slug: { current: 'copilot-implementation-support' },
    techTags: ['Copilot / 生成AI', 'Microsoft 365'],
    excerpt:
      'Microsoft 365 Copilot のライセンス導入だけでなく、データガバナンス整備・ユースケース設計・定着化までをワンストップで支援します。',
    publishedAt: '2025-01-15',
    content: [
      h3('このサービスで解決できる課題'),
      bullet('Copilot ライセンスを購入したが現場で使われない'),
      bullet('権限設計が不十分で「見えてはいけない情報」の流出が不安'),
      bullet('ROI(削減時間 / 業務改善効果)を経営に報告できない'),
      h3('提供内容'),
      p(
        '90 日間の導入プランに沿って、準備 → パイロット → 全社展開の 3 フェーズで段階的に立ち上げます。初期はデータ/権限の健全性診断、中期はユースケース選定とアンバサダー育成、後期は利用ログ分析と ROI レポートまで伴走。'
      ),
      bullet('SharePoint / OneDrive の権限監査と機密ラベル設計'),
      bullet('部門別ユースケース 5 種の選定ワークショップ'),
      bullet('プロンプト集 / 業務別テンプレートの整備'),
      bullet('アンバサダー 3–5 名のトレーニング'),
      bullet('週次の利用分析と KPI レポーティング'),
      h3('標準期間 / 体制'),
      p('90 日間(準備 30 日 + パイロット 30 日 + 全社展開 30 日)。当社コンサルタント 1 名 + エンジニア 1 名が専任アサイン。'),
      h3('費用感'),
      p('規模・ライセンス数により個別見積。パイロット 100 ライセンス規模で 500 万円台から。'),
    ],
  },
  {
    _id: 'svc-power-platform-citizen',
    title: 'Power Platform 内製化支援',
    slug: { current: 'power-platform-citizen-development' },
    techTags: ['Power Platform', 'Microsoft 365', 'Security / Governance'],
    excerpt:
      'Power Apps / Power Automate を現場主導で作り続けられる体制を構築。ガバナンスとスピードを両立する内製化フレームワーク。',
    publishedAt: '2025-02-04',
    content: [
      h3('このサービスで解決できる課題'),
      bullet('情シスがボトルネックとなり現場の改善要望が消化できない'),
      bullet('市民開発で作ったアプリが野良化・ブラックボックス化する不安'),
      bullet('何から始めるべきか、どの業務を対象にすべきか判断できない'),
      h3('提供内容'),
      p(
        '内製化を「技術導入」ではなく「組織設計」と捉え、ガバナンスフレーム・人材育成・開発標準を同時に立ち上げます。パイロット 1–2 アプリの伴走開発を通じて、社内開発チームに知見を移転。'
      ),
      bullet('Power Platform 環境(Dev / Test / Prod)の設計と構築'),
      bullet('DLP ポリシー / 命名規則 / レビュー基準の策定'),
      bullet('市民開発者向け研修カリキュラム(初級 / 中級)提供'),
      bullet('パイロットアプリ 1–2 本の伴走開発'),
      bullet('内製チームへの知見移転とチャンピオンユーザー育成'),
      h3('標準期間 / 体制'),
      p('4〜6 ヶ月。当社コンサルタント 1 名 + シニアエンジニア 1–2 名が伴走。'),
      h3('費用感'),
      p('パイロット期 3 ヶ月で 600 万円台から、展開期は成果に応じて個別設計。'),
    ],
  },
  {
    _id: 'svc-azure-openai-build',
    title: 'Azure OpenAI 構築',
    slug: { current: 'azure-openai-construction' },
    techTags: ['Azure', 'Copilot / 生成AI', 'Security / Governance'],
    excerpt:
      '金融・医療・公共など閉域要件がある業種向けに、Azure OpenAI Service を Private Endpoint で安全に構築。RAG / プロンプト監査まで一式対応。',
    publishedAt: '2025-02-20',
    content: [
      h3('このサービスで解決できる課題'),
      bullet('ChatGPT の社内利用が情報漏洩懸念から禁止されている'),
      bullet('社内文書を AI で検索したいがコンプライアンス要件を満たせない'),
      bullet('全プロンプト・応答のログ保管と監査可能性が必要'),
      h3('提供内容'),
      p(
        'Azure OpenAI Service を Private Endpoint + Azure Firewall 構成で完全閉域化し、行内 / 院内ネットワークから直接利用できる基盤を構築。社内文書の RAG 検索や PII マスキングまで含む、規制業種向けの標準リファレンス実装を提供します。'
      ),
      bullet('Azure OpenAI + Private Endpoint + Private DNS 構成設計'),
      bullet('Azure AI Search ベースの RAG(検索拡張生成)実装'),
      bullet('PII マスキング(Presidio ベース)の入出力双方向適用'),
      bullet('全プロンプト・応答ログの Log Analytics 長期保管'),
      bullet('Entra ID / 条件付きアクセスによるキー管理ゼロ化'),
      h3('標準期間 / 体制'),
      p('PoC 6 週間、本番構築 3〜4 ヶ月。Azure アーキテクト 1 名 + セキュリティエンジニア 1 名。'),
      h3('費用感'),
      p('PoC 400 万円台から、本番構築は規模により 1,500〜4,000 万円。'),
    ],
  },
  {
    _id: 'svc-dynamics-365',
    title: 'Dynamics 365 導入',
    slug: { current: 'dynamics-365-implementation' },
    techTags: ['Dataverse / D365', 'Power Platform'],
    excerpt:
      'Salesforce / 表計算 SFA から Dynamics 365 Sales / Customer Service への移行を、要件整理から定着化まで一貫支援。',
    publishedAt: '2025-03-10',
    content: [
      h3('このサービスで解決できる課題'),
      bullet('既存 SFA / CRM の費用が膨らみ、ROI が見合わなくなっている'),
      bullet('Microsoft 365(Outlook / Teams)とのシームレス連携を求めている'),
      bullet('営業プロセスが複雑で、標準機能だけでは対応しきれない'),
      h3('提供内容'),
      p(
        '現行業務プロセスの診断から、Dynamics 365 の標準機能への寄せ込み、カスタマイズの最小化、データ移行、定着化支援までを一気通貫で提供。過剰カスタマイズによる将来のメンテ地獄を避ける設計を徹底します。'
      ),
      bullet('現行プロセス診断 + Fit&Gap 分析'),
      bullet('Dynamics 365 Sales / Customer Service の標準実装'),
      bullet('Power Platform を活用した最小限のカスタマイズ'),
      bullet('既存 CRM からのデータ移行(クレンジング含む)'),
      bullet('Outlook / Teams / Copilot for Sales との統合'),
      bullet('導入後 3 ヶ月の定着化フォロー'),
      h3('標準期間 / 体制'),
      p('要件定義 1 ヶ月 + 実装 3 ヶ月 + 定着化 3 ヶ月。D365 コンサル 1 名 + エンジニア 2 名。'),
      h3('費用感'),
      p('50〜300 ライセンス規模で 1,200〜3,500 万円。'),
    ],
  },
  {
    _id: 'svc-power-bi-data-platform',
    title: 'Power BI / データ活用基盤構築',
    slug: { current: 'power-bi-data-platform' },
    techTags: ['Power Platform', 'Microsoft 365', 'Azure'],
    excerpt:
      'Excel・部門別ツールが乱立し「経営会議で数字が食い違う」企業向けに、Microsoft Fabric / Power BI を中核とした全社共通のデータ基盤と意思決定ダッシュボードを構築します。',
    publishedAt: '2025-04-22',
    content: [
      h3('このサービスで解決できる課題'),
      bullet('部門ごとに集計方法が異なり、経営会議で数字の食い違いが発生する'),
      bullet('Excel ベースの月次レポート作成に毎月数十時間が浪費されている'),
      bullet('過去にデータ基盤を構築したが、現場で活用されず形骸化している'),
      h3('提供内容'),
      p(
        '「BI ツールの導入」ではなく「意思決定スピードの向上」を目的に、データソース統合 → セマンティックモデル設計 → Power BI ダッシュボード構築 → 現場活用定着までを一気通貫で支援します。Microsoft Fabric / Dataverse / SharePoint Lists / 既存 DWH を組み合わせ、コスト・拡張性・ガバナンスを両立する基盤を設計。"作って終わり" にならないよう、現場担当者がセルフでレポートを更新できる体制までを移管します。'
      ),
      bullet('既存データソースの棚卸 + 経営 KPI ツリー整理ワークショップ'),
      bullet('Microsoft Fabric / Dataverse によるセマンティックモデル設計'),
      bullet('経営層向け統合ダッシュボード 3〜5 本の構築'),
      bullet('行レベルセキュリティ(RLS)と機密ラベルによるアクセス制御設計'),
      bullet('現場担当者向け Power BI セルフサービス研修(初級 / 中級)'),
      bullet('運用 3 ヶ月後のレビューと KPI 見直し伴走'),
      h3('標準期間 / 体制'),
      p('PoC 6 週間、本番構築 3〜5 ヶ月。BI コンサルタント 1 名 + データエンジニア 1〜2 名が専任アサイン。'),
      h3('費用感'),
      p('PoC 350 万円台から、本番構築はデータソース数・対象部門規模により 1,000〜2,500 万円。'),
    ],
  },
  {
    _id: 'svc-security-assessment',
    title: 'セキュリティアセスメント',
    slug: { current: 'security-assessment' },
    techTags: ['Security / Governance', 'Microsoft 365', 'Azure'],
    excerpt:
      'Microsoft 365 / Azure のテナントを多角的に診断し、脆弱点・改善余地・優先度付きアクションプランを 1 ヶ月で提示します。',
    publishedAt: '2025-04-08',
    content: [
      h3('このサービスで解決できる課題'),
      bullet('Microsoft 365 を長年運用しているがセキュリティ設定が適切か不安'),
      bullet('監査・ISMS 対応のため現状を客観的に可視化したい'),
      bullet('何から改善すべきか優先順位が判断できない'),
      h3('提供内容'),
      p(
        'Microsoft Secure Score / Azure Defender / Entra ID 設定などを横断的に診断し、業界ベンチマーク比較と優先度付きアクションプランを成果物として提出します。単なる項目チェックではなく、ビジネスインパクトで優先度を付ける点が特徴。'
      ),
      bullet('Microsoft Secure Score の詳細分析'),
      bullet('Entra ID 条件付きアクセス / MFA 設定レビュー'),
      bullet('Exchange / SharePoint / Teams のガバナンス診断'),
      bullet('Azure サブスクリプションのセキュリティ姿勢評価'),
      bullet('優先度付き改善ロードマップ(90 日 / 180 日 / 1 年)'),
      h3('標準期間 / 体制'),
      p('4 週間。セキュリティコンサル 1 名 + シニアエンジニア 1 名。'),
      h3('費用感'),
      p('従業員 500–3,000 名規模で 250〜450 万円。'),
    ],
  },
]

export const mockServices: Service[] = allServices.map(({ content, ...rest }) => rest)

export const mockServiceDetails: Record<string, Service> = Object.fromEntries(
  allServices.map((s) => [s.slug.current, s])
)
