import React from 'react';
import { BoxProps } from './types';
import { resolveSpacingStyles, resolveBaseStyles, mergeStyles } from './utils';
import { DEFAULT_COMPONENT } from './default-component';

/**
 * Box component - a zero-runtime layout primitive that enforces spacing tokens.
 * Can render as any HTML element via the `as` prop.
 *
 * @example
 * <Box m={4} p={2} bg="blue" borderRadius={8}>
 *   Content here
 * </Box>
 */
export function Box({
  children,
  as: Component = DEFAULT_COMPONENT,
  testID,
  className,
  style,
  m, mt, mr, mb, ml, mx, my,
  p, pt, pr, pb, pl, px, py,
  ...restProps
}: BoxProps): React.ReactElement {
  const spacingStyles = resolveSpacingStyles({ m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py });
  const baseStyles = resolveBaseStyles(restProps as any);
  const mergedStyles = mergeStyles(
    { ...baseStyles, ...spacingStyles },
    style
  );

  return React.createElement(
    Component,
    {
      'data-testid': testID,
      className,
      style: mergedStyles,
    },
    children
  );
}

Box.displayName = 'Box';

