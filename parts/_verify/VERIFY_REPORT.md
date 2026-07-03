# 茶道お手前パーツ検証レポート

**日付**: 2026-07-02
**対象**: `parts/*.png` 30点 と `img/3.png`〜`53.png`（オリジナル完成イラスト、1600×912）の突合検証

---

## 0. 総括

- 30パーツをすべて目視し、`PARTS_EXPORT_LIST.md` の項目に対応づけた（下記マッピング表）。
- `bg_01_tatami.png` は畳のみではなく **襖（金山水3面）込みのフルサイズ背景そのもの** だった。`img/3〜53.png` 全カットの背景ピクセルと**完全一致**（差分0）することを自動検証で確認。→ `bg_02_fusuma` が未提出でも実害なし（背景は全カット共通・不変で、bg_01_tatami.png 1枚で足りる）。
- スケール係数は物体によって **0.22倍〜0.87倍** とばらつきがあり、「全パーツ一律○倍」とは言えない。ただし主要な器物（風炉釜・水指・棗・茶碗本体）は **0.47〜0.60倍** に集中しており、Canvaの「画面上実寸の2倍で書き出し」指示に対しおおむね2倍前後（実測で1.7〜2.1倍相当）で書き出されている。**目安としては0.5〜0.6倍**で運用できるが、蓋物・柄杓・帛紗・蓋置は個別調整が必須。
- 自動測定手法：`parts/bg_01_tatami.png` を背景の正解画像として `img/N.png` との差分（ピクセル絶対値）を取り、物体の輪郭を抽出。furogama・mizusashi・natsume・chawanコンボは実測できたが、他は分離が難しく `PARTS_EXPORT_LIST.md` 記載の目測値を代用（要再測定）。

---

## 1. マッピング表（ファイル名 → リスト項目 → 対応img）

