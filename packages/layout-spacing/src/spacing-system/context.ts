import React, { createContext, useContext, useMemo } from 'react';
import { SpacingConfig, SpacingTheme, SpacingProviderProps } from './types';
import { createSpacingTheme, DEFAULT_SPACING_CONFIG } from './tokens';

/**
 * React context for spacing theme
 */
const SpacingContext = createContext<SpacingTheme | null>(null);

/**
 * Provider component that wraps children with spacing configuration
 */
export function SpacingProvider({ children, config = {} }: SpacingProviderProps): React.ReactElement {
  const theme = useMemo(() => createSpacingTheme(config), [config]);

  return React.createElement(
    SpacingContext.Provider,
    { value: theme },
    children
  );
}

/**
 * Hook to access the current spacing theme
 * @throws Error if used outside of SpacingProvider
 */
export function useSpacingTheme(): SpacingTheme {
  const theme = useContext(SpacingContext);
  if (!theme) {
    throw new Error(
      'useSpacingTheme must be used within a <SpacingProvider>. ' +
      'Wrap your app or component tree with <SpacingProvider>.'
    );
  }
  return theme;
}

/**
 * Hook to access spacing configuration
 */
export function useSpacingConfig(): SpacingConfig {
  const theme = useSpacingTheme();
  return theme.config;
}

/**
 * Hook to check if a SpacingProvider is present in the component tree
 */
export function useHasSpacingProvider(): boolean {
  return useContext(SpacingContext) !== null;
}

export { SpacingContext };

