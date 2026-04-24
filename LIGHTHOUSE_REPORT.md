# Lighthouse / 性能レポート — Block 12

> 記録日:2026-04-24
> 対象:SkyFuture AI Lab(Next.js 14 + Sanity)

## 目標スコア

| 項目 | 目標 | 備考 |
|---|---|---|
| Performance | ≥ 85 | モバイル |
| Accessibility | ≥ 95 | |
| Best Practices | ≥ 95 | |
| SEO | ≥ 95 | |

## 適用した最適化

### フォント(Block 12-1)
- `next/font/google` で **Noto Sans JP** を自ホスト(weight 400 / 500 / 700、`display: swap`)
- `--font-noto-sans-jp` CSS 変数として注入、`tailwind.config.ts` の `fontFamily.sans` 先頭に配置
- `app/globals.css` から旧システムフォント指定を削除
- 効果:フォントスワッシュ抑止(`display: swap`)、CLS 改善期待

### 画像(Block 12-2)
- `next/image` の `sizes` を全 `<Image fill>` 箇所に付与(10 箇所)
  - Hero / SectionHero:`100vw`(ファーストビュー固定)
  - カード画像(CaseList / SearchCard):`(max-width: 768px) 100vw, 40vw/33vw`
  - ロゴウォール(Client logos):`(max-width: 768px) 50vw, 160px`
  - 本文画像(PortableText):`(max-width: 768px) 100vw, 768px`
  - サイドイラスト(contact / CEO 肖像):`(max-width: 1024px) 100vw, 40vw〜50vw`
  - 請求ページ信頼ロゴ:`120px`
- `priority` はファーストビュー画像のみ(Hero / SectionHero / Header logo)— Others は `lazy` デフォルト
- Header の旧 `<img>` を `next/image` に置換 — build 警告ゼロ
- `DocumentMockup.tsx` の未使用 `Image` import を削除

### レスポンシブ(Block 12-3)
静的スキャン結果:
- 固定 px 幅(2 箇所):いずれも `w-full` 親か `lg:` ブレークポイント限定で、モバイルで溢れない
- grid-cols-4+ はすべてレスポンシブ classes を併用(`grid-cols-2 md:grid-cols-4` 等)
- 大見出しは全て `text-3xl md:text-Nxl` 形式で 3xl 基準
- Footer は `flex-wrap` + 各 Link `whitespace-nowrap` — ナローでラップ
- `<html>` / `<body>` 双方に `overflow-x-hidden` セーフガード
- テーブル(会社概要)は `<tr>` を `flex flex-col` で縦積みし、モバイルでも溢れない

## 画像サイズ(参考)

`public/images/` 内 500KB 超の PNG:

| ファイル | サイズ | 用途 | 対応 |
|---|---|---|---|
| about-hero-visionary.png | 827KB | Home Hero | next/image が webp/avif を自動配信 |
| about-hero.png | 732KB | About Hero | 同上 |
| method-hero.png | 704KB | Method Hero | 同上 |
| ad-banner.png | 690KB | StickyCTA | 同上 |
| ceo-portrait.png | 684KB | About | 同上 |
| service-hero.png | 665KB | Service Hero | 同上 |
| cases-hero.png | 620KB | Cases Hero | 同上 |
| contact-illustration.png | 523KB | Contact | 同上 |

Next.js は PNG 原本をそのまま配信せず、クライアントが対応する形式(webp / avif)を自動生成・配信する。事前に webp 変換するメリットは限定的。原本 PNG が 1MB 以上になった場合のみ手動変換を検討。

## 手動検証が必要な項目

以下は実ブラウザでの確認が必要(本環境で自動化不可):

### Lighthouse 実行手順
```bash
npm run build
npm run start   # production 配信で計測
```
別ターミナルで Chrome DevTools → Lighthouse → Mobile + Performance/A11y/Best Practices/SEO をチェック → 分析開始。

対象ページ(最低限):
- `/`(Home)— Hero LCP が重要
- `/cases` — カードリスト画像が多い
- `/cases/[slug]`(任意 1 件)— 詳細ページ
- `/contact` — フォーム a11y

### モバイル視覚確認(375 / 414 / 768 / 1440)
Chrome DevTools Device Mode、または実機(iPhone SE / iPhone 14 / iPad / デスクトップ)。
チェックリスト:
- [ ] 横スクロール(overflow-x)なし
- [ ] Hero タイトル改行位置が自然
- [ ] Footer リンク折返しが崩れない
- [ ] Contact 3 ステップフォームのプログレスバーが mobile で読める
- [ ] Sticky CTA が fold を隠さない
- [ ] Studio(`/studio`)は対象外(管理画面)

### スコア記入欄

計測後に記入:

| ページ | Perf | A11y | BP | SEO | 備考 |
|---|---|---|---|---|---|
| / | - | - | - | - | |
| /cases | - | - | - | - | |
| /cases/[slug] | - | - | - | - | |
| /contact | - | - | - | - | |

## 既知の注意点

- `/studio/[[...index]]` First Load 1.56 MB(Sanity Studio 本体)— サイト側スコアには影響しない(別 URL の管理画面)
- `/search` 137 KB — クライアント検索ロジックと全文 index 含む、インタラクティブ要件上許容
- その他ルートは 87-114 KB に収束、Next.js 標準的な水準
