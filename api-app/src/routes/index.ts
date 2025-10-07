import type { FastifyInstance } from "fastify";
import { userRoutes } from "./userRoutes.js";
import { healthRoutes } from "./healthRoutes.js";

/**
 * Register all routes with the Fastify instance
 */
export async function registerRoutes(fastify: any): Promise<void> {
  // Register route modules
  await fastify.register(userRoutes);
  await fastify.register(healthRoutes);
}
