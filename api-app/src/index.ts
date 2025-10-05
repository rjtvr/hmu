import Fastify from "fastify";
import type { FastifyInstance } from "fastify";
import { config } from "./config/index.js";
import { database } from "./database/index.js";
import { registerRoutes } from "./routes/index.js";
import { setupMiddleware } from "./middleware/index.js";

/**
 * Main server function
 */
const startServer = async (): Promise<void> => {
  try {
    // Initialize Fastify with custom logger
    const fastify = Fastify({ 
      logger: true
    });

    // Setup middleware
    setupMiddleware(fastify);

    // Connect to database
    await database.connect();

    // Register routes
    await registerRoutes(fastify);

    // Graceful shutdown handlers
    const gracefulShutdown = async (signal: string) => {
      fastify.log.info(`Received ${signal}, shutting down gracefully...`);
      try {
        await database.disconnect();
        await fastify.close();
        process.exit(0);
      } catch (error) {
        fastify.log.error(error, "Error during shutdown");
        process.exit(1);
      }
    };

    // Register shutdown handlers
    process.on("SIGTERM", () => gracefulShutdown("SIGTERM"));
    process.on("SIGINT", () => gracefulShutdown("SIGINT"));

    // Start server
    await fastify.listen({ 
      port: config.API_PORT,
      host: "0.0.0.0"
    });

    // Enhanced startup message
    const startupMessage = `
╔══════════════════════════════════════════════════════════════╗
║                    🚀 HMU API Server                        ║
╠══════════════════════════════════════════════════════════════╣
║  📍 API Server:    http://localhost:${config.API_PORT}${' '.repeat(15 - config.API_PORT.toString().length)}║
║  📊 Health Check:  http://localhost:${config.API_PORT}/health${' '.repeat(8 - config.API_PORT.toString().length)}║
║  🌐 Frontend:      http://localhost:5173${' '.repeat(20)}║
║  🗄️  Database:      ${config.DB_NAME}${' '.repeat(25 - config.DB_NAME.length)}║
║  🌍 Environment:   ${process.env.NODE_ENV || 'development'}${' '.repeat(15 - (process.env.NODE_ENV || 'development').length)}║
╚══════════════════════════════════════════════════════════════╝
    `;
    
    console.log(startupMessage);
  } catch (error) {
    console.error("❌ Error starting server:", error);
    process.exit(1);
  }
};

// Start the server
startServer();
