require("./sandbox-fs-patch.cjs");

const path = require("path");
const { hasNecessaryDependencies } = require("../node_modules/next/dist/lib/has-necessary-dependencies");

const deps = hasNecessaryDependencies(process.cwd(), [
  { file: "typescript/lib/typescript.js", pkg: "typescript", exportsRestrict: true },
  { file: "@types/react/index.d.ts", pkg: "@types/react", exportsRestrict: true },
  { file: "@types/node/index.d.ts", pkg: "@types/node", exportsRestrict: true },
]);

console.log(JSON.stringify({
  missing: deps.missing,
  resolved: Array.from(deps.resolved.entries()).map(([key, value]) => [key, path.relative(process.cwd(), value)]),
}, null, 2));