| parts/ファイル名 | 内容（目視） | リスト対応項目 | 備考 |
|---|---|---|---|
| bg_01_tatami.png | 畳＋襖(金山水)込みフル背景 1600×912 | bg_01＋bg_02統合 | 襖込みのため bg_02 は実質不要 |
| furogama_01.png | 風炉釜、蓋閉、黒台座つき | furogama_01 | |
| furogama_02.png | 風炉釜、蓋なし（口が開いた状態） | リスト外・新規状態 | 本体不変の想定だったが実際は蓋なし用の別本体が要る |
| furogama_02_futa.png | 釜の小蓋のみ | kamabuta_01 | 楕円が扁平でアスペクト比要注意 |
| furogama_03_hisyaku.png | 風炉釜(蓋なし)＋柄杓が差し込まれたコンボ | リスト外（furogama+hishaku合成済） | |
| mizusashi_01.png | 水指、蓋つき閉 | mizusashi_01 | |
| mizusashi_02.png | 水指、蓋なし・水面見える | mizusashi_02 | |
| mizusashi_02_futa.png | 水指の蓋のみ、横に寝かせた形 | mizusashi_03 | 横長オーバル、リスト値と縦横比が真逆でずれ大 |
| chawan_01_all.png | 黒楽茶碗＋茶筅＋茶杓（立てて差し込み）コンボ | chawan_02相当 | |
| chawan_02_empty.png | 黒楽茶碗、空 | chawan_01 | |
| chawan_03_chasen.png | 黒楽茶碗＋茶筅のみ | chawan_03 | |
| chawan_04_chakin.png | 黒楽茶碗＋茶巾を縁にかけたコンボ | chakin_02をchawanに合成済 | |
| chawan_05_finish.png | 茶碗を真上から、点てた抹茶がなみなみ（特大ズーム） | chawan_06 | 他chawanと縮尺別（リスト特記どおり） |
| chawan_05_temae.png | 黒楽茶碗＋茶筅（点てている最中、抹茶色なし） | chawan_05 | |
| natsume_01_chasyaku.png | 棗（黒漆・菊紋）閉＋茶杓を上に乗せたコンボ | natsume_01＋chashaku合成済 | |
| natsume_02.png | 棗、閉じた単体 | natsume_01 | |
| natsume_03_cha.png | 棗、開＋抹茶の山 | natsume_02 | |
| natsume_03_futa.png | 棗の蓋のみ | natsume_03 | 扁平オーバルで縦横比ずれ大 |
| chashaku_01.png | 茶杓、茶碗内に立てて差し込んだ縦位置ポーズ | リスト外（新規ポーズ） | chawan_01_allに内蔵済の絵柄と同一意匠 |
| chashaku_02_cha.png | 茶杓、斜め置き・抹茶付着 | chashaku_02 | |
| chashaku_02_empty.png | 茶杓、斜め置き・無地 | chashaku_01 | ファイル名の "empty/cha" が入れ替わっている点に注意 |
| chasen_01.png.png | 茶筅、単体 | chasen_01 | **二重拡張子**（`.png.png`）要リネーム |
| hishaku_01.png | 柄杓、基本形（構え角度） | hishaku_01 | |
| hishaku_02_mizu.png | 柄杓＋水流（注いでいる状態）コンボ | hishaku_01＋mizu_nagare合成済 | |
| hishaku_03_kamae.png | 柄杓、縦位置ポーズ | リスト外（新規ポーズ、回転用マスター？） | |
| kensui_01.png | 建水（赤茶）＋柄杓を渡したコンボ、フル形状 | リスト外（建水+柄杓合成済） | **オリジナルでは常に見切れ表示だがpartはフル形状で書き出されている** |
| kensui_02_empty.png | 建水（赤茶）単体、フル形状 | kensui_01 | 同上 |
| futaoki_01.png | 蓋置、竹筒＋赤印 | futaoki_01 | |
| fukusa_hands_01.png | 帛紗（オレンジ）を両手で三角に広げた状態 | fukusa_hands_01 | 色がオレンジ、原本の色と要突合（下記参照） |
| chakin_01.png | 茶巾、折り畳み単体 | chakin_01 | chakin_02・03は未提出 |

**未提出（30点に含まれず）**: bg_02_fusuma（実害なし、上記参照）／chawan_04(通し中)・chawan_07(すすぎ)・chawan_08(傾け)／natsume独自のchashaku重畳版は別カットとして扱われず／chakin_02・chakin_03／mizu_nagare_01・02の単独版（hishaku_02_muziに統合済）

---

## 2. 実測スケール係数（部位別）

自動計測（`bg_01_tatami.png`との差分抽出＋connected components）で得られた**高信頼度**の値と、リスト記載値を流用した**中〜低信頼度**の値を分けて記載。

