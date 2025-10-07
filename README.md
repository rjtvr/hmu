# HMU - Full Stack Application

A full-stack application with React frontend and Fastify backend.

## Project Structure

```
hmu/
├── api-app/          # Fastify backend server
├── web-app/          # React frontend application
└── package.json      # Root package.json for managing both projects
```

## Getting Started

### Prerequisites

- Node.js (v18 or higher)
- pnpm (recommended) or npm

### Installation

1. Install dependencies for all projects:
```bash
pnpm run install:all
```

Or simply:
```bash
pnpm install
```

This will automatically install dependencies for all workspace packages (api-app and web-app) thanks to the pnpm workspace configuration.

### Development

Run both frontend and backend in development mode:
```bash
pnpm run dev
```

This will start:
- Backend API server (typically on port 3000)
- Frontend development server (typically on port 5173)

**Powered by Turborepo** for optimal performance and caching!

### Individual Project Commands

#### Backend (API)
```bash
# Run backend only
pnpm run dev:api
# or
cd api-app && pnpm run dev
```

#### Frontend (Web)
```bash
# Run frontend only
pnpm run dev:web
# or
cd web-app && pnpm run dev
```

### Production

Build and run in production mode:
```bash
# Build the frontend
pnpm run build

# Start both projects
pnpm start
```

### Available Scripts

- `pnpm run dev` - Start both frontend and backend in development mode (with Turbo)
- `pnpm run build` - Build all projects for production (with Turbo caching)
- `pnpm start` - Start both projects in production mode
- `pnpm run lint` - Lint all projects
- `pnpm run clean` - Clean all build artifacts and dependencies
- `pnpm run install:all` - Install dependencies for all projects

### Turbo Benefits

- **Intelligent Caching**: Only rebuilds what changed
- **Parallel Execution**: Runs tasks in parallel when possible
- **Dependency Management**: Automatically handles task dependencies
- **Remote Caching**: Share cache across team members (when configured)
- **Better Performance**: Significantly faster than traditional tools

## Technology Stack

### Backend
- Fastify - Fast and low overhead web framework
- TypeScript - Type safety and better development experience
- MongoDB - Database
- Node.js - Runtime environment

### Frontend
- React 19 - UI library
- TypeScript - Type safety
- Vite - Build tool and dev server
- ESLint - Code linting

## Development Workflow

1. Make sure both projects are running: `pnpm run dev`
2. Backend API will be available at `http://localhost:3000`
3. Frontend will be available at `http://localhost:5173`
4. Both projects will hot-reload when you make changes

# Conventional Commits v1.0.0

## Format
```

<type>[optional scope]: <description>

[optional body]

[optional footer(s)]

```

### Types
- **feat:** new feature (→ MINOR)
- **fix:** bug fix (→ PATCH)
- **BREAKING CHANGE:** major API change (→ MAJOR)
- Other: `build`, `chore`, `ci`, `docs`, `style`, `refactor`, `perf`, `test`

---

## Examples
```

feat(parser): add array parsing
fix: prevent racing of requests
feat!: send email to customers on shipment
docs: correct spelling of CHANGELOG

```

---

## Rules
1. Commit **MUST** start with a type.  
2. Scope (optional) in parentheses.  
3. Description follows `:` and space.  
4. Body optional, one blank line after description.  
5. Footer optional, formatted as `token: value`.  
6. `BREAKING CHANGE:` signals a major version change.  
7. `!` after type/scope also marks a breaking change.  
8. Case-insensitive except `BREAKING CHANGE`.  
9. `BREAKING-CHANGE` = `BREAKING CHANGE`.

---

## Benefits
- Auto-generate **CHANGELOGs**  
- Auto-determine **SemVer bumps**  
- Clearer communication of intent  
- Enable **CI/CD triggers**  
- Simplify contributor onboarding
