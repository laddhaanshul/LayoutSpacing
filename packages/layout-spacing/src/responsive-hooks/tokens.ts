import { BreakpointsConfig, BreakpointKey, MediaQueryCondition } from './types';

/**
 * Default breakpoint configuration.
 * Following common responsive design patterns:
 * - xs: Mobile (0px+)
 * - sm: Large mobile / small tablet (576px+)
 * - md: Tablet (768px+)
 * - lg: Desktop (992px+)
 * - xl: Large desktop (1200px+)
 * - xxl: Extra large desktop (1440px+)
 */
export const DEFAULT_BREAKPOINTS: BreakpointsConfig = {
  xs: 0,
  sm: 576,
  md: 768,
  lg: 992,
  xl: 1200,
  xxl: 1440,
};

/**
 * Ordered breakpoint keys from smallest to largest
 */
export const BREAKPOINT_ORDER: BreakpointKey[] = ['xs', 'sm', 'md', 'lg', 'xl', 'xxl'];

/**
 * Get the current breakpoint key for a given width
 */
export function getBreakpointForWidth(
  width: number,
  breakpoints: BreakpointsConfig = DEFAULT_BREAKPOINTS
): BreakpointKey {
  // Walk from largest to smallest and find the first one that matches
  const reversed = [...BREAKPOINT_ORDER].reverse();
  for (const bp of reversed) {
    if (width >= breakpoints[bp]) {
      return bp;
    }
  }
  return 'xs';
}

/**
 * Build a media query string from conditions
 */
export function buildMediaQuery(conditions: MediaQueryCondition): string {
  const parts: string[] = [];

  if (conditions.minWidth !== undefined) {
    parts.push(`(min-width: ${conditions.minWidth}px)`);
  }
  if (conditions.maxWidth !== undefined) {
    parts.push(`(max-width: ${conditions.maxWidth}px)`);
  }
  if (conditions.minHeight !== undefined) {
    parts.push(`(min-height: ${conditions.minHeight}px)`);
  }
  if (conditions.maxHeight !== undefined) {
    parts.push(`(max-height: ${conditions.maxHeight}px)`);
  }
  if (conditions.orientation !== undefined) {
    parts.push(`(orientation: ${conditions.orientation})`);
  }

  return parts.join(' and ');
}

/**
 * Get all breakpoints that are active (screen width is >= breakpoint value)
 */
export function getActiveBreakpoints(
  currentWidth: number,
  breakpoints: BreakpointsConfig = DEFAULT_BREAKPOINTS
): BreakpointKey[] {
  return BREAKPOINT_ORDER.filter((bp) => currentWidth >= breakpoints[bp]);
}

