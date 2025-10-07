import type { User, CreateUserRequest, CreateUserResponse } from "../types.js";
import { database } from "../database/index.js";

export class UserService {
  /**
   * Get all users
   */
  async getAllUsers(): Promise<User[]> {
    try {
      return await database.users.find().toArray();
    } catch (error) {
      console.error("Error fetching users:", error);
      throw new Error("Failed to fetch users");
    }
  }

  /**
   * Create a new user
   */
  async createUser(userData: CreateUserRequest["Body"]): Promise<CreateUserResponse> {
    try {
      const { name, email } = userData;

      // Basic validation
      if (!name || !email) {
        throw new Error("Name and email are required");
      }

      // Check if user already exists
      const existingUser = await database.users.findOne({ email });
      if (existingUser) {
        throw new Error("User with this email already exists");
      }

      const result = await database.users.insertOne({ 
        name, 
        email,
        createdAt: new Date(),
        updatedAt: new Date()
      });

      return { id: result.insertedId };
    } catch (error) {
      console.error("Error creating user:", error);
      throw error;
    }
  }

  /**
   * Get user by ID
   */
  async getUserById(id: string): Promise<User | null> {
    try {
      return await database.users.findOne({ _id: id as any });
    } catch (error) {
      console.error("Error fetching user by ID:", error);
      throw new Error("Failed to fetch user");
    }
  }

  /**
   * Update user
   */
  async updateUser(id: string, userData: Partial<User>): Promise<User | null> {
    try {
      const result = await database.users.findOneAndUpdate(
        { _id: id as any },
        { 
          $set: { 
            ...userData, 
            updatedAt: new Date() 
          } 
        },
        { returnDocument: "after" }
      );
      return result;
    } catch (error) {
      console.error("Error updating user:", error);
      throw new Error("Failed to update user");
    }
  }

  /**
   * Delete user
   */
  async deleteUser(id: string): Promise<boolean> {
    try {
      const result = await database.users.deleteOne({ _id: id as any });
      return result.deletedCount > 0;
    } catch (error) {
      console.error("Error deleting user:", error);
      throw new Error("Failed to delete user");
    }
  }
}

// Export singleton instance
export const userService = new UserService();
