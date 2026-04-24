# SkyFuture AI Lab — 开发计划书

**范围**:不含邮件/API/后端。全部前端侧 + mock 数据 + Sanity schema 演进。
**原则**:每个 Block 独立完成、独立交付、不拆两半。每块执行前确认前置依赖已完成。

---

## 工作块一览

| # | Block | 依赖 | 规模 | 产出 |
|---|---|---|---|---|
| 1 | 设计基座(tokens + UI primitives) | — | 中 | tailwind 扩展 + `components/ui/*` |
| 2 | 内容数据层重组 | — | 小 | `lib/content/*` 模块 + 类型 |
| 3 | 事例内容 Batch 1(4 篇) | 2 | 中 | 4 篇 case mock |
| 4 | 事例内容 Batch 2(4 篇) | 2 | 中 | 4 篇 case mock |
| 5 | メソッド内容(10 篇,可拆 2 次) | 2 | 大 | 10 篇 method mock |
| 6 | サービス + コラム内容(5 + 6) | 2 | 中 | 11 篇内容 mock |
| 7 | 视觉重构 — 列表页 + 首页 | 1 | 大 | cases / method / service / column / home 接入 primitives |
| 8 | 视觉重构 — 详情页 ArticleLayout | 1 | 中 | 3 类详情页统一布局 |
| 9 | CRO 改造 | 7, 8 | 中 | 首页社会证明 / 详情页底部 CTA / StickyCTA 文案 / 搜索零态 |
| 10 | 路由补齐 & 清理 | — | 小 | `/privacy` + `/terms` + 404 polish + 删除空目录 + 死链审计 |
| 11 | 表单合规(前端侧) | 1 | 中 | Contact + Request 验证 / 同意 / a11y / 成功态 |
| 12 | 性能 & 响应式 & 字体 | 7–11 | 中 | Noto Sans JP + mobile 审计 + Lighthouse pass |

**推荐执行顺序**:1 → 2 → (3, 4, 5, 6 顺序做,任一批内容完成即可启动 7)→ 7 → 8 → 9 → 10 → 11 → 12。

---

## Block 1 — 设计基座

**目标**:建立全站 single source of truth。后续所有视觉工作依赖这一块。

**Scope**
- 审计 `tailwind.config.ts` 现有 token 与实际使用分布
- 扩展 tailwind 主题:color(primary / neutral / semantic)、fontSize + lineHeight、radius、shadow、spacing(如果有自定义需求)
- 建立 `components/ui/` 目录,产出下列 primitives:
  - `Section` — 容器(max-w / padding / bg 变体)
  - `SectionHeader` — eyebrow / title / description 三件套
  - `Button` — primary / secondary / ghost / destructive,含 disabled、loading
  - `Chip` — 技术 tag 样式
  - `Badge` — 业种 / 課題 分类样式
  - `Card` — 基础卡片(hover / elevated 变体)
  - `CTABlock` — 详情页底部大 CTA 区块
  - `ArticleMeta` — 发布日 + tag + 业种
  - `Breadcrumb`(迁移现有 `components/Breadcrumb.tsx` 入 ui)
- 统一 focus-visible ring 全局样式(`globals.css`)
- `DESIGN_TOKENS.md` 简短文档说明用法(不超过 100 行)

**产出**
```
tailwind.config.ts                # 扩展
app/globals.css                   # focus ring 全局
components/ui/Section.tsx
components/ui/SectionHeader.tsx
components/ui/Button.tsx
components/ui/Chip.tsx
components/ui/Badge.tsx
components/ui/Card.tsx
components/ui/CTABlock.tsx
components/ui/ArticleMeta.tsx
components/ui/Breadcrumb.tsx      # 移动 + 更新 import
components/ui/index.ts            # barrel export
DESIGN_TOKENS.md
```

**验收**
- `npm run dev` 无 TS / lint 错误
- `/` 原样渲染(本块不改页面,只建库)
- 每个 primitive 至少有一处旧代码替换示例,证明 API 可用

---

## Block 2 — 内容数据层重组

