import { z } from "zod";

const envSchema = z.object({
  DATABASE_URL: z.string().url(),
  JWT_SECRET: z.string().min(32),
  VITE_APP_ID: z.string(),
  OAUTH_SERVER_URL: z.string().url(),
  VITE_OAUTH_PORTAL_URL: z.string().url(),
  OWNER_OPEN_ID: z.string(),
  OWNER_NAME: z.string(),
  BUILT_IN_FORGE_API_URL: z.string().url(),
  BUILT_IN_FORGE_API_KEY: z.string(),
  VITE_FRONTEND_FORGE_API_URL: z.string().url(),
  VITE_FRONTEND_FORGE_API_KEY: z.string(),
  VITE_ANALYTICS_ENDPOINT: z.string().optional(),
  VITE_ANALYTICS_WEBSITE_ID: z.string().optional(),
});

export const ENV = envSchema.parse(process.env);
