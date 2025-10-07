import { ObjectId } from "mongodb";

// Environment variables interface
export interface EnvConfig {
  MONGO_URI: string;
  API_PORT: number;
  DB_NAME: string;
}

// User interface
export interface User {
  _id?: ObjectId;
  name: string;
  email: string;
  createdAt?: Date;
  updatedAt?: Date;
}

// Request body interface for POST /users
export interface CreateUserRequest {
  Body: {
    name: string;
    email: string;
  };
}

// Response interface for POST /users
export interface CreateUserResponse {
  id: ObjectId;
}

// Health check response
export interface HealthResponse {
  status: string;
  timestamp: string;
  uptime: number;
}

// Error response interface
export interface ErrorResponse {
  error: string;
  message: string;
  statusCode: number;
}