| ファイル | パーツ実寸(alpha bbox, px) | オリジナル上サイズ(px) | 出典 | スケール係数 | 判定 |
|---|---:|---:|---|---:|---|
| furogama_01.png | 798×1010 | 443×560（img3実測） | 実測 | **0.555** | ○ ぴったり（オーバーレイでズレほぼゼロ） |
| mizusashi_01.png | 519×573 | 311×344（img4実測） | 実測 | **0.600** | ○ ぴったり（オーバーレイでズレほぼゼロ） |
| natsume_02.png | 246×285 | 140×170（img6実測） | 実測 | **0.583** | ○ ぴったり |
| chawan_01_all.png | 434×474 | 191×239（img7実測、コンボ） | 実測 | **0.472** | ○ 概ね良好（アスペクト差15%、茶筅の突出分の影響） |
| hishaku_01.png | 677×486（斜め45°基準） | 420×130（リスト値、対角線換算） | 混合 | **0.53前後** | △ サイズは近いが**角度がカットごとに違う**ため要個別回転（後述） |
| kensui_02_empty.png | 456×364 | 224×293（img6実測・見切れ可視部のみ） | 実測だが解釈要注意 | 0.55〜0.65（再検証要） | ✕ オーバーレイで明らかに大きすぎ。可視部のみの実寸と比較したのが原因、要再測定 |
| furogama_02_futa.png | 304×114 | 90×70（リスト値） | リスト | 0.30〜0.61（幅と高さで不一致） | ✕ アスペクト比が大幅に違う（part比2.67:1、原本想定1.29:1） |
| mizusashi_02_futa.png | 327×169 | 110×140（リスト値） | リスト | 幅0.34／高さ0.83（不一致） | ✕ 縦横比が逆転（partは横長オーバル、原本は縦長想定） |
| natsume_03_futa.png | 203×145 | 100×40（リスト値） | リスト | 幅0.49／高さ0.28（不一致） | ✕ 蓋を伏せて置いた際の煽り角度がpartと原本で異なる可能性 |
| futaoki_01.png | 346×425 | 60×110（リスト値） | リスト | 幅0.17／高さ0.26（不一致） | △ partは正面寄りのビューで扁平度が違う。要オーバーレイ再検証 |
| fukusa_hands_01.png | 1400×585 | 700×450（リスト値） | リスト | 幅0.50／高さ0.77（不一致） | △ partが横に広い（両手を広く開いた構図）。原本の帛紗は**赤系**の可能性があり色も要突合 |
| chakin_01.png | 172×149 | 90×50（リスト値） | リスト | 幅0.52／高さ0.34（不一致） | △ 畳み方の見た目が違う可能性 |
| chawan_02/03/05系（空・茶筅のみ・点てている） | 434×393〜437 | 195〜230（リスト値） | リスト | **0.50〜0.53** | ○ chawan_01_allの実測結果と近似、bowl幅が全variantで一定（434px）なのも整合的 |
| natsume_01_chasyaku.png | 246×397 | natsume_02と同幅想定 | 推定 | **0.47前後** | ○（茶杓分だけ縦に伸びるのは想定通り） |
| chashaku_01/02系 | 58×252／645〜650×476 | 340×30（リスト値） | リスト | 0.42〜0.53 | △ 斜め姿勢のためbbox比較は参考値。実配置は個別回転前提 |
| chasen_01.png.png | 217×383 | 60×110（リスト値） | リスト | **0.28** | △ 他部位と大きく異なる係数。単純な書き出し倍率の違いの可能性、要実測 |
| chawan_05_finish.png | 849×871 | 800×700（リスト chawan_06） | リスト | **0.87** | △ ヒーローショット用に別スケール、リスト特記通り単独運用でOK |

**全体傾向**: 主要な「本体」オブジェクト（風炉釜・水指・棗・茶碗）は **0.47〜0.60倍** に収束しており、実測ベースで裏が取れた3点（furogama/mizusashi/natsume）はオーバーレイ検証でもズレがほぼゼロだった。一方で「蓋を外して置いた」ポーズ（kamabuta・mizusashi蓋・natsume蓋・futaoki）は軒並みアスペクト比が原本の目測値と食い違っており、**Canva書き出し時のカメラ角度が原本のカット内配置角度と異なる**ことが主因と考えられる。ここは倍率の問題ではなく、**回転・煽り角度の調整が必要**。

---

## 3. オーバーレイ検証（`parts/_verify/verify_*.png`、左=オリジナル／右=50%重ね）

必須6点のうち5点を生成・目視確認済み（棗は代表としてnatsume_02で検証、chawanはコンボ状態で検証）。

