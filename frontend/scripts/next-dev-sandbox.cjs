require("./sandbox-fs-patch.cjs");

const path = require("path");
const preload = path.join(__dirname, "sandbox-fs-patch.cjs").replace(/\\/g, "/");
const existingNodeOptions = process.env.NODE_OPTIONS || "";
const requiredNodeOptions = `--require "${preload}" --preserve-symlinks --preserve-symlinks-main`;
process.env.NODE_OPTIONS = `${requiredNodeOptions} ${existingNodeOptions}`.trim();

process.argv = ["node", "next", "dev", "-p", "3000", "--webpack"];
require("../node_modules/next/dist/bin/next");
