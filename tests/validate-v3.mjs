import { existsSync, readFileSync } from "node:fs";
import { dirname, join, relative, resolve } from "node:path";
import { fileURLToPath } from "node:url";
import vm from "node:vm";

const rootDir = resolve(dirname(fileURLToPath(import.meta.url)), "..");
const paths = {
  steps: join(rootDir, "data", "steps-v3.js"),
  placementsBase: join(rootDir, "data", "placements51.js"),
  placementsV3: join(rootDir, "data", "placements-v3.js"),
  html: join(rootDir, "temae-player-v3.html"),
  parts: join(rootDir, "parts"),
};

const errors = [];
const check = (condition, message) => {
  if (!condition) errors.push(message);
};
const displayPath = file => relative(rootDir, file) || ".";

const context = vm.createContext({ window: {} });
const evaluate = file => {
  const source = readFileSync(file, "utf8");
  vm.runInContext(source, context, { filename: displayPath(file) });
};

for (const file of [paths.steps, paths.placementsBase, paths.placementsV3, paths.html]) {
  check(existsSync(file), `対象ファイルがありません: ${displayPath(file)}`);
}

if (existsSync(paths.steps)) {
  try {
    evaluate(paths.steps);
  } catch (error) {
    errors.push(`steps-v3.js の評価に失敗: ${error.message}`);
  }
}

if (existsSync(paths.placementsBase) && existsSync(paths.placementsV3)) {
  try {
    evaluate(paths.placementsBase);
    evaluate(paths.placementsV3);
  } catch (error) {
    errors.push(`placements の評価に失敗: ${error.message}`);
  }
}

const stepsData = context.window.SADO_STEPS_V3;
const steps = stepsData && stepsData.steps;
const requiredStepFields = ["n", "phase", "te", "title", "text", "tools"];

check(stepsData && typeof stepsData === "object", "window.SADO_STEPS_V3 が定義されていません");
check(Array.isArray(steps), "SADO_STEPS_V3.steps が配列ではありません");

if (Array.isArray(steps)) {
  check(steps.length === 54, `steps は54件必要です（実際: ${steps.length}件）`);

  for (let index = 0; index < steps.length; index += 1) {
    const step = steps[index];
    const label = `steps[${index}]`;
    check(step && typeof step === "object", `${label} がオブジェクトではありません`);
    if (!step || typeof step !== "object") continue;

    check(step.n === index + 1, `${label}.n は ${index + 1} である必要があります（実際: ${step.n}）`);
    for (const field of requiredStepFields) {
      check(
        Object.prototype.hasOwnProperty.call(step, field),
        `第${step.n ?? index + 1}手に必須フィールド ${field} がありません`,
      );
    }

    check(Number.isInteger(step.n), `${label}.n は整数である必要があります`);
    for (const field of ["phase", "te", "title", "text"]) {
      check(
        typeof step[field] === "string" && step[field].length > 0,
        `第${step.n ?? index + 1}手の ${field} は空でない文字列である必要があります`,
      );
    }
    check(Array.isArray(step.tools), `第${step.n ?? index + 1}手の tools は配列である必要があります`);
  }
}

const placementsData = context.window.SADO_PLACEMENTS_V3;
const placements = placementsData && placementsData.steps;
const poses = placementsData && placementsData.poses;

check(
  placementsData && typeof placementsData === "object",
  "window.SADO_PLACEMENTS_V3 が定義されていません",
);
check(Array.isArray(placements), "SADO_PLACEMENTS_V3.steps が配列ではありません");
check(poses && typeof poses === "object" && !Array.isArray(poses), "SADO_PLACEMENTS_V3.poses がオブジェクトではありません");

