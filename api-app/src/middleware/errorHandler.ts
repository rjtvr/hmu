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
    // Always log the full error for debugging
    fastify.log.error(error);

    // Handle validation errors
    if (error.validation) {
      // Sanitize validation errors to only expose field and message
      const sanitizedValidation = error.validation.map((validationError: any) => ({
        field: validationError.instancePath || validationError.dataPath || 'unknown',
        message: validationError.message || 'Invalid value'
      }));

      reply.code(400).send({
        error: "Validation Error",
        message: "Request validation failed",
        details: sanitizedValidation,
      });
      return;
    }

    // Handle custom errors
    if (error.statusCode) {
      const isProduction = process.env.NODE_ENV === "production";
      
      reply.code(error.statusCode).send({
        error: error.name || "Error",
        message: isProduction 
          ? "An error occurred" 
          : error.message,
      });
      return;
    }

    // Handle unexpected errors
    const isProduction = process.env.NODE_ENV === "production";
    reply.code(500).send({
      error: "Internal Server Error",
      message: isProduction 
        ? "Something went wrong" 
        : error.message,
    });
  });
}