import type { FastifyInstance, FastifyError } from "fastify";

/**
 * Global error handler middleware
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