**目标**:`lib/mockData.ts` 已 530+ 行,继续堆会失控。拆成按类型分模块,类型更严格。

**Scope**
- 拆分为:
  - `lib/content/cases.ts`
  - `lib/content/methods.ts`
  - `lib/content/services.ts`
  - `lib/content/columns.ts`
  - `lib/content/industryCategories.ts`
  - `lib/content/ctaConfig.ts`
  - `lib/content/stats.ts`(首页数字 mock)
  - `lib/content/index.ts` barrel
- 每个模块强类型导出(使用 `types/index.ts` 的类型,去掉 `as any`)
- 现有 `lib/mockData.ts` 改成 re-export 兼容层,标 `@deprecated`,后续全替换完成后删除
- 同时补 `types/index.ts` 的 `Column` schema 对齐(author / category / readTime 等字段)

**产出**
- 8 个模块文件
- 所有 import 引用指向新路径(至少首页 + 一个列表页完成切换,验证路径)

**验收**
- `npm run dev` 正常
- `grep -r "mockData" app/ components/` 降至 0(或只剩 deprecated shim 导入)

---

## Block 3 — 事例内容 Batch 1(4 篇)

**目标**:首批 4 篇 case study,覆盖 4 个業種。

**Scope**
- 固定模板:**背景 → 課題 → 解決アプローチ → 技術構成 → Before/After 数値 → 導入効果 → お客様の声**
- 4 篇覆盖業種:建設 / 製造 / 金融 / 人材
- 每篇 800–1200 字日文 + 3–5 个 KPI 数字 + 化名公司("大手建設 A 社" 风格)
- 每篇配 `featuredImage`(先用 `/public/images/` 现有图或 Unsplash 占位 URL)
- 结构化字段齐全:`problem`(必须匹配 6 个选项之一)、`industry`(ref)、`techTags`(2–4 个)、`publishedAt`、`featured`(至少 1 篇 true)

**产出**
- `lib/content/cases.ts` 新增 4 条 entry

**验收**
- `/cases` 列表 4 张卡片
- 每篇 `/cases/[slug]` 可访问,无空区块

---

## Block 4 — 事例内容 Batch 2(4 篇)

**Scope**:再 4 篇,覆盖 医療 / IT / 不動産 / 教育。同 Block 3 模板与字段要求。

**产出**:`lib/content/cases.ts` 累计 8 条。

**验收**
- `/cases` 筛选("業種" + "課題")每个选项至少命中 1 篇
- `featured` 3 篇,首页 `FeaturedCases` 渲染正常

---

## Block 5 — メソッド内容(10 篇)

**目标**:覆盖 7 个 techTag 的实用方法论文章。

**Scope**
- 模板:**適用シーン → 前提条件 → 所要時間 / 難度 → ステップ 1..N → 注意点 → 関連事例**
- 10 篇分布建议:
  - Microsoft 365:2 篇(Teams + SharePoint 運用)
  - Power Platform:2 篇(稟議自動化 + Dataverse 活用)
  - Copilot / 生成AI:2 篇(導入手順 + プロンプト設計)
  - Azure:1 篇(Azure OpenAI セキュア構成)
  - Dataverse / D365:1 篇
  - Security / Governance:1 篇
  - Integration:1 篇
- 每篇 600–1000 字,含至少 1 个步骤清单 / 1 个注意点清单
- 至少 3 篇 `featured: true`

**产出**:`lib/content/methods.ts` 10 条。

**验收**
- `/method` 列表 10 张卡片
- 每个 techTag 筛选按钮至少命中 1 篇
- 首页 `FeaturedMethods` 渲染 3 张

**可选拆分**:若单次 token 压力过大,拆成 5a(5 篇)+ 5b(5 篇)两次交付。

---

## Block 6 — サービス(5)+ コラム(6)

**サービス**(每条 400–600 字):
1. Copilot 導入支援
2. Power Platform 内製化支援
3. Azure OpenAI 構築
4. Dynamics 365 導入
5. セキュリティアセスメント

