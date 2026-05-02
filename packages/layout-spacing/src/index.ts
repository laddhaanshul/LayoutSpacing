/**
 * @laddhaanshul/layout-spacing
 *
 * A unified layout, spacing, responsive, and aspect-ratio system
 * for React & React Native.
 */

// Spacing System
export {
  SpacingProvider,
  useSpacingTheme,
  useSpacingConfig,
  useHasSpacingProvider,
  SpacingContext,
} from './spacing-system/context';
export {
  useSpacing,
} from './spacing-system/hooks';
export {
  DEFAULT_SPACING_SCALE,
  DEFAULT_SPACING_CONFIG,
  generateScale,
  toCSSValue,
  generateCSSVars,
  createSpacingTheme,
} from './spacing-system/tokens';
export {
  resolveSpacingToken,
  applySpacingStyles,
  mergeSpacingStyles,
  spacingStyleString,
  clampSpacing,
} from './spacing-system/utils';
export type {
  SpacingToken,
  SpacingValue,
  SpacingDirection,
  SpacingConfig,
  SpacingTheme,
  SpacingProviderProps,
} from './spacing-system/types';

// Layout Primitives
export { Box } from './layout-primitives/Box';
export { Flex } from './layout-primitives/Flex';
export { Stack } from './layout-primitives/Stack';
export {
  resolveSpacingStyles,
  resolveBaseStyles,
  mergeStyles,
} from './layout-primitives/utils';
export type {
  BoxProps,
  FlexProps,
  StackProps,
  BaseStyleProps,
  SpacingProps,
} from './layout-primitives/types';

// Responsive Hooks
export {
  ResponsiveProvider,
  useResponsiveContext,
  useHasResponsiveProvider,
  ResponsiveContext,
} from './responsive-hooks/context';
export {
  useBreakpoint,
  useMediaQuery,
  useResponsiveValue,
  useOrientation,
  buildMediaQuery,
  DEFAULT_BREAKPOINTS,
  BREAKPOINT_ORDER,
} from './responsive-hooks/hooks';
export {
  getBreakpointForWidth,
} from './responsive-hooks/tokens';
export type {
  BreakpointKey,
  BreakpointsConfig,
  ResponsiveContextValue,
  ResponsiveProviderProps,
  BreakpointResult,
  MediaQueryCondition,
} from './responsive-hooks/types';

// Aspect Ratio
export { AspectRatio } from './aspect-ratio/AspectRatio';
export {
  useAspectRatio,
  useContainerAspectRatio,
} from './aspect-ratio/hooks';
export {
  ASPECT_RATIOS,
  parseAspectRatio,
  calculateHeight,
  calculateWidth,
} from './aspect-ratio/tokens';
export type {
  AspectRatioProps,
  AspectRatioValue,
  PresetAspectRatios,
} from './aspect-ratio/types';

// Providers (combined)
export { LayoutSpacingProvider } from './providers/LayoutSpacingProvider';

