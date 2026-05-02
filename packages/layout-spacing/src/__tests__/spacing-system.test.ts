import {
  DEFAULT_SPACING_SCALE,
  DEFAULT_SPACING_CONFIG,
  generateScale,
  toCSSValue,
  generateCSSVars,
  createSpacingTheme,
} from '../spacing-system/tokens';
import { SpacingProvider, useSpacingTheme, useSpacingConfig, useHasSpacingProvider } from '../spacing-system/context';
import { useSpacing } from '../spacing-system/hooks';
import {
  resolveSpacingToken,
  applySpacingStyles,
  mergeSpacingStyles,
  spacingStyleString,
  clampSpacing,
} from '../spacing-system/utils';
import { renderHook } from '@testing-library/react';
import React from 'react';

describe('Spacing System - Tokens', () => {
  test('DEFAULT_SPACING_SCALE should have correct values', () => {
    expect(DEFAULT_SPACING_SCALE[0]).toBe(0);
    expect(DEFAULT_SPACING_SCALE[1]).toBe(4);
    expect(DEFAULT_SPACING_SCALE[2]).toBe(8);
    expect(DEFAULT_SPACING_SCALE[4]).toBe(16);
    expect(DEFAULT_SPACING_SCALE[8]).toBe(32);
    expect(DEFAULT_SPACING_SCALE[16]).toBe(64);
  });

  test('DEFAULT_SPACING_CONFIG should have baseUnit of 8', () => {
    expect(DEFAULT_SPACING_CONFIG.baseUnit).toBe(8);
    expect(DEFAULT_SPACING_CONFIG.useRem).toBe(false);
    expect(DEFAULT_SPACING_CONFIG.rootFontSize).toBe(16);
  });

  test('generateScale should return correct scale', () => {
    const scale = generateScale();
    expect(scale['0']).toBe(0);
    expect(scale['1']).toBe(4);
    expect(scale['2']).toBe(8);
    expect(scale['4']).toBe(16);
    expect(scale['auto']).toBe('auto');
  });

  test('generateScale with useRem should convert to rem', () => {
    const scale = generateScale({ useRem: true });
    expect(scale['1']).toBe('0.25rem');
    expect(scale['2']).toBe('0.5rem');
    expect(scale['4']).toBe('1rem');
  });

  test('generateScale with scaleOverrides should override values', () => {
    const scale = generateScale({ scaleOverrides: { 4: 20 } });
    expect(scale['4']).toBe(20);
  });

  test('toCSSValue should convert token to px string', () => {
    expect(toCSSValue(0)).toBe('0px');
    expect(toCSSValue(1)).toBe('4px');
    expect(toCSSValue(2)).toBe('8px');
    expect(toCSSValue(4)).toBe('16px');
  });

  test('toCSSValue should pass through string values', () => {
    expect(toCSSValue('auto')).toBe('auto');
    expect(toCSSValue('10px')).toBe('10px');
    expect(toCSSValue('1rem')).toBe('1rem');
    expect(toCSSValue('50%')).toBe('50%');
  });

  test('toCSSValue with useRem config should convert to rem', () => {
    expect(toCSSValue(4, { baseUnit: 8, useRem: true, rootFontSize: 16 })).toBe('1rem');
    expect(toCSSValue(2, { baseUnit: 8, useRem: true, rootFontSize: 16 })).toBe('0.5rem');
  });

  test('generateCSSVars should return CSS custom properties', () => {
    const vars = generateCSSVars();
    expect(vars['--ls-spacing-0']).toBe('0px');
    expect(vars['--ls-spacing-2']).toBe('8px');
    expect(vars['--ls-spacing-4']).toBe('16px');
    expect(vars['--ls-spacing-auto']).toBe('auto');
  });

  test('createSpacingTheme should return complete theme object', () => {
    const theme = createSpacingTheme();
    expect(theme).toHaveProperty('config');
    expect(theme).toHaveProperty('scale');
    expect(theme).toHaveProperty('cssVars');
    expect(theme.config.baseUnit).toBe(8);
    expect(Object.keys(theme.scale).length).toBeGreaterThan(0);
    expect(Object.keys(theme.cssVars).length).toBeGreaterThan(0);
  });
});

