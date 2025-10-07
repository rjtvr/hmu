import type { FastifyInstance } from "fastify";
import { setupErrorHandler } from "./errorHandler.js";
import { setupCors } from "./cors.js";

/**
 * Initialize middleware for the given Fastify instance.
 *
 * Registers CORS configuration first and then registers the error handler (the error handler is registered last).
 *
 * @param fastify - The Fastify instance to configure middleware on
 */
export function setupMiddleware(fastify: FastifyInstance): void {
  // Setup CORS
  setupCors(fastify);
  
  // Setup error handling (should be last)
  setupErrorHandler(fastify);
}