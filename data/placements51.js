/* 茶道お手前 51手 パーツ配置データ（機械検品・修正済み 2026-07-03）
 * ============================================================
 * POSES: 部位ごとの「型」カタログ。part(ファイル名)/x,y(translate)/scale/rotate(deg)/z(重なり順)/conf(信頼度)
 *   conf: 'high'   = 原本画像とのパーツ単位RMSE検証で誤差小（機械フィット済み）
 *         'medium' = 機械フィット済みだが残差が中程度（形状・角度の差はパーツ絵柄由来）
 *         'low'    = フィット後も残差大（蓋の角度など既知のパーツ絵柄不一致）
 *   ○○__nXX 形式のポーズは、同じ道具が原本の別位置に置かれる手グループ用の自動生成variant。
 * STEPS: 第n手(1-51)ごとに使用するpose名の組。fallback:true の手はパーツ化せず原本img表示
 *   （現在は全51手がfallback:false・パーツ合成。fallback分岐自体はコード側に将来の保険として残置）。
 * 2026-07-03: 残り6手（帛紗の手 n6,7,9,11,42／特大ズーム n34）をパーツ合成に変換し完了。
 *   ただしn6・n7は原本画像を実測した結果、実際には帛紗は写っていなかった（総礼・茶碗を正面に出す、の
 *   通常カット）ため、帛紗レイヤーは付けず通常パーツ構成のみとした。帛紗+両手(fukusa_hands.cleaning)は
 *   n9・n11・n42の3カットで使用し、原本上で完全に同一の位置・スケールであることを実測で確認済み。
 * 2026-07-03 実地レビュー反映（プレイヤー側の指摘⑤⑦）：
 *   - n7の棗(natsume)が誤って n8の位置(natsume.closed__n08)を先取りしていたため、n6と同じ
 *     natsume.closed に戻した。img/9.png(n7)実測で棗は動いていない（茶碗のみが正面へ出る）ことを確認。
 *     結果、棗の移動は本来どおりn8のplace-shiftで初めて起こる。
 *   - n11の茶碗(chawan)が chawan.chasen_only（茶杓なし）になっていたが、img/13.png(n11)実測では
 *     n10と同じく茶杓が茶碗に乗った状態（chawan_01_all.png）だったため chawan.combo_setup__n10 に修正。
 *     n10→n11は帛紗が前に出るだけで茶碗・棗の位置・絵柄は変化しない。
 * 2026-07-03 実地レビュー第2弾（プレイヤー側の指摘：n9で茶杓が消えるバグ）：
 *   - n9の茶碗(chawan)が chawan.chasen_only（茶杓なし＝chawan_03_chasen.png）になっており、
 *     n8の chawan.combo_setup__n08（茶杓あり＝chawan_01_all.png）から状態スイッチが起きて
 *     茶杓が一瞬で消えて見えるバグだった。img/10.png(n8)〜img/13.png(n11)を実測すると、
 *     茶碗に乗った茶杓はn8からn11まで一切動いておらず、n12で初めて棗の上へ移る（自然な流れ）。
 *     n9のchawanポーズを chawan.combo_setup__n08 に変更し、n8→n9→n10→n11のあいだ
 *     茶碗の絵柄・位置を完全に不変（ファイル切替なし＝アニメ自体が発生しない）にして解消。
 * ============================================================ */
