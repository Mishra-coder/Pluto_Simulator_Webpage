import express from "express";
import http from "node:http";
import path from "node:path";
import { fileURLToPath } from "node:url";

/* One Express server for both modes:
   - dev  (npm run dev):   Vite runs inside Express as middleware, with hot reload on the same port
   - prod (npm start):     serves the built files from dist/ (run npm run build first)
   Installers in downloads/ are served by Express in both modes, so they never get copied into the build. */
const root = path.dirname(fileURLToPath(import.meta.url));
const isProd = process.env.NODE_ENV === "production";
const port = Number(process.env.PORT) || 3055;

const app = express();
const server = http.createServer(app);

app.use("/downloads", express.static(path.join(root, "downloads"), {
  setHeaders: (res) => res.setHeader("Content-Disposition", "attachment"),
}));

if (isProd) {
  const dist = path.join(root, "dist");
  app.use(express.static(dist, { index: false }));
  app.get("*", (_req, res) => res.sendFile(path.join(dist, "index.html")));
} else {
  const { createServer } = await import("vite");
  const vite = await createServer({ root, server: { middlewareMode: true, hmr: { server } }, appType: "spa" });
  app.use(vite.middlewares);
}

server.on("error", (err) => {
  if (err.code !== "EADDRINUSE") throw err;
  console.error(`Port ${port} is already in use (another dev server still running?).\n` +
    `Stop it, or pick another port: PORT=3056 npm run dev`);
  process.exit(1);
});

server.listen(port, () => {
  console.log(`PlutoSim ${isProd ? "production" : "dev"} server: http://localhost:${port}`);
});