**コラム**(每篇 800–1200 字,SEO-oriented 选题):
1. Copilot と ChatGPT の違いを実務視点で比較
2. Power Apps ライセンス体系を図解
3. 生成AI 導入で失敗する 5 つのパターン
4. 中堅企業が D365 を選ぶべき 3 つの理由
5. Microsoft Purview で始めるデータガバナンス
6. Dataverse と SharePoint List の使い分け

**产出**:`lib/content/services.ts`(5)+ `lib/content/columns.ts`(6)。

**验收**
- `/service`、`/column` 列表渲染完整
- Column 页 "カテゴリ" 字段呈现

---

## Block 7 — 视觉重构(列表页 + 首页)

**依赖**:Block 1 完成。

**Scope**
- 下列页面全面切换到 Block 1 产出的 primitives:
  - `app/page.tsx`(首页)
  - `app/cases/page.tsx`
  - `app/method/page.tsx`
  - `app/service/page.tsx`
  - `app/column/page.tsx`
- 筛选器 UI 统一(cases 双筛选 + method techTag 筛选)
- `<Hero>`、`<SectionHero>`、`<FeaturedCases>`、`<FeaturedMethods>`、`<ServiceGrid>` 组件内部改用 `<Section>` / `<SectionHeader>` / `<Card>`
- 色号、字号、间距全部收敛到 token,`grep "text-gray-500"` 等野生用法清零

**产出**:5 个 page 文件 + 5–7 个 component 文件更新。

**验收**
- 5 个列表页视觉统一(相同 header 结构、相同卡片样式、相同间距)
- `npm run build` 通过
- 手测:desktop(1440)、tablet(768)、mobile(375)无溢出

---

## Block 8 — 视觉重构(详情页 ArticleLayout)

**依赖**:Block 1 完成(尤其 `CTABlock` / `ArticleMeta`)。

**Scope**
- 新建 `components/ui/ArticleLayout.tsx`:双栏布局(主文 + 右侧 sticky 侧栏),接收 `sidebar` prop
- 接入页面:
  - `app/cases/[slug]/page.tsx`
  - `app/method/[slug]/page.tsx`
  - `app/service/[slug]/page.tsx`
  - (Column 详情页若未建立,本块一并建立 `app/column/[slug]/page.tsx`)
- 共通元素:Breadcrumb → 标题 → ArticleMeta → featuredImage → PortableText 本文 → CTABlock → RelatedXxx
- PortableText 样式(`PortableTextRenderer.tsx`)对齐 typography token

**产出**
```
app/column/[slug]/page.tsx            # 新建
components/ui/ArticleLayout.tsx       # 新建
app/cases/[slug]/page.tsx             # 重构
app/method/[slug]/page.tsx            # 重构
app/service/[slug]/page.tsx           # 重构
components/PortableTextRenderer.tsx   # typography 对齐
```

**验收**
- 4 类详情页外观一致(间距、标题层级、CTA 位置)
- 列表页点击卡片 → 详情页 → 面包屑返回,链路畅通

---

## Block 9 — CRO 改造

**依赖**:Block 7 + 8 完成,有统一组件可改。

**Scope**
- **首页**
  - Hero 下方加 logo 墙(复用 `AboutContent.tsx` 的 ClientLogo)
  - 加"導入実績 XX 社" / "解決課題 XX 種" 数字条
- **所有详情页底部**
  - 接入 `<CTABlock title="同様の課題でお困りの方へ" primary="無料で資料をダウンロード" secondary="無料相談">`
- **StickyCTA 文案**
  - "資料請求" → "無料で資料をダウンロード"
  - "無料相談" → "30 分の無料相談を予約"
- **搜索零命中态**
  - `/search` 无结果时显示"お探しの情報が見つかりませんでした" + 推荐热门 case / method + "課題を直接ご相談ください" CTA
- **Request 页**
  - 表单上方加 "3 分で完了 / 即時ダウンロード" 期待管理
  - benefits 列表加图标
- **Contact 页**
  - 三步表单加进度指示器(Step 1/3 …)
  - 每步加 "戻る" 按钮

