// Renders ad.html frame-by-frame with Playwright.
// Usage: node render.mjs <outDir> [fps=30] [--stills t1,t2,...]
import { createRequire } from "module";
import path from "path";
import fs from "fs";
const require = createRequire(import.meta.url);
const pwPath = process.env.PLAYWRIGHT_PATH || "playwright";
const { chromium } = require(pwPath);

const here = path.dirname(new URL(import.meta.url).pathname);
const out = process.argv[2];
const fps = Number(process.argv[3] || 30);
const stillsArg = process.argv.indexOf("--stills");
fs.mkdirSync(out, { recursive: true });

const browser = await chromium.launch({ executablePath: process.env.CHROME_PATH || undefined });
const page = await browser.newPage({ viewport: { width: 1080, height: 1920 }, deviceScaleFactor: 1 });
await page.goto("file://" + path.join(here, "ad.html"));
await page.evaluate(() => window.ready);
await page.waitForTimeout(300);

const times = stillsArg > 0
  ? process.argv[stillsArg + 1].split(",").map(Number)
  : Array.from({ length: Math.round(20 * fps) }, (_, i) => i / fps);

for (let i = 0; i < times.length; i++) {
  await page.evaluate((t) => window.renderAt(t), times[i]);
  const name = stillsArg > 0 ? `still_${String(times[i]).replace(".", "_")}.png` : `f${String(i).padStart(4, "0")}.png`;
  await page.screenshot({ path: path.join(out, name), type: "png" });
  if (i % 60 === 0) process.stdout.write(`${i}/${times.length}\n`);
}
await browser.close();
