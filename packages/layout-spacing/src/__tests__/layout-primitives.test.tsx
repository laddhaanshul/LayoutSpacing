import React from 'react';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { Box } from '../layout-primitives/Box';
import { Flex } from '../layout-primitives/Flex';
import { Stack } from '../layout-primitives/Stack';
import { resolveSpacingStyles, resolveBaseStyles, mergeStyles } from '../layout-primitives/utils';
import { SpacingProvider } from '../spacing-system/context';

const wrapper = ({ children }: { children: React.ReactNode }) =>
  React.createElement(SpacingProvider, null, children);

describe('Layout Primitives - Utils', () => {
  test('resolveSpacingStyles should map spacing props to CSS', () => {
    const styles = resolveSpacingStyles({ m: 4, p: 2, mt: 1 });
    expect(styles.margin).toBe('16px');
    expect(styles.padding).toBe('8px');
    expect(styles.marginTop).toBe('4px');
  });

  test('resolveSpacingStyles should handle shorthand mx, my, px, py', () => {
    const styles = resolveSpacingStyles({ mx: 3, py: 2 });
    expect(styles.marginLeft).toBe('12px');
    expect(styles.marginRight).toBe('12px');
    expect(styles.paddingTop).toBe('8px');
    expect(styles.paddingBottom).toBe('8px');
  });

  test('resolveBaseStyles should map base props to CSS', () => {
    const styles = resolveBaseStyles({ w: 100, h: 200, bg: 'blue', opacity: 0.5 });
    expect(styles.width).toBe(100);
    expect(styles.height).toBe(200);
    expect(styles.backgroundColor).toBe('blue');
    expect(styles.opacity).toBe(0.5);
  });

  test('resolveBaseStyles should handle undefined/null values', () => {
    const styles = resolveBaseStyles({ w: undefined, h: null as any });
    expect(styles.width).toBeUndefined();
    expect(styles.height).toBeUndefined();
  });

  test('mergeStyles should merge user styles with computed', () => {
    const computed = { display: 'flex', padding: '8px' };
    const result = mergeStyles(computed, { padding: '16px', margin: '8px' });
    expect(result.padding).toBe('16px');
    expect(result.margin).toBe('8px');
    expect(result.display).toBe('flex');
  });

  test('mergeStyles should return computed if no user style', () => {
    const computed = { display: 'flex' };
    const result = mergeStyles(computed);
    expect(result).toEqual(computed);
  });
});

describe('Box Component', () => {
  test('renders with default div element', () => {
    render(React.createElement(Box, null, 'Test'));
    const el = screen.getByText('Test');
    expect(el.tagName).toBe('DIV');
  });

  test('renders with custom element via as prop', () => {
    render(React.createElement(Box, { as: 'section' }, 'Test'));
    const el = screen.getByText('Test');
    expect(el.tagName).toBe('SECTION');
  });

  test('applies margin spacing', () => {
    render(React.createElement(Box, { m: 4 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ margin: '16px' });
  });

  test('applies padding spacing', () => {
    render(React.createElement(Box, { p: 2 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ padding: '8px' });
  });

  test('applies directional margins', () => {
    render(React.createElement(Box, { mt: 2, mb: 4, ml: 1, mr: 3 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({
      marginTop: '8px',
      marginBottom: '16px',
      marginLeft: '4px',
      marginRight: '12px',
    });
  });

  test('applies mx and my shorthand', () => {
    render(React.createElement(Box, { mx: 2, py: 3 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({
      marginLeft: '8px',
      marginRight: '8px',
      paddingTop: '12px',
      paddingBottom: '12px',
    });
  });

  test('applies base style props', () => {
    render(React.createElement(Box, { w: 100, h: 200, bg: 'red', borderRadius: 8 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({
      width: '100px',
      height: '200px',
      backgroundColor: 'red',
      borderRadius: '8px',
    });
  });

  test('applies custom inline styles', () => {
    render(React.createElement(Box, { style: { color: 'red' } }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ color: 'red' });
  });

  test('custom styles override computed styles', () => {
    render(React.createElement(Box, { p: 2, style: { padding: '20px' } }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ padding: '20px' });
  });

  test('sets data-testid', () => {
    render(React.createElement(Box, { testID: 'my-box' }, 'Test'));
    expect(screen.getByTestId('my-box')).toBeTruthy();
  });
});

describe('Flex Component', () => {
  test('renders with display: flex', () => {
    render(React.createElement(Flex, null, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ display: 'flex' });
  });

  test('applies flexDirection', () => {
    render(React.createElement(Flex, { direction: 'column' }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexDirection: 'column' });
  });

  test('applies justifyContent', () => {
    render(React.createElement(Flex, { justify: 'center' }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ justifyContent: 'center' });
  });

  test('applies alignItems', () => {
    render(React.createElement(Flex, { align: 'flex-end' }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ alignItems: 'flex-end' });
  });

  test('applies flexWrap', () => {
    render(React.createElement(Flex, { wrap: 'wrap' }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexWrap: 'wrap' });
  });

  test('applies flexGrow from boolean', () => {
    render(React.createElement(Flex, { grow: true }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexGrow: 1 });
  });

  test('applies flexGrow from number', () => {
    render(React.createElement(Flex, { grow: 2 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexGrow: 2 });
  });

  test('applies gap', () => {
    render(React.createElement(Flex, { gap: 2 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ gap: '8px' });
  });

  test('applies spacing props', () => {
    render(React.createElement(Flex, { p: 4, m: 2 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ padding: '16px', margin: '8px' });
  });
});

describe('Stack Component', () => {
  test('renders vertical stack by default', () => {
    render(React.createElement(Stack, null, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({
      display: 'flex',
      flexDirection: 'column',
    });
  });

  test('renders horizontal stack', () => {
    render(React.createElement(Stack, { direction: 'horizontal' }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexDirection: 'row' });
  });

  test('applies gap', () => {
    render(React.createElement(Stack, { gap: 3 }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ gap: '12px' });
  });

  test('applies reverse', () => {
    render(React.createElement(Stack, { direction: 'vertical', reverse: true }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexDirection: 'column-reverse' });
  });

  test('applies wrap', () => {
    render(React.createElement(Stack, { wrap: true }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({ flexWrap: 'wrap' });
  });

  test('applies align and justify', () => {
    render(React.createElement(Stack, { align: 'center', justify: 'space-between' }, 'Test'));
    const el = screen.getByText('Test').closest('div');
    expect(el).toHaveStyle({
      alignItems: 'center',
      justifyContent: 'space-between',
    });
  });
});

