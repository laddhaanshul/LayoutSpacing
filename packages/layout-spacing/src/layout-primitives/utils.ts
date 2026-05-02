import { SpacingValue } from '../spacing-system/types';
import { toCSSValue } from '../spacing-system/tokens';
import { isNative } from '../spacing-system/platform';
import { SpacingProps, BaseStyleProps } from './types';

/**
 * Resolve spacing props to CSS styles
 */
export function resolveSpacingStyles(props: SpacingProps): Record<string, string | number> {
  const styles: Record<string, string | number> = {};
  const mapping: Record<string, string> = {
    m: 'margin',
    mt: 'marginTop',
    mr: 'marginRight',
    mb: 'marginBottom',
    ml: 'marginLeft',
    mx: 'marginHorizontal',
    my: 'marginVertical',
    p: 'padding',
    pt: 'paddingTop',
    pr: 'paddingRight',
    pb: 'paddingBottom',
    pl: 'paddingLeft',
    px: 'paddingHorizontal',
    py: 'paddingVertical',
  };

  const native = isNative();

  for (const [prop, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    const cssProp = mapping[prop];
    if (!cssProp) continue;

    if (!native) {
      if (prop === 'mx') {
        styles.marginLeft = toCSSValue(value);
        styles.marginRight = toCSSValue(value);
      } else if (prop === 'my') {
        styles.marginTop = toCSSValue(value);
        styles.marginBottom = toCSSValue(value);
      } else if (prop === 'px') {
        styles.paddingLeft = toCSSValue(value);
        styles.paddingRight = toCSSValue(value);
      } else if (prop === 'py') {
        styles.paddingTop = toCSSValue(value);
        styles.paddingBottom = toCSSValue(value);
      } else {
        styles[cssProp] = toCSSValue(value);
      }
    } else {
      styles[cssProp] = toCSSValue(value);
    }
  }

  return styles;
}

/**
 * Resolve base style props to CSS styles
 */
export function resolveBaseStyles(props: BaseStyleProps): Record<string, string | number> {
  const styles: Record<string, string | number> = {};
  const mapping: Record<string, string> = {
    w: 'width',
    h: 'height',
    minW: 'minWidth',
    minH: 'minHeight',
    maxW: 'maxWidth',
    maxH: 'maxHeight',
    bg: 'backgroundColor',
    borderRadius: 'borderRadius',
    overflow: 'overflow',
    opacity: 'opacity',
    position: 'position',
    top: 'top',
    right: 'right',
    bottom: 'bottom',
    left: 'left',
    zIndex: 'zIndex',
    cursor: 'cursor',
  };

  for (const [prop, value] of Object.entries(props)) {
    if (value === undefined || value === null) continue;
    const cssProp = mapping[prop];
    if (cssProp) {
      styles[cssProp] = value;
    }
  }

  return styles;
}

/**
 * Merge user styles with computed styles (user styles take precedence)
 */
export function mergeStyles(
  computedStyles: Record<string, string | number>,
  userStyle?: React.CSSProperties
): Record<string, string | number> {
  if (!userStyle) return computedStyles;
  return { ...computedStyles, ...userStyle };
}

