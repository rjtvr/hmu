import type { FastifyInstance } from "fastify";

/**
 * CORS middleware configuration
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
