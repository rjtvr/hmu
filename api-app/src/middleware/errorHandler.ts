import type { FastifyInstance, FastifyError } from "fastify";

/**
 * Attach a global Fastify error handler that logs errors and sends standardized HTTP responses.
 *
 * The handler logs every error and responds based on the error shape:
 * - If `error.validation` is present: responds 400 with `error`, `message`, and `details`.
 * - Else if `error.statusCode` is present: responds with that status code and a payload containing `error` (name) and `message`.
 * - Otherwise: responds 500 with `error: "Internal Server Error"` and a message that is `"Something went wrong"` in production or the original error message otherwise.
 *
 * @param fastify - The Fastify instance on which to register the error handler
 */
export function setupErrorHandler(fastify: FastifyInstance): void {
  fastify.setErrorHandler((error: FastifyError, request, reply) => {
    fastify.log.error(error);

    // Handle validation errors
    if (error.validation) {
      reply.code(400).send({
        error: "Validation Error",
        message: error.message,
        details: error.validation,
      });
      return;
    }

    // Handle custom errors
    if (error.statusCode) {
      reply.code(error.statusCode).send({
        error: error.name || "Error",
        message: error.message,
      });
      return;
    }

    // Handle unexpected errors
    reply.code(500).send({
      error: "Internal Server Error",
      message: process.env.NODE_ENV === "production" 
        ? "Something went wrong" 
        : error.message,
    });
  });
}