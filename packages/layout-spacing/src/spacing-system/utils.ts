import { SpacingToken, SpacingDirection, SpacingValue } from './types';
import { SpacingConfig as SpacingConfigType } from './types';
import { toCSSValue, DEFAULT_SPACING_CONFIG, DEFAULT_SPACING_SCALE } from './tokens';

type SpacingConfig = SpacingConfigType;

/**
 * Resolve a spacing token to its pixel value
 */
export function resolveSpacingToken(token: SpacingValue, config?: Partial<SpacingConfig>): number | string {
  const mergedConfig: SpacingConfig = { ...DEFAULT_SPACING_CONFIG, ...config };
  if (typeof token === 'string' && isNaN(Number(token))) {
    return token;
  }
  const numericToken = Number(token) as SpacingToken;
  return DEFAULT_SPACING_SCALE[numericToken] ?? numericToken * mergedConfig.baseUnit;
}

/**
 * Apply spacing to a style object
 */
export function applySpacingStyles(
  style: Record<string, string | number>,
  prop: 'margin' | 'padding' | 'gap',
  value: SpacingValue,
  direction: SpacingDirection = 'all',
  config?: Partial<SpacingConfig>
): Record<string, string | number> {
  const cssValue = toCSSValue(value, { ...DEFAULT_SPACING_CONFIG, ...config });
  const result = { ...style };

  if (prop === 'gap') {
    result.gap = cssValue;
    return result;
  }

  const cssProp = prop;
  switch (direction) {
    case 'all':
      result[cssProp] = cssValue;
      break;
    case 'top':
      result[`${cssProp}Top` as keyof typeof result] = cssValue;
      break;
    case 'right':
      result[`${cssProp}Right` as keyof typeof result] = cssValue;
      break;
    case 'bottom':
      result[`${cssProp}Bottom` as keyof typeof result] = cssValue;
      break;
    case 'left':
      result[`${cssProp}Left` as keyof typeof result] = cssValue;
      break;
    case 'x':
      result[`${cssProp}Left` as keyof typeof result] = cssValue;
      result[`${cssProp}Right` as keyof typeof result] = cssValue;
      break;
    case 'y':
      result[`${cssProp}Top` as keyof typeof result] = cssValue;
      result[`${cssProp}Bottom` as keyof typeof result] = cssValue;
      break;
  }

  return result;
}

/**
 * Merge multiple spacing style objects
 */
export function mergeSpacingStyles(
  ...styles: Array<Record<string, string | number> | undefined>
): Record<string, string | number> {
  return Object.assign({}, ...styles.filter(Boolean));
}

/**
 * Create a spacing style string for inline styles
 */
export function spacingStyleString(
  prop: 'margin' | 'padding',
  value: SpacingValue,
  direction: SpacingDirection = 'all',
  config?: Partial<SpacingConfig>
): string {
  const cssValue = toCSSValue(value, { ...DEFAULT_SPACING_CONFIG, ...config });
  switch (direction) {
    case 'all': return `${prop}: ${cssValue}`;
    case 'top': return `${prop}-top: ${cssValue}`;
    case 'right': return `${prop}-right: ${cssValue}`;
    case 'bottom': return `${prop}-bottom: ${cssValue}`;
    case 'left': return `${prop}-left: ${cssValue}`;
    case 'x': return `${prop}-left: ${cssValue}; ${prop}-right: ${cssValue}`;
    case 'y': return `${prop}-top: ${cssValue}; ${prop}-bottom: ${cssValue}`;
  }
}

/**
 * Clamp a spacing value between min and max tokens
 */
export function clampSpacing(
  token: SpacingToken,
  min?: SpacingToken,
  max?: SpacingToken
): number {
  const value = DEFAULT_SPACING_SCALE[token] ?? token * DEFAULT_SPACING_CONFIG.baseUnit;
  const minVal = min !== undefined ? (DEFAULT_SPACING_SCALE[min] ?? min * DEFAULT_SPACING_CONFIG.baseUnit) : 0;
  const maxVal = max !== undefined ? (DEFAULT_SPACING_SCALE[max] ?? max * DEFAULT_SPACING_CONFIG.baseUnit) : Infinity;
  return Math.min(Math.max(value, minVal), maxVal);
}