window.SADO_PLACEMENTS = {
  poses: {
    "furogama.closed": { part:'furogama_01.png', x:222.25, y:-20.5, scale:0.55445, rotate:0, z:10, conf:'high' },
    "furogama.open": { part:'furogama_02.png', x:225.5, y:-20, scale:0.5515, rotate:0, z:10, conf:'high' },
    "kamabuta.on_futaoki": { part:'furogama_02_futa.png', x:35.5, y:424.6, scale:0.5728, rotate:-0.88, z:13, conf:'high' },
    "mizusashi.closed": { part:'mizusashi_01.png', x:828.75, y:175.25, scale:0.603, rotate:0, z:20, conf:'medium' },
    "mizusashi.open": { part:'mizusashi_02.png', x:829, y:176.25, scale:0.5966, rotate:0, z:20, conf:'medium' },
    "chawan.combo_setup": { part:'chawan_01_all.png', x:805, y:416.25, scale:0.44868, rotate:0, z:40, conf:'high' },
    "chawan.chasen_only": { part:'chawan_03_chasen.png', x:664.75, y:476.25, scale:0.44916, rotate:0, z:40, conf:'high' },
    "chawan.empty": { part:'chawan_02_empty.png', x:664.75, y:476.25, scale:0.44918, rotate:0, z:40, conf:'high' },
    "chawan.whisking": { part:'chawan_05_temae.png', x:664.75, y:556.25, scale:0.44929, rotate:0, z:40, conf:'high' },
    "chawan.chakin_drape": { part:'chawan_04_chakin.png', x:615.5, y:397.25, scale:0.5958, rotate:0, z:40, conf:'high' },
    /* 2026-07-04 当主レビュー第4弾（n24タイミング調整用に新設）：chawan.chakin_drapeと全く同じ
     * 座標・スケール（＝持ち上げた中央の位置）で、ファイルだけbare(chawan_02_empty.png)にした
     * variant。n24の二段クロスフェード第1段で使う＝「茶碗が真ん中に来た（まだ茶巾なし）」を表現。 */
    "chawan.empty__n24": { part:'chawan_02_empty.png', x:615.5, y:397.25, scale:0.5958, rotate:0, z:40, conf:'medium' },
    /* 2026-07-04 当主レビュー第4弾（n25「定位置へ」用に新設）：chawan.chakin_drapeと同じファイル
     * (chawan_04_chakin.png＝茶巾付きの絵)のまま、座り位置(chawan.empty__n14と同じ座標・スケール)
     * にしたvariant。n25で「茶碗が茶巾付きのまま下に据わる」動き（settle-then-fadeの第1段）の
     * 到達先として使う。 */
    "chawan.chakin_drape__n25seated": { part:'chawan_04_chakin.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'medium' },
    "natsume.closed": { part:'natsume_02.png', x:1063.5, y:444.25, scale:0.46633, rotate:0, z:30, conf:'high' },
    "natsume.combo_chashaku": { part:'natsume_01_chasyaku.png', x:883.5, y:470.75, scale:0.46481, rotate:0, z:32, conf:'medium' },
    "natsume.open_matcha": { part:'natsume_03_cha.png', x:883.25, y:466, scale:0.47693, rotate:0, z:30, conf:'high' },
    "chashaku.resting_diag": { part:'chashaku_02_empty.png', x:210, y:190.76, scale:0.5995, rotate:-71, z:41, conf:'low' },
    /* 2026-07-04 当主レビュー反映: img/29.png(n27)を実測（背景差分+PCA）し直したところ、
     * 旧値(x452.22,y8,rotate42)は原本の柄杓位置と全く一致していなかった（茶杓は棗の抹茶に
     * スプーン部が触れる位置で、水指の手前あたりに斜めに横たわる）。実測結果：茶杓の対角線
     * 傾き角(≈144°、chashaku_02_cha.png素材自体が既にこの角度で描かれているため rotate:0 が正解)、
     * 重心(874,519)・全長249.5px（素材全長780px比でscale≈0.316）から逆算。 */
    "chashaku.matcha_diag": { part:'chashaku_02_cha.png', x:778, y:394, scale:0.316, rotate:0, z:41, conf:'high' },
    /* 2026-07-04 当主レビュー第2弾反映(n28「抹茶を入れる」)：抹茶をすくった茶杓(matcha_diag)は
     * n27のみに使い、抹茶を茶碗へ入れ終えたn28では「抹茶なし」の素材(chashaku_02_empty.png＝
     * VERIFY_REPORT記載どおりファイル名のempty/chaが実物と逆で、こちらが無地)に切り替える。
     * 2026-07-04 当主レビュー第3弾で座標を再改訂：「すくった抹茶を茶碗に入れる」動作を表現する
     * ため、旧値(x780.9,y402.1,rotate1.9＝n27とほぼ同位置で実質動かない)から、茶碗（n28での
     * chawan.empty__n14: x664.5,y556）の方向へ寄せて下げ、先端が茶碗へ向かって下がる回転
     * （+30°）を付けた「入れ終わった位置」に変更。pourTiltCrossfade()がn27の位置からここまで
     * 1.5秒で移動・傾け、到達点でそのままこのポーズ（空の茶杓）へインプレースのクロスフェード
     * を行う（＝ここが以後のlastPose・n29の退場アニメの起点にもなる）。
     * 2026-07-04 当主レビュー第4弾：静止した最終姿勢としてのrotate:30は「傾きすぎ」との指摘。
     * 「入れる」動作は①現位置から少し傾け（10〜12°）→②元の角度（n27のrotate:0）へ戻す、という
     * 一時的な傾け＋復元の動きで表現し直し（pourTiltCrossfade側で②の過程を担当）、最終的に
     * 静止する角度はn27と同じrotate:0（＝元の角度）に修正した。位置(x,y)は変更なし。 */
    "chashaku.empty_diag": { part:'chashaku_02_empty.png', x:728, y:452, scale:0.306, rotate:0, z:41, conf:'medium' },
    "chasen.standalone": { part:'chasen_01.png.png', x:1057, y:508.5, scale:0.36647, rotate:0, z:34, conf:'medium' },
    /* 2026-07-04 当主レビュー第4弾（n32「茶筅で点てる」作り直し）：当主支給の新パーツ
     * chasen_02.png（500×500・透過・点てる姿勢の茶筅）用のpose。棗の右のstandalone茶筅が消えた
     * 後、これが上からヒュッと降りてきて茶碗の中に入り、そのまま震える（点てる表現）。茶碗本体
     * (chawan)は一切切り替えない＝chasen_02だけの単独レイヤー。素材内の穂先バンドル部分の重心
     * （実測bbox中心付近、キャンバス内(270,115)）が、茶碗(chawan.empty__n18: x664.5,y556,
     * scale0.4501)の口元中央あたり（原本img/34.pngで茶筅が浸っている見え方を参考に実測フィット）
     * に来るよう、x,y,scaleを逆算。rotateは原本の柄が右上へ少し傾いて見える構図に合わせて
     * 軽く付けた。
     * 2026-07-05 当主レビュー第5弾：「穂先の位置をもう少し下げて、茶碗の下の口あたりに入る
     * 高さへ」との指摘。旧値(y538)は原本img/34実測・自機パーツ実測の座標計算上、穂先バンドル
     * (黒糸部分)〜穂先の先端が茶碗の開口楕円（実測ローカルy≈92〜180、ステージ換算y≈598〜637）の
     * 上端付近〜中央にしか届いておらず、茶筅の大半（持ち手側）が開口部より上に浮いて見えていた。
     * y+47（538→585）でステージ全体を下へ平行移動し、持ち手の頂点が開口部の少し上（据わって
     * いる後方の縁より上）、穂先バンドル〜先端が開口部前縁を越えて茶碗の内側（手前の胴部）まで
     * 入り込む高さに調整（x,scale,rotateは既存のままで平行移動のみ）。 */
    "chasen.whisking_in_bowl": { part:'chasen_02.png', x:628, y:585, scale:0.55, rotate:-10, z:41, conf:'medium' },
    "hishaku.resting": { part:'hishaku_01.png', x:39.5, y:352.88, scale:0.8321, rotate:-0.4, z:14, conf:'high' },
    "hishaku.kamae": { part:'hishaku_03_kamae.png', x:722, y:65.5, scale:0.7179, rotate:0, z:16, conf:'high' },
    /* 2026-07-04 当主レビュー第2弾反映(n32「柄杓が消えている」バグ修正)：img/34.png(n32)の原本には
     * 柄杓そのものが描かれていなかったため、代わりに furogama_03_hisyaku.png（風炉釜+柄杓の合成
     * 素材＝furogama.hishaku_comboで実使用中）を"正解"として利用した。furogama_01/02/03は
     * いずれも同一880x1160キャンバス上に同一構図で描かれていることを確認済みのため、合成素材内の
     * 柄杓の輪郭（差分抽出）とhishaku_01.png単体の輪郭（カップ上端(155,10)・柄の先端(751,491)の
     * 2点）を相似変換で対応づけ、furogama.hishaku_comboの実配置(x225.25,y-20,scale0.5515)へ
     * 逆算合成することで「風炉が開いたまま（furogama.open）でも同じ位置に柄杓だけを置く」ための
     * 単体レイヤー姿勢を求めた。furogama_03_hisyaku.pngを同transformで重ねた検証で輪郭が一致済み。
     * 2026-07-04 当主レビュー第3弾で再修正：上記の逆算値(scale0.6943・rotate44.6°・y-79)は
     * 数値上は輪郭が一致していたが、実機で見ると素材(hishaku_01.png)がこの極端な回転・縮尺・
     * 画面外寄りの位置で描画されると「別の柄杓の絵」に見えるほど印象が変わってしまう不具合が
     * 判明（当主指摘）。n5・n6で実績のある自然な描画＝hishaku.restingと全く同じ
     * transform（同じhishaku_01.pngを標準的な縮尺・ほぼ水平の角度で描く）に統一し、「置き柄杓」
     * らしく静かに休む自然な見た目を最優先にした。位置は建水寄り（画面手前左）の定位置。
     * 2026-07-04 当主レビュー第4弾で廃止：「柄杓は釜の上に置く（蓋置の上ではない）」との指摘で、
     * n32・n33ではこの建水寄りの単体レイヤーをやめ、furogama(VESSEL)をfurogama.hishaku_combo
     * （釜に焼き込まれた置き柄杓の絵）へ切替える方式に統一した。定義自体は他コードからの参照に
     * 備えて残置（現在は未使用）。 */
    "hishaku.oki": { part:'hishaku_01.png', x:39.5, y:352.88, scale:0.8321, rotate:-0.4, z:16, conf:'medium' },
    /* 2026-07-04 当主レビュー第2弾反映(n31「湯を注ぐ」)：img/33.png実測で原本の柄杓位置を確認した
     * ところ、既存値はほぼ一致（オーバーレイでズレはごく僅か）だったが、当主指摘のとおり気持ち
     * 下寄りに見えるため、y+8px・x+3pxの範囲でわずかに下げ・右寄せした（スケール・角度は実測でも
     * 既存値が最良フィットだったため変更なし）。 */
    "hishaku.pouring": { part:'hishaku_02_mizu.png', x:681.5, y:35, scale:0.6, rotate:0, z:16, conf:'high' },
    "kensui.combo": { part:'kensui_01.png', x:-107, y:607.75, scale:0.63922, rotate:0, z:5, conf:'high' },
    "kensui.base": { part:'kensui_02_empty.png', x:-126, y:522, scale:0.657, rotate:0, z:5, conf:'high' },
    "futaoki.base": { part:'futaoki_01.png', x:116, y:462.5, scale:0.26971, rotate:0, z:12, conf:'low' },
    "chakin.on_kamabuta": { part:'chakin_01.png', x:142, y:427.54, scale:0.40912, rotate:0, z:14, conf:'high' },
    /* 2026-07-04 当主レビュー反映: img/23.png(n21「茶筅を改める」)を実測（背景差分+PCA）した結果、
     * 旧値(x843,y426.5,scale0.2923,rotate0)は原本と位置・大きさ・角度すべて不一致だった（原本では
     * 茶碗から出した茶筅を水指の手前で大きく・左へ傾けて構える）。実測bbox(x740-909,y500-637)・
     * 傾き角(実測約-42°、原本の完成イラストは水指に立てかける構図でさらに傾けて見せるため
     * 当主指示の「大きく＋左に90度」に寄せて-55°を採用)からscale0.6・rotate-55へ修正。
     * 2026-07-04 当主レビュー第4弾で再修正：-55°はまだ斜めで「真横」に見えないとの指摘。
     * 完全に90度倒した真横（rotate:-90）へ修正。x,yは倒す前と同じ重心付近を保つよう微調整。 */
    "chasen.standalone__n21": { part:'chasen_01.png.png', x:661, y:600, scale:0.6, rotate:-90, z:34, conf:'medium' },
    "chawan.chakin_drape__n40": { part:'chawan_04_chakin.png', x:666, y:558, scale:0.444, rotate:0, z:40, conf:'low' },
    "chawan.chasen_only__n37": { part:'chawan_03_chasen.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'medium' },
    "chawan.chasen_only__n36": { part:'chawan_03_chasen.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.chasen_only__n41": { part:'chawan_03_chasen.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.chasen_only__n20": { part:'chawan_03_chasen.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.combo_setup__n49": { part:'chawan_01_all.png', x:804.75, y:426.75, scale:0.4496, rotate:0, z:40, conf:'high' },
    "chawan.combo_setup__n45": { part:'chawan_01_all.png', x:804.75, y:426.75, scale:0.4496, rotate:0, z:40, conf:'high' },
    "chawan.combo_setup__n10": { part:'chawan_01_all.png', x:664.75, y:476.25, scale:0.4491, rotate:0, z:40, conf:'high' },
    "chawan.combo_setup__n43": { part:'chawan_01_all.png', x:664.75, y:556.25, scale:0.4491, rotate:0, z:40, conf:'high' },
    "chawan.combo_setup__n08": { part:'chawan_01_all.png', x:665, y:476.5, scale:0.4478, rotate:0, z:40, conf:'high' },
    "chawan.combo_setup__n44": { part:'chawan_01_all.png', x:664.75, y:556.25, scale:0.4491, rotate:0, z:40, conf:'high' },
    "chawan.empty__n21": { part:'chawan_02_empty.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.empty__n30": { part:'chawan_02_empty.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.empty__n14": { part:'chawan_02_empty.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.empty__n18": { part:'chawan_02_empty.png', x:664.5, y:556, scale:0.4501, rotate:0, z:40, conf:'high' },
    "chawan.empty__n15": { part:'chawan_02_empty.png', x:664.81, y:556.31, scale:0.44891, rotate:0, z:40, conf:'low' },
    /* 2026-07-04 当主レビュー第2弾反映(n22「温めの回し」)：前バージョンはn21と全く同じ静止位置に
     * 戻す設計だったが、当主指示は「上げた位置のまま保持」＝回し終えた後も持ち上げた姿勢を維持する。
     * n21の位置(x664.5,y556,scale0.4501)から約40px上・軽い拡大1.1倍にした「持ち上げ後の定位置」を
     * ここに定義し直した。chawanMawashi()がn21姿勢からこの姿勢まで持ち上げながら左右に揺らし、
     * 揺らし終わったらこの姿勢で静止する。n23（chawan.empty__rinse）へはこの浮いた位置から
     * soft-shiftで建水へ滑る（空中位置からの連続動作）。 */
    "chawan.empty__n22": { part:'chawan_02_empty.png', x:664.5, y:516, scale:0.49511, rotate:0, z:40, conf:'medium' },
    "kensui.base__n05": { part:'kensui_02_empty.png', x:-116.75, y:602, scale:0.657, rotate:0, z:5, conf:'high' },
    "kensui.base__n43": { part:'kensui_02_empty.png', x:-126, y:600.75, scale:0.657, rotate:0, z:5, conf:'high' },
    "natsume.closed__n08": { part:'natsume_02.png', x:704, y:631.5, scale:0.4643, rotate:0, z:42, conf:'high' },
    "natsume.combo_chashaku__n45": { part:'natsume_01_chasyaku.png', x:1063.75, y:444.75, scale:0.4648, rotate:0, z:32, conf:'medium' },
    "natsume.combo_chashaku__n44": { part:'natsume_01_chasyaku.png', x:1063.75, y:444.75, scale:0.4648, rotate:0, z:32, conf:'medium' },
    "natsume.open_matcha__n27": { part:'natsume_03_cha.png', x:827.25, y:535, scale:0.4778, rotate:0, z:30, conf:'high' },
    "mizusashi_futa.leaning": { part:'mizusashi_02_futa.png', x:723, y:562.91, scale:0.506, rotate:-70, z:21, conf:'medium' },
    /* 2026-07-04 当主レビュー反映: 棗の蓋(natsume_03_futa.png)がn26以降どの手にも配置されておらず
     * 「蓋が無い」欠落バグだった。img/28.png(n26「棗の蓋を開ける」)を実測（背景差分・連結成分で
     * 棗本体と分離）し、蓋の実測bbox(x950-1066,y590-691)とパーツのアルファ実寸(300x400キャンバス内
     * x52-250,y241-380)から逆算してscale0.56・x929・y470を採用。natsume本体の右手前に据わる。 */
    "natsume_futa.resting": { part:'natsume_03_futa.png', x:929, y:470, scale:0.56, rotate:0, z:31, conf:'medium' },
    "furogama.hishaku_combo": { part:'furogama_03_hisyaku.png', x:225.25, y:-20, scale:0.5515, rotate:0, z:10, conf:'high' },
    "chawan.empty__rinse": { part:'chawan_02_empty.png', x:80.5, y:517.82, scale:0.5032, rotate:-40, z:40, conf:'high' },
    "natsume.closed__n10": { part:'natsume_02.png', x:883.5, y:470.5, scale:0.4657, rotate:0, z:30, conf:'high' },
    "mizusashi.closed__n51": { part:'mizusashi_01.png', x:829.5, y:176, scale:0.6012, rotate:0, z:20, conf:'high' },
    "chawan.empty__rinse38": { part:'chawan_02_empty.png', x:112.5, y:517.82, scale:0.5072, rotate:-37, z:40, conf:'medium' },
    /* 2026-07-03 追加：帛紗＋両手（n6,7,9,11,42の原本フォールバック解消）と一服ヒーローショット（n34）。
     * fukusa_hands.cleaning は n9/img11・n11/img13・n42/img44 の3カットで原本の帛紗+手の位置を
     * オレンジ色ピクセルの座標抽出で実測した結果、3カットとも完全同一の位置・スケールだったため
     * 単一ポーズを共通使用（帛紗さばきは静止画のため、動きの表現は不可）。 */
    "fukusa_hands.cleaning": { part:'fukusa_hands_01.png', x:352.7, y:376.0, scale:0.602, rotate:0, z:60, conf:'medium' },
    "chawan.finish_hero": { part:'chawan_05_finish.png', x:458.0, y:136.0, scale:0.591, rotate:0, z:45, conf:'medium' },
  },
  steps: [
    { n:1, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" } ] },
    { n:2, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" } ] },
    { n:3, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup" }, { key:'natsume', pose:"natsume.closed" } ] },
    { n:4, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup" }, { key:'natsume', pose:"natsume.closed" }, { key:'kensui', pose:"kensui.combo" } ] },
    { n:5, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup" }, { key:'natsume', pose:"natsume.closed" }, { key:'kensui', pose:"kensui.base__n05" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    { n:6, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup" }, { key:'natsume', pose:"natsume.closed" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    { n:7, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup__n08" }, { key:'natsume', pose:"natsume.closed" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    { n:8, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup__n08" }, { key:'natsume', pose:"natsume.closed__n08" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    { n:9, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup__n08" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" }, { key:'fukusa', pose:"fukusa_hands.cleaning" } ] },
    { n:10, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup__n10" }, { key:'natsume', pose:"natsume.closed__n10" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    /* 2026-07-04 当主レビュー反映(n11)：茶碗内の茶杓(combo_setup系の絵柄に焼き込み)を chasen_only
     * （茶杓なし）に切替。ベッセル(茶碗)のin-placeクロスフェードにより「茶杓が取られるようにふわっと
     * 消える」演出になる。位置はcombo_setup__n10と実質同一(665,476.5→664.75,476.25)のため器自体は
     * 一切動かない。 */
    { n:11, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.chasen_only" }, { key:'natsume', pose:"natsume.closed__n10" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" }, { key:'fukusa', pose:"fukusa_hands.cleaning" } ] },
    { n:12, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.chasen_only" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    { n:13, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" }, { key:'chasen', pose:"chasen.standalone" } ] },
    { n:14, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" }, { key:'chasen', pose:"chasen.standalone" } ] },
    { n:15, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n15" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'hishaku', pose:"hishaku.kamae" } ] },
    { n:16, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n15" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'hishaku', pose:"hishaku.kamae" } ] },
    { n:17, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n15" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'hishaku', pose:"hishaku.kamae" } ] },
    { n:18, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n18" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'hishaku', pose:"hishaku.pouring" } ] },
    { n:19, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:20, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.chasen_only__n20" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:21, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n21" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone__n21" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:22, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n22" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:23, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__rinse" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:24, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.chakin_drape" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" } ] },
    { n:25, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:26, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.open_matcha" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'natsume_futa', pose:"natsume_futa.resting" } ] },
    { n:27, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.open_matcha__n27" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chashaku', pose:"chashaku.matcha_diag" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'natsume_futa', pose:"natsume_futa.resting" } ] },
    { n:28, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.open_matcha__n27" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chashaku', pose:"chashaku.empty_diag" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'natsume_futa', pose:"natsume_futa.resting" } ] },
    { n:29, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.empty__n14" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" } ] },
    { n:30, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.empty__n30" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    /* 2026-07-04 当主レビュー反映(n31)：水指の蓋(mizusashi_futa)がn30で立てかけた後この手で
     * 欠落していた（消えてはいけないタイミングで消えるバグ）。n32以降は既に維持されているため、
     * ここに追加してn30→n31→n32の連続性を保つ。 */
    { n:31, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.empty__n18" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'chasen', pose:"chasen.standalone" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" }, { key:'hishaku', pose:"hishaku.pouring" } ] },
    /* 2026-07-04 当主レビュー第4弾反映(n32「茶筅で点てる」作り直し)：
     * ①柄杓は「釜の上に置く」（置き柄杓＝furogama.hishaku_combo。蓋置の上ではない）。旧・
     *   単体レイヤーhishaku.oki（建水寄り）は撤去し、furogamaをfurogama.hishaku_comboへ。
     * ②茶碗(chawan)は一切切り替えない＝n31と同じchawan.empty__n18のまま静止。
     * ③棗の右のstandalone茶筅は消え、代わりにchasen_02.png（点てる姿勢）を茶碗の中の単独
     *   レイヤーとして追加（chasen.whisking_in_bowl）。震え(tremble)はこのレイヤーだけに適用
     *   される（MOTIONS[32]参照）。 */
    { n:32, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.empty__n18" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" }, { key:'chasen', pose:"chasen.whisking_in_bowl" } ] },
    /* n33: 当主レビュー第2弾で「非破壊スキップ」対象（コード側 SKIP_STEPS=[33] でナビゲーションから
     * 除外・データは温存）。n32と絵柄は同一のため、第4弾の新構成（furogama.hishaku_combo・
     * chasen.whisking_in_bowl・hishakuキーなし）もそのままn32と同じにしておく。 */
    { n:33, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.empty__n18" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" }, { key:'chasen', pose:"chasen.whisking_in_bowl" } ] },
    /* 2026-07-05 当主レビュー第5弾：「この手(n34)で水指が変わってしまっている」バグ修正。
     * 旧値はmizusashiがmizusashi.closed（蓋が閉じた絵）になっており、n32/n33のmizusashi.open
     * （蓋が開いた本体）から突然切り替わって見えていた。この手で必要な動きは「茶筅が元の位置へ
     * 戻る→茶碗が登場する」の2点のみで水指は一切関与しないため、mizusashiはn32/n33と同一の
     * mizusashi.openに統一。あわせて、n32/n33で登場している水指の蓋(mizusashi_futa.leaning＝
     * 立てかけた開いた蓋)がn34のpartsに存在せず消えてしまっていた欠落も併せて修正（本体だけ
     * 元に戻して蓋が消えたままでは結局「水指の見え方が変わる」ため）。 */
    { n:34, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.hishaku_combo" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'chasen', pose:"chasen.standalone" }, { key:'chawan', pose:"chawan.finish_hero" } ] },
    { n:35, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.empty__n18" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'hishaku', pose:"hishaku.pouring" } ] },
    { n:36, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.chasen_only__n36" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    { n:37, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.chasen_only__n37" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    { n:38, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.empty__rinse38" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'chakin', pose:"chakin.on_kamabuta" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" }, { key:'chasen', pose:"chasen.standalone" } ] },
    { n:39, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.chakin_drape" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" } ] },
    { n:40, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.chakin_drape__n40" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    { n:41, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.chasen_only__n41" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    { n:42, fallback:false, confidence:'medium', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'fukusa', pose:"fukusa_hands.cleaning" } ] },
    { n:43, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.combo_setup__n43" }, { key:'natsume', pose:"natsume.combo_chashaku" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    { n:44, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.combo_setup__n44" }, { key:'natsume', pose:"natsume.combo_chashaku__n44" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'mizusashi_futa', pose:"mizusashi_futa.leaning" } ] },
    { n:45, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.combo_setup__n45" }, { key:'natsume', pose:"natsume.combo_chashaku__n45" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" } ] },
    { n:46, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.combo_setup__n45" }, { key:'natsume', pose:"natsume.combo_chashaku__n45" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" } ] },
    { n:47, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.open" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.combo_setup__n45" }, { key:'natsume', pose:"natsume.combo_chashaku__n45" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'kamabuta', pose:"kamabuta.on_futaoki" }, { key:'hishaku', pose:"hishaku.kamae" } ] },
    { n:48, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.open" }, { key:'chawan', pose:"chawan.combo_setup__n45" }, { key:'natsume', pose:"natsume.combo_chashaku__n45" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.kamae" } ] },
    { n:49, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup__n49" }, { key:'natsume', pose:"natsume.combo_chashaku__n45" }, { key:'kensui', pose:"kensui.base__n43" }, { key:'futaoki', pose:"futaoki.base" }, { key:'hishaku', pose:"hishaku.resting" } ] },
    { n:50, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed" }, { key:'chawan', pose:"chawan.combo_setup__n49" }, { key:'natsume', pose:"natsume.combo_chashaku__n45" } ] },
    { n:51, fallback:false, confidence:'high', parts:[ { key:'furogama', pose:"furogama.closed" }, { key:'mizusashi', pose:"mizusashi.closed__n51" } ] },
  ]
};
