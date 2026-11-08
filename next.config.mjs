import { readFileSync } from "node:fs";

// Warn (don't fail) when content/site.ts or content/legal.ts still has [PLACEHOLDER] values,
// so nothing unfinished slips onto the live site unnoticed.
try {
  if (!process.env.WEMAKEIT_PLACEHOLDERS_CHECKED) {
    process.env.WEMAKEIT_PLACEHOLDERS_CHECKED = "1"; // build workers inherit this, so the warning prints once
    const src = ["site.ts", "legal.ts"].map((f) => readFileSync(new URL(`./content/${f}`, import.meta.url), "utf8")).join("\n");
    const found = new Set();
    for (const line of src.split("\n")) {
      if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;
      const code = line.replace(/\s\/\/.*$/, "");
      // only text inside "quotes" or `backticks` counts, so code like [A, ...B] is ignored
      for (const str of code.matchAll(/"([^"\\]*)"|`([^`\\]*)`/g)) {
        for (const m of (str[1] ?? str[2]).matchAll(/\[[A-Z][^\]]*\]/g)) found.add(m[0]);
      }
    }
    if (found.size) {
      console.warn(`\n⚠  content/ still has ${found.size} placeholder(s) to fill:\n   ${[...found].join("\n   ")}\n`);
    }
  }
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
