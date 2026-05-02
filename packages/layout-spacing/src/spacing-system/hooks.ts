import { useCallback } from 'react';
import { SpacingToken, SpacingValue, SpacingDirection } from './types';
import { toCSSValue, DEFAULT_SPACING_CONFIG, generateScale } from './tokens';
import { useSpacingTheme, useHasSpacingProvider } from './context';

/**
 * Hook to convert a spacing token to a CSS value using current theme
 */
export function useSpacing(): {
  /** Convert a spacing token to a value (string on web, number on native) */
  value: (token: SpacingValue) => string | number;
  /** Get margin styles for a given direction and token */
  margin: (direction: SpacingDirection, token: SpacingValue) => Record<string, string | number>;
  /** Get padding styles for a given direction and token */
  padding: (direction: SpacingDirection, token: SpacingValue) => Record<string, string | number>;
  /** Get gap style */
  gap: (token: SpacingValue) => Record<string, string | number>;
  /** Access the full spacing scale */
  scale: () => Record<string, number | string>;
} {
  const hasProvider = useHasSpacingProvider();
  const theme = useSpacingTheme();
  const config = hasProvider ? theme.config : DEFAULT_SPACING_CONFIG;

  const value = useCallback(
    (token: SpacingValue): string | number => toCSSValue(token, config),
    [config]
  );

  const margin = useCallback(
    (direction: SpacingDirection, token: SpacingValue): Record<string, string | number> => {
      const cssValue = toCSSValue(token, config);
      switch (direction) {
        case 'all':
          return { margin: cssValue };
        case 'top':
          return { marginTop: cssValue };
        case 'right':
          return { marginRight: cssValue };
        case 'bottom':
          return { marginBottom: cssValue };
        case 'left':
          return { marginLeft: cssValue };
        case 'x':
          return { marginLeft: cssValue, marginRight: cssValue };
        case 'y':
          return { marginTop: cssValue, marginBottom: cssValue };
      }
    },
    [config]
  );

  const padding = useCallback(
    (direction: SpacingDirection, token: SpacingValue): Record<string, string | number> => {
      const cssValue = toCSSValue(token, config);
      switch (direction) {
        case 'all':
          return { padding: cssValue };
        case 'top':
          return { paddingTop: cssValue };
        case 'right':
          return { paddingRight: cssValue };
        case 'bottom':
          return { paddingBottom: cssValue };
        case 'left':
          return { paddingLeft: cssValue };
        case 'x':
          return { paddingLeft: cssValue, paddingRight: cssValue };
        case 'y':
          return { paddingTop: cssValue, paddingBottom: cssValue };
      }
    },
    [config]
  );

  const gap = useCallback(
    (token: SpacingValue): Record<string, string | number> => {
      return { gap: toCSSValue(token, config) };
    },
    [config]
  );

  const scale = useCallback((): Record<string, number | string> => {
    return hasProvider ? theme.scale : generateScale(config);
  }, [hasProvider, theme, config]);

  return { value, margin, padding, gap, scale };
}

