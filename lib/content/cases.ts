import type { Case } from '@/types'
import type { SanityImage } from '@/types/sanity'
import { p, bold, bullet, h3 } from './portableText'
import { industryByValue } from './industryCategories'

const unsplashImage = (id: string, alt: string): SanityImage => ({
  asset: {
    _id: `image-${id}`,
    url: `https://images.unsplash.com/photo-${id}?w=1200&q=80&auto=format&fit=crop`,
  },
  alt,
})

/**
 * Each entry carries both list-level metadata AND full `content`.
 * `mockAllCases` strips `content` for list views; `mockCaseDetails` retains it for detail pages.
 */
const allCases: Case[] = [
  // ─── Block 3 — Batch 1 ───────────────────────────────────────────────
  {
    _id: 'case-construction-daily-report',
    title: '大手建設A社:現場日報のデジタル化で月 820 時間の削減',
    slug: { current: 'construction-daily-report-digitalization' },
    problem: '業務効率化',
    industry: industryByValue.construction,
    techTags: ['Power Platform', 'Microsoft 365'],
    excerpt:
      '紙とExcelで運用していた現場日報を Power Apps + SharePoint に移行。日報作成時間を 1 時間/日 → 15 分/日に短縮し、月次レポート作成を 3 日 → 半日へ圧縮。',
    featuredImage: unsplashImage('1541888946425-d81bb19240f5', '建設現場の青写真とヘルメット'),
    publishedAt: '2025-06-18',
    featured: true,
    content: [
      h3('プロジェクト背景'),
      p(
        '従業員 1,200 名超、施工現場 40 拠点を抱える大手建設 A 社。現場監督は毎日、紙の日報を手書きで作成し、翌日に本社へ FAX/郵送。本社経理はそれを Excel に再入力し、月次で集計レポートを作成していました。1 日あたりの情報反映遅延は平均 1.5 日、月次締め作業は毎月 3 営業日を要していました。'
      ),
      h3('課題'),
      bullet('現場監督 1 名あたり日報作成に約 1 時間/日、月 20 時間の負荷'),
      bullet('本社側で Excel 再入力に月 120 時間を消費、転記ミスも発生'),
      bullet('現場-本社間の情報反映が平均 1.5 日遅延、意思決定が後手に'),
      bullet('写真やPDFなどの添付物管理が属人化、監査時に参照困難'),
      h3('解決アプローチ'),
      p(
        '現場で完結するモバイル日報アプリを Power Apps で構築し、SharePoint を単一データソースとして本社と現場を繋ぐ設計を採用。Power Automate で承認ルート・通知を自動化し、Power BI で経営ダッシュボードを整備しました。'
      ),
      bullet('Power Apps:現場で写真付き日報を 3 分で入力できる UI'),
      bullet('SharePoint:現場ごと・プロジェクトごとのドキュメントライブラリで一元管理'),
      bullet('Power Automate:部門長への自動承認フロー + Teams 通知'),
      bullet('Power BI:役員向け現場稼働ダッシュボード(前日実績を翌朝 8 時に自動更新)'),
      h3('技術構成'),
      bullet('Power Apps(キャンバスアプリ / モバイル最適化)'),
      bullet('SharePoint Online(ドキュメント管理・権限制御)'),
      bullet('Power Automate(承認フロー / Teams 通知)'),
      bullet('Power BI(役員ダッシュボード)'),
      bullet('Entra ID による SSO + 条件付きアクセス'),
      h3('導入効果 — Before / After'),
      bullet('日報作成時間:1 時間/日 → 15 分/日(75% 削減)'),
      bullet('本社再入力工数:120 時間/月 → 0 時間/月(完全廃止)'),
      bullet('月次レポート作成:3 営業日 → 半日(約 88% 短縮)'),
      bullet('情報反映遅延:1.5 日 → 当日(リアルタイム化)'),
      bullet('月間削減時間合計:約 820 時間(全社換算)'),
      h3('お客様の声'),
      p(
        '「導入して最も大きかったのは、現場の負担軽減そのものより、経営が“昨日の現場”を今日の朝に見られるようになったこと。意思決定のスピードが明らかに変わりました」(A 社 情報システム部 部長)'
      ),
    ],
  },
  {
    _id: 'case-manufacturing-quality-copilot',
    title: '中堅製造B社:Copilot 活用で品質異常分析を 87% 高速化',
    slug: { current: 'manufacturing-quality-copilot' },
    problem: 'データ集計・レポート自動化',
    industry: industryByValue.manufacturing,
    techTags: ['Copilot / 生成AI', 'Microsoft 365', 'Power Platform'],
    excerpt:
      '品質異常発生時の原因分析を属人化から脱却。Copilot for M365 と Power BI を組み合わせ、分析時間を平均 6 時間 → 45 分に短縮、報告書作成は 2 時間 → 10 分へ。',
    featuredImage: unsplashImage('1504917595217-d4dc5ebe6122', '製造業の生産ライン'),
    publishedAt: '2025-08-12',
    content: [
      h3('プロジェクト背景'),
      p(
        '自動車部品を手掛ける中堅製造 B 社(従業員 600 名)。品質保証部では月平均 30 件の品質異常レポートを作成していたが、過去事例の検索と原因分析は熟練者の記憶と Excel 手集計に依存し、属人化が深刻でした。担当者が 1 名退職した際には部門全体で対応遅延が発生。'
      ),
      h3('課題'),
      bullet('異常原因分析に平均 6 時間/件、熟練者でも 3 時間を要する'),
      bullet('過去類似事例の検索が Excel 全文検索頼みで網羅性が低い'),
      bullet('品質レポート作成(是正処置票)に平均 2 時間/件'),
      bullet('知見の属人化により、新任担当の立ち上がりに 6 ヶ月'),
      h3('解決アプローチ'),
      p(
        '過去の是正処置票 3,500 件を SharePoint に統合し、Copilot for M365 が自然言語で検索・要約できる環境を整備。Power BI で異常トレンドを可視化し、初動の仮説立てを支援するダッシュボードを実装しました。'
      ),
      bullet('SharePoint:過去 5 年分の是正処置票・検査データを統合'),
      bullet('Copilot for M365:「同じ部位で過去に類似の欠陥は?」を自然言語で即答'),
      bullet('Power BI:部位別・工程別の異常発生ヒートマップ'),
      bullet('Word テンプレート + Copilot で是正処置票を半自動生成'),
      h3('技術構成'),
      bullet('Microsoft 365 E5(Copilot ライセンス含む)'),
      bullet('SharePoint Online(文書統合)'),
      bullet('Power BI(異常分析ダッシュボード)'),
      bullet('Power Automate(検査データの自動取り込み)'),
      bullet('Microsoft Purview によるデータ分類・保護'),
      h3('導入効果 — Before / After'),
      bullet('異常分析時間:平均 6 時間 → 45 分(87% 削減)'),
      bullet('是正処置票作成:2 時間 → 10 分(92% 削減)'),
      bullet('類似事例ヒット率:約 40% → 約 85%(網羅性向上)'),
      bullet('新任担当の独り立ち:6 ヶ月 → 2 ヶ月(67% 短縮)'),
      h3('お客様の声'),
      p(
        '「Copilot は“答えを出す AI”というより、“ベテランの頭の中を全員で共有できるようにするツール”でした。若手が過去 10 年分の知見に即アクセスできるのが最大の価値です」(B 社 品質保証部 課長)'
      ),
    ],
  },
  {
    _id: 'case-finance-secure-openai',
    title: '地方銀行C社:行内閉域環境で Azure OpenAI を安全活用',
    slug: { current: 'finance-secure-openai-deployment' },
    problem: 'セキュアな生成AI導入',
    industry: industryByValue.finance,
    techTags: ['Copilot / 生成AI', 'Azure', 'Security / Governance'],
    excerpt:
      'Private Endpoint + プロンプト監査 + データマスキングを組み合わせ、金融業コンプライアンス要件を満たす生成AI基盤を構築。営業店の照会対応時間を 20 分 → 5 分へ。',
    featuredImage: unsplashImage('1554224155-6726b3ff858f', '金融街の高層ビル'),
    publishedAt: '2025-10-07',
    featured: true,
    content: [
      h3('プロジェクト背景'),
      p(
        '預金残高 3 兆円規模の地方銀行 C 社(従業員 2,500 名)。営業店・コールセンターの業務知識照会を生成AI で支援したいというニーズが強い一方、顧客情報・行内規程の外部流出リスクから ChatGPT 等の利用は全社禁止されていました。金融庁ガイドラインおよび行内コンプライアンス部との整合が課題。'
      ),
      h3('課題'),
      bullet('行内規程・商品マニュアル約 4,000 件の検索性が低く、熟練行員に質問が集中'),
      bullet('パブリック生成AI利用は顧客情報漏洩懸念から禁止'),
      bullet('プロンプト/出力のログ保管・監査可能性が必須'),
      bullet('個人情報(氏名・口座番号等)の自動マスキングが必要'),
      h3('解決アプローチ'),
      p(
        'Azure OpenAI Service を Private Endpoint 経由で行内閉域ネットワークに配置。全プロンプト・応答を監査ログに保管し、Presidio ベースの PII マスキングを入出力両段で適用。RAG(検索拡張生成)により行内規程 4,000 件の根拠回答を実現しました。'
      ),
      bullet('Azure OpenAI Service(東日本リージョン、データ保持 Opt-out)'),
      bullet('Private Endpoint + Azure Firewall で完全閉域化'),
      bullet('Azure AI Search + Embedding モデルで規程ベクトル検索'),
      bullet('PII マスキング(入力・出力の双方向)'),
      bullet('全プロンプト・応答を Log Analytics に 7 年間保管'),
      h3('技術構成'),
      bullet('Azure OpenAI Service(GPT-4o / text-embedding-3-large)'),
      bullet('Azure AI Search(ベクトル + キーワードハイブリッド検索)'),
      bullet('Azure Private Link / Private Endpoint'),
      bullet('Microsoft Entra ID + 条件付きアクセス'),
      bullet('Azure Monitor / Log Analytics(監査ログ)'),
      h3('導入効果 — Before / After'),
      bullet('営業店の行内規程照会対応:平均 20 分 → 5 分(75% 削減)'),
      bullet('初期回答率(熟練者への escalation なし):65% → 92%'),
      bullet('コールセンターの平均通話時間:8 分 40 秒 → 6 分 10 秒'),
      bullet('全プロンプト・応答の監査可能性:100%(ログ完備)'),
      bullet('金融庁立入検査時の対応工数:約 40 時間/回 → 約 10 時間/回'),
      h3('お客様の声'),
      p(
        '「他行が“生成AI使用禁止”のままの中、当行は“安全に使える”を先に作れたことが差別化になりました。コンプライアンス部門も“これなら推進できる”と前向きに変わりました」(C 銀行 デジタル戦略部 部長)'
      ),
    ],
  },
  {
    _id: 'case-hr-matching-ai-search',
    title: '人材サービスD社:AI マッチングでキャリアアドバイザーの生産性 6 倍',
    slug: { current: 'hr-matching-ai-search' },
    problem: 'ナレッジ管理・検索',
    industry: industryByValue.hr,
    techTags: ['Copilot / 生成AI', 'Azure', 'Microsoft 365'],
    excerpt:
      '求職者スキルとクライアント求人のマッチング作業を AI 検索で自動化。1 案件あたりのマッチング時間を 3 時間 → 30 分へ短縮し、紹介精度も 15% 向上。',
    featuredImage: unsplashImage('1521737604893-d14cc237f11d', 'ビジネスミーティング'),
    publishedAt: '2025-11-18',
    content: [
      h3('プロジェクト背景'),
      p(
        '人材紹介を主業とする D 社(従業員 400 名)。キャリアアドバイザーは求職者約 8,000 名と求人案件 1,500 件のマッチング候補を、職務経歴書とポジション要件を手作業で照合していました。マッチング品質は個人のスキルに依存し、新人アドバイザーのパフォーマンスは熟練者の 1/3 程度。'
      ),
      h3('課題'),
      bullet('1 求人あたりマッチング候補抽出に平均 3 時間'),
      bullet('職務経歴書の PDF がテキスト化されておらず検索不可'),
      bullet('アドバイザーごとのマッチング観点が標準化されていない'),
      bullet('非マッチとされた求職者の再活用率が 12% と低い'),
      h3('解決アプローチ'),
      p(
        'Azure Form Recognizer で職務経歴書をテキスト化・構造化。Azure AI Search のベクトル検索で求人要件と意味的に近い経歴を抽出し、Copilot がマッチング理由を自然言語で説明するアシスタントを構築しました。'
      ),
      bullet('Azure Form Recognizer:職務経歴書 PDF → 構造化データ'),
      bullet('Azure AI Search:スキル・経験年数・業界を多次元でベクトル化'),
      bullet('Copilot:「なぜこの候補が合うか」を根拠付きで出力'),
      bullet('SharePoint:求職者マスタ一元管理 + 権限制御'),
      bullet('Power BI:マッチング成功率 KPI ダッシュボード'),
      h3('技術構成'),
      bullet('Azure OpenAI Service(GPT-4o)'),
      bullet('Azure AI Search(セマンティック + ベクトル)'),
      bullet('Azure Form Recognizer(Document Intelligence)'),
      bullet('SharePoint Online(求職者マスタ)'),
      bullet('Microsoft Entra ID(SSO + アクセス制御)'),
      h3('導入効果 — Before / After'),
      bullet('マッチング候補抽出:3 時間/案件 → 30 分/案件(83% 削減)'),
      bullet('アドバイザー 1 名あたり月間対応案件数:8 件 → 約 24 件'),
      bullet('紹介成約率:23% → 26.5%(+15% 相対改善)'),
      bullet('非マッチ求職者の再活用率:12% → 38%'),
      bullet('新人の独り立ち期間:4 ヶ月 → 1.5 ヶ月'),
      h3('お客様の声'),
      p(
        '「AI がマッチングを“する”のではなく、アドバイザーの思考を“補強する”設計が肝でした。結果として、一人ひとりの提案の質が上がり、成約率まで伸びました」(D 社 事業本部長)'
      ),
    ],
  },
  // ─── Block 4 — Batch 2 ───────────────────────────────────────────────
  {
    _id: 'case-healthcare-nursing-chatbot',
    title: '総合病院E社:看護師の事務問合せを Copilot チャットで 70% 自動応答',
    slug: { current: 'healthcare-nursing-inquiry-chatbot' },
    problem: '問い合わせ・サポート対応',
    industry: industryByValue.healthcare,
    techTags: ['Copilot / 生成AI', 'Microsoft 365', 'Azure'],
    excerpt:
      '院内ポータルに散在していた規程・手順書を SharePoint に集約し、Teams 上で Copilot Studio 製チャットボットが 24 時間応答。看護部長への問合せを 70% 削減。',
    featuredImage: unsplashImage('1576091160399-112ba8d25d1d', '病院の廊下'),
    publishedAt: '2025-12-16',
    content: [
      h3('プロジェクト背景'),
      p(
        '病床 600 床を擁する総合病院 E 社(職員 1,800 名、うち看護師 900 名)。夜勤帯や休日における事務手順(休暇申請/インシデント報告/感染症対応フロー等)の問合せが看護部長・師長に集中し、管理職の本来業務を圧迫していました。院内イントラのドキュメント数は 3,200 件超、更新も部署ごとにバラバラ。'
      ),
      h3('課題'),
      bullet('看護部長・師長への事務問合せが 1 日平均 40 件、月 800 件超'),
      bullet('院内イントラの検索性が低く、最新版ドキュメントが特定できない'),
      bullet('夜勤帯・休日に管理職が電話対応で起こされる負荷'),
      bullet('規程改定時の周知漏れが医療安全インシデントに発展するリスク'),
      h3('解決アプローチ'),
      p(
        'SharePoint にドキュメントを集約し、バージョン管理と承認フローを整備。その上に Copilot Studio で院内チャットボットを構築し、Teams から自然言語で 24 時間問合せ可能な体制へ。医療情報特有の曖昧性に配慮し、回答には必ず出典ドキュメントへのリンクを併記しました。'
      ),
      bullet('SharePoint:院内規程/手順書 3,200 件を部門横断で集約・バージョン管理'),
      bullet('Copilot Studio:Teams 統合のチャットボット、出典リンク必須'),
      bullet('Power Automate:規程改定時の部門長承認フロー + 全職員通知'),
      bullet('Azure AI Content Safety:不適切/誤解を招く応答を事前フィルタ'),
      h3('技術構成'),
      bullet('Microsoft 365 E3 + Copilot Studio'),
      bullet('SharePoint Online(ドキュメント統合・承認ワークフロー)'),
      bullet('Microsoft Teams(チャットボット UI)'),
      bullet('Azure AI Content Safety'),
      bullet('Microsoft Entra ID + 多要素認証'),
      h3('導入効果 — Before / After'),
      bullet('看護部長・師長への事務問合せ:800 件/月 → 240 件/月(70% 削減)'),
      bullet('夜勤帯の電話呼出回数:平均 6 回/夜 → 1 回/夜'),
      bullet('規程検索の平均所要時間:8 分 → 30 秒'),
      bullet('規程改定時の周知完了率:部分的 → 100%(自動通知)'),
      h3('お客様の声'),
      p(
        '「管理職の“業務外”の負担が減ったこと、そして夜勤の看護師が“誰にも聞けない”状況がなくなったこと、この 2 つが何より大きな変化です」(E 病院 看護部長)'
      ),
    ],
  },
  {
    _id: 'case-it-approval-digitalization',
    title: 'SIer F社:稟議・発注申請を Power Apps で一元化、承認リードタイム 75% 短縮',
    slug: { current: 'it-approval-workflow-power-apps' },
    problem: '申請・稟議のデジタル化',
    industry: industryByValue.it,
    techTags: ['Power Platform', 'Microsoft 365', 'Dataverse / D365'],
    excerpt:
      '紙と Excel と メール添付が混在していた社内稟議を Power Apps + Dataverse へ統一。平均承認リードタイムを 8 営業日 → 2 営業日へ短縮。',
    featuredImage: unsplashImage('1497366216548-37526070297c', 'モダンオフィスで協働するチーム'),
    publishedAt: '2026-01-13',
    featured: true,
    content: [
      h3('プロジェクト背景'),
      p(
        '中堅 SIer F 社(従業員 900 名)。社内稟議は目的別に 14 種類のフォーム(紙/Excel/メール添付)が存在し、フォーマットも承認ルートも部門ごとに異なっていました。月次で処理される稟議は約 450 件。承認漏れ・差戻し履歴の追跡困難から、監査指摘を受けていました。'
      ),
      h3('課題'),
      bullet('稟議フォーマットが 14 種類、部門ごとに承認ルートが異なる'),
      bullet('平均承認リードタイムが 8 営業日、急ぎ案件が経営判断を遅延させる'),
      bullet('差戻し履歴・承認根拠がメール散在、監査時の追跡困難'),
      bullet('金額・案件種別による分岐ルートが Excel 表で属人管理'),
      h3('解決アプローチ'),
      p(
        'Power Apps + Dataverse で稟議基盤を統一構築。金額・案件種別・部門によるルート分岐を Power Automate で宣言的に定義し、差戻し履歴・承認コメントを Dataverse に全量保持。Teams 通知で承認者に即時プッシュしました。'
      ),
      bullet('Power Apps(モデル駆動型アプリ):全稟議を単一 UI に統合'),
      bullet('Dataverse:案件マスタ・承認履歴・差戻し理由を構造化保管'),
      bullet('Power Automate:金額/案件種別/部門による動的承認ルート'),
      bullet('Teams:承認依頼をアダプティブカードでプッシュ'),
      bullet('Power BI:稟議種別ごとの滞留分析ダッシュボード'),
      h3('技術構成'),
      bullet('Microsoft Power Platform(Apps / Automate / Dataverse)'),
      bullet('Microsoft 365 E3'),
      bullet('Microsoft Teams(承認 UI)'),
      bullet('Power BI(滞留分析)'),
      bullet('Entra ID による SSO'),
      h3('導入効果 — Before / After'),
      bullet('平均承認リードタイム:8 営業日 → 2 営業日(75% 短縮)'),
      bullet('フォーム種別:14 種類 → 1 基盤(統一 UI)'),
      bullet('承認漏れ件数:月 12 件 → 0 件(自動リマインド)'),
      bullet('監査対応工数:40 時間/年 → 4 時間/年(履歴自動保管)'),
      bullet('緊急稟議(2 日以内承認)の達成率:35% → 92%'),
      h3('お客様の声'),
      p(
        '「技術会社ならではの事情で、“自社の業務改善が一番後回し”でした。Power Platform の良さは、一度整えれば社員自身がフォームを追加していけること。今では情シスを介さず現場主導で改善が回っています」(F 社 経営管理本部 本部長)'
      ),
    ],
  },
  {
    _id: 'case-real-estate-contract-review',
    title: '不動産G社:契約書チェックと物件 FAQ を AI で自動化、月 540 時間削減',
    slug: { current: 'real-estate-contract-review-ai' },
    problem: '業務効率化',
    industry: industryByValue['real-estate'],
    techTags: ['Copilot / 生成AI', 'Azure', 'Microsoft 365'],
    excerpt:
      '賃貸仲介の契約書チェックを Azure OpenAI で半自動化、店頭 FAQ は Copilot チャットボットで即応。繁忙期の残業時間を 40% 削減。',
    featuredImage: unsplashImage('1560518883-ce09059eeffa', '不動産の鍵とキーホルダー'),
    publishedAt: '2026-02-24',
    content: [
      h3('プロジェクト背景'),
      p(
        '首都圏で賃貸仲介・管理を手掛ける G 社(店舗 85 拠点、従業員 750 名)。契約書チェック(重要事項説明書との突合)は店長クラスが手作業で行い、繁忙期(2–3 月)には 1 店舗あたり月 60 件、1 件平均 40 分を要していました。店頭では物件仕様・募集条件の問合せが多く、若手スタッフは先輩に毎回確認する必要がありました。'
      ),
      h3('課題'),
      bullet('繁忙期の契約書チェックに店長が 1 日 3–4 時間を拘束'),
      bullet('契約書の軽微な誤記・抜け漏れがトラブルの 60% を占める'),
      bullet('物件 FAQ は若手が先輩に毎回確認、対応時間の 30% がロス'),
      bullet('物件情報システムと契約書雛形の整合性チェックが属人化'),
      h3('解決アプローチ'),
      p(
        'Azure Document Intelligence で契約書と重要事項説明書を構造化し、Azure OpenAI が差分・欠落・整合性を自動検出。店頭問合せには Copilot Studio のボットが物件 DB と FAQ を組み合わせて即時回答。すべての AI 出力には店長・先輩の最終チェックを残す「半自動化」設計としました。'
      ),
      bullet('Azure Document Intelligence:PDF契約書を項目ごとに構造化'),
      bullet('Azure OpenAI:項目別の差分/欠落を根拠付きで指摘'),
      bullet('Copilot Studio:物件 DB + FAQ を統合した店頭ボット'),
      bullet('SharePoint:契約書雛形・過去契約のアーカイブ'),
      bullet('Power BI:AI 指摘 → 人の修正 → 結果の KPI ダッシュボード'),
      h3('技術構成'),
      bullet('Azure OpenAI Service(GPT-4o)'),
      bullet('Azure AI Document Intelligence'),
      bullet('Copilot Studio(店頭チャットボット)'),
      bullet('Microsoft 365 E3'),
      bullet('Azure Blob Storage(契約書保管 / 暗号化)'),
      h3('導入効果 — Before / After'),
      bullet('契約書 1 件あたりチェック時間:40 分 → 8 分(80% 削減)'),
      bullet('月間削減工数:約 540 時間(全店換算)'),
      bullet('契約書起因のトラブル発生率:0.8% → 0.15%'),
      bullet('店頭 FAQ 即時回答率:45% → 88%'),
      bullet('繁忙期店長の残業時間:月 60 時間 → 月 36 時間(40% 削減)'),
      h3('お客様の声'),
      p(
        '「AI に任せきりではなく、必ず人が最終確認する運用にしたことで、現場が安心して使えるようになりました。結果として、店長は本来の“店舗経営”に時間を回せています」(G 社 営業統括部 部長)'
      ),
    ],
  },
  {
    _id: 'case-education-knowledge-search',
    title: '私立大学H学園:教員事務の問合せを Copilot 検索で 60% 削減',
    slug: { current: 'education-faculty-knowledge-copilot' },
    problem: 'ナレッジ管理・検索',
    industry: industryByValue.education,
    techTags: ['Copilot / 生成AI', 'Microsoft 365', 'Security / Governance'],
    excerpt:
      '教務規程・補助金ガイドライン・過去稟議を SharePoint に統合し、Copilot for M365 で横断検索。教員から事務局への問合せを月 1,200 件 → 480 件へ削減。',
    featuredImage: unsplashImage('1541339907198-e08756dedf3f', '大学の講堂'),
    publishedAt: '2026-04-15',
    content: [
      h3('プロジェクト背景'),
      p(
        '学生数 1.2 万人、専任教員 420 名の私立 H 学園。教員からの事務問合せ(履修規程/学位論文ガイドライン/補助金申請/研究費精算など)が月 1,200 件発生し、事務局職員の工数を大きく圧迫していました。規程類はワード文書・PDF で部局ごとに管理され、同じ内容が 3 カ所以上に存在するケースも。'
      ),
      h3('課題'),
      bullet('教員から事務局への問合せが月 1,200 件超、職員 1 名あたり週 15 件対応'),
      bullet('規程類の所在が部局ごと分散、最新版特定に平均 12 分'),
      bullet('同一ルールが複数文書に重複記載、表記揺れで教員混乱'),
      bullet('個人情報(学生情報)を含む文書の適切な権限分離が必要'),
      h3('解決アプローチ'),
      p(
        '既存の SharePoint にドキュメントを部局横断で統合・整理し、Microsoft Purview で個人情報を含む文書の機密ラベルを自動付与。その上に Copilot for M365 を展開し、教員は Teams 内から自然言語で規程を横断検索できる環境を提供しました。'
      ),
      bullet('SharePoint:教務/研究/補助金関連文書 5,800 件を部局横断統合'),
      bullet('Microsoft Purview:機密情報の自動分類・アクセス制御'),
      bullet('Copilot for M365:教員全員にライセンス展開、Teams から自然言語検索'),
      bullet('Power Automate:規程改定時の教員通知 + 変更差分の可視化'),
      bullet('学生情報を含む文書は Copilot 検索対象から除外する設計'),
      h3('技術構成'),
      bullet('Microsoft 365 A5(教育機関向けライセンス)'),
      bullet('Copilot for Microsoft 365'),
      bullet('Microsoft Purview(情報保護 / コンプライアンス)'),
      bullet('SharePoint Online + OneDrive'),
      bullet('Microsoft Entra ID(多要素認証)'),
      h3('導入効果 — Before / After'),
      bullet('事務局への教員問合せ:1,200 件/月 → 480 件/月(60% 削減)'),
      bullet('規程検索平均時間:12 分 → 40 秒'),
      bullet('職員 1 名あたり週次問合せ対応時間:10 時間 → 4 時間'),
      bullet('規程改定時の教員周知完了率:約 70% → 100%'),
      bullet('個人情報を含む文書の誤共有インシデント:年 8 件 → 0 件'),
      h3('お客様の声'),
      p(
        '「教員は教育・研究に集中するのが本来の姿。“規程を探す時間”が無くなったことで、教員からは研究室の空気が変わったと聞きます。事務局の残業時間も明確に減りました」(H 学園 法人事務局長)'
      ),
    ],
  },
]

const stripContent = ({ content, ...rest }: Case): Case => rest

/**
 * Featured cases shown on the home page (max 3).
 */
export const mockFeaturedCases: Case[] = allCases
  .filter((c) => c.featured)
  .map(stripContent)

/**
 * All cases for the /cases listing page.
 */
export const mockAllCases: Case[] = allCases.map(stripContent)

/**
 * Keyed by slug for /cases/[slug] detail pages.
 */
export const mockCaseDetails: Record<string, Case> = Object.fromEntries(
  allCases.map((c) => [c.slug.current, c])
)
