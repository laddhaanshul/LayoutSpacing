import { SpacingToken, SpacingConfig, SpacingTheme } from './types';
import { isNative } from './platform';

/**
 * Default spacing scale based on 8pt grid system.
 * Values are in pixels.
 */
export const DEFAULT_SPACING_SCALE: Record<SpacingToken, number> = {
  0: 0,
  0.5: 2,
  1: 4,
  1.5: 6,
  2: 8,
  2.5: 10,
  3: 12,
  4: 16,
  5: 20,
  6: 24,
  8: 32,
  10: 40,
  12: 48,
  14: 56,
  16: 64,
  20: 80,
  24: 96,
  28: 112,
  32: 128,
  36: 144,
  40: 160,
  44: 176,
  48: 192,
  56: 224,
  64: 256,
  72: 288,
  80: 320,
  96: 384,
};

/**
 * Default spacing configuration
 */
export const DEFAULT_SPACING_CONFIG: SpacingConfig = {
  baseUnit: 8,
  useRem: false,
  rootFontSize: 16,
};

/**
 * Generate a spacing scale with custom overrides
 */
export function generateScale(
  config: Partial<SpacingConfig> = {}
): Record<string, number | string> {
  const mergedConfig: SpacingConfig = {
    ...DEFAULT_SPACING_CONFIG,
    ...config,
  };

  const scale: Record<string, number | string> = {};

  for (const [key, value] of Object.entries(DEFAULT_SPACING_SCALE)) {
    const token = Number(key) as SpacingToken;
    if (mergedConfig.scaleOverrides && mergedConfig.scaleOverrides[token] !== undefined) {
      scale[key] = mergedConfig.scaleOverrides[token];
    } else {
      scale[key] = mergedConfig.useRem
        ? `${value / (mergedConfig.rootFontSize || 16)}rem`
        : value;
    }
  }

  scale['auto'] = 'auto';

  return scale;
}

/**
 * Convert a spacing token to a CSS value
 */
export function toCSSValue(
  token: SpacingToken | number | string,
  config: SpacingConfig = DEFAULT_SPACING_CONFIG
): string | number {
  if (typeof token === 'string' && (token === 'auto' || token.includes('px') || token.includes('rem') || token.includes('%') || token.includes('vh') || token.includes('vw'))) {
    return token;
  }

  const numericValue = typeof token === 'number'
    ? DEFAULT_SPACING_SCALE[token as SpacingToken] ?? token * config.baseUnit
    : parseFloat(token) * config.baseUnit;

  if (isNative() && !config.useRem) {
    return numericValue;
  }

  return config.useRem
    ? `${numericValue / (config.rootFontSize || 16)}rem`
    : `${numericValue}px`;
}

/**
 * Generate CSS custom properties (variables) for all spacing tokens
 */
export function generateCSSVars(
  config: Partial<SpacingConfig> = {}
): Record<string, string> {
  const mergedConfig: SpacingConfig = { ...DEFAULT_SPACING_CONFIG, ...config };
  const vars: Record<string, string> = {};
  const prefix = 'ls';

  for (const [key, value] of Object.entries(DEFAULT_SPACING_SCALE)) {
    vars[`--${prefix}-spacing-${key}`] = String(toCSSValue(
      Number(key) as SpacingToken,
      mergedConfig
    ));
  }

  vars[`--${prefix}-spacing-auto`] = 'auto';

  return vars;
}

/**
 * Generate a SpacingTheme from config
 */
export function createSpacingTheme(
  config: Partial<SpacingConfig> = {}
): SpacingTheme {
  const mergedConfig: SpacingConfig = { ...DEFAULT_SPACING_CONFIG, ...config };
  return {
    config: mergedConfig,
    scale: generateScale(config),
    cssVars: generateCSSVars(config),
  };
}