**产出**:8–10 个文件小改。

**验收**
- 每个详情页底部有 CTA 块
- 搜索 `?q=xxxxxxxxxxxx`(强制零命中)展示友好页面

---

## Block 10 — 路由补齐 & 清理

**Scope**
- 新建 `/privacy`(個人情報保護方針)— 1200 字左右标准模板,适配 lead-gen 站点
- 新建 `/terms`(利用規約)— 1000 字左右
- **不做** `/tokushoho`(特商法,站点无付款交易不适用)
- `app/not-found.tsx` polish:加推荐链接 + 搜索框
- 删除空目录:
  - `app/methods/[slug]/`
  - `app/サービス/[slug]/`
  - `app/会社紹介/`
- Footer 确认所有链接真实存在
- 写个小脚本或手工 grep 所有 `href=` 路径,确保无死链

**产出**
```
app/privacy/page.tsx
app/terms/page.tsx
app/not-found.tsx          # 更新
components/Footer.tsx      # 链接审计
# 删除 3 个空目录
```

**验收**
- 点开 Footer 所有链接返回 200
- `/privacy`、`/terms` 内容齐全,metadata 设置
- 浏览器直接访问 `/methods/xxx` 返回 404(空目录已删除)

---

## Block 11 — 表单合规(前端侧,不做后端)

**依赖**:Block 1 的 `Button`(为表单提供 loading 态) + Block 10 的 `/privacy`(同意书链接目标)。

**Scope**
- Contact + Request 两个表单:
  - 必填字段加红色 `*`
  - Email、電話番号格式验证(inline 错误)
  - 提交按钮前必须勾选"**個人情報保護方針**に同意します"(链接到 `/privacy`)
  - `<label htmlFor>`、`aria-required`、`aria-invalid`、错误 `role="alert"`
  - honeypot 字段(`display:none`)
  - 成功态:`/contact/thanks` 或 inline 成功屏,文案"送信完了。3 営業日以内にご返信します"
  - `handleSubmit` 仅 console.log + 切换成功态(后端推迟)
- 表单字段不保留在 localStorage
- Tab 键顺序正常,Enter 键不意外提交

**产出**
```
app/contact/page.tsx         # 验证 + 同意 + a11y
app/request/page.tsx         # 同上
app/contact/thanks/page.tsx  # 新建
app/request/thanks/page.tsx  # 新建
components/ui/FormField.tsx  # 可选,封装 label+input+error
components/ui/ConsentCheckbox.tsx  # 可选
```

**验收**
- 键盘 only 可完整填完表单并提交
- 未勾选同意时提交按钮 disabled
- 手动在 email 输入 "abc" → 下方出现错误提示

---

## Block 12 — 性能 & 响应式 & 字体

**依赖**:所有前面的 Block 完成。

**Scope**
- 字体:用 `next/font/google` 自托管 Noto Sans JP(`weight: [400, 500, 700]`),`app/layout.tsx` 注入
- `next/image`:全站图片检查 `priority`(只首屏 Hero 用)、`sizes`、`alt`
- 图片压缩检查(`public/images/` 的 PNG > 500KB 考虑转 webp)
- Mobile 审计(375 / 414 断点):逐页手测无溢出
- Lighthouse(Chrome DevTools) 目标:
  - Performance ≥ 85
  - Accessibility ≥ 95
  - Best Practices ≥ 95
  - SEO ≥ 95
- 记录结果到 `LIGHTHOUSE_REPORT.md`(简短)

**产出**
- `app/layout.tsx` 字体接入
- 图片 / 组件小幅优化
- 报告文档

**验收**
- Lighthouse 4 项达标
- iOS Safari + Android Chrome 无明显 bug

---

## 交付节奏建议

| 周 | 完成 Block | 站点状态 |
|---|---|---|
| Week 1 | 1, 2 | 设计系统 + 数据层就位 |
| Week 2 | 3, 4, 5 | 8 case + 10 method 内容到位 |
| Week 3 | 6, 7 | 内容全齐 + 列表/首页视觉统一 |
| Week 4 | 8, 9 | 详情页统一 + CRO 完成 |
| Week 5 | 10, 11 | 合规页 + 表单合规 |
| Week 6 | 12 | 性能达标,可视为 UI-ready |

