# Layout Primitives

## Overview
Zero-runtime `<Box>`, `<Flex>`, and `<Stack>` components that strictly enforce spacing tokens. These components use `React.createElement` (no JSX) for cross-platform compatibility.

## Components

### Box
The foundational layout component. Supports all spacing props and base style props.

```tsx
<Box m={4} p={2} bg="white" borderRadius={8} as="section">
  Content
</Box>
```

**Spacing Props**: `m`, `mt`, `mr`, `mb`, `ml`, `mx`, `my`, `p`, `pt`, `pr`, `pb`, `pl`, `px`, `py`
**Base Props**: `w`, `h`, `minW`, `minH`, `maxW`, `maxH`, `bg`, `borderRadius`, `overflow`, `opacity`, `position`, `top`, `right`, `bottom`, `left`, `zIndex`, `cursor`

### Flex
Flexbox layout component with all spacing and flex-specific props.

```tsx
<Flex direction="row" gap={2} align="center" justify="space-between" wrap>
  <Box p={2}>Left</Box>
  <Box p={2}>Right</Box>
</Flex>
```

**Flex Props**: `direction`, `justify`, `align`, `alignSelf`, `wrap`, `grow`, `shrink`, `basis`, `gap`, `columnGap`, `rowGap`

### Stack
Simplified stacking layout for common vertical/horizontal patterns.

```tsx
<Stack gap={3} direction="vertical" align="stretch">
  <Box p={2}>Item 1</Box>
  <Box p={2}>Item 2</Box>
</Stack>
```

**Stack Props**: `direction` ('vertical'|'horizontal'), `gap`, `align`, `justify`, `wrap`, `reverse`

## Polymorphic Rendering
All components support the `as` prop to render as different HTML elements:
```tsx
<Box as="article">...</Box>
<Flex as="nav">...</Flex>
<Stack as="ul">...</Stack>
```

## Style Resolution
1. Spacing props are resolved via `resolveSpacingStyles()` using `toCSSValue()`
2. Base props are resolved via `resolveBaseStyles()`
3. User `style` prop is merged last (takes precedence)

