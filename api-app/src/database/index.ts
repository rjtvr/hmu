import { MongoClient, Db, Collection } from "mongodb";
import type { User } from "../types.js";
import { config } from "../config/index.js";

class Database {
  private client: MongoClient;
  private db: Db | null = null;

  constructor() {
    this.client = new MongoClient(config.MONGO_URI);
  }

  /**
   * Connect to MongoDB
   */
  async connect(): Promise<void> {
    try {
      await this.client.connect();
      this.db = this.client.db(config.DB_NAME);
      console.log(`🗄️  Connected to MongoDB database: ${config.DB_NAME}`);
    } catch (error) {
      console.error("Failed to connect to MongoDB:", error);
      throw error;
    }
  }

  /**
   * Disconnect from MongoDB
   */
  async disconnect(): Promise<void> {
    try {
      await this.client.close();
      console.log("Disconnected from MongoDB");
    } catch (error) {
      console.error("Failed to disconnect from MongoDB:", error);
      throw error;
    }
  }

  /**
   * Get users collection
   */
  get users(): Collection<User> {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db.collection("users");
  }

  /**
   * Get database instance
   */
  get database(): Db {
    if (!this.db) {
      throw new Error("Database not connected. Call connect() first.");
    }
    return this.db;
  }
}

// Export singleton instance
export const database = new Database();
