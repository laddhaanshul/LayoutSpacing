import React from 'react';
import { FlexProps } from './types';
import { resolveSpacingStyles, resolveBaseStyles, mergeStyles } from './utils';
import { toCSSValue } from '../spacing-system/tokens';
import { DEFAULT_COMPONENT } from './default-component';

/**
 * Flex component - a flexbox layout primitive with spacing token enforcement.
 *
 * @example
 * <Flex direction="row" gap={2} align="center" justify="space-between">
 *   <Box p={2}>Left</Box>
 *   <Box p={2}>Right</Box>
 * </Flex>
 */
export function Flex({
  children,
  as: Component = DEFAULT_COMPONENT,
  testID,
  className,
  style,
  direction = 'row',
  justify,
  align,
  alignSelf,
  wrap,
  grow,
  shrink,
  basis,
  gap,
  columnGap,
  rowGap,
  m, mt, mr, mb, ml, mx, my,
  p, pt, pr, pb, pl, px, py,
  ...restProps
}: FlexProps): React.ReactElement {
  const spacingStyles = resolveSpacingStyles({ m, mt, mr, mb, ml, mx, my, p, pt, pr, pb, pl, px, py });
  const baseStyles = resolveBaseStyles(restProps as any);

  const flexStyles: Record<string, string | number> = {
    display: 'flex',
    flexDirection: direction,
    ...baseStyles,
    ...spacingStyles,
  };

  if (justify !== undefined) flexStyles.justifyContent = justify;
  if (align !== undefined) flexStyles.alignItems = align;
  if (alignSelf !== undefined) flexStyles.alignSelf = alignSelf;
  if (wrap !== undefined) flexStyles.flexWrap = wrap;
  if (grow !== undefined) flexStyles.flexGrow = grow === true ? 1 : Number(grow);
  if (shrink !== undefined) flexStyles.flexShrink = shrink === true ? 1 : Number(shrink);
  if (basis !== undefined) flexStyles.flexBasis = basis;
  if (gap !== undefined) flexStyles.gap = toCSSValue(gap);
  if (columnGap !== undefined) flexStyles.columnGap = toCSSValue(columnGap);
  if (rowGap !== undefined) flexStyles.rowGap = toCSSValue(rowGap);

  const mergedStyles = mergeStyles(flexStyles, style);

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

Flex.displayName = 'Flex';

