import { readFileSync } from "node:fs";

// Warn (don't fail) when content/site.ts still has [PLACEHOLDER] values,
// so nothing unfinished slips onto the live site unnoticed.
try {
  const src = readFileSync(new URL("./content/site.ts", import.meta.url), "utf8");
  const found = new Set();
  for (const line of src.split("\n")) {
    if (line.trim().startsWith("//") || line.trim().startsWith("*")) continue;
    const code = line.replace(/\/\/.*$/, "");
    for (const m of code.matchAll(/\[[A-Z][A-Z0-9 ,.%'\-]*[^\]]*\]/g)) found.add(m[0]);
  }
  if (found.size) {
    console.warn(`\n⚠  content/site.ts still has ${found.size} placeholder(s) to fill:\n   ${[...found].join("\n   ")}\n`);
  }
} catch {}

/** @type {import('next').NextConfig} */
const nextConfig = {
  poweredByHeader: false,
  images: { formats: ["image/avif", "image/webp"] },
};
export default nextConfig;