const referencedPoseNames = new Set();
if (Array.isArray(placements)) {
  check(placements.length === 54, `placements は54件必要です（実際: ${placements.length}件）`);

  for (let index = 0; index < placements.length; index += 1) {
    const placement = placements[index];
    const label = `placements[${index}]`;
    check(placement && typeof placement === "object", `${label} がオブジェクトではありません`);
    if (!placement || typeof placement !== "object") continue;

    check(
      placement.n === index + 1,
      `${label}.n は ${index + 1} である必要があります（実際: ${placement.n}）`,
    );
    check(Array.isArray(placement.parts), `配置第${placement.n ?? index + 1}手の parts は配列である必要があります`);
    if (!Array.isArray(placement.parts)) continue;

    for (let partIndex = 0; partIndex < placement.parts.length; partIndex += 1) {
      const partRef = placement.parts[partIndex];
      const refLabel = `配置第${placement.n ?? index + 1}手 parts[${partIndex}]`;
      check(partRef && typeof partRef === "object", `${refLabel} がオブジェクトではありません`);
      if (!partRef || typeof partRef !== "object") continue;

      check(
        typeof partRef.pose === "string" && partRef.pose.length > 0,
        `${refLabel}.pose は空でない文字列である必要があります`,
      );
      if (typeof partRef.pose !== "string" || partRef.pose.length === 0) continue;

      referencedPoseNames.add(partRef.pose);
      check(
        poses && Object.prototype.hasOwnProperty.call(poses, partRef.pose),
        `${refLabel} が未定義poseを参照しています: ${partRef.pose}`,
      );
    }
  }
}

const partFiles = new Set();
if (poses && typeof poses === "object" && !Array.isArray(poses)) {
  for (const [poseName, pose] of Object.entries(poses)) {
    check(pose && typeof pose === "object", `pose ${poseName} がオブジェクトではありません`);
    if (!pose || typeof pose !== "object") continue;

    check(
      typeof pose.part === "string" && pose.part.length > 0,
      `pose ${poseName} の part は空でない文字列である必要があります`,
    );
    if (typeof pose.part !== "string" || pose.part.length === 0) continue;

    partFiles.add(pose.part);
    check(existsSync(join(paths.parts, pose.part)), `partファイルがありません: parts/${pose.part}（pose: ${poseName}）`);
  }
}

let scriptSources = [];
if (existsSync(paths.html)) {
  try {
    const html = readFileSync(paths.html, "utf8");
    scriptSources = Array.from(
      html.matchAll(/<script\b[^>]*\bsrc\s*=\s*(["'])(.*?)\1[^>]*>/gi),
      match => match[2].split(/[?#]/, 1)[0].replace(/^\.\//, ""),
    );

    const countSource = expected => scriptSources.filter(source => source === expected).length;
    check(countSource("data/steps-v3.js") === 1, "HTMLは data/steps-v3.js を1回参照する必要があります");
    check(countSource("data/placements-v3.js") === 1, "HTMLは data/placements-v3.js を1回参照する必要があります");
    check(countSource("data/placements51.js") === 1, "HTMLは基礎 data/placements51.js を1回参照する必要があります");

    const baseIndex = scriptSources.indexOf("data/placements51.js");
    const v3Index = scriptSources.indexOf("data/placements-v3.js");
    check(
      baseIndex !== -1 && v3Index !== -1 && baseIndex < v3Index,
      "HTMLでは data/placements51.js を data/placements-v3.js より先に読み込む必要があります",
    );

    const disallowedV2Sources = scriptSources.filter(source => {
      if (source === "data/placements51.js") return false;
      return source === "data/steps.js" || /(?:^|\/)[^/]*v2[^/]*\.(?:js|html)$/i.test(source);
    });
    check(
      disallowedV2Sources.length === 0,
      `HTMLが許可されていないv2ファイルを参照しています: ${disallowedV2Sources.join(", ")}`,
    );
  } catch (error) {
    errors.push(`temae-player-v3.html の検査に失敗: ${error.message}`);
  }
}

if (errors.length > 0) {
  console.error(`v3 validation failed (${errors.length} error${errors.length === 1 ? "" : "s"})`);
  for (const error of errors) console.error(`- ${error}`);
  process.exitCode = 1;
} else {
  console.log("v3 validation passed");
  console.log(`- steps: ${steps.length} (n=1..54, required fields OK)`);
  console.log(`- placements: ${placements.length} (n=1..54)`);
  console.log(`- poses: ${Object.keys(poses).length} defined, ${referencedPoseNames.size} referenced`);
  console.log(`- part files: ${partFiles.size} unique files found`);
  console.log(`- HTML scripts: ${scriptSources.join(", ")}`);
}
