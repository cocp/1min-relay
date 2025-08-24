import { createMiddleware } from "hono/factory";
import { HonoEnv } from "../types/hono";
import { AuthenticationError } from "../utils/errors";

export const authMiddleware = createMiddleware<HonoEnv>(async (c, next) => {
  const apiKey = c.req.header("Authorization")?.replace("Bearer ", "");

  if (!apiKey) {
    throw new AuthenticationError("API key is required");
  }

  // Validate against AUTH_TOKEN if configured
  if (c.env.AUTH_TOKEN && apiKey !== c.env.AUTH_TOKEN) {
    throw new AuthenticationError("Invalid API key");
  }

  c.set("apiKey", apiKey);
  await next();
});
