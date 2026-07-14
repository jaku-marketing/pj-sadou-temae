/*
 * v4 文言評価用サンプル（V4_COPY_DESIGN.md / V4_WORDING.md 準拠）
 * 表示専用データ。画像・モーション・既存プレイヤーから独立して扱う。
 */
(function (root) {
  "use strict";

  const samples = [
    {
      id: "step-5",
      step: 5,
      phase: "清め / 据える",
      title: "蓋置を据え、柄杓を構える",
      body: "左手で柄杓を少し上げ、右手で建水から蓋置を取り出す。柄杓をいったん建水へ戻し、蓋置を風炉の左へ据える。柄杓を持ち直し、蓋置へ引いて構える。",
      keyPoint: "柄杓を上げる、蓋置を出す、柄杓を戻す、蓋置を据える、柄杓を構える、の順を崩さない。",
      heart: "二つの道具を同時に急いで扱わず、一手ずつ置きどころを定めることで、点前の場を整える。",
      teacher: "柄杓と蓋置は、一つずつ順番に。急がなくて大丈夫ですよ。",
      women: "左手で柄杓を上げ、右手で蓋置を出す。男点前とは扱いが異なる。",
      caution: "",
      terms: [
        { name: "蓋置", reading: "ふたおき", definition: "釜の蓋や柄杓を受ける道具" }
      ],
      pictograms: [
        { icon: "手", target: "左手", action: "柄杓を上げる" },
        { icon: "手", target: "右手", action: "蓋置を出す" },
        { icon: "位置", target: "風炉の左", action: "据える" }
      ],
      tidbit: null
    },
    {
      id: "step-20",
      step: 20,
      phase: "点て / 茶筅通し",
      title: "茶筅通しをする",
      body: "茶筅を取り、茶碗の湯の中で茶筅通しをして、穂先の状態を確かめる。",
      keyPoint: "穂先の動きを目で追い、乱れや傷みがないかを確かめる。",
      heart: "茶を点てる前に道具の状態を確かめることも、一服を客へ出すための支度になる。",
      teacher: "穂先をよく見て。点てる前の小さな確認が、きれいな一服につながります。",
      women: "",
      caution: "穂先へ無理な力を加えない。",
      terms: [
        { name: "茶筅通し", reading: "ちゃせんとおし", definition: "湯の中で茶筅を清め、穂先を確かめる所作" }
      ],
      pictograms: [
        { icon: "道具", target: "茶筅", action: "取る" },
        { icon: "移動", target: "湯の中", action: "茶筅通し" },
        { icon: "確認", target: "穂先", action: "状態を確かめる" }
      ],
      tidbit: {
        title: "高山茶筌、五百年の手仕事",
        text: "奈良県生駒市高山は茶筌の産地として知られる。竹を細く割り、穂を作る工程には熟練の手仕事が受け継がれている。"
      }
    },
    {
      id: "step-33",
      step: 33,
      phase: "点て / 出す",
      title: "茶碗を客へ出す",
      body: "点てた茶碗を取り、反時計回りに二度回して正面を客へ向け、定座へ出す。",
      keyPoint: "二度回したあと、茶碗の正面が客へ向いていることを確かめる。",
      heart: "点て上がりで動きを止めず、客が受け取りやすい向きと位置まで整えて一服を届ける。",
      teacher: "茶碗の正面が客へ向いたら、そこで一服が届きます。",
      women: "斜め客付へ膝を回し、茶碗の正面を客へ向けて出す。",
      caution: "",
      terms: [
        { name: "定座", reading: "じょうざ", definition: "茶碗を客へ出す、点前上の定められた位置" }
      ],
      pictograms: [
        { icon: "移動", target: "茶碗", action: "反時計回りに二度" },
        { icon: "確認", target: "正面", action: "客へ向ける" },
        { icon: "位置", target: "定座", action: "出す" }
      ],
      tidbit: {
        title: "茶碗の正面と、主客の向き",
        text: "亭主は茶碗の正面を客へ向けて出す。客は正面を避けていただき、互いに道具を敬う扱いへつながる。"
      }
    },
    {
      id: "step-44",
      step: 44,
      phase: "仕舞い / 茶杓を仕舞う",
      title: "建水を下げ、茶杓を清める",
      body: "左手で建水を下げる。女点前では、茶杓を取る前に建水を下げる。続けて帛紗を捌き、茶杓を取って清める。",
      keyPoint: "",
      heart: "",
      teacher: "仕舞いでは、道具を戻す順序そのものが美しく見えます。",
      women: "",
      caution: "",
      terms: [
        { name: "建水", reading: "けんすい", definition: "使い終えた湯や水を受ける器" },
        { name: "帛紗", reading: "ふくさ", definition: "点前で道具を清めるために用いる布" },
        { name: "茶杓", reading: "ちゃしゃく", definition: "抹茶をすくう竹の匙" }
      ],
      pictograms: [],
      tidbit: {
        title: "茶杓の銘という文化",
        text: "茶杓には、茶会の趣向や季節に寄せた銘が付けられることがある。小さな道具にも席の物語が託される。"
      }
    },
    {
      id: "step-2",
      step: 2,
      phase: "清め / 運び出し",
      title: "水指を運び、定座へ据える",
      body: "水指を両手で持ち、左足から席入りする。畳一枚を六歩で進み、風炉の右横の定座へ据える。",
      keyPoint: "水指を傾けず、歩幅と運ぶ速さをそろえる。",
      heart: "水を満たした道具の重さを見せずに運ぶ静けさが、客を迎える場を落ち着かせる。",
      teacher: "水指は両手で。歩幅をそろえると、自然に美しく見えますよ。",
      women: "",
      caution: "水指を傾けず、置く直前まで両手で安定させる。",
      terms: [
        { name: "水指", reading: "みずさし", definition: "点前で使う水を蓄えておく器" },
        { name: "定座", reading: "じょうざ", definition: "道具を置く定められた位置" }
      ],
      pictograms: [
        { icon: "手", target: "水指", action: "両手で持つ" },
        { icon: "移動", target: "足運び", action: "左足から六歩" },
        { icon: "位置", target: "風炉の右横", action: "据える" }
      ],
      tidbit: {
        title: "運び点前は基本の形",
        text: "棚を使わず、必要な道具を席へ運び出して行う点前を運び点前という。道具を運ぶ所作も点前の一部になる。"
      }
    },
    {
      id: "step-6",
      step: 6,
      phase: "清め / 運び出し納め",
      title: "客と総礼をする",
      body: "建水を膝頭の線あたりまで進め、居ずまいを整える。客と向き合い、総礼をする。",
      keyPoint: "建水を進めてから姿勢を整え、亭主と客の礼がそろう間を確かめる。",
      heart: "点前の始まりを主客で確かめる礼。互いに向き合う一呼吸が、席の時間をひとつにつなぐ。",
      teacher: "礼は形だけではありません。客と始まりを合わせる一呼吸です。",
      women: "",
      caution: "",
      terms: [
        { name: "総礼", reading: "そうれい", definition: "席の区切りに亭主と客がそろって行う礼" }
      ],
      pictograms: [
        { icon: "移動", target: "建水", action: "膝頭の線まで進める" },
        { icon: "確認", target: "居ずまい", action: "整える" },
        { icon: "発話", target: "亭主と客", action: "礼を交わす" }
      ],
      tidbit: null
    },
    {
      id: "step-9",
      step: 9,
      phase: "清め / 棗",
      title: "帛紗で棗を清める",
      body: "帛紗を捌き、棗の蓋の上を拭き清める。清め終えたら、次の所作へ移る。",
      keyPoint: "棗を安定させ、帛紗が蓋の上を通る動きと、清め終えた位置を確かめる。",
      heart: "客前で道具を清める所作は、これから用いる道具を大切に扱う姿勢を目に見える形にする。",
      teacher: "帛紗の動きを急がずに。棗を大切に扱う気持ちが伝わります。",
      women: "",
      caution: "棗の蓋をずらしたり、表面を強くこすったりしない。",
      terms: [
        { name: "帛紗", reading: "ふくさ", definition: "点前で道具を清めるために用いる布" },
        { name: "棗", reading: "なつめ", definition: "薄茶に用いる代表的な茶器" }
      ],
      pictograms: [
        { icon: "手", target: "帛紗", action: "捌く" },
        { icon: "道具", target: "棗の蓋", action: "上を清める" },
        { icon: "確認", target: "棗", action: "位置を確かめる" }
      ],
      tidbit: {
        title: "清めは客前で行う",
        text: "帛紗による清めは、単に汚れを取る作業ではなく、道具を扱う亭主の所作として客の前で行われる。"
      }
    },
    {
      id: "step-28",
      step: 28,
      phase: "点て / 茶を入れる",
      title: "抹茶を入れ、三の字に均す",
      body: "茶杓で抹茶を茶碗へ入れ、茶碗の中で三の字に均す。分量は一杓半ほどを目安とする。",
      keyPoint: "抹茶を入れたあと、茶杓の先で三の字を描く動きを確かめる。",
      heart: "抹茶を均して次の湯を迎える。小さなひと手間が、点てる前の状態を整える。",
      teacher: "一杓半は目安です。三の字に整えたら、湯を迎える準備はできています。",
      women: "",
      caution: "分量は目安。稽古先の指導と茶碗・抹茶の状態に従う。",
      terms: [
        { name: "一杓半", reading: "いっしゃくはん", definition: "茶杓一杯と半分ほどを示す分量の目安" },
        { name: "三の字", reading: "さんのじ", definition: "茶碗の中の抹茶を茶杓で三の形に均す所作" }
      ],
      pictograms: [
        { icon: "道具", target: "茶杓", action: "抹茶をすくう" },
        { icon: "位置", target: "茶碗", action: "抹茶を入れる" },
        { icon: "移動", target: "抹茶", action: "三の字に均す" }
      ],
      tidbit: null
    },
    {
      id: "step-36",
      step: 36,
      phase: "点て / お仕舞い",
      title: "お仕舞いの挨拶をする",
      body: "正客が「どうぞお仕舞いください」と述べる。亭主はその言葉を受け、茶碗を膝前に置いて「お仕舞いにいたします」と答え、礼をする。",
      keyPoint: "正客の言葉、亭主の応答、亭主の礼という主客の順を確かめる。",
      heart: "客の言葉を受けて点てる所作を結ぶ。主客の応答が、仕舞いへ移る区切りをつくる。",
      teacher: "正客の言葉を受けてから答えます。ここで仕舞いへ気持ちを切り替えましょう。",
      women: "",
      caution: "",
      terms: [
        { name: "正客", reading: "しょうきゃく", definition: "客を代表し、亭主との応答を担う客" },
        { name: "亭主", reading: "ていしゅ", definition: "茶席を設け、客をもてなす側" }
      ],
      pictograms: [
        { icon: "発話", target: "正客", action: "仕舞いを請う" },
        { icon: "位置", target: "亭主・茶碗", action: "膝前に置く" },
        { icon: "発話", target: "亭主", action: "応えて礼をする" }
      ],
      tidbit: null
    },
    {
      id: "step-51",
      step: 51,
      phase: "仕舞い / 水指を仕舞う",
      title: "柄杓を引き、水指を閉める",
      body: "柄杓を蓋置へ引く。柄杓が据わったことを確かめてから、水指の蓋を開けたときと逆の三手で閉める。",
      keyPoint: "柄杓を引く所作と水指を閉める所作を混ぜず、一方を納めてから次へ移る。",
      heart: "複数の道具を順に納めることで、仕舞いの流れを明確にし、席の終わりへ静かにつなぐ。",
      teacher: "柄杓を納めてから水指へ。二つの所作を混ぜないのがきれいです。",
      women: "",
      caution: "塗蓋を傷めないように扱う。三手の細部は教本や社中の指導に従う。",
      terms: [
        { name: "逆の三手", reading: "ぎゃくのみつで", definition: "水指の蓋を開けたときの扱いを逆順にたどって閉めること。細部は稽古先の指導に従う" },
        { name: "引き柄杓", reading: "ひきびしゃく", definition: "柄杓を蓋置へ引いて納めた構え" }
      ],
      pictograms: [
        { icon: "移動", target: "柄杓", action: "蓋置へ引く" },
        { icon: "確認", target: "柄杓", action: "据わりを確かめる" },
        { icon: "位置", target: "水指の蓋", action: "逆の三手で閉める" }
      ],
      tidbit: null
    }
  ];

  root.V4_COPY_SAMPLES = samples;
})(typeof globalThis !== "undefined" ? globalThis : this);
