import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { LayoutSpacingProvider } from '../providers/LayoutSpacingProvider';
import { useSpacingTheme } from '../spacing-system/context';
import { useResponsiveContext } from '../responsive-hooks/context';
import { renderHook } from '@testing-library/react';

// Mock window dimensions for responsive tests
Object.defineProperty(window, 'innerWidth', { writable: true, configurable: true, value: 1024 });
Object.defineProperty(window, 'innerHeight', { writable: true, configurable: true, value: 768 });

describe('LayoutSpacingProvider', () => {
  test('renders children', () => {
    render(
      React.createElement(
        LayoutSpacingProvider,
        null,
        React.createElement('div', null, 'Hello')
      )
    );
    expect(screen.getByText('Hello')).toBeTruthy();
  });

  test('provides spacing context to children', () => {
    const { result } = renderHook(
      () => useSpacingTheme(),
      {
        wrapper: ({ children }) =>
          React.createElement(LayoutSpacingProvider, null, children),
      }
    );
    expect(result.current.config.baseUnit).toBe(8);
    expect(result.current.scale).toBeDefined();
    expect(result.current.cssVars).toBeDefined();
  });

  test('provides responsive context to children', () => {
    const { result } = renderHook(
      () => useResponsiveContext(),
      {
        wrapper: ({ children }) =>
          React.createElement(LayoutSpacingProvider, null, children),
      }
    );
    expect(result.current.currentBreakpoint).toBeDefined();
    expect(result.current.windowWidth).toBe(1024);
    expect(result.current.windowHeight).toBe(768);
  });

  test('accepts custom spacing config', () => {
    const { result } = renderHook(
      () => useSpacingTheme(),
      {
        wrapper: ({ children }) =>
          React.createElement(
            LayoutSpacingProvider,
            { spacing: { baseUnit: 4 } },
            children
          ),
      }
    );
    expect(result.current.config.baseUnit).toBe(4);
  });

  test('accepts custom responsive config', () => {
    const { result } = renderHook(
      () => useResponsiveContext(),
      {
        wrapper: ({ children }) =>
          React.createElement(
            LayoutSpacingProvider,
            { responsive: { breakpoints: { md: 900 } } },
            children
          ),
      }
    );
    // window is 1024px, with custom md=900, should be above md
    expect(result.current.breakpoints.md).toBe(900);
  });

  test('provides both contexts simultaneously', () => {
    const { result: spacingResult } = renderHook(
      () => useSpacingTheme(),
      {
        wrapper: ({ children }) =>
          React.createElement(LayoutSpacingProvider, null, children),
      }
    );
    const { result: responsiveResult } = renderHook(
      () => useResponsiveContext(),
      {
        wrapper: ({ children }) =>
          React.createElement(LayoutSpacingProvider, null, children),
      }
    );
    expect(spacingResult.current.scale).toBeDefined();
    expect(responsiveResult.current.currentBreakpoint).toBeDefined();
  });
});

