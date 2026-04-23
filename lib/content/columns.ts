import type { Column } from '@/types'
import { p, bullet, numbered, h3 } from './portableText'

const allColumns: Column[] = [
  {
    _id: 'col-copilot-vs-chatgpt',
    title: 'Copilot と ChatGPT の違いを実務視点で比較する',
    slug: { current: 'copilot-vs-chatgpt-enterprise-comparison' },
    category: '生成AI活用',
    author: 'SkyFuture 編集部',
    techTags: ['Copilot / 生成AI', 'Microsoft 365', 'Security / Governance'],
    excerpt:
      '「結局 ChatGPT とどう違うのか?」という質問に、ライセンス / データ境界 / 統合範囲 / 運用コストの 4 観点で答えます。',
    publishedAt: '2024-03-01',
    content: [
      h3('なぜ比較が必要なのか'),
      p(
        'Copilot for Microsoft 365 と ChatGPT(Enterprise / Team)は、どちらも業務で使える生成 AI として選択肢に挙がります。ただし両者は「AI の性能」で比較する製品ではなく、「どのデータを見るか」「どこに統合されるか」「運用負荷はどうか」で比較すべき製品です。'
      ),
      h3('1. データ境界'),
      p(
        'Copilot for M365 は社内の SharePoint / OneDrive / Outlook / Teams 内のデータを、そのユーザーの権限範囲で参照します。つまり「その人が見える情報だけ」を参照する設計です。一方 ChatGPT は原則として外部 LLM サービスであり、社内データを使わせるには別途 API 連携や RAG 実装が必要です。'
      ),
      h3('2. 統合範囲'),
      p(
        'Copilot は Word / Excel / PowerPoint / Teams / Outlook に直接埋め込まれており、作業中のアプリ内で呼び出せます。ChatGPT はブラウザ / 独立アプリでの利用が中心で、業務アプリ内統合は自前実装が必要です。'
      ),
      h3('3. ライセンスとコスト'),
      bullet('Copilot for M365:1 ユーザーあたり月額 30 USD + Microsoft 365 ライセンス'),
      bullet('ChatGPT Enterprise:1 ユーザーあたり月額 60 USD 相当(規模により変動)'),
      bullet('両者はデータ保護規約が異なり、「入力データを学習に使わない」点は共通だが保管期間・地域が異なる'),
      h3('4. 向いているシーン'),
      bullet('Copilot が向く:社内資料要約、メール下書き、議事録作成、SharePoint 検索'),
      bullet('ChatGPT が向く:一般知識の調査、コード生成、社外向け文章の壁打ち'),
      bullet('併用:両者は競合ではなく補完関係。Copilot で社内業務、ChatGPT で社外知見'),
      h3('結論'),
      p(
        '「どちらが優れているか」ではなく「どの業務で使うか」で選ぶのが正解です。社内データを扱う業務が中心なら Copilot、社外知識の調査やクリエイティブ作業が中心なら ChatGPT。多くの組織は併用しています。'
      ),
    ],
  },
  {
    _id: 'col-powerapps-license',
    title: 'Power Apps ライセンス体系を図解で整理する',
    slug: { current: 'power-apps-license-explained' },
    category: 'Power Platform',
    author: 'SkyFuture 編集部',
    techTags: ['Power Platform'],
    excerpt:
      '「Per User」「Per App」「Premium」「Developer」—— 複雑な Power Apps ライセンスを、適用シーンごとに整理します。',
    publishedAt: '2024-03-05',
    content: [
      h3('Power Apps ライセンスが難しい理由'),
      p(
        'Power Apps のライセンスは、単に「1 ユーザーいくら」ではなく、「どのコネクタを使うか」「いくつのアプリを使うか」「データソースに Dataverse を使うか」で変わります。結果として、コスト試算と実運用が合わないケースが頻発します。'
      ),
      h3('主要ライセンスと適用シーン'),
      bullet('Microsoft 365 同梱:SharePoint リスト / Outlook など標準コネクタのみ。小規模な社内アプリに最適'),
      bullet('Power Apps Per App(月 5 USD/ユーザー/アプリ):特定 1 アプリを広く使わせる時'),
      bullet('Power Apps Per User(月 20 USD/ユーザー):ユーザーが複数の Premium アプリを使う時'),
      bullet('Developer Plan(無料):開発者個人の学習 / 開発環境用'),
      h3('Premium コネクタが必要なケース'),
      p(
        'SQL Server / Salesforce / SAP / カスタムコネクタを使う場合は Premium(Per App または Per User)が必須です。SharePoint リストで済むなら M365 同梱で十分なケースも多く、「Premium が必要か否か」が最初の判断軸となります。'
      ),
      h3('Dataverse を使うと変わる点'),
      bullet('Dataverse 利用時は Power Apps Premium ライセンスが必要'),
      bullet('Dataverse for Teams(無料)は容量 2GB で、全社基盤には不足'),
      bullet('Dynamics 365 ライセンス保有ユーザーは別途 Power Apps ライセンス不要'),
      h3('コスト試算の落とし穴'),
      bullet('「全社員分の Per User」で試算すると実際より高く出がち。アプリ数と利用頻度で Per App が有利なケース多数'),
      bullet('API コール数制限(1 日 6,000 件等)を超えるとライセンス再検討が必要'),
      h3('まとめ'),
      p(
        'Power Apps ライセンスは「使いたいコネクタ」「アプリ数」「Dataverse 要否」の 3 点で決まります。導入前に PoC で実利用パターンを把握し、本番は Per App / Per User を組み合わせるハイブリッド構成が現実解です。'
      ),
    ],
  },
  {
    _id: 'col-genai-failure-patterns',
    title: '生成 AI 導入で失敗する 5 つのパターンと対策',
    slug: { current: 'generative-ai-implementation-failure-patterns' },
    category: '生成AI活用',
    author: 'SkyFuture 編集部',
    techTags: ['Copilot / 生成AI', 'Security / Governance'],
    excerpt:
      '導入プロジェクトの「よくある事故」を 5 パターンに分類。それぞれの典型症状と、事前に避けるための判断軸を解説。',
    publishedAt: '2024-03-10',
    content: [
      h3('なぜ生成 AI 導入は失敗しがちなのか'),
      p(
        '生成 AI は導入ハードルが低く、経営陣の期待値も高い一方、「やってみたが使われない」「期待した ROI が出ない」で止まるプロジェクトが多発しています。失敗は概ね 5 パターンに類型化できます。'
      ),
      h3('パターン 1:ライセンス買って終わり'),
      bullet('症状:ライセンスは配布したが利用率 20% 未満で放置'),
      bullet('対策:アンバサダー任命 + ユースケース集整備を導入と同時に実施'),
      h3('パターン 2:権限整理を省いた'),
      bullet('症状:Copilot の要約に「見えてはいけない情報」が混ざる'),
      bullet('対策:SharePoint / OneDrive の権限監査と機密ラベル整備を導入前の必須条件とする'),
      h3('パターン 3:ユースケース選定が経営都合'),
      bullet('症状:「AI でコールセンター全自動化」のような非現実目標を設定'),
      bullet('対策:現場ヒアリングから「既に半自動でできる業務」を 5 種抽出し、段階的に拡張'),
      h3('パターン 4:ROI 指標が節約時間のみ'),
      bullet('症状:「月 10 時間削減」を報告しても経営が動かない'),
      bullet('対策:節約時間 × 業務品質指標(エラー率 / 対応速度)を並列で測定'),
      h3('パターン 5:コンプライアンス部門を巻き込まない'),
      bullet('症状:本番展開直前にコンプラが「待った」をかけ、半年延期'),
      bullet('対策:プロジェクト発足時点でコンプラ部門をステアリングに含める'),
      h3('まとめ'),
      p(
        '5 つのパターンに共通するのは、「AI の性能」ではなく「運用・人・組織」が原因であるという点です。導入プロジェクトの 8 割の工数は非技術領域に充てるべき、というのが実務家の共通見解です。'
      ),
    ],
  },
  {
    _id: 'col-d365-midsize',
    title: '中堅企業が Dynamics 365 を選ぶべき 3 つの理由',
    slug: { current: 'why-midsize-companies-choose-dynamics-365' },
    category: 'Dynamics 365',
    author: 'SkyFuture 編集部',
    techTags: ['Dataverse / D365', 'Microsoft 365'],
    excerpt:
      'Salesforce・HubSpot ではなく Dynamics 365 を選ぶべき中堅企業の特徴と、その理由を 3 点に絞って整理。',
    publishedAt: '2024-03-15',
    content: [
      h3('前提:どの企業にも Dynamics 365 が最適というわけではない'),
      p(
        'CRM / SFA 市場では Salesforce が最大シェア、HubSpot も中小で強いシェアを持ちます。ただし「Microsoft 365 を全社展開している中堅企業(300–3,000 名)」には、Dynamics 365 が最も適する 3 つの理由があります。'
      ),
      h3('理由 1:Microsoft 365 との統合が段違い'),
      p(
        '営業担当者は 1 日の大半を Outlook と Teams で過ごします。Dynamics 365 は両者にネイティブ統合されており、メール/会議/Teams チャットを自動で商談レコードに紐付け可能。Salesforce の Outlook / Teams 連携も進化していますが、ネイティブ感覚は Dynamics 365 に軍配が上がります。'
      ),
      h3('理由 2:Power Platform での拡張が内製化可能'),
      p(
        'Salesforce の拡張は Apex(Java 類似言語)の専門性が必要ですが、Dynamics 365 は Power Apps / Power Automate で市民開発者が拡張できます。中堅企業は専任 CRM エンジニアを抱える余裕が少ないため、情シス + 現場で継続的に改善できる点が効きます。'
      ),
      h3('理由 3:ライセンス体系の透明性'),
      bullet('ライセンス階層がシンプル(Sales Professional / Enterprise / Premium)'),
      bullet('Microsoft 365 ライセンスとのバンドル割引が明確'),
      bullet('利用量ベースのコスト膨張リスクが限定的'),
      h3('向かないケース'),
      bullet('既に Salesforce で高度カスタマイズ済みの組織(移行コスト > 便益)'),
      bullet('Google Workspace を全社利用している組織'),
      bullet('営業担当 30 名未満の組織(HubSpot / Zoho の方がコスト効率良)'),
      h3('まとめ'),
      p(
        'Microsoft 365 を全社展開している 300–3,000 名規模の日本企業が、継続的に改善できる CRM 基盤を求める場合、Dynamics 365 は検討すべき選択肢です。一方で、すでに Salesforce で深く作り込んだ組織に無理に薦めるべきものではありません。'
      ),
    ],
  },
  {
    _id: 'col-purview-governance',
    title: 'Microsoft Purview で始めるデータガバナンス最初の一歩',
    slug: { current: 'getting-started-with-microsoft-purview' },
    category: 'セキュリティ',
    author: 'SkyFuture 編集部',
    techTags: ['Security / Governance', 'Microsoft 365'],
    excerpt:
      '「Purview って何ができるの?」にコンパクトに答えます。データ分類・DLP・機密ラベルの役割を整理し、最初の 30 日でやるべきことを提示。',
    publishedAt: '2024-03-20',
    content: [
      h3('Purview は 3 つの機能の総称'),
      p(
        'Microsoft Purview は単一製品ではなく、「情報保護(機密ラベル)」「データ損失防止(DLP)」「コンプライアンス管理」を含む製品スイートです。それぞれ異なる課題に対応するため、最初は機能を分けて理解するのが近道です。'
      ),
      h3('機密ラベル(Information Protection)'),
      bullet('文書 / メールに「公開 / 社内 / 機密 / 極秘」のラベルを付与'),
      bullet('ラベルに応じて暗号化・透かし・コピー禁止を自動適用'),
      bullet('自動分類ルール(クレカ番号 / マイナンバー検出)と組み合わせ可能'),
      h3('データ損失防止(DLP)'),
      bullet('「極秘」文書の外部送信をメール / Teams / SharePoint で検出・ブロック'),
      bullet('ポリシーはルールベースで組織の要件に合わせ柔軟に設定'),
      bullet('まずは「警告のみ」で運用し、段階的にブロックに移行するのが定石'),
      h3('コンプライアンス管理'),
      bullet('eDiscovery(法的開示要求対応)や Records Management(記録管理)を提供'),
      bullet('ISMS / SOC 監査対応時の証跡取得を効率化'),
      h3('最初の 30 日のロードマップ'),
      numbered('Day 1–7:ラベル階層を 4 種類に絞って定義(公開 / 社内 / 機密 / 極秘)'),
      numbered('Day 8–14:各ラベルに暗号化アクションを設定、数名でテスト'),
      numbered('Day 15–21:自動分類ルールを「警告のみ」で有効化、誤検知を観察'),
      numbered('Day 22–30:パイロット部門へ展開、運用レビューを週次で実施'),
      h3('ありがちな失敗'),
      bullet('ラベルを 10 種類以上作って現場が覚えられない'),
      bullet('自動分類を初日から「ブロック」で運用して業務が止まる'),
      bullet('現場教育なしで展開し「なぜラベル付けが必要か」が伝わらない'),
    ],
  },
  {
    _id: 'col-dataverse-vs-splist',
    title: 'Dataverse と SharePoint List、どちらを選ぶべきか',
    slug: { current: 'dataverse-vs-sharepoint-list' },
    category: 'Power Platform',
    author: 'SkyFuture 編集部',
    techTags: ['Power Platform', 'Dataverse / D365', 'Microsoft 365'],
    excerpt:
      '小規模アプリは SharePoint List、全社基盤は Dataverse —— しかし判断軸は本当にそれだけか。データ量・権限・ライセンス 3 観点で比較。',
    publishedAt: '2024-03-25',
    content: [
      h3('結論から'),
      p(
        '使い捨てアプリ / 単一部門アプリ / 数千件レベルまでのデータ → SharePoint List。複数アプリで共有 / 数万件超 / 厳密なリレーション → Dataverse。ただし境界は曖昧なため、3 つの観点で判断するのが実務的です。'
      ),
      h3('観点 1:データ量とパフォーマンス'),
      bullet('SharePoint List:5,000 件超でフィルタ性能が急速に劣化(閾値あり)'),
      bullet('Dataverse:数百万件でも安定、インデックスやリレーション最適化あり'),
      bullet('1 アプリで数万件を扱うなら Dataverse 一択'),
      h3('観点 2:権限モデル'),
      bullet('SharePoint List:アイテム単位の権限は継承ベースで管理が複雑化しやすい'),
      bullet('Dataverse:レコードレベル / フィールドレベル / ロールベースで細かく制御'),
      bullet('顧客情報 / 人事情報など機密データは Dataverse が向く'),
      h3('観点 3:ライセンス'),
      bullet('SharePoint List:Microsoft 365 ライセンスに含まれ追加費用なし'),
      bullet('Dataverse:Power Apps Premium(Per User 20 USD/月)が必須'),
      bullet('コスト観点だけなら SharePoint List が有利だが、リプレース工数を含めて判断'),
      h3('よくある判断ミス'),
      bullet('小さく始めるため SharePoint List を選ぶ → 3 年後に Dataverse 移行で工数爆発'),
      bullet('横展開を前提としないアプリを Dataverse で作る → ライセンス費用が過剰'),
      bullet('Dataverse for Teams を本番基盤に使う → 容量 2GB で詰まる'),
      h3('意思決定フロー'),
      numbered('1 部門のみで使うか? → YES なら SharePoint List 検討'),
      numbered('5,000 件以下で済むか? → YES なら SharePoint List 検討'),
      numbered('他アプリから参照する予定があるか? → YES なら Dataverse'),
      numbered('厳密な権限制御が必要か? → YES なら Dataverse'),
      h3('まとめ'),
      p(
        '「安いから SharePoint List」で始めるのは、中長期で逆に高くつくケースが多いです。データの将来像を踏まえ、最初の選定段階で 5 年先の使われ方を想像することが重要です。'
      ),
    ],
  },
]

export const mockAllColumns: Column[] = allColumns.map(({ content, ...rest }) => rest)

export const mockColumnDetails: Record<string, Column> = Object.fromEntries(
  allColumns.map((c) => [c.slug.current, c])
)
