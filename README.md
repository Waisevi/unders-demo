# app-template

Это шаблон интерфейсного приложения, предназначенный в качестве отправной точки для создания приложений. Он предоставляет предварительно настроенную установку для обеспечения согласованности процесса разработки и удобную в обслуживании архитектуру.

## Stack

- **Next.js 16** - React framework with App Router
- **React 19** - UI library
- **TypeScript** - Type safety
- **Zod** - Schema validation
- **React Query (TanStack Query)** - Data fetching and caching
- **React Hook Form** - Form management
- **Tailwind CSS 4** - Utility-first CSS framework
- **Material-UI (MUI)** - Component library
- **Sentry** - Error tracking and monitoring
- **Storybook 10** - Component development and documentation
- **Vitest + Testing Library** - Testing framework
- **MSW (Mock Service Worker)** - API mocking
- **ESLint / Prettier / SonarJS** - Code quality tools
- **Husky** - Git hooks
- **Knip** - Dead code detection

## Prerequisites

- Node.js (see `.nvmrc` for version)
- pnpm 10.25.0+

## Getting Started

1. Install dependencies:

```bash
pnpm install
```

2. Set up environment variables:

Copy `.env.example` to `.env` and configure the required variables:

```bash
cp .env.example .env
```

3. Start the development server:

```bash
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## Available Scripts

### Development

- `pnpm dev` - Start development server
- `pnpm build` - Build for production
- `pnpm start` - Start production server
- `pnpm typecheck` - Run TypeScript type checking

### Code Quality

- `pnpm lint` - Run ESLint
- `pnpm lint:fix` - Run ESLint with auto-fix
- `pnpm lint:config` - Open ESLint config inspector
- `pnpm format` - Format code with Prettier
- `pnpm knip` - Detect unused code and dependencies

### Testing

- `pnpm test` - Run tests in watch mode
- `pnpm test:ci` - Run tests once (for CI)

### Storybook

- `pnpm storybook` - Start Storybook development server (port 6006)
- `pnpm build-storybook` - Build static Storybook

### Dependencies

- `pnpm check-deps` - Check for outdated dependencies

### Theme

- `pnpm update-theme` - Update Tailwind theme from tokens

## Project Structure

```
src/
├── app/                    # Next.js App Router pages and layouts
│   ├── api/               # API routes
│   └── ...
├── components/            # React components
│   ├── form/             # Form components
│   ├── layouts/          # Layout components
│   └── ui/               # UI components
├── hooks/                # Custom React hooks
├── lib/                  # Utility libraries
├── services/             # API services and RPC
├── styles/               # Global styles and theme
├── const/                # Constants (routes, storage keys, etc.)
├── mocks/                # MSW handlers
└── __tests__/            # Test files
```

## Features

### Form Management

The template includes a comprehensive form system with:

- React Hook Form integration
- Zod schema validation
- Masked input support
- Form control components

### Error Tracking

Sentry is configured for error tracking and monitoring:

- Client-side error tracking
- Server-side error tracking
- Performance monitoring
- Session replay

### API Mocking

MSW (Mock Service Worker) is set up for:

- Development API mocking
- Storybook integration
- Testing

### Code Quality

- **ESLint** - Linting with Next.js, Prettier, SonarJS, and custom rules
- **Prettier** - Code formatting
- **Husky** - Pre-commit hooks for linting and formatting
- **Knip** - Dead code detection

### Testing

- Vitest configuration with React Testing Library
- MSW integration for API mocking in tests
- Example test files included

## Environment Variables

Configure the following environment variables (see `.env.example`):

- `SENTRY_DSN` - Sentry Data Source Name
- `SENTRY_ENV` - Sentry environment (development, staging, production)
- `SENTRY_PERF_TRACES_SAMPLE_RATE` - Performance traces sample rate
- `SENTRY_REPLAY_ON_ERROR_SAMPLE_RATE` - Session replay on error sample rate
- `SENTRY_REPLAY_SAMPLE_RATE` - Session replay sample rate

## Development Workflow

1. Create a feature branch
2. Make your changes
3. Run `pnpm lint:fix` and `pnpm format` to ensure code quality
4. Write tests for new features
5. Run `pnpm test` to verify tests pass
6. Commit changes (Husky will run lint-staged automatically)
7. Push and create a pull request

## Storybook

Components can be developed and documented in Storybook:

```bash
pnpm storybook
```

Stories are located alongside components (e.g., `component.stories.tsx`).

## TypeScript

The project uses strict TypeScript configuration. Run type checking:

```bash
pnpm typecheck
```
