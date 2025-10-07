import type { FastifyInstance } from "fastify";
import type { HealthResponse } from "../types.js";

/**
 * Registers health check routes on the provided Fastify instance.
 *
 * Registers:
 * - GET /health: returns basic status, timestamp, and uptime.
 * - GET /health/detailed: returns status, timestamp, uptime, memory usage (in MB), Node.js version, and platform.
 *
 * @param fastify - Fastify instance to register the routes on
 */
export async function healthRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /health - Health check endpoint
  fastify.get("/health", async (): Promise<HealthResponse> => {
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
    };
  });

  // GET /health/detailed - Detailed health check
  fastify.get("/health/detailed", async (): Promise<any> => {
    const memoryUsage = process.memoryUsage();
    
    return {
      status: "ok",
      timestamp: new Date().toISOString(),
      uptime: process.uptime(),
      memory: {
        rss: `${Math.round(memoryUsage.rss / 1024 / 1024)} MB`,
        heapTotal: `${Math.round(memoryUsage.heapTotal / 1024 / 1024)} MB`,
        heapUsed: `${Math.round(memoryUsage.heapUsed / 1024 / 1024)} MB`,
        external: `${Math.round(memoryUsage.external / 1024 / 1024)} MB`,
      },
      nodeVersion: process.version,
      platform: process.platform,
    };
  });
}