每块执行前,Claude 在对话中确认"本次执行 Block N,前置已完成,预计 X 文件变更",完成后确认"Block N 所有产出已交付,验收通过"。**不启动新 Block 前,当前 Block 必须全部落地**。

---

## 现阶段状态

- 已完成:
  - `CLAUDE.md`(仓库指南)
  - **Block 1 — 设计基座**(tailwind tokens + UI primitives + DESIGN_TOKENS.md)
  - **Block 2 — 内容数据层重组**(`lib/content/*` 8 模块 + deprecated shim)
  - **Block 3 — 事例 Batch 1**(4 篇:建設 / 製造 / 金融 / 人材)
  - **Block 4 — 事例 Batch 2**(4 篇:医療 / IT / 不動産 / 教育、累计 8 篇 / 3 featured)
  - **Block 5 — メソッド内容**(10 篇,覆盖全部 7 个 techTag / 3 featured)
  - **Block 6 — サービス(5)+ コラム(6)**(5 个服务 + 6 个 SEO 专栏。Column 详情页暂未建立,Block 8 统一)
  - **Block 7 — 视觉重构 列表页 + 首页**
    - 首页用 Section / SectionHeader / CTABlock 重写,移除硬编码 blue 渐变 CTA
    - /cases /method /service /column 筛选统一使用 Chip primitive
    - /method 修正全角/半角混用的 "技术" → "技術"
    - 所有 `@/lib/mockData` import 全部迁至 `@/lib/content`
    - `npm run build` 通过(12 个静态页面,唯一警告为 Header.tsx `<img>`,非本次引入)
  - **Block 8 — 视觉重构 详情页 ArticleLayout**
    - 新增 `components/ui/ArticleLayout.tsx`(双栏结构:breadcrumb + title + excerpt + ArticleMeta + body + footer + sticky sidebar)
    - `components/PortableTextRenderer.tsx` 排版与设计 token 对齐(h2 底边线、h3 accent 竖条、列表 accent marker、链接 underline-offset-4)
    - `app/cases/[slug]/page.tsx` / `app/method/[slug]/page.tsx` / `app/service/[slug]/page.tsx` 重构为 ArticleLayout
    - 新建 `app/column/[slug]/page.tsx`(含 CTABlock + 関連コラム Card 列表)
    - 四类详情页 CTA(tone=dark)、标题层级、元信息位置一致
    - `npm run build` 通过(13 个路由,包含新增 `/column/[slug]`)
  - **Block 9 — CRO 改造**
    - 新增 `components/ClientLogoWall.tsx`(抽取自 AboutContent,8 家主要取引先,grayscale → hover 复原)
    - 首页 Hero 下方加入 logo 墙 + stats 标签更新("相談実績(社)" / "導入実績(件)" / "解決課題(種)" / "メソッド記事(本)")
    - `lib/content/ctaConfig.ts` 文案:"資料請求" → "無料で資料をダウンロード"、"無料相談" → "30 分の無料相談を予約"(影响首页 Hero 和所有详情页 StickyCTA)
    - `/search` 零命中态:友好标题 + "課題を直接ご相談する" 主 CTA + Featured cases / methods 推荐
    - `/request` 右栏加 "3 分で完了 / 即時ダウンロード" 期待管理 banner,BENEFITS 列表升级为多种图标
    - `/contact` 重构为真正 3 步表单(会社情報 → お客様情報 → ご相談内容),Step N/3 文字 + 3 段进度条,Step 2/3 均有 "戻る" 按钮
    - `npm run build` 通过(13 个路由)
  - **Block 10 — 路由补齐 & 清理**
    - 新建 `app/privacy/page.tsx`(個人情報保護方針,~1200 字,8 節覆盖取得 / 利用 / 第三者提供 / 安全管理 / 開示訂正 / Cookie / 改定 / 問合せ)
    - 新建 `app/terms/page.tsx`(利用規約,~1000 字,8 条含知財権 / 禁止事項 / 免責 / 準拠法 東京地裁)
    - 两者均用 ArticleLayout 保持视觉一致
    - `app/not-found.tsx` polish:加入サイト内検索 form(action="/search") + 人気のページ link chips(复用 NAV_LINKS) + ホームに戻る/直接ご相談する 双 Button
    - `components/Footer.tsx`:补 `/request` 和 `/terms` 链接,`<a>` 统一改成 `<Link>`
    - 删除空遗留目录:`app/methods/`、`app/サービス/`、`app/会社紹介/`
    - 验收:/privacy、/terms 200;/methods/foo、/会社紹介 都 404;`npm run build` 15 路由通过,无警告增加
  - **Block 11 — 表单合规(前端侧)**
    - 新增通用 UI 原语 `components/ui/FormField.tsx`(label + 必须/任意标记 + 输入/textarea + hint + role="alert" 错误提示 + `aria-required` / `aria-invalid` / `aria-describedby` 自动连接)
    - 新增 `components/ui/ConsentCheckbox.tsx`(个人情报保护方针勾选,链接打开 `/privacy` 新标签页,未勾选时 label 描边变红 + 错误 role=alert)
    - 新增 `lib/validators.ts`(`EMAIL_REGEX` / `validateEmail` / `validatePhone` 10–11 位 + 允许符号 / `validateRequired`)
    - `app/contact/page.tsx` 重写:3 步表单 + FormState + `validateStep(1|2|3, data)` + honeypot(`website` 字段 `hidden` + `tabIndex=-1` + `aria-hidden`)+ Enter 键按步拦截(textarea 除外)+ 种别单选改 `<fieldset><legend>` + primary-900 / accent-600 token 化按钮 + 未勾选同意时提交按钮 disabled + Step 4 成功態(`role="status"` / `aria-live="polite"` / bg-success-50)
    - `app/request/page.tsx` 重写:单页表单 + `validateAll` + 姓/名拆分 grid-cols-2 + email 字段 hint("企業ドメインのメールアドレスを推奨します")+ honeypot + 未勾选时 disabled + 提交后 inline 成功卡(替换整个 form,`role="status"`)
    - 所有 form 加 `noValidate`,校验全由 React state 驱动
    - `npx tsc --noEmit` 通过;`npm run build` 17 路由通过;`curl /contact /request` 200;输出含 `aria-required="true"`、`name="website"` honeypot、`企業ドメイン` hint 文案
  - **Block 12 — 性能 / 响应式 / 字体**
    - 字体:`next/font/google` 自托管 Noto Sans JP(weight 400/500/700、`display: swap`、CSS 变量 `--font-noto-sans-jp`),`tailwind.config.ts` fontFamily.sans 头部插入,`app/globals.css` 旧 system font 栈移除
    - 图片:全部 10 个 `<Image fill>` 补 `sizes`(Hero / SectionHero 100vw,卡片 40/33vw,logo 160px,本文 768px,CEO 40vw 等);`priority` 仅保留在首屏 Hero / SectionHero / Header logo;Header `<img>` → `next/image`,build 警告清零;移除 DocumentMockup 未使用 import
    - 响应式静态审计:固定 px 宽 2 处均安全(`w-full` 内 / `lg:` 限定)、grid-cols-4+ 全部带响应式前缀、大标题全部 `text-3xl md:…`、Footer `flex-wrap` + 每项 `whitespace-nowrap`、`<html>`/`<body>` 双 `overflow-x-hidden` 保底、公司概要表用 `flex flex-col` 堆叠
    - `npm run build` 17 路由通过,无警告;新建 `LIGHTHOUSE_REPORT.md` 记录优化项 + 手动验收清单(真实 Lighthouse 跑分与实机 mobile 验收需在本地浏览器执行)
- 进行中:无
- 下一步:Block 1–12 全部 UI-ready,站点可视为交付候选。后续按需求跟进 Sanity CMS 内容录入 / 邮件/表单后端 / CI。
