import { useMemo, useCallback } from 'react';
import {
  BreakpointResult,
  BreakpointKey,
  MediaQueryCondition,
} from './types';
import {
  DEFAULT_BREAKPOINTS,
  BREAKPOINT_ORDER,
  getActiveBreakpoints,
  buildMediaQuery,
} from './tokens';
import { useResponsiveContext, useHasResponsiveProvider } from './context';

/**
 * A unified hook that handles breakpoint detection on Web and React Native.
 *
 * @example
 * const { breakpoint, isAbove, isBelow, width, height } = useBreakpoint();
 * if (isAbove('md')) {
 *   // Render desktop layout
 * }
 */
export function useBreakpoint(): BreakpointResult {
  const hasProvider = useHasResponsiveProvider();
  const ctx = useResponsiveContext();

  const { breakpoints, currentBreakpoint, windowWidth, windowHeight, orientation } = ctx;

  const breakpointIndex = BREAKPOINT_ORDER.indexOf(currentBreakpoint);

  const isAbove = useCallback(
    (bp: BreakpointKey): boolean => {
      const targetIndex = BREAKPOINT_ORDER.indexOf(bp);
      return breakpointIndex >= targetIndex;
    },
    [breakpointIndex]
  );

  const isBelow = useCallback(
    (bp: BreakpointKey): boolean => {
      const targetIndex = BREAKPOINT_ORDER.indexOf(bp);
      return breakpointIndex <= targetIndex;
    },
    [breakpointIndex]
  );

  const is = useCallback(
    (bp: BreakpointKey): boolean => {
      if (bp === currentBreakpoint) return true;
      const targetIndex = BREAKPOINT_ORDER.indexOf(bp);
      const nextIndex = targetIndex + 1;
      if (nextIndex < BREAKPOINT_ORDER.length) {
        return windowWidth >= breakpoints[bp] && windowWidth < breakpoints[BREAKPOINT_ORDER[nextIndex]];
      }
      return windowWidth >= breakpoints[bp];
    },
    [currentBreakpoint, windowWidth, breakpoints]
  );

  const activeBreakpoints = useMemo(
    () => getActiveBreakpoints(windowWidth, breakpoints),
    [windowWidth, breakpoints]
  );

  return {
    breakpoint: currentBreakpoint,
    isAbove,
    isBelow,
    is,
    width: windowWidth,
    height: windowHeight,
    orientation,
    activeBreakpoints,
  };
}

/**
 * Hook for programmatic media query matching
 * Works on Web with matchMedia, and on React Native with Dimension calculations
 *
 * @example
 * const isMobile = useMediaQuery({ maxWidth: 767 });
 */
export function useMediaQuery(conditions: MediaQueryCondition): boolean {
  const { windowWidth, windowHeight, orientation } = useResponsiveContext();

  return useMemo(() => {
    if (conditions.minWidth !== undefined && windowWidth < conditions.minWidth) return false;
    if (conditions.maxWidth !== undefined && windowWidth > conditions.maxWidth) return false;
    if (conditions.minHeight !== undefined && windowHeight < conditions.minHeight) return false;
    if (conditions.maxHeight !== undefined && windowHeight > conditions.maxHeight) return false;
    if (conditions.orientation !== undefined && orientation !== conditions.orientation) return false;
    return true;
  }, [conditions, windowWidth, windowHeight, orientation]);
}

/**
 * Hook that returns a value based on the current breakpoint
 *
 * @example
 * const columns = useResponsiveValue({ xs: 1, sm: 2, md: 3, lg: 4 });
 */
export function useResponsiveValue<T>(values: Partial<Record<BreakpointKey, T>>): T | undefined {
  const { breakpoint } = useBreakpoint();
  const currentIndex = BREAKPOINT_ORDER.indexOf(breakpoint);

  // Walk from current breakpoint down to find the closest defined value
  for (let i = currentIndex; i >= 0; i--) {
    const bp = BREAKPOINT_ORDER[i];
    if (values[bp] !== undefined) {
      return values[bp];
    }
  }
  return undefined;
}

/**
 * Hook to get the current orientation
 */
export function useOrientation(): 'portrait' | 'landscape' {
  const { orientation } = useResponsiveContext();
  return orientation;
}

export { buildMediaQuery, DEFAULT_BREAKPOINTS, BREAKPOINT_ORDER };

