import React, { createContext, useContext, useState, useEffect, useCallback, useMemo } from 'react';
import {
  ResponsiveProviderProps,
  ResponsiveContextValue,
  BreakpointsConfig,
  BreakpointKey,
} from './types';
import { DEFAULT_BREAKPOINTS, getBreakpointForWidth, BREAKPOINT_ORDER } from './tokens';

const ResponsiveContext = createContext<ResponsiveContextValue | null>(null);

/**
 * Detect whether we're running in a React Native environment
 */
function isReactNative(): boolean {
  return typeof navigator !== 'undefined' && typeof navigator.product === 'string'
    ? navigator.product === 'ReactNative'
    : typeof window !== 'undefined'
    ? !('matchMedia' in window)
    : false;
}

/**
 * Get window dimensions in a cross-platform way
 */
function getDimensions(): { width: number; height: number } {
  if (isReactNative()) {
    // Dynamic require for React Native
    try {
      const { Dimensions } = require('react-native');
      const dim = Dimensions.get('window');
      return { width: dim.width, height: dim.height };
    } catch {
      return { width: 1024, height: 768 };
    }
  }
  return {
    width: window.innerWidth,
    height: window.innerHeight,
  };
}

/**
 * ResponsiveProvider that manages breakpoint state for both Web and React Native
 */
export function ResponsiveProvider({
  children,
  breakpoints: breakpointsProp,
  initialWidth = 1024,
  initialHeight = 768,
}: ResponsiveProviderProps): React.ReactElement {
  const breakpoints: BreakpointsConfig = useMemo(
    () => ({ ...DEFAULT_BREAKPOINTS, ...breakpointsProp }),
    [breakpointsProp]
  );

  const [dimensions, setDimensions] = useState<{ width: number; height: number }>(() => {
    // Try to get actual dimensions if available (for client-side)
    try {
      return getDimensions();
    } catch {
      return { width: initialWidth, height: initialHeight };
    }
  });

  const handleResize = useCallback(() => {
    setDimensions(getDimensions());
  }, []);

  useEffect(() => {
    if (isReactNative()) {
      try {
        const { Dimensions } = require('react-native');
        const subscription = Dimensions.addEventListener('change', ({ window: dim }: { window: { width: number; height: number } }) => {
          setDimensions({ width: dim.width, height: dim.height });
        });
        return () => subscription.remove();
      } catch {
        // Not in React Native, fallback to web
      }
    }

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [handleResize]);

  const currentBreakpoint = getBreakpointForWidth(dimensions.width, breakpoints);
  const orientation: 'portrait' | 'landscape' =
    dimensions.width >= dimensions.height ? 'landscape' : 'portrait';

  const value: ResponsiveContextValue = useMemo(
    () => ({
      breakpoints,
      currentBreakpoint,
      windowWidth: dimensions.width,
      windowHeight: dimensions.height,
      orientation,
    }),
    [breakpoints, currentBreakpoint, dimensions.width, dimensions.height, orientation]
  );

  return React.createElement(ResponsiveContext.Provider, { value }, children);
}

/**
 * Hook to access the responsive context
 */
export function useResponsiveContext(): ResponsiveContextValue {
  const ctx = useContext(ResponsiveContext);
  if (!ctx) {
    throw new Error(
      'useResponsiveContext must be used within a <ResponsiveProvider>.'
    );
  }
  return ctx;
}

/**
 * Check if a ResponsiveProvider is in the tree
 */
export function useHasResponsiveProvider(): boolean {
  return useContext(ResponsiveContext) !== null;
}

export { ResponsiveContext };

