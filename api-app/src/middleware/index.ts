import type { FastifyInstance } from "fastify";
import { setupErrorHandler } from "./errorHandler.js";
import { setupCors } from "./cors.js";

/**
 * Register all middleware with the Fastify instance
 */
export function setupMiddleware(fastify: any): void {
  // Setup CORS
  setupCors(fastify);
  
  // Setup error handling (should be last)
  setupErrorHandler(fastify);
}
