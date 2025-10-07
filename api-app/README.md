# API Server

A scalable TypeScript API server built with Fastify and MongoDB.

## Project Structure

```
src/
├── config/           # Configuration management
│   └── index.ts      # Environment variables and config
├── database/         # Database layer
│   └── index.ts      # MongoDB connection and collections
├── middleware/       # Middleware functions
│   ├── index.ts      # Middleware registration
│   ├── errorHandler.ts # Global error handling
│   └── cors.ts       # CORS configuration
├── routes/           # API routes
│   ├── index.ts      # Route registration
│   ├── userRoutes.ts # User-related endpoints
│   └── healthRoutes.ts # Health check endpoints
├── services/         # Business logic layer
│   └── userService.ts # User business logic
├── types/            # TypeScript type definitions
│   └── types.ts      # Shared types and interfaces
└── index.ts          # Application entry point
```

## Features

- **TypeScript**: Full type safety throughout the application
- **Modular Architecture**: Separated concerns for maintainability
- **Error Handling**: Global error handling with proper HTTP status codes
- **CORS Support**: Configurable CORS for frontend integration
- **Database Layer**: Abstracted MongoDB operations
- **Service Layer**: Business logic separation
- **Graceful Shutdown**: Proper cleanup on server termination
- **Logging**: Structured logging with Pino

## API Endpoints

### Users
- `GET /users` - Get all users
- `GET /users/:id` - Get user by ID
- `POST /users` - Create new user
- `PUT /users/:id` - Update user
- `DELETE /users/:id` - Delete user

### Health
- `GET /health` - Basic health check
- `GET /health/detailed` - Detailed health information

## Environment Variables

```env
MONGO_URI=mongodb://localhost:27017
API_PORT=3000
DB_NAME=rajatdb
NODE_ENV=development
LOG_LEVEL=info
```

### Required Variables
- `MONGO_URI`: MongoDB connection string
- `API_PORT`: Port number for the API server
- `DB_NAME`: Name of the MongoDB database to use

### Optional Variables
- `NODE_ENV`: Environment mode (development/production)
- `LOG_LEVEL`: Logging level (info/debug/error)

## Development

```bash
# Install dependencies
pnpm install

# Run in development mode
pnpm run dev

# Build TypeScript
pnpm run build

# Run production build
pnpm start
```

## Architecture Benefits

1. **Separation of Concerns**: Each module has a single responsibility
2. **Testability**: Services and routes can be easily unit tested
3. **Scalability**: Easy to add new features without affecting existing code
4. **Maintainability**: Clear structure makes code easy to understand and modify
5. **Type Safety**: TypeScript prevents runtime errors and improves developer experience
