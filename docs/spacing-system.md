# Spacing System

## Overview
The spacing system is a token-based 8pt grid engine that generates consistent margins, padding, and gap utilities for both Web and React Native. It provides CSS custom properties for web theming and direct style values for React Native.

## Architecture
- **types.ts**: TypeScript type definitions
- **tokens.ts**: Core spacing engine (scale generation, CSS value conversion)
- **context.ts**: React Context provider and hooks
- **hooks.ts**: Consumer hooks for using spacing in components
- **utils.ts**: Utility functions for style manipulation

## Scale Reference
The spacing scale is based on an 8pt grid with 4px fine-grained increments:

| Token | Pixels | Description |
|-------|--------|-------------|
| 0 | 0px | No spacing |
| 0.5 | 2px | Micro |
| 1 | 4px | Extra small |
| 1.5 | 6px | Small plus |
| 2 | 8px | Small (1 grid unit) |
| 3 | 12px | Medium |
| 4 | 16px | Standard (2 grid units) |
| 5 | 20px | Standard large |
| 6 | 24px | Large (3 grid units) |
| 8 | 32px | Extra large |
| 10 | 40px | 2XL |
| 12 | 48px | 3XL |
| 16 | 64px | 4XL |
| 24 | 96px | Section |
| 32 | 128px | Section large |

## Configuration
Customize the spacing system through the SpacingProvider:

```tsx
<SpacingProvider config={{
  baseUnit: 8,
  useRem: true,
  rootFontSize: 16,
  scaleOverrides: { 4: 20 },
}}>
  {children}
</SpacingProvider>
```

## CSS Custom Properties
The system generates CSS variables prefixed with `--ls-spacing-`:
- `--ls-spacing-0` through `--ls-spacing-96`
- `--ls-spacing-auto`

## Hook API
```tsx
const spacing = useSpacing();
spacing.value(4);                    // '16px'
spacing.margin('all', 4);            // { margin: '16px' }
spacing.padding('x', 2);             // { paddingLeft: '8px', paddingRight: '8px' }
spacing.gap(3);                      // { gap: '12px' }
spacing.scale();                     // Full scale object
```

