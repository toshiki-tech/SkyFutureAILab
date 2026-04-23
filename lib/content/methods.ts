import type { Method } from '@/types'
import { p, bullet, numbered, h3 } from './portableText'

/**
 * Each entry carries both list-level metadata AND full `content`.
 * `mockAllMethods` strips `content` for list views; `mockMethodDetails` retains it for detail pages.
 */
const allMethods: Method[] = [
  // ─── Microsoft 365 × 2 ───────────────────────────────────────────────
  {
    _id: 'method-teams-governance',
    title: 'Microsoft Teams 運用を破綻させない 5 つのガバナンス設計',
    slug: { current: 'teams-governance-design' },
    techTags: ['Microsoft 365', 'Security / Governance'],
    excerpt:
      'チームの乱立・ゲスト誤招待・放置チャネルを未然に防ぐ、命名規則 / ライフサイクル / ゲストアクセス / 機密ラベル / 棚卸しの設計ガイド。',
    publishedAt: '2024-02-12',
    featured: true,
    content: [
      h3('適用シーン'),
      p(
        'Teams を導入して半年〜2 年が経過し、チーム数が 300 を超えた/ゲストアクセスが管理不能になった/同じ目的のチームが複数できている、といった「運用破綻の初期症状」が出ている組織。'
      ),
      h3('前提条件'),
      bullet('Microsoft 365 E3 / E5 ライセンス(機密ラベル利用可)'),
      bullet('Entra ID グループの作成権限の整理済み'),
      bullet('情シス側に棚卸し運用リソースを月 4 時間確保できる'),
      h3('所要時間 / 難度'),
      p('初期設計 2 週間、ロールアウト 4 週間、以降は月次運用。難度:中。'),
      h3('ステップ'),
      numbered('チーム命名規則を 3 分割で定義(目的 × 部門 × 識別子)。例: PRJ-SALES-2025Q2'),
      numbered('チーム作成リクエストフォーム(Power Apps)と承認フロー(Power Automate)を構築。野良作成を禁止'),
      numbered('ライフサイクルポリシー:90 日無アクティビティでオーナーに通知、180 日でアーカイブ'),
      numbered('ゲストアクセスは「案件単位」のみ許可、期限 90 日の自動失効を設定'),
      numbered('機密情報を扱うチームは Purview 機密ラベルで自動暗号化'),
      numbered('四半期に 1 回、オーナー不在チームと非アクティブチームを自動抽出 → 棚卸し'),
      h3('注意点'),
      bullet('命名規則は「現場が 3 秒で理解できるか」が成否を分ける。複雑すぎると守られない'),
      bullet('ゲストアクセス全面禁止はビジネス側の反発を招く。期限付き許可が現実解'),
      bullet('アーカイブは「削除」ではなく「読取専用化」。監査ログ保持要件を満たす必要あり'),
      h3('関連事例'),
      bullet('SIer F社:稟議・発注申請を Power Apps で一元化'),
      bullet('総合病院E社:看護師の事務問合せを Copilot チャットで 70% 自動応答'),
    ],
  },
  {
    _id: 'method-sharepoint-ia',
    title: 'SharePoint 情報アーキテクチャの 4 層設計',
    slug: { current: 'sharepoint-information-architecture' },
    techTags: ['Microsoft 365'],
    excerpt:
      'ハブサイト / コミュニケーションサイト / チームサイト / ドキュメントライブラリの 4 層で、検索性と権限管理を両立する設計手法。',
    publishedAt: '2024-02-15',
    content: [
      h3('適用シーン'),
      p(
        '既存 SharePoint がフラット構造で数百サイトに膨張、検索しても目的文書に辿り着けない。または新規導入時に最初から破綻しない IA を敷きたい組織。'
      ),
      h3('前提条件'),
      bullet('SharePoint Online 利用可能'),
      bullet('全社の部門構造・主要業務プロセスの整理ができる担当者'),
      bullet('Microsoft Search(モダン検索)が有効化されている'),
      h3('所要時間 / 難度'),
      p('IA 設計 3 週間、移行 1–3 ヶ月(既存量に依存)。難度:中〜高。'),
      h3('ステップ'),
      numbered('最上位:ルートハブサイト(全社ポータル)を 1 つ設置'),
      numbered('第 2 層:業務分類ハブ(コーポレート / 事業 / プロジェクト / ナレッジ)を 4 つに限定'),
      numbered('第 3 層:チームサイト(実作業の場)を部署 × プロジェクト単位で配置、ハブに紐付け'),
      numbered('第 4 層:ドキュメントライブラリを「種類 × 機密度」でビュー分け'),
      numbered('メタデータ(用途/機密度/対象部署)をサイト列で必須化、全文検索 + フィルタ検索を両立'),
      numbered('サイト作成はテンプレート + 承認フロー経由のみ'),
      h3('注意点'),
      bullet('深い階層(4 層超)は検索性が落ちる。平坦でもタグで辿れる設計を優先'),
      bullet('既存サイトの移行は「Copilot 検索対象に入れる価値があるか」で取捨選択する'),
      bullet('権限継承の断絶(個別権限)が増えると運用が崩壊する。原則継承で設計'),
      h3('関連事例'),
      bullet('私立大学H学園:教員事務の問合せを Copilot 検索で 60% 削減'),
      bullet('中堅製造B社:Copilot 活用で品質異常分析を 87% 高速化'),
    ],
  },

  // ─── Power Platform × 2 ──────────────────────────────────────────────
  {
    _id: 'method-power-apps-ringi',
    title: 'Power Apps で稟議アプリを 2 週間で立ち上げる実装手順',
    slug: { current: 'power-apps-ringi-rapid-build' },
    techTags: ['Power Platform', 'Microsoft 365'],
    excerpt:
      'モデル駆動型 + Dataverse + Power Automate で、紙 / Excel 稟議をローコードで置き換える標準レシピ。',
    publishedAt: '2024-02-18',
    featured: true,
    content: [
      h3('適用シーン'),
      p(
        '紙 / Excel で運用されている稟議・申請系業務を、2 週間以内に最小構成で動かしたいケース。情シスが主導だが現場担当 1 名と一緒に作る内製化の最初の一歩として最適。'
      ),
      h3('前提条件'),
      bullet('Power Apps(Per App プラン以上)ライセンス'),
      bullet('Dataverse 環境(本番 + 検証の 2 環境)'),
      bullet('既存稟議フォーマット 1 種類に対象を絞れること'),
      h3('所要時間 / 難度'),
      p('1 稟議種あたり 2 週間(設計 3 日・実装 5 日・テスト 2 日)。難度:低〜中。'),
      h3('ステップ'),
      numbered('現行稟議の項目・承認ルートを 1 枚の業務フローにまとめる'),
      numbered('Dataverse にテーブル設計(案件 / 承認履歴 / 添付)を定義'),
      numbered('モデル駆動型アプリで自動生成されるフォームをカスタマイズ'),
      numbered('承認ルートを Power Automate で実装(金額分岐 / 部門分岐)'),
      numbered('Teams アダプティブカードで承認者に通知'),
      numbered('Power BI で滞留状況ダッシュボード'),
      numbered('検証環境でユーザーテスト → 本番デプロイ'),
      h3('注意点'),
      bullet('最初から全部署 / 全稟議種を対象にすると失敗する。1 種類で運用を回してから拡張'),
      bullet('キャンバスアプリよりモデル駆動型のほうが保守性が高い(単純 CRUD の場合)'),
      bullet('承認ルートは「例外処理」をどこまで Power Automate に寄せるかで工数が 3 倍変わる'),
      h3('関連事例'),
      bullet('SIer F社:稟議・発注申請を Power Apps で一元化、承認リードタイム 75% 短縮'),
      bullet('大手建設A社:現場日報のデジタル化で月 820 時間の削減'),
    ],
  },
  {
    _id: 'method-dataverse-platform',
    title: 'Dataverse を全社データ基盤として活用する設計パターン',
    slug: { current: 'dataverse-enterprise-platform' },
    techTags: ['Power Platform', 'Dataverse / D365'],
    excerpt:
      '部門別 SharePoint リストから脱却し、Dataverse でマスタ / トランザクション / 監査ログを統合する実践設計。',
    publishedAt: '2024-02-22',
    content: [
      h3('適用シーン'),
      p(
        'SharePoint リストや Excel 台帳で各部門がバラバラにデータを持ち、名寄せ・集計・監査に毎月膨大な工数がかかっている組織。Power Platform での内製化を進めており、データ層を共通化したい段階。'
      ),
      h3('前提条件'),
      bullet('Dataverse を含む Power Apps ライセンス'),
      bullet('マスタ / トランザクションの区別ができる業務知識保有者'),
      bullet('データ所有者(部門長レベル)の協力'),
      h3('所要時間 / 難度'),
      p('コア 3 テーブル設計に 4–6 週間、全社展開に半年。難度:高。'),
      h3('ステップ'),
      numbered('マスタを特定(顧客 / 従業員 / 部門 / 案件など)し、Single Source of Truth を宣言'),
      numbered('Dataverse でマスタテーブル設計 + 業務ルール(重複防止 / 必須項目)'),
      numbered('既存 SharePoint リストから段階的に Power Automate で同期'),
      numbered('各部門アプリは Dataverse をルックアップ参照する設計に統一'),
      numbered('監査ログを有効化、Dataverse for Teams ではなく本番 Dataverse 環境で運用'),
      numbered('Power BI は Dataverse から直接接続、DirectQuery で鮮度を確保'),
      h3('注意点'),
      bullet('ライセンス費用が線形に増えるため、Dataverse 化する対象は「横断利用されるもの」に絞る'),
      bullet('マスタ所有者を部門ごとに 1 名任命しないと、データ品質が維持できない'),
      bullet('Dataverse for Teams は無料だが、容量 2GB で全社基盤には不足。本番 Dataverse を選ぶ'),
      h3('関連事例'),
      bullet('SIer F社:稟議・発注申請を Power Apps で一元化'),
    ],
  },

  // ─── Copilot / 生成AI × 2 ────────────────────────────────────────────
  {
    _id: 'method-copilot-90day',
    title: 'Copilot for Microsoft 365 導入 90 日プラン',
    slug: { current: 'copilot-90-day-rollout' },
    techTags: ['Copilot / 生成AI', 'Microsoft 365'],
    excerpt:
      'ライセンス配布だけでは定着しない Copilot を、準備 → パイロット → 全社展開の 3 フェーズで確実に活用する手順書。',
    publishedAt: '2024-02-26',
    featured: true,
    content: [
      h3('適用シーン'),
      p(
        'Copilot for M365 ライセンスを購入した/するか検討中。ただし「買っても使われない」「ROI が説明できない」を避けたい経営企画・情シス部門向け。'
      ),
      h3('前提条件'),
      bullet('Microsoft 365 E3 / E5 利用中'),
      bullet('最低 100 ライセンス / 3 部門以上のパイロット対象'),
      bullet('社内データ(SharePoint / OneDrive)の権限整理が概ね完了している'),
      h3('所要時間 / 難度'),
      p('90 日(Day 1–30 準備、Day 31–60 パイロット、Day 61–90 評価 → 展開)。難度:中。'),
      h3('ステップ'),
      numbered('Day 1–10:SharePoint の機密ラベル / 権限監査(Copilot は権限を継承する)'),
      numbered('Day 11–20:ユースケース 5 種を部門別にヒアリング選定(議事録要約 / メール下書き 等)'),
      numbered('Day 21–30:プロンプト集を Teams Wiki に整備、アンバサダー 3–5 名を任命'),
      numbered('Day 31–60:パイロットユーザー 30 名に展開、週次の利用ログ + 体感アンケート'),
      numbered('Day 61–75:定着したユースケースを KPI 化(節約時間 / 利用頻度)'),
      numbered('Day 76–90:全社展開判断、ROI レポート提出'),
      h3('注意点'),
      bullet('権限整理を省くと「見えてはいけない情報」が要約に混ざる事故が起きる'),
      bullet('アンバサダー任命は必須。「勝手に使って」では定着率 20% を切る'),
      bullet('ROI は「削減時間 × 時給」だけでは経営が動かない。業務品質指標も並べて提示する'),
      h3('関連事例'),
      bullet('中堅製造B社:Copilot 活用で品質異常分析を 87% 高速化'),
      bullet('私立大学H学園:教員事務の問合せを Copilot 検索で 60% 削減'),
    ],
  },
  {
    _id: 'method-prompt-design',
    title: '業務で使える Copilot プロンプト設計 4 原則',
    slug: { current: 'copilot-prompt-design-principles' },
    techTags: ['Copilot / 生成AI'],
    excerpt:
      'Context / Goal / Source / Format の 4 要素を揃えるプロンプトテンプレートと、業務別の具体例集。',
    publishedAt: '2024-03-01',
    content: [
      h3('適用シーン'),
      p(
        'Copilot を配布したが「何を聞いていいかわからない」「期待した答えが返らない」という声が現場から上がっている。アンバサダーが教える時の標準教材として使いたい。'
      ),
      h3('前提条件'),
      bullet('Copilot for M365 ライセンス保有'),
      bullet('業務ごとの具体的タスクをヒアリングできる体制'),
      h3('所要時間 / 難度'),
      p('1 人あたり 30 分の座学 + 1 週間の実践で定着。難度:低。'),
      h3('ステップ'),
      numbered('Context(誰として・何の立場で)を必ず先頭に書く'),
      numbered('Goal(何を達成したいか)を動詞で明確化する'),
      numbered('Source(根拠ファイル / URL)を参照指定する'),
      numbered('Format(出力形式:箇条書き / 表 / メール文)を指定する'),
      numbered('上記 4 点をテンプレ化、業務別サンプルを 10 件社内共有'),
      h3('注意点'),
      bullet('「簡潔に」「プロらしく」など曖昧な指示は効かない。字数 / 見出し数で定量指定する'),
      bullet('機密情報を含む指示は Copilot for M365(データ境界内)を使う。公開 ChatGPT は避ける'),
      bullet('プロンプト結果を鵜呑みにせず、必ず出典確認の習慣を同時に教える'),
      h3('関連事例'),
      bullet('中堅製造B社:Copilot 活用で品質異常分析を 87% 高速化'),
    ],
  },

  // ─── Azure × 1 ───────────────────────────────────────────────────────
  {
    _id: 'method-azure-openai-secure',
    title: 'Azure OpenAI を Private Endpoint で閉域化する実装手順',
    slug: { current: 'azure-openai-private-endpoint' },
    techTags: ['Azure', 'Copilot / 生成AI', 'Security / Governance'],
    excerpt:
      '金融 / 医療 / 公共など閉域要件のある業種で、Azure OpenAI Service を Private Endpoint + Firewall で完全閉域化する構成レシピ。',
    publishedAt: '2024-03-05',
    content: [
      h3('適用シーン'),
      p(
        '業務データを Azure OpenAI に入力したいが、パブリックインターネット経由の通信がコンプライアンス上許容されない組織。金融・医療・公共・上場製造業などが典型。'
      ),
      h3('前提条件'),
      bullet('Azure OpenAI Service 利用承認済み(Microsoft 申請)'),
      bullet('Azure Virtual Network / Private DNS Zone の設計知識'),
      bullet('オンプレミス/閉域 NW との接続(ExpressRoute / VPN)'),
      h3('所要時間 / 難度'),
      p('PoC 2 週間、本番構築 4–6 週間。難度:高。'),
      h3('ステップ'),
      numbered('Azure OpenAI リソースを作成、Public Network Access を Disabled に設定'),
      numbered('VNet + Subnet を設計し、Private Endpoint を OpenAI リソースに関連付け'),
      numbered('Private DNS Zone(privatelink.openai.azure.com)で名前解決を内部化'),
      numbered('Azure Firewall / NSG で egress を制限、必要な MS エンドポイントのみ許可'),
      numbered('Log Analytics に全呼び出しログを転送、7 年保管ポリシー適用'),
      numbered('RBAC / Entra ID 条件付きアクセスでキー管理をゼロに'),
      h3('注意点'),
      bullet('データ保持 Opt-out 申請(Microsoft 宛)を忘れると規約上ログが Microsoft 側に残る'),
      bullet('リージョンは「データ所在地 × モデル提供状況」で決まる。日本リージョンは提供モデルが限定的'),
      bullet('Private Endpoint 化するとローカル開発が困難になる。開発用に別サブスクリプションを用意'),
      h3('関連事例'),
      bullet('地方銀行C社:行内閉域環境で Azure OpenAI を安全活用'),
      bullet('不動産G社:契約書チェックと物件 FAQ を AI で自動化'),
    ],
  },

  // ─── Dataverse / D365 × 1 ────────────────────────────────────────────
  {
    _id: 'method-d365-sales-rollout',
    title: 'Dynamics 365 Sales 導入チェックリスト(失敗パターン 7 選付き)',
    slug: { current: 'dynamics-365-sales-rollout-checklist' },
    techTags: ['Dataverse / D365'],
    excerpt:
      '既存 SFA / 表計算 SFA から Dynamics 365 Sales へ移行する際の要件整理・データ移行・定着化チェックリスト。',
    publishedAt: '2024-03-08',
    content: [
      h3('適用シーン'),
      p(
        'Salesforce / HubSpot / Excel ベースの営業管理から、Microsoft 365 と統合された Dynamics 365 Sales へ移行する検討中の組織。営業 50–500 名規模を想定。'
      ),
      h3('前提条件'),
      bullet('Dynamics 365 Sales ライセンス(Enterprise 以上推奨)'),
      bullet('既存 CRM データのエクスポート可能性'),
      bullet('営業部門側のプロジェクトオーナー任命'),
      h3('所要時間 / 難度'),
      p('要件定義 1 ヶ月、実装 + 移行 3 ヶ月、定着化 3 ヶ月。難度:高。'),
      h3('ステップ'),
      numbered('営業プロセスを 5 ステージ以内に簡素化(多すぎると入力されない)'),
      numbered('必須項目を最大 8 個に絞る(リード獲得段階で全項目要求しない)'),
      numbered('既存データのクレンジング(重複 / 古いレコードの削除)を移行前に実施'),
      numbered('Outlook / Teams 統合を有効化、メール / 会議を自動紐付け'),
      numbered('商談ダッシュボードを役職別に 3 種類用意(営業担当 / マネージャー / 経営)'),
      numbered('2 週間の並走期間を設け、旧システムを段階廃止'),
      numbered('月次で利用率 KPI(ログイン率 / 商談更新率)を追跡'),
      h3('注意点(よくある失敗 7 選)'),
      bullet('必須項目が多すぎて営業が入力しない'),
      bullet('過去データを全量移行してノイズが増える'),
      bullet('経営ダッシュボードだけ作り、営業担当の使い勝手を後回しにする'),
      bullet('Outlook 連携を設定せず、二重入力が発生する'),
      bullet('カスタマイズしすぎて標準アップデートに追従できなくなる'),
      bullet('定着化担当を置かず、導入後 3 ヶ月で利用率 30% に低下'),
      bullet('営業プロセスを変えずにシステムだけ入れ替える'),
      h3('関連事例'),
      bullet('人材サービスD社:AI マッチングでキャリアアドバイザーの生産性 6 倍'),
    ],
  },

  // ─── Security / Governance × 1 ───────────────────────────────────────
  {
    _id: 'method-purview-dataclass',
    title: 'Microsoft Purview でデータ分類運用を 3 ヶ月で立ち上げる',
    slug: { current: 'purview-data-classification-rollout' },
    techTags: ['Security / Governance', 'Microsoft 365'],
    excerpt:
      '機密ラベル設計 → 自動分類ルール → DLP ポリシー → 監査レビューまで、最小構成で始める実践手順。',
    publishedAt: '2024-03-12',
    content: [
      h3('適用シーン'),
      p(
        '個人情報や機密情報の取り扱いが増え、「文書のラベル運用」を会議で決めたものの具体的な進め方がわからない情シス・コンプラ部門。Purview を契約済みだが活用できていない組織。'
      ),
      h3('前提条件'),
      bullet('Microsoft 365 E5 または Compliance アドオン'),
      bullet('情報資産台帳(簡易でも可)が存在する'),
      bullet('法務 / コンプライアンス部門との合意形成ルート'),
      h3('所要時間 / 難度'),
      p('設計 4 週間、自動分類 PoC 4 週間、本番展開 4 週間。難度:中〜高。'),
      h3('ステップ'),
      numbered('ラベル階層を 4 種類に絞る(公開 / 社内 / 機密 / 極秘)。多いと守られない'),
      numbered('各ラベルに暗号化 / 透かし / コピー禁止などの自動アクションを設定'),
      numbered('自動分類ルール(クレカ番号 / マイナンバー / 顧客 ID 形式)を定義'),
      numbered('Microsoft 365 アプリ上でラベル UI を有効化、必須化は段階的に'),
      numbered('DLP ポリシーで「極秘」文書の外部送信をブロック'),
      numbered('月次で誤分類レポートをレビューし、ルールを調整'),
      h3('注意点'),
      bullet('ラベルを 10 種類超にすると運用が破綻する。4 種類から始めて増やすほうが安全'),
      bullet('自動分類は誤検知が必ず出る。「ブロック」ではなく「警告」から始める'),
      bullet('現場への教育資料を用意しないと「なぜラベルが必要か」が伝わらない'),
      h3('関連事例'),
      bullet('私立大学H学園:教員事務の問合せを Copilot 検索で 60% 削減'),
      bullet('地方銀行C社:行内閉域環境で Azure OpenAI を安全活用'),
    ],
  },

  // ─── Integration × 1 ─────────────────────────────────────────────────
  {
    _id: 'method-power-automate-api',
    title: 'Power Automate × REST API 連携設計パターン',
    slug: { current: 'power-automate-api-integration' },
    techTags: ['Integration（API連携など）', 'Power Platform'],
    excerpt:
      '基幹システム / SaaS との API 連携で失敗しないための、認証 / 再試行 / エラー通知 / ログ保全の標準設計。',
    publishedAt: '2024-03-15',
    content: [
      h3('適用シーン'),
      p(
        '基幹系(ERP / 人事給与 / 販売管理)や SaaS(Salesforce / kintone / Slack)と Power Automate を繋ぎ、データ同期や業務トリガーを実装するケース。'
      ),
      h3('前提条件'),
      bullet('Power Automate Premium ライセンス(HTTP / カスタムコネクタ利用)'),
      bullet('連携先 API のドキュメント / 認証方式の理解'),
      bullet('エラー時の業務影響範囲の整理'),
      h3('所要時間 / 難度'),
      p('1 連携フロー あたり 1–2 週間。難度:中。'),
      h3('ステップ'),
      numbered('認証方式は OAuth 2.0 を原則、API キーは Key Vault 経由で隠蔽'),
      numbered('HTTP アクションは「再試行ポリシー」を指数バックオフに設定'),
      numbered('成功/失敗時の分岐は「スコープ + 構成 execute after」で明確化'),
      numbered('エラー時は Teams 通知 + Log Analytics への記録を必ず併設'),
      numbered('大量データは分割処理(ページネーション / バッチ化)で実装'),
      numbered('本番フローは 検証環境 → 本番環境の 2 段階で ALM 管理'),
      h3('注意点'),
      bullet('HTTP アクションで認証情報をベタ書きしない。Key Vault または接続参照を使う'),
      bullet('連携先の API レート制限を事前確認。超過するとフロー全体が失敗する'),
      bullet('障害時に「気付けない」設計が最大のリスク。必ず通知経路を冗長化する'),
      bullet('サービスアカウント運用にせず個人アカウントで動かすと退職時に全フローが止まる'),
      h3('関連事例'),
      bullet('SIer F社:稟議・発注申請を Power Apps で一元化'),
      bullet('不動産G社:契約書チェックと物件 FAQ を AI で自動化'),
    ],
  },
]

const stripContent = ({ content, ...rest }: Method): Method => rest

/**
 * Featured methods shown on the home page.
 */
export const mockFeaturedMethods: Method[] = allMethods
  .filter((m) => m.featured)
  .map(stripContent)

/**
 * All methods for the /method listing page.
 */
export const mockAllMethods: Method[] = allMethods.map(stripContent)

/**
 * Keyed by slug for /method/[slug] detail pages.
 */
export const mockMethodDetails: Record<string, Method> = Object.fromEntries(
  allMethods.map((m) => [m.slug.current, m])
)
