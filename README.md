# SkyFuture AI Lab

Microsoft 365・Power Platform・Dynamics 365・生成AI を活用したDX支援に関する実践事例と技術知見を発信する企業サイトです。

## セットアップ

### 1. 依存関係のインストール

```bash
npm install
```

### 2. 環境変数の設定

`env.local.template` を `.env.local` にコピーし、Sanity のプロジェクト情報を入力してください：

```bash
# Windows PowerShell
Copy-Item env.local.template .env.local

# または手動で .env.local ファイルを作成
```

`.env.local` ファイルに以下を記入：

```
NEXT_PUBLIC_SANITY_PROJECT_ID=your_project_id
NEXT_PUBLIC_SANITY_DATASET=production
SANITY_API_READ_TOKEN=your_read_token
```

### 3. 開発サーバーの起動

```bash
npm run dev
```

ブラウザで [http://localhost:3000](http://localhost:3000) を開いてください。

### 4. Sanity Studio の起動

```bash
npm run sanity
```

ブラウザで [http://localhost:3333](http://localhost:3333) を開いてコンテンツを管理できます。

## プロジェクト構造

- `app/` - Next.js App Router ページ
- `components/` - React コンポーネント
- `sanity/schemas/` - Sanity CMS スキーマ定義
- `lib/sanity/` - Sanity クライアントと GROQ クエリ
- `types/` - TypeScript 型定義

## 主要機能

- 事例（Case）ページ：課題別・業種別フィルタリング
- メソッド（Method）ページ：技術タグ別フィルタリング
- サービスページ：サービス一覧と詳細
- SEO 最適化：各ページの動的メタデータ
- 関連コンテンツ推薦：技術タグに基づく自動推薦
