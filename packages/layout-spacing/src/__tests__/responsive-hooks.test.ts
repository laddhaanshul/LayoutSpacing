import {
  DEFAULT_BREAKPOINTS,
  BREAKPOINT_ORDER,
  getBreakpointForWidth,
  buildMediaQuery,
  getActiveBreakpoints,
} from '../responsive-hooks/tokens';
import {
  ResponsiveProvider,
  useResponsiveContext,
  useHasResponsiveProvider,
} from '../responsive-hooks/context';
import { renderHook, act } from '@testing-library/react';
import React from 'react';

// Mock window dimensions
function mockWindowDimensions(width: number, height: number) {
  Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: width });
  Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: height });
}

describe('Responsive Hooks - Tokens', () => {
  test('DEFAULT_BREAKPOINTS has all keys', () => {
    expect(DEFAULT_BREAKPOINTS).toHaveProperty('xs');
    expect(DEFAULT_BREAKPOINTS).toHaveProperty('sm');
    expect(DEFAULT_BREAKPOINTS).toHaveProperty('md');
    expect(DEFAULT_BREAKPOINTS).toHaveProperty('lg');
    expect(DEFAULT_BREAKPOINTS).toHaveProperty('xl');
    expect(DEFAULT_BREAKPOINTS).toHaveProperty('xxl');
  });

  test('DEFAULT_BREAKPOINTS values are ordered', () => {
    expect(DEFAULT_BREAKPOINTS.xs).toBeLessThan(DEFAULT_BREAKPOINTS.sm);
    expect(DEFAULT_BREAKPOINTS.sm).toBeLessThan(DEFAULT_BREAKPOINTS.md);
    expect(DEFAULT_BREAKPOINTS.md).toBeLessThan(DEFAULT_BREAKPOINTS.lg);
    expect(DEFAULT_BREAKPOINTS.lg).toBeLessThan(DEFAULT_BREAKPOINTS.xl);
    expect(DEFAULT_BREAKPOINTS.xl).toBeLessThan(DEFAULT_BREAKPOINTS.xxl);
  });

  test('BREAKPOINT_ORDER is in ascending order', () => {
    expect(BREAKPOINT_ORDER).toEqual(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
  });

  test('getBreakpointForWidth returns xs for 0 width', () => {
    expect(getBreakpointForWidth(0)).toBe('xs');
  });

  test('getBreakpointForWidth returns sm for 600px', () => {
    expect(getBreakpointForWidth(600)).toBe('sm');
  });

  test('getBreakpointForWidth returns md for 800px', () => {
    expect(getBreakpointForWidth(800)).toBe('md');
  });

  test('getBreakpointForWidth returns lg for 1000px', () => {
    expect(getBreakpointForWidth(1000)).toBe('lg');
  });

  test('getBreakpointForWidth returns xl for 1300px', () => {
    expect(getBreakpointForWidth(1300)).toBe('xl');
  });

  test('getBreakpointForWidth returns xxl for 1500px', () => {
    expect(getBreakpointForWidth(1500)).toBe('xxl');
  });

  test('getBreakpointForWidth handles boundary values', () => {
    expect(getBreakpointForWidth(576)).toBe('sm');
    expect(getBreakpointForWidth(768)).toBe('md');
    expect(getBreakpointForWidth(992)).toBe('lg');
    expect(getBreakpointForWidth(1200)).toBe('xl');
    expect(getBreakpointForWidth(1440)).toBe('xxl');
  });

  test('buildMediaQuery creates correct query', () => {
    expect(buildMediaQuery({ minWidth: 768 })).toBe('(min-width: 768px)');
    expect(buildMediaQuery({ maxWidth: 1024 })).toBe('(max-width: 1024px)');
    expect(buildMediaQuery({ minWidth: 768, maxWidth: 1024 })).toBe('(min-width: 768px) and (max-width: 1024px)');
    expect(buildMediaQuery({ orientation: 'portrait' })).toBe('(orientation: portrait)');
  });

  test('getActiveBreakpoints returns correct breakpoints', () => {
    expect(getActiveBreakpoints(0)).toEqual(['xs']);
    expect(getActiveBreakpoints(600)).toEqual(['xs', 'sm']);
    expect(getActiveBreakpoints(800)).toEqual(['xs', 'sm', 'md']);
    expect(getActiveBreakpoints(1200)).toEqual(['xs', 'sm', 'md', 'lg', 'xl']);
    expect(getActiveBreakpoints(2000)).toEqual(['xs', 'sm', 'md', 'lg', 'xl', 'xxl']);
  });
});

describe('Responsive Hooks - Context', () => {
  beforeEach(() => {
    mockWindowDimensions(1024, 768);
  });

  test('useHasResponsiveProvider returns false outside provider', () => {
    const { result } = renderHook(() => useHasResponsiveProvider());
    expect(result.current).toBe(false);
  });

  test('useHasResponsiveProvider returns true inside provider', () => {
    const { result } = renderHook(
      () => useHasResponsiveProvider(),
      { wrapper: ({ children }) => React.createElement(ResponsiveProvider, { children }) }
    );
    expect(result.current).toBe(true);
  });

  test('useResponsiveContext returns correct breakpoint', () => {
    mockWindowDimensions(1024, 768);
    const { result } = renderHook(
      () => useResponsiveContext(),
      { wrapper: ({ children }) => React.createElement(ResponsiveProvider, { children }) }
    );
    expect(result.current.currentBreakpoint).toBe('lg');
    expect(result.current.windowWidth).toBe(1024);
    expect(result.current.windowHeight).toBe(768);
  });

  test('ResponsiveProvider accepts custom breakpoints', () => {
    mockWindowDimensions(900, 600);
    const { result } = renderHook(
      () => useResponsiveContext(),
      {
        wrapper: ({ children }) =>
          React.createElement(
            ResponsiveProvider,
            { breakpoints: { md: 900 } },
            children
          ),
      }
    );
    expect(result.current.currentBreakpoint).toBe('md');
  });

  test('useResponsiveContext throws outside provider', () => {
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => renderHook(() => useResponsiveContext())).toThrow('useResponsiveContext must be used within a <ResponsiveProvider>');
    spy.mockRestore();
  });
});

