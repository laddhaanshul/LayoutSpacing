# Agent Documentation

## Overview
This document provides AI agent guidance for working with the @laddhaanshul/layout-spacing monorepo.

## Project Structure
- **Root**: Monorepo configuration (pnpm workspace, tsconfig)
- **packages/layout-spacing**: Core NPM package with 4 modules
- **examples/react-app**: Vite + React web demo application
- **examples/react-native-app**: Expo React Native demo application
- **.github/workflows**: CI/CD (publish.yml, test.yml)
- **docs/**: Detailed module documentation

## Key Patterns

### Adding a New Spacing Token
1. Add the token to `SpacingToken` type in `spacing-system/types.ts`
2. Add the pixel value to `DEFAULT_SPACING_SCALE` in `spacing-system/tokens.ts`
3. Add tests in `__tests__/spacing-system.test.ts`

### Adding a New Layout Primitive
1. Create the component file in `layout-primitives/`
2. Define props interface in `layout-primitives/types.ts`
3. Use `resolveSpacingStyles()` and `resolveBaseStyles()` for style computation
4. Export from `layout-primitives/index.ts`
5. Add tests in `__tests__/layout-primitives.test.tsx`

### Adding a New Responsive Hook
1. Create the hook in `responsive-hooks/hooks.ts`
2. Use `useResponsiveContext()` to access breakpoint data
3. Export from `responsive-hooks/index.ts`
4. Add tests in `__tests__/responsive-hooks.test.ts`

## Build Commands
- `pnpm build` - Build ESM, CJS, and Native variants
- `pnpm test` - Run Jest test suite
- `pnpm test:coverage` - Run tests with coverage report
- `pnpm clean` - Remove dist and coverage directories

## Testing Strategy
- Unit tests for utility functions (tokens, utils)
- Context/hook tests with `renderHook`
- Component rendering tests with `@testing-library/react`
- Provider integration tests

## Publishing Flow
1. Tag a release: `git tag v1.x.x && git push origin v1.x.x`
2. GitHub Actions triggers on release event
3. Workflow builds, tests, updates version, and publishes to npm
4. Uses npm provenance for supply chain security