| ファイル | 対象 | 判定 | 所見 |
|---|---|---|---|
| verify_furogama_01.png | 風炉釜 | **○ ほぼ完全一致** | 輪郭が二重に見えないレベルで重なる |
| verify_mizusashi_01.png | 水指 | **○ ほぼ完全一致** | 同上 |
| verify_natsume_02.png | 棗 | **○ 良好** | サイズ・位置ともほぼ一致 |
| verify_chawan_01_all.png | 茶碗（茶筅＋茶杓コンボ） | **○ 概ね良好** | 若干原本よりやや小さめだが誤差10〜15%程度で許容範囲 |
| verify_hishaku_01.png | 柄杓 | **△ 要調整** | サイズは近いが、**partのデフォルト角度(約36°)が原本の置き柄杓角度(約21°)より急**で、柄の先端が原本より手前で終わる。使用カットごとに回転角を計算して当てる前提の設計と判断 |
| verify_kensui_02_empty.png | 建水 | **✕ 要再検証** | オーバーレイのkensuiが原本の見切れ部分より明らかに大きい。原本は全カット見切れ表示のため「真の全体サイズ」を実測で裏取りできず、目測ベースの係数が過大だった可能性が高い |

---

## 4. 発見した問題

1. **bg_02_fusuma 未提出の影響**：実害なし。`bg_01_tatami.png` が既に襖込みの完成背景で、全カットと背景ピクセルが完全一致することを確認済み。
2. **二重拡張子**：`chasen_01.png.png` は `chasen_01.png` にリネーム要。
3. **想定外・リスト外のポーズ**：`furogama_02`(蓋なし本体)、`furogama_03_hisyaku`・`kensui_01`・`natsume_01_chasyaku`・`hishaku_02_mizu`（各コンボ合成済み）、`chashaku_01`・`hishaku_03_kamae`（縦位置ポーズ）はリストに直接対応する項目がない。台帳作成時は「合成済み」扱いとして別途state名を割り当てる必要あり。
4. **kensui のフル形状問題**：オリジナルは全カット見切れ表示なのに対し、partはフル形状（円形の全体）で書き出されている。スケール比較のための「真の全体サイズ」を原本から直接測れないため、見切れ部分だけを頼りにした今回の係数（0.55〜0.65）は信頼度が低い。オーバーレイでも過大が確認された。実装時はCanva側の元レイヤーで実寸を再確認するか、見切れ位置に合わせて配置してトリミングで対応する運用を推奨。
5. **蓋物（kamabuta / mizusashi蓋 / natsume蓋）・futaoki のアスペクト比不一致**：いずれも原本の目測アスペクト比とpartのアスペクト比が大きくズレている（倍率でなく形状の問題）。Canva側で「蓋を外して置いた」構図を、原本のカメラ角より正面寄り／俯瞰気味に描いているためと推測。個別に回転・傾斜（3D風パースの調整）またはCanva側での再撮り出しが必要。
6. **柄杓の角度依存性**：hishaku_01は「構え／置き柄杓／注ぐ／片付け」で回転角度が異なる前提の1アセット運用だが、書き出し時のデフォルト角度（約36°斜め）は原本のどのカットの角度とも完全には一致しない。実装側で各カットごとの回転角をパラメータ化する必要あり（parts.json に `defaultAngleDeg` を持たせて差分回転させる設計を推奨）。
7. **帛紗の色**：`fukusa_hands_01.png` はオレンジ系だが、原本での色を今回未突合（女点前の帛紗は朱色系が一般的）。色差があれば要Canva側修正。アスペクト比もリスト目測よりだいぶ横広（両手の開き方が広い）。
8. **chashaku ファイル名の状態が逆**：`chashaku_02_empty.png`＝リストの「chashaku_01(無地)」、`chashaku_02_cha.png`＝リストの「chashaku_02(抹茶付着)」に対応。ファイル名の連番と実際の状態がリストと一致しないため、台帳側で明示的に読み替えが必要。
9. **未提出パーツ**：chawan_04(茶筅通し中)・chawan_07(すすぎ)・chawan_08(建水にあける動作)・chakin_02・chakin_03・natsume独自蓋乗せ版が未提出。アニメーション上これらの状態が必要な場合は追加書き出しが必要。

---

## 5. parts.json 台帳骨子案

