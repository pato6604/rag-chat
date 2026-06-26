require("./sandbox-fs-patch.cjs");

const path = require("path");
const { startServer } = require("../node_modules/next/dist/server/lib/start-server");

const preload = path.join(__dirname, "sandbox-fs-patch.cjs").replace(/\\/g, "/");
const existingNodeOptions = process.env.NODE_OPTIONS || "";
process.env.NODE_OPTIONS = `--require "${preload}" --preserve-symlinks --preserve-symlinks-main ${existingNodeOptions}`.trim();
process.env.__NEXT_DEV_SERVER = "1";
process.env.NEXT_PRIVATE_WORKER = "1";
delete process.env.TURBOPACK;

startServer({
  dir: path.join(__dirname, ".."),
  port: 3000,
  allowRetry: false,
  isDev: true,
  hostname: "localhost",
  serverFastRefresh: true,
}).catch((error) => {
  console.error(error);
  process.exit(1);
});
