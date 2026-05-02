import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { AspectRatio } from '../aspect-ratio/AspectRatio';
import {
  ASPECT_RATIOS,
  parseAspectRatio,
  calculateHeight,
  calculateWidth,
} from '../aspect-ratio/tokens';
import { useAspectRatio } from '../aspect-ratio/hooks';
import { renderHook } from '@testing-library/react';

describe('Aspect Ratio - Tokens', () => {
  test('ASPECT_RATIOS has all presets', () => {
    expect(ASPECT_RATIOS.square).toBe(1);
    expect(ASPECT_RATIOS.video).toBeCloseTo(16 / 9);
    expect(ASPECT_RATIOS.standard).toBeCloseTo(4 / 3);
    expect(ASPECT_RATIOS.cinematic).toBeCloseTo(21 / 9);
    expect(ASPECT_RATIOS.portrait).toBeCloseTo(3 / 4);
    expect(ASPECT_RATIOS.golden).toBeCloseTo(1.618);
  });

  test('parseAspectRatio handles numbers', () => {
    expect(parseAspectRatio(1)).toBe(1);
    expect(parseAspectRatio(16 / 9)).toBeCloseTo(16 / 9);
    expect(parseAspectRatio(0.5)).toBe(0.5);
  });

  test('parseAspectRatio handles fraction strings', () => {
    expect(parseAspectRatio('16/9')).toBeCloseTo(16 / 9);
    expect(parseAspectRatio('4:3')).toBeCloseTo(4 / 3);
    expect(parseAspectRatio('21:9')).toBeCloseTo(21 / 9);
  });

  test('parseAspectRatio handles plain number strings', () => {
    expect(parseAspectRatio('1.5')).toBe(1.5);
    expect(parseAspectRatio('2')).toBe(2);
  });

  test('parseAspectRatio defaults to 1 for invalid input', () => {
    expect(parseAspectRatio('invalid')).toBe(1);
    expect(parseAspectRatio('')).toBe(1);
  });

  test('calculateHeight computes height from width and ratio', () => {
    expect(calculateHeight(1600, 16 / 9)).toBeCloseTo(900);
    expect(calculateHeight(100, 1)).toBe(100);
    expect(calculateHeight(400, 4 / 3)).toBeCloseTo(300);
  });

  test('calculateWidth computes width from height and ratio', () => {
    expect(calculateWidth(900, 16 / 9)).toBeCloseTo(1600);
    expect(calculateWidth(100, 1)).toBe(100);
    expect(calculateWidth(300, 4 / 3)).toBeCloseTo(400);
  });
});

describe('AspectRatio Component', () => {
  test('renders with default ratio of 1 (square)', () => {
    render(React.createElement(AspectRatio, null, 'Content'));
    const container = screen.getByTestId('aspect-ratio');
    expect(container).toBeTruthy();
  });

  test('renders children inside the container', () => {
    render(React.createElement(AspectRatio, { ratio: 16 / 9 }, 'My Content'));
    expect(screen.getByText('My Content')).toBeTruthy();
  });

  test('applies aspect-ratio CSS property', () => {
    const { container } = render(
      React.createElement(AspectRatio, { ratio: 16 / 9 }, 'Content')
    );
    const aspectDiv = container.querySelector('[data-testid="aspect-ratio"] > div');
    expect(aspectDiv).toBeTruthy();
    expect((aspectDiv as HTMLElement).style.paddingBottom).toBe('56.25%');
    expect((aspectDiv as HTMLElement).style.height).toBe('0px');
  });

  test('applies paddingBottom fallback', () => {
    const { container } = render(
      React.createElement(AspectRatio, { ratio: 4 / 3 }, 'Content')
    );
    const aspectDiv = container.querySelector('[data-testid="aspect-ratio"] > div');
    expect(aspectDiv).toBeTruthy();
    expect((aspectDiv as HTMLElement).style.paddingBottom).toBe('75%');
    expect((aspectDiv as HTMLElement).style.height).toBe('0px');
  });

  test('accepts custom maxWidth', () => {
    render(React.createElement(AspectRatio, { maxWidth: 300 }, 'Content'));
    const container = screen.getByTestId('aspect-ratio');
    expect(container).toHaveStyle({ maxWidth: '300px' });
  });

  test('accepts string ratio', () => {
    render(React.createElement(AspectRatio, { ratio: '4:3' }, 'Content'));
    expect(screen.getByText('Content')).toBeTruthy();
  });

  test('accepts preset ratio', () => {
    render(React.createElement(AspectRatio, { ratio: ASPECT_RATIOS.video }, 'Content'));
    expect(screen.getByText('Content')).toBeTruthy();
  });

  test('renders with custom element via as prop', () => {
    render(React.createElement(AspectRatio, { as: 'section' }, 'Content'));
    const container = screen.getByTestId('aspect-ratio');
    expect(container.tagName).toBe('SECTION');
  });

  test('applies custom className', () => {
    render(React.createElement(AspectRatio, { className: 'custom-class' }, 'Content'));
    const container = screen.getByTestId('aspect-ratio');
    expect(container.className).toBe('custom-class');
  });
});

describe('AspectRatio - Hooks', () => {
  test('useAspectRatio calculates height from width', () => {
    const { result } = renderHook(() => useAspectRatio(16 / 9, { width: 800 }));
    expect(result.current.width).toBe(800);
    expect(result.current.height).toBeCloseTo(450);
  });

  test('useAspectRatio calculates width from height', () => {
    const { result } = renderHook(() => useAspectRatio(16 / 9, { height: 450 }));
    expect(result.current.width).toBeCloseTo(800);
    expect(result.current.height).toBe(450);
  });

  test('useAspectRatio handles string ratio', () => {
    const { result } = renderHook(() => useAspectRatio('4:3', { width: 400 }));
    expect(result.current.height).toBeCloseTo(300);
  });

  test('useAspectRatio returns undefined without width or height', () => {
    const { result } = renderHook(() => useAspectRatio(16 / 9));
    expect(result.current.width).toBeUndefined();
    expect(result.current.height).toBeUndefined();
  });
});