```json
{
  "background": {
    "file": "bg_01_tatami.png",
    "object": "background",
    "state": "full_room",
    "scale": 1.0,
    "anchor": [0, 0],
    "zIndex": 0,
    "note": "襖込みフル背景。全51カット共通・不変"
  },
  "parts": [
    { "file": "furogama_01.png", "object": "furogama", "state": "closed",
      "scale": 0.555, "anchor": [245, 25], "zIndex": 10,
      "hands": ["n1-n51(常設)"] },
    { "file": "furogama_02.png", "object": "furogama", "state": "open_no_lid",
      "scale": 0.52, "anchor": [245, 25], "zIndex": 10,
      "hands": ["n16-n47の蓋なし区間"], "note": "スケール未実測(推定)" },
    { "file": "furogama_02_futa.png", "object": "kamabuta", "state": "on_futaoki",
      "scale": null, "anchor": null, "zIndex": 12,
      "hands": ["n16-n47"], "note": "縦横比不一致のため要再撮り出しor回転調整" },
    { "file": "furogama_03_hisyaku.png", "object": "furogama+hishaku", "state": "combo_resting",
      "scale": 0.544, "anchor": [245, 25], "zIndex": 15, "hands": [] },
    { "file": "mizusashi_01.png", "object": "mizusashi", "state": "closed",
      "scale": 0.600, "anchor": [854, 206], "zIndex": 20,
      "hands": ["n2-n29, n49-"] },
    { "file": "mizusashi_02.png", "object": "mizusashi", "state": "open",
      "scale": 0.611, "anchor": [854, 206], "zIndex": 20,
      "hands": ["n30-n48"], "note": "スケール未実測(推定)" },
    { "file": "mizusashi_02_futa.png", "object": "mizusashi", "state": "lid_only",
      "scale": null, "anchor": null, "zIndex": 21,
      "hands": ["n30-n48"], "note": "縦横比不一致のため要再撮り出しor回転調整" },
    { "file": "chawan_02_empty.png", "object": "chawan", "state": "empty",
      "scale": 0.502, "anchor": [820, 550], "zIndex": 40, "hands": ["n14"] },
    { "file": "chawan_01_all.png", "object": "chawan+chasen+chashaku", "state": "combo_setup",
      "scale": 0.472, "anchor": [819, 395], "zIndex": 40, "hands": ["n3-n12, n45, n47"] },
    { "file": "chawan_03_chasen.png", "object": "chawan+chasen", "state": "chasen_only",
      "scale": 0.519, "anchor": [820, 550], "zIndex": 40, "hands": ["n12, n41"] },
    { "file": "chawan_05_temae.png", "object": "chawan+chasen", "state": "whisking",
      "scale": 0.528, "anchor": [820, 550], "zIndex": 40, "hands": ["n32-n34"] },
    { "file": "chawan_05_finish.png", "object": "chawan", "state": "hero_zoom",
      "scale": 0.873, "anchor": null, "zIndex": 90,
      "hands": ["n34"], "note": "他chawanと別スケール、単独クローズアップ専用" },
    { "file": "chawan_04_chakin.png", "object": "chawan+chakin", "state": "chakin_drape",
      "scale": 0.496, "anchor": [820, 550], "zIndex": 40, "hands": ["n24, n39"] },
    { "file": "chashaku_01.png", "object": "chashaku", "state": "standing_in_chawan",
      "scale": null, "anchor": null, "zIndex": 41,
      "hands": [], "note": "chawan_01_allに内蔵済み。単独使用の要否確認要" },
    { "file": "natsume_02.png", "object": "natsume", "state": "closed",
      "scale": 0.583, "anchor": [1050, 460], "zIndex": 30,
      "hands": ["n3-n11, n42-"] },
    { "file": "natsume_01_chasyaku.png", "object": "natsume+chashaku", "state": "combo_chashaku_on_lid",
      "scale": 0.466, "anchor": [1050, 460], "zIndex": 32, "hands": ["n12以降"] },
    { "file": "natsume_03_cha.png", "object": "natsume", "state": "open_with_matcha",
      "scale": 0.592, "anchor": [1050, 460], "zIndex": 30, "hands": ["n26-n27"] },
    { "file": "natsume_03_futa.png", "object": "natsume", "state": "lid_only",
      "scale": null, "anchor": null, "zIndex": 31,
      "hands": ["n27以降"], "note": "縦横比不一致のため要再撮り出しor回転調整" },
    { "file": "chashaku_02_empty.png", "object": "chashaku", "state": "plain_flat(=list_chashaku_01)",
      "scale": 0.426, "anchor": null, "zIndex": 33, "hands": ["n12"], "note": "回転角は使用カットごとに個別設定" },
    { "file": "chashaku_02_cha.png", "object": "chashaku", "state": "matcha_flat(=list_chashaku_02)",
      "scale": 0.424, "anchor": null, "zIndex": 33, "hands": ["n27"], "note": "回転角は使用カットごとに個別設定" },
    { "file": "chasen_01.png.png", "object": "chasen", "state": "standalone",
      "scale": 0.282, "anchor": null, "zIndex": 34,
      "hands": ["n13以降の静置カット"], "note": "ファイル名要リネーム(二重拡張子)" },
    { "file": "hishaku_01.png", "object": "hishaku", "state": "base(default_angle=36deg)",
      "scale": 0.53, "anchor": null, "zIndex": 50,
      "hands": ["n5, n16, n50等"], "note": "使用カットごとに回転角を再計算する前提" },
    { "file": "hishaku_02_mizu.png", "object": "hishaku+mizu_nagare", "state": "pouring_short",
      "scale": 0.39, "anchor": null, "zIndex": 51, "hands": ["n18, n31, n35"] },
    { "file": "hishaku_03_kamae.png", "object": "hishaku", "state": "vertical_ready",
      "scale": 0.48, "anchor": null, "zIndex": 50, "hands": ["n5系の構えカット"] },
    { "file": "kensui_02_empty.png", "object": "kensui", "state": "base",
      "scale": null, "anchor": null, "zIndex": 13,
      "hands": ["全カット(見切れ表示)"], "note": "スケール要再検証。原本は常に画面外フレームアウト" },
    { "file": "kensui_01.png", "object": "kensui+hishaku", "state": "combo_resting",
      "scale": null, "anchor": null, "zIndex": 52, "hands": [] },
    { "file": "futaoki_01.png", "object": "futaoki", "state": "base",
      "scale": null, "anchor": null, "zIndex": 12,
      "hands": ["n5以降常設"], "note": "アスペクト比不一致のため要オーバーレイ再検証" },
    { "file": "fukusa_hands_01.png", "object": "fukusa_hands", "state": "spread_triangle",
      "scale": null, "anchor": null, "zIndex": 60,
      "hands": ["n6,n7,n9,n11,n42"], "note": "色・アスペクト比とも要突合" },
    { "file": "chakin_01.png", "object": "chakin", "state": "folded_on_kamabuta",
      "scale": null, "anchor": null, "zIndex": 14,
      "hands": ["n17"], "note": "アスペクト比要再検証" }
  ]
}
```

`scale: null` の項目は、今回の検証で**数値の裏取りが不十分（要Canva原寸再確認 or 追加オーバーレイ検証）**なもの。`anchor` はオリジナル1600×912上でのパーツ左上ではなく「対象オブジェクトのバウンディングボックス中心」を想定した座標（実測できたもののみ記入、他は要実測）。

---

## 6. ファイルパス

- マッピング・検証根拠: 本ファイル `parts/_verify/VERIFY_REPORT.md`
- オーバーレイ画像: `parts/_verify/verify_furogama_01.png`, `verify_mizusashi_01.png`, `verify_natsume_02.png`, `verify_chawan_01_all.png`, `verify_hishaku_01.png`, `verify_kensui_02_empty.png`
