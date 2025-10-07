import dotenv from "dotenv";
import type { EnvConfig } from "../types.js";

// Load environment variables
dotenv.config();

/**
 * Validates and returns environment configuration
 * @returns {EnvConfig} Validated environment configuration
 * @throws {Error} If required environment variables are missing or invalid
 */
export const validateEnv = (): EnvConfig => {
  const mongoUri = process.env.MONGO_URI;
  const apiPort = process.env.API_PORT;
  const dbName = process.env.DB_NAME;

  if (!mongoUri) {
    throw new Error("MONGO_URI environment variable is required");
  }

  if (!apiPort) {
    throw new Error("API_PORT environment variable is required");
  }

  if (!dbName) {
    throw new Error("DB_NAME environment variable is required");
  }

  const port = parseInt(apiPort, 10);
  if (isNaN(port)) {
    throw new Error("API_PORT must be a valid number");
  }

  return {
    MONGO_URI: mongoUri,
    API_PORT: port,
    DB_NAME: dbName,
  };
};

/**
 * Get validated environment configuration
 */
export const config = validateEnv();
