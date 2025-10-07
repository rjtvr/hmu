import type { FastifyInstance, FastifyRequest, FastifyReply } from "fastify";
import type { CreateUserRequest, CreateUserResponse } from "../types.js";
import { userService } from "../services/userService.js";

/**
 * Registers user-related REST endpoints on the provided Fastify instance.
 *
 * Adds handlers for: GET /users, GET /users/:id, POST /users, PUT /users/:id, and DELETE /users/:id.
 */
export async function userRoutes(fastify: FastifyInstance): Promise<void> {
  // GET /users - Get all users
  fastify.get("/users", async (): Promise<any[]> => {
    return await userService.getAllUsers();
  });

  // GET /users/:id - Get user by ID
  fastify.get("/users/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> => {
    const { id } = request.params;
    const user = await userService.getUserById(id);
    
    if (!user) {
      reply.code(404);
      return { error: "User not found" };
    }
    
    return user;
  });

  // POST /users - Create new user
  fastify.post<CreateUserRequest>("/users", async (request: FastifyRequest<CreateUserRequest>, reply: FastifyReply): Promise<CreateUserResponse> => {
    try {
      return await userService.createUser(request.body);
    } catch (error) {
      reply.code(400);
      throw error;
    }
  });

  // PUT /users/:id - Update user
  fastify.put("/users/:id", async (request: FastifyRequest<{ 
    Params: { id: string }; 
    Body: { name?: string; email?: string } 
  }>, reply: FastifyReply): Promise<any> => {
    try {
      const { id } = request.params;
      const user = await userService.updateUser(id, request.body);
      
      if (!user) {
        reply.code(404);
        return { error: "User not found" };
      }
      
      return user;
    } catch (error) {
      reply.code(400);
      throw error;
    }
  });

  // DELETE /users/:id - Delete user
  fastify.delete("/users/:id", async (request: FastifyRequest<{ Params: { id: string } }>, reply: FastifyReply): Promise<any> => {
    try {
      const { id } = request.params;
      const deleted = await userService.deleteUser(id);
      
      if (!deleted) {
        reply.code(404);
        return { error: "User not found" };
      }
      
      return { message: "User deleted successfully" };
    } catch (error) {
      reply.code(400);
      throw error;
    }
  });
}