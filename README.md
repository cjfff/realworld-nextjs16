# ![RealWorld Example App](logo.png)

> ### [Next.js 16] codebase containing real world examples (CRUD, auth, advanced patterns, etc) that adheres to the [RealWorld](https://github.com/gothinkster/realworld) spec and API.


### [Demo](https://readlworld-nextjs16.netlify.app)&nbsp;&nbsp;&nbsp;&nbsp;[RealWorld](https://github.com/gothinkster/realworld)


This codebase was created to demonstrate a fully fledged fullstack application built with **Next.js 16** including CRUD operations, authentication, routing, pagination, and more.

We've gone to great lengths to adhere to the **Next.js 16** community styleguides & best practices.

For more information on how to this works with other frontends/backends, head over to the [RealWorld](https://github.com/gothinkster/realworld) repo.


# How it works

This application is built with modern web technologies and follows Next.js 16 best practices:

## Architecture Overview

### Core Technologies
- **Next.js 16** - React framework with App Router
- **React 19** - Latest React with Server Components
- **TypeScript** - Type-safe development
- **Tailwind CSS v4** - Utility-first styling
- **TanStack Query (React Query)** - Server state management
- **OpenAPI** - Type-safe API client generation

### Key Architectural Patterns

#### 1. **Server Components First**
The app uses React Server Components by default, with client components only where interactivity is needed. This provides:
- Improved performance with smaller client bundles
- Better SEO with server-side rendering
- Direct server access without API routes

#### 2. **Type-Safe API Layer**
```
OpenAPI Schema (schema.yml) 
  ↓ (openapi-typescript)
TypeScript Types (schema.d.ts)
  ↓ (openapi-fetch + openapi-react-query)
Type-Safe API Client ($api)
```

- API types are auto-generated from OpenAPI specification
- Full end-to-end type safety from API to UI
- Automatic request/response validation

#### 3. **Hybrid Data Fetching**
- **Server Components**: Direct API calls for initial data
- **Client Components**: TanStack Query for interactive features
- **Server Actions**: Form submissions and mutations

#### 4. **Authentication Flow**
- JWT tokens stored in encrypted, HTTP-only cookies
- Session management with `jose` library
- Automatic token injection via middleware
- Cookie expiration: 7 days

#### 5. **Form Handling**
- React Hook Form for form state management
- Zod for validation schemas
- Server Actions for form submissions
- Progressive enhancement support

### Project Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── api/               # API routes
│   ├── article/           # Article pages
│   ├── editor/            # Article editor
│   ├── login/             # Authentication
│   ├── profile/           # User profiles
│   ├── settings/          # User settings
│   └── layout.tsx         # Root layout
├── components/            # Shared React components
│   ├── Article/
│   ├── FavoriteButton/
│   ├── FollowButton/
│   └── NavComponent/
├── lib/                   # Core utilities
│   ├── api.ts            # OpenAPI client setup
│   ├── session.ts        # Session management
│   └── schemas/          # Zod validation schemas
└── openapi/
    └── schema.yml        # API specification
```

### Features

- ✅ **Authentication** - Register, login, logout with JWT
- ✅ **Articles** - Create, read, update, delete articles
- ✅ **Comments** - Add and delete comments
- ✅ **Favorites** - Favorite/unfavorite articles
- ✅ **Follow** - Follow/unfollow users
- ✅ **Profiles** - View user profiles and their articles
- ✅ **Editor** - Markdown editor with live preview
- ✅ **Pagination** - Paginated article lists
- ✅ **Tags** - Filter articles by tags
- ✅ **Feeds** - Global feed and personal feed

# Getting started

## Prerequisites

- Node.js 20+ 
- pnpm (recommended) or npm

## Installation

```sh
# Install dependencies
pnpm install
```

## Environment Variables

Create a `.env.local` file in the root directory:

```env
NEXT_PUBLIC_API_ENDPOINT=https://api.realworld.show/api
SESSION_SECRET=your-secret-key-here
```

## Development

```sh
# Run development server
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Build for Production

```sh
# Build the application
pnpm build

# Start production server
pnpm start
```

## Other Commands

```sh
# Run linter
pnpm lint

# Generate TypeScript types from OpenAPI schema
pnpm openapi

# Add shadcn/ui components
pnpm add <component-name>
```

## Tech Stack

- **Framework**: Next.js 16.0.1
- **React**: 19.2.0
- **Language**: TypeScript 5
- **Styling**: Tailwind CSS v4
- **State Management**: TanStack Query v5
- **Form Handling**: React Hook Form + Zod
- **API Client**: openapi-fetch + openapi-react-query
- **Authentication**: jose (JWT)
- **UI Components**: shadcn/ui (Radix UI primitives)
- **Markdown**: remark + remark-html
- **Icons**: Lucide React, Ionicons
- **Date Formatting**: Day.js
- **Utilities**: lodash-es, clsx, tailwind-merge

## License

MIT