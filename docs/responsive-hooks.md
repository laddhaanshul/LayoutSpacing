# Responsive Hooks

## Overview
A unified hook system for responsive design that handles media queries on Web and window dimensions on React Native with a shared configuration.

## Architecture
- **types.ts**: Type definitions for breakpoints and hook results
- **tokens.ts**: Default breakpoints, utility functions
- **context.ts**: ResponsiveProvider with cross-platform dimension listening
- **hooks.ts**: Consumer hooks

## Default Breakpoints
| Key | Width | Device |
|-----|-------|--------|
| xs | 0px | Mobile portrait |
| sm | 576px | Mobile landscape |
| md | 768px | Tablet |
| lg | 992px | Desktop |
| xl | 1200px | Large desktop |
| xxl | 1440px | Extra large |

## useBreakpoint()
Returns breakpoint detection utilities:

```tsx
const { breakpoint, isAbove, isBelow, is, width, height, orientation, activeBreakpoints } = useBreakpoint();

if (isAbove('md')) {
  // Desktop layout
}
```

## useMediaQuery()
Programmatic media query matching:

```tsx
const isMobile = useMediaQuery({ maxWidth: 767 });
const isTablet = useMediaQuery({ minWidth: 768, maxWidth: 1023 });
const isLandscape = useMediaQuery({ orientation: 'landscape' });
```

## useResponsiveValue()
Returns different values based on current breakpoint:

```tsx
const fontSize = useResponsiveValue({ xs: 14, sm: 16, md: 18, lg: 20 });
const columns = useResponsiveValue({ xs: 1, sm: 2, md: 3 });
```

## Custom Breakpoints
```tsx
<ResponsiveProvider breakpoints={{ md: 900, lg: 1100 }}>
  {children}
</ResponsiveProvider>
```

## Platform Detection
The provider automatically detects the platform:
- **Web**: Uses `window.resize` event listener
- **React Native**: Uses `Dimensions.addEventListener`

