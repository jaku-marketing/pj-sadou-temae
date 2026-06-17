# UI／アニメーション リサーチ（2026-06-18）

> player.html の次のブラッシュアップ用。実在・検証可能な参考のみ。本番投入前に各ライセンス表記を確認すること。

## A. インターフェース構造の参考（"見た目"でなく骨格）

### 主軸＝クックモード型（1手＝1画面・大画像・スワイプ送り）
- NYT Cooking / Cook Mode … https://apps.apple.com/us/app/nyt-cooking-recipes-tips/id911422904
  - 1ステップ1画面、左右スワイプ、その手で使う材料だけ表示。**手がふさがる前提**＝茶室と一致。
  - 借用：1手＝1画面・大画像・スワイプ／その手の道具だけ下部チップに。

### 全体把握＝進捗パス（現在地と残りを一本道で）
- Duolingo Learning Path … https://www.duolingo.com/
  - 縦の一本道マップ＝各駅が1所作。終わった所作にチェック、現在地を強調。
- TurboTax（マイルストーン区切り）… https://turbotax.intuit.com/
  - 「準備→点て→仕舞い」を節目に分節、節目で次段階を予告して心理的負担を下げる。

### 格納構造＝ドロワー／折りたたみサイドバー
- Notion サイドバー … https://www.notion.com/help/navigate-with-the-sidebar （入れ子の畳めるツリー）
- shadcn/ui Sidebar … https://ui.shadcn.com/docs/components/radix/sidebar （mini variant・localStorage復元・ARIA。実装の土台）
- Angular Material Sidenav … https://material.angular.dev/components/sidenav/overview （push/over で端末別出し分け）
- 借用：種目ツリーは普段畳んで画像に集中、必要時のみ展開。スマホはover、タブレットはpush。

### 拡張表示（タブレット/PC）＝3カラム（左ナビ｜中央所作｜右注記）
- Stripe API Docs … https://docs.stripe.com/ （3カラムの定番。ホバーで本文と該当箇所が連動ハイライト）
- 借用：中央＝所作画像、右＝ポイント/よくある間違い/道具名。**スマホでは破綻するのでPC専用、スマホはドロワーに畳む**。

### 任意機能
- 番号ジャンプ：British Museum Audio app … https://www.britishmuseum.org/visit/audio-app （「○手目へ飛ぶ」入力）
- 順路ツアー＋画像認識：Smartify … https://www.smartify.org/ （将来：道具をかざして名称表示のヒント）
- 復習用の読み物モード（スクロールテリング）：NYT Snow Fall … https://www.nytimes.com/projects/2012/snow-fall/ ／ The Pudding … https://pudding.cool/
  - スクロールで所作が滑らかに遷移。**本番（1手ずつ止める）とは目的が違うので補助モード扱い**。

**結論**：主軸＝クックモード型＋進捗パス。格納＝ドロワー。3カラムは拡張表示専用に格下げ。

## B. 背景・装飾アニメーション（Three.js / CSS でフォーク）

### 桜・花びら（春の主役）
1. Canvas 花びら落下 … https://codepen.io/rudtjd2548/pen/qBpVzxP （Canvas・軽量・易〜中）
2. Sakura CSS only … https://codepen.io/BerylSky/pen/jOeMMXg （純CSS・最軽量・易）
3. Floaty 花びら … https://codepen.io/qqz/pen/GzyQVb （ゆったり・易）
4. sakura.js（jhammann/sakura, MIT検証済）… https://github.com/jhammann/sakura ／ デモ https://jhammann.github.io/sakura/
   - `new Sakura('body',{...})` だけ。色・速度・start/stop制御。季節ON/OFFに最適。**本番候補**。

### 和柄（通年の地紋）
5. 青海波アニメ … https://codepen.io/louisalviss/pen/zYdKRy
6. 青海波 CSS only … https://codepen.io/loficodes/pen/Ezmpbm
7. 和柄SVG集（麻の葉/青海波）… https://codepen.io/dudleystorey/pen/QbzgpO

### 淡いグラデ／流体／シェーダー（"こじゃれた"静かな動き）
8. Decorative WebGL Backgrounds（Codrops, Three.js）… https://tympanus.net/codrops/2017/11/28/decorative-webgl-backgrounds/ ／ https://github.com/Mamboleoo/DecorativeBackgrounds （中〜難）
9. Whatamesh（Stripe風メッシュグラデ）… https://codepen.io/bramus/pen/XWaMqJw ／ https://whatamesh.vercel.app/ （色はCSS変数・易〜中）
10. Pure CSS グラデ背景 … https://codepen.io/P1N2O/pen/pyBNzX （最軽量・易）
11. CSS ノイズ背景（和紙質感）… https://codepen.io/iceable/pen/yLBrZOd （易）

**おすすめ合わせ**：下地＝10 or 9 に 11（和紙ノイズ）を薄く重ね、春は 4（sakura.js）を散らす。区切りに 6〜7 の和柄を淡色で。
重い順：8 > 9 > 1 > 4 > CSS各種。スマホ重視なら純CSS中心。
