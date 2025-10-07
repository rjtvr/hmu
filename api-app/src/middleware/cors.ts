import type { FastifyInstance } from "fastify";

/**
 * Configures CORS on the provided Fastify instance.
 *
 * Registers the Fastify CORS plugin with rules that allow requests with no origin, permit origins for localhost and 127.0.0.1 on ports 3000 and 5173, and enable credentials support. Requests from origins not in the allowed list are rejected by the plugin.
 */
export function setupCors(fastify: FastifyInstance): void {
  fastify.register(import("@fastify/cors"), {
    origin: (origin, callback) => {
      // Allow requests with no origin (mobile apps, curl, etc.)
      if (!origin) return callback(null, true);
      
      // In production, you should validate against your allowed origins
      const allowedOrigins = [
        "http://localhost:3000",
        "http://localhost:5173",
        "http://127.0.0.1:3000",
        "http://127.0.0.1:5173",
      ];
      
      if (allowedOrigins.includes(origin)) {
        return callback(null, true);
      }
      
      return callback(new Error("Not allowed by CORS"), false);
    },
    credentials: true,
  });
}