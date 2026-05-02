/**
 * Spacing token types for the 8pt grid system
 */

/** Spacing scale values (multiples of 4px for finer control, with 8px as primary unit) */
export type SpacingToken = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | 80 | 96;

/** String-based spacing token (allows 'auto', CSS calc(), etc.) */
export type SpacingValue = SpacingToken | 'auto' | string;

/** Direction for margin/padding utilities */
export type SpacingDirection = 'top' | 'right' | 'bottom' | 'left' | 'x' | 'y' | 'all';

/** Spacing configuration interface */
export interface SpacingConfig {
  /** Base unit in pixels (default: 8) */
  baseUnit: number;
  /** Custom scale overrides */
  scaleOverrides?: Partial<Record<SpacingToken, number>>;
  /** Whether to use rem units on web (default: false uses px) */
  useRem?: boolean;
  /** Root font size in px for rem calculation (default: 16) */
  rootFontSize?: number;
}

/** Spacing theme context value */
export interface SpacingTheme {
  config: SpacingConfig;
  scale: Record<string, number | string>;
  cssVars: Record<string, string>;
}

/** Props for SpacingProvider */
export interface SpacingProviderProps {
  children?: React.ReactNode;
  config?: Partial<SpacingConfig>;
}

