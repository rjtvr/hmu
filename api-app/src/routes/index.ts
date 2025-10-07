import type { FastifyInstance } from "fastify";
import { userRoutes } from "./userRoutes.js";
import { healthRoutes } from "./healthRoutes.js";

/**
 * Registers application route modules on the provided Fastify instance.
 *
 * @param fastify - Fastify instance to register route modules on
 */
export async function registerRoutes(fastify: any): Promise<void> {
  // Register route modules
  await fastify.register(userRoutes);
  await fastify.register(healthRoutes);
}