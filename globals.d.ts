// Lets TypeScript accept plain CSS imports like `import "./globals.css"`.
// Newer TypeScript versions (and VS Code's built-in one) flag them otherwise (error TS2882).
declare module "*.css";
