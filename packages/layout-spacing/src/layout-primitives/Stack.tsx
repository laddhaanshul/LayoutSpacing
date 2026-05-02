import React from 'react';
import { StackProps } from './types';
import { resolveSpacingStyles, resolveBaseStyles, mergeStyles } from './utils';
import { toCSSValue } from '../spacing-system/tokens';
import { DEFAULT_COMPONENT } from './default-component';

/**
 * Stack component - a convenient vertical/horizontal stacking layout primitive.
 * Simplifies common flexbox patterns with consistent spacing.
 *
 * @example
 * <Stack gap={2} direction="vertical">
 *   <Box p={3}>Item 1</Box>
 *   <Box p={3}>Item 2</Box>
 *   <Box p={3}>Item 3</Box>
 * </Stack>
 */
export function Stack({
  children,
  as: Component = DEFAULT_COMPONENT,
  testID,
  className,
  style,
  direction = 'vertical',
  gap = 0,
  align,
  justify,
  wrap,
  reverse,
  m, mt, mr, mb, ml, mx, my,
  p, pt, pr, pb, pl, px, py,
  ...restProps
}: StackProps): React.ReactElement {
  const spacingStyles = resolveSpacingStyles({ m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py });
  const baseStyles = resolveBaseStyles(restProps as any);

  const stackDirection = direction === 'vertical'
    ? (reverse ? 'column-reverse' : 'column')
    : (reverse ? 'row-reverse' : 'row');

  const stackStyles: Record<string, string | number> = {
    display: 'flex',
    flexDirection: stackDirection,
    gap: toCSSValue(gap),
    ...baseStyles,
    ...spacingStyles,
  };

  if (align !== undefined) stackStyles.alignItems = align;
  if (justify !== undefined) stackStyles.justifyContent = justify;
  if (wrap !== undefined) stackStyles.flexWrap = wrap ? 'wrap' : 'nowrap';

  const mergedStyles = mergeStyles(stackStyles, style);

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

Stack.displayName = 'Stack';