describe('Spacing System - Context', () => {
  test('useHasSpacingProvider returns false outside provider', () => {
    const { result } = renderHook(() => useHasSpacingProvider());
    expect(result.current).toBe(false);
  });

  test('useHasSpacingProvider returns true inside provider', () => {
    const { result } = renderHook(
      () => useHasSpacingProvider(),
      { wrapper: ({ children }) => React.createElement(SpacingProvider, { children }) }
    );
    expect(result.current).toBe(true);
  });

  test('useSpacingTheme returns theme inside provider', () => {
    const { result } = renderHook(
      () => useSpacingTheme(),
      { wrapper: ({ children }) => React.createElement(SpacingProvider, { children }) }
    );
    expect(result.current.config.baseUnit).toBe(8);
    expect(result.current.scale).toBeDefined();
    expect(result.current.cssVars).toBeDefined();
  });

  test('useSpacingConfig returns config inside provider', () => {
    const { result } = renderHook(
      () => useSpacingConfig(),
      { wrapper: ({ children }) => React.createElement(SpacingProvider, { children }) }
    );
    expect(result.current.baseUnit).toBe(8);
  });

  test('useSpacingTheme throws outside provider', () => {
    // Suppress console.error for this test
    const spy = jest.spyOn(console, 'error').mockImplementation(() => {});
    expect(() => {
      renderHook(() => useSpacingTheme());
    }).toThrow('useSpacingTheme must be used within a <SpacingProvider>');
    spy.mockRestore();
  });

  test('SpacingProvider accepts custom config', () => {
    const { result } = renderHook(
      () => useSpacingTheme(),
      {
        wrapper: ({ children }) =>
          React.createElement(SpacingProvider, { config: { baseUnit: 4 } }, children),
      }
    );
    expect(result.current.config.baseUnit).toBe(4);
  });
});

describe('Spacing System - Utils', () => {
  test('resolveSpacingToken should return pixel values for tokens', () => {
    expect(resolveSpacingToken(0)).toBe(0);
    expect(resolveSpacingToken(1)).toBe(4);
    expect(resolveSpacingToken(2)).toBe(8);
    expect(resolveSpacingToken(4)).toBe(16);
  });

  test('resolveSpacingToken should pass through string values', () => {
    expect(resolveSpacingToken('auto')).toBe('auto');
    expect(resolveSpacingToken('10px')).toBe('10px');
  });

  test('applySpacingStyles should apply margin', () => {
    const result = applySpacingStyles({}, 'margin', 4, 'all');
    expect(result.margin).toBe('16px');
  });

  test('applySpacingStyles should apply padding with direction', () => {
    const result = applySpacingStyles({}, 'padding', 2, 'top');
    expect(result.paddingTop).toBe('8px');
  });

  test('applySpacingStyles should apply gap', () => {
    const result = applySpacingStyles({}, 'gap', 3);
    expect(result.gap).toBe('12px');
  });

  test('applySpacingStyles should handle x direction for margin', () => {
    const result = applySpacingStyles({}, 'margin', 2, 'x');
    expect(result.marginLeft).toBe('8px');
    expect(result.marginRight).toBe('8px');
  });

  test('applySpacingStyles should handle y direction for padding', () => {
    const result = applySpacingStyles({}, 'padding', 4, 'y');
    expect(result.paddingTop).toBe('16px');
    expect(result.paddingBottom).toBe('16px');
  });

  test('mergeSpacingStyles should merge multiple styles', () => {
    const result = mergeSpacingStyles(
      { margin: '8px' },
      { padding: '16px' },
      undefined
    );
    expect(result).toEqual({ margin: '8px', padding: '16px' });
  });

  test('spacingStyleString should return correct CSS string', () => {
    expect(spacingStyleString('margin', 4)).toBe('margin: 16px');
    expect(spacingStyleString('padding', 2, 'top')).toBe('padding-top: 8px');
    expect(spacingStyleString('margin', 3, 'x')).toBe('margin-left: 12px; margin-right: 12px');
  });

  test('clampSpacing should clamp between min and max', () => {
    expect(clampSpacing(4)).toBe(16);
    expect(clampSpacing(4, 1)).toBe(16);
    expect(clampSpacing(4, 8)).toBe(32); // min token 8 = 32px, clamped up to min
    expect(clampSpacing(16, undefined, 8)).toBe(32); // max token 8 = 32px, token 16 = 64px clamped down
  });
});

