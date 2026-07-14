/* お稽古プレイヤー v3 配置レイヤー
 * v2 の SADO_PLACEMENTS は変更せず、既存poseを再利用して54手へ組み替える。
 */
(function(){
  "use strict";

  const BASE = window.SADO_PLACEMENTS || { poses:{}, steps:[] };
  const BASE_BY_N = {};
  (BASE.steps || []).forEach(step => { BASE_BY_N[step.n] = step; });

  const cloneParts = parts => (parts || []).map(part => ({...part}));
  const fromBase = (sourceN, targetN, replace) => {
    const source = BASE_BY_N[sourceN];
    if(!source) throw new Error(`placements-v3: base step ${sourceN} is missing`);
    let parts = cloneParts(source.parts);
    if(replace){
      Object.keys(replace).forEach(key => {
        const pose = replace[key];
        parts = parts.filter(part => part.key !== key);
        if(pose) parts.push({ key, pose });
      });
    }
    return { ...source, n:targetN, parts };
  };

  const poses = {
    ...(BASE.poses || {}),

    /* v3 第32手：v2より37px上げ、穂先が茶碗内に入りつつ柄が立ち上がって見える位置。 */
    "chasen.whisking_in_bowl_v3": {
      ...(BASE.poses && BASE.poses["chasen.whisking_in_bowl"]),
      y:548,
      conf:"medium"
    },
    "hishaku.pouring_to_kama_v3": {
      part:"hishaku_02_mizu.png",
      x:300,
      y:-30,
      scale:0.6,
      rotate:-15,
      z:16,
      conf:"low"
    }
  };

  const steps = [];

  /* 第1〜31手はv2の配置をそのまま引き継ぐ。 */
  for(let n=1; n<=31; n++) steps.push(fromBase(n, n));

  /* 第32手：茶筅だけv3専用poseへ差し替える。 */
  steps.push(fromBase(32, 32, { chasen:"chasen.whisking_in_bowl_v3" }));

  /* 第33手：v2の点て上がり（旧データn34）を連番へ詰める。 */
  steps.push(fromBase(34, 33));

  /* 次服の支度〜お仕舞い。 */
  steps.push(fromBase(35, 34, {
    mizusashi_futa:"mizusashi_futa.leaning",
    chasen:"chasen.standalone"
  }));                                                       // 返った茶碗へ湯
  steps.push(fromBase(38, 35));                              // すすぎ・温めて建水へ
  steps.push(fromBase(38, 36, { chawan:"chawan.empty__n14" })); // 挨拶は膝前の通常位置
  steps.push(fromBase(35, 37, {
    mizusashi_futa:"mizusashi_futa.leaning",
    chasen:"chasen.standalone"
  }));                                                       // 水指の水を茶碗へ
  steps.push(fromBase(32, 38, { chasen:"chasen.whisking_in_bowl_v3" })); // 茶筅すすぎ
  steps.push(fromBase(32, 39, { chasen:"chasen.standalone" }));          // 穂先を改めて戻す

  /* 茶碗を仕組み、中仕舞いへ。 */
  steps.push(fromBase(38, 40));
  steps.push(fromBase(39, 41, { mizusashi_futa:"mizusashi_futa.leaning" }));
  steps.push(fromBase(40, 42));
  steps.push(fromBase(41, 43));
  steps.push(fromBase(42, 44));
  steps.push(fromBase(43, 45));
  steps.push(fromBase(44, 46));
  steps.push(fromBase(45, 47, { mizusashi_futa:"mizusashi_futa.leaning" }));

  /* 釜・水指を仕舞い、三回に分けて持ち帰る。 */
  steps.push(fromBase(46, 48, {
    mizusashi_futa:"mizusashi_futa.leaning",
    hishaku:"hishaku.pouring_to_kama_v3"
  }));
  steps.push(fromBase(47, 49, { mizusashi_futa:"mizusashi_futa.leaning" }));
  steps.push(fromBase(48, 50, { mizusashi_futa:"mizusashi_futa.leaning" }));
  steps.push(fromBase(49, 51));
  steps.push(fromBase(50, 52));
  steps.push(fromBase(51, 53));
  steps.push(fromBase(1,  54));                              // 水指を持ち帰った後

  window.SADO_PLACEMENTS_V3 = { poses, steps };
})();
