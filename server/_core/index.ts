import express from "express";
import { createHTTPServer } from "@trpc/server/adapters/standalone";
import { appRouter } from "../routers";
import { createContext } from "./context";

const app = express();

app.use(express.json());

// Create tRPC HTTP server
const trpcServer = createHTTPServer({
  router: appRouter,
  createContext,
});

// Mount tRPC routes
app.use("/api/trpc", trpcServer);

// Health check
app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
