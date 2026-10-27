# SEO設定

設定日：2026年10月27日

## 正式な公開URL

`https://master-chikin-shibuya.pages.dev/`

ユーザー指定の綴りをそのまま使用。日本語の正規URLは `/`、英語は `/en/`。各ページは自身をcanonicalとし、相互にhreflangを設定する。x-defaultは日本語トップ。

URLは `src/data/site.mjs` に集約。Astroのsite設定、HTMLメタデータ、JSON-LD、サイトマップ、robots.txtのすべてが参照する。`PUBLIC_SITE_URL`環境変数には依存しない。

## 実装した内容

- 日英タイトル・descriptionを、店舗名、渋谷、ハラールチキン、バーガー、所在地・来店情報に合わせて整理。
- 各言語ページのcanonical、相互hreflang、x-default。
- `index, follow, max-image-preview:large`。
- OGPとX/Twitterのタイトル、説明、絶対画像URL、画像説明、言語情報。
- 生成ヒーローを元に1200×630pxのJPEGを出力するAstro画像処理設定。実際の画像生成・出力はビルド時。
- WebSite / WebPage / ImageObject / RestaurantをIDで関連付けたJSON-LD。
- 店名、別名、住所、提供情報に基づく営業時間、料理の種類、メニューへのリンク、Googleマップ、Instagram。
- `robots.txt`を静的エンドポイントとして追加。全体のクロール許可とサイトマップURLを記載。
- `sitemap.xml`を静的エンドポイントとして追加。日英2ページと相互の言語情報を掲載。
- 更新の事実が確認できないlastmod、任意のpriority、changefreqは追加していない。

電話番号、価格、priceRange、レビュー、星評価、予約可否、デリバリー、正確な緯度経度、未提供の認証情報は構造化データに含めていない。ページの見た目や、削除済みの「画像はイメージです」は変更していない。

## 主なファイル

| ファイル | 役割 |
| --- | --- |
| `src/data/site.mjs` | 正式URL・言語ページ・クロール方針 |
| `src/data/store.ts` | 日英タイトル・description、店舗の共通情報 |
| `src/data/seo.ts` | canonicalと構造化データの組み立て |
| `src/components/Seo.astro` | メタデータ、OG画像の変換、JSON-LDの出力 |
| `src/layouts/SiteLayout.astro` | 共通headからSeoを使用 |
| `src/pages/robots.txt.ts` | robots.txt |
| `src/pages/sitemap.xml.ts` | 日英サイトマップ |
| `astro.config.mjs` | siteと末尾スラッシュの統一 |

## 公開後の対象URL

- 日本語：`https://master-chikin-shibuya.pages.dev/`
- 英語：`https://master-chikin-shibuya.pages.dev/en/`
- robots：`https://master-chikin-shibuya.pages.dev/robots.txt`
- サイトマップ：`https://master-chikin-shibuya.pages.dev/sitemap.xml`

上記はソース設定が再デプロイされた後の出力先。現時点での本番レスポンスを確認した結果ではない。

## 検証と公開状態

ユーザーの「実装後の確認は不要」という指定に従い、変更後のビルド・型チェック・生成HTML確認・画像確認・構造化データ検証・ブラウザ確認・本番HTTP確認は実施していない。

変更前に公開トップページの取得を試みたが、利用ツールからアクセスできず、現在の公開内容は確認できなかった。今回の変更対象はローカルソース。デプロイ、Search Consoleの所有権確認、サイトマップ送信、URL検査、インデックス登録のリクエストは行っていない。

再デプロイ後、ユーザー側で日英canonical・hreflang、OG画像の絶対URL、robots.txt、sitemap.xml、JSON-LDの出力を確認できる。Search Consoleでサイトマップを送信する場合は上記のsitemap.xmlを指定する。SEO設定だけで検索順位やインデックス登録を保証するものではない。

## 参照した公式資料

- [Astro：ルーティング](https://docs.astro.build/en/guides/routing/)
- [Google：言語別ページ](https://developers.google.com/search/docs/specialty/international/localized-versions)
- [Google：サイトマップの作成と送信](https://developers.google.com/search/docs/crawling-indexing/sitemaps/build-sitemap)
