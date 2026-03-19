import app from "./app.js";
import http from "http";

const server = http.createServer(app);

/**
 * Smart Port Discovery
 * 1. Try process.env.PORT or 5000 first.
 * 2. If busy, try 6000.
 * 3. If still busy, try next sequential port.
 */
const startServer = (portArg) => {
  const p = Number(portArg);
  server
    .listen(p)
    .on("listening", () => {
      console.log(`🚀 Local server running at: http://localhost:${p}`);
    })
    .on("error", (err) => {
      if (err.code === "EADDRINUSE") {
        let nextPort;
        if (p === 7000) {
          nextPort = 8000;
        } else {
          nextPort = p + 1;
        }
        console.warn(`⚠️  Port ${p} is busy, trying ${nextPort}...`);
        startServer(nextPort);
      } else {
        console.error("❌ Server failed to start:", err);
        process.exit(1);
      }
    });
};

// Start server only in local environment
if (!process.env.VERCEL) {
  const initialPort = process.env.PORT || 7000;
  startServer(initialPort);
}

export default app;
