# @laddhaanshul/layout-spacing

A unified, high-performance layout, spacing, responsive, and aspect-ratio system for React and React Native applications. Build consistent, pixel-perfect UIs that work seamlessly across Web, iOS, Android, and beyond.

[![npm version](https://img.shields.io/npm/v/@laddhaanshul/layout-spacing.svg)](https://www.npmjs.com/package/@laddhaanshul/layout-spacing)
[![License: MIT](https://img.shields.io/badge/License-MIT-blue.svg)](https://opensource.org/licenses/MIT)
[![TypeScript](https://img.shields.io/badge/TypeScript-Ready-blue.svg)](https://www.typescriptlang.org/)
[![Platform](https://img.shields.io/badge/Platform-Web%20%7C%20Native-brightgreen.svg)](#)

---

## 🌟 Introduction

`@laddhaanshul/layout-spacing` is more than just a component library; it's a **design system engine**. It enforces architectural consistency in your UI development by providing a common language (tokens) and a set of architectural primitives (`Box`, `Flex`, `Stack`) that eliminate the need for custom CSS for most layout needs.

### Key Philosophies:
1.  **Uniformity**: One API for both Web and Native. No more context-switching between CSS Flexbox and React Native Stylesheets.
2.  **Constraint-Based Design**: Enforces a strict 8pt grid system to ensure spacing is never "magic" or inconsistent.
3.  **Zero-Runtime (Optimization)**: Designed to be as thin as possible. Most layout styles are calculated statically or via highly optimized lookups.
4.  **Responsive by Default**: Built-in support for multiple breakpoints with mobile-first logic that works identically across all screens.

---

## 💎 Why Layout Spacing?

Choosing the right layout system can significantly impact your project's long-term maintainability and performance. Here is why `@laddhaanshul/layout-spacing` stands out:

*   **Design-to-Code Harmony**: Speak the same language as your designers. When they say "16px gap", you just write `gap={4}`. No guesswork, no magic numbers.
*   **True Cross-Platform Portability**: Write your layout logic once. Whether you're building a dashboard for the web or a mobile app for iOS/Android, the layout behaves exactly as expected.
*   **Performance Without Compromise**: Near-zero runtime overhead means your animations stay smooth and your interaction latency stays low.
*   **Scale with Confidence**: As your codebase grows, atomic layout primitives make your components more readable, maintainable, and easier to refactor than thousands of lines of custom CSS.
*   **Bulletproof Type Safety**: Catch layout bugs before they reach your users. Our comprehensive TypeScript definitions provide an extra layer of protection for your design system.

---

## 📋 Table of Contents

- [Installation](#-installation)
- [Quick Start](#-quick-start)
- [Core Concepts](#-core-concepts)
  - [The 8pt Grid System](#the-8pt-grid-system)
  - [Cross-Platform Architecture](#cross-platform-architecture)
- [API Reference](#-api-reference)
  - [Spacing System](#1-spacing-system)
    - [LayoutSpacingProvider](#layoutspacingprovider)
    - [useSpacing](#usespacing)
    - [toCSSValue](#tocssvalue)
  - [Layout Primitives](#2-layout-primitives)
    - [Box](#box)
    - [Flex](#flex)
    - [Stack](#stack)
  - [Responsive System](#3-responsive-system)
    - [useBreakpoint](#usebreakpoint)
    - [useResponsiveValue](#useresponsivevalue)
    - [useMediaQuery](#usemediaquery)
  - [Aspect Ratio System](#4-aspect-ratio-system)
    - [AspectRatio Component](#aspectratio-component)
    - [useAspectRatio](#useaspectratio)
- [Advanced Usage](#-advanced-usage)
  - [Custom Theming](#custom-theming)
  - [SSR Support](#ssr-support)
- [Recipes & Examples](#-recipes--examples)
- [Full Spacing Scale Table](#-full-spacing-scale-table)
- [Platform Support & Limitations](#-platform-support--limitations)
- [License](#-license)

---

## 📦 Installation

Install the package via your preferred package manager.

```bash
# Using npm
npm install @laddhaanshul/layout-spacing

# Using pnpm
pnpm add @laddhaanshul/layout-spacing

# Using yarn
yarn add @laddhaanshul/layout-spacing
```

### Peer Dependencies
Ensure you have the following installed (standard for React projects):
- `react` >= 16.8.0
- `react-native` (if using in a Native/Expo environment)

---

## 🚀 Quick Start

### 1. Setup the Provider
Wrap your root component with `LayoutSpacingProvider`. This initializes the spacing tokens and responsive listeners.

```tsx
import { LayoutSpacingProvider } from '@laddhaanshul/layout-spacing';

function Root() {
  return (
    <LayoutSpacingProvider>
      <App />
    </LayoutSpacingProvider>
  );
}
```

### 2. Build Your First Layout
Use `Box`, `Flex`, and `Stack` to structure your UI without writing a single line of CSS.

```tsx
import { Box, Flex, Stack } from '@laddhaanshul/layout-spacing';

const ProfileCard = () => (
  <Box p={4} bg="#f8fafc" borderRadius={12} shadow="md">
    <Stack gap={3}>
      <Flex align="center" gap={3}>
        <Box w={48} h={48} bg="#3b82f6" borderRadius="50%" />
        <Box>
          <h3 style={{ margin: 0 }}>John Doe</h3>
          <p style={{ margin: 0, color: '#64748b' }}>Frontend Architect</p>
        </Box>
      </Flex>
      <Box pt={2}>
        <p>Expert in creating scalable design systems and cross-platform experiences.</p>
      </Box>
      <Flex gap={2}>
        <Box px={3} py={1} bg="#dbeafe" borderRadius={100} style={{ fontSize: 12 }}>React</Box>
        <Box px={3} py={1} bg="#dbeafe" borderRadius={100} style={{ fontSize: 12 }}>Native</Box>
      </Flex>
    </Stack>
  </Box>
);
```

---

## 🧠 Core Concepts

### The 8pt Grid System
The library is built on the industry-standard 8pt grid. Spacing tokens are multiples of 4px, where `1` = 4px and `2` = 8px. This allows for extremely fine-grained control while maintaining a rigid structure.

### Cross-Platform Architecture
When running on the **Web**, components default to rendering as `<div>` elements and use standard CSS properties (e.g., `margin`, `padding`, `gap`).
When running on **React Native**, components default to `View` and use numeric style values (e.g., `margin: 16`), which is essential for `StyleSheet` performance.

---

## 📖 API Reference

## 1. Spacing System

The spacing system provides the tokens and hooks used to calculate dimensions.

### `LayoutSpacingProvider`
The main configuration entry point.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `spacing` | `Partial<SpacingConfig>` | `{ baseUnit: 8 }` | Configuration for the spacing grid. |
| `responsive` | `Partial<ResponsiveConfig>` | See [Breakpoints](#breakpoints) | Configuration for responsive breakpoints. |

#### Example:
```tsx
<LayoutSpacingProvider 
  spacing={{ 
    baseUnit: 4,     // Changes 1 token from 4px to 8px
    useRem: true,    // Uses rem units on Web
    rootFontSize: 16 
  }}
>
  {children}
</LayoutSpacingProvider>
```

### `useSpacing()`
The primary hook for accessing spacing logic in functional components.

**Returns:**
- `value(token: SpacingValue): string | number`: Converts a token to its platform-specific value.
- `margin(direction: SpacingDirection, token: SpacingValue): Object`: Returns a margin style object.
- `padding(direction: SpacingDirection, token: SpacingValue): Object`: Returns a padding style object.
- `gap(token: SpacingValue): Object`: Returns a gap style object.
- `scale(): Object`: The full raw scale.

#### Example:
```tsx
const spacing = useSpacing();
const boxStyle = {
  ...spacing.padding('x', 4), // { paddingLeft: 16, paddingRight: 16 }
  marginTop: spacing.value(8) // 32
};
```

---

## 2. Layout Primitives

These components are the building blocks of your UI. They all share common style and spacing props.

### `Box`
The base component. Think of it as a `div` or `View` on steroids.

**Common Props (Shared by Flex & Stack):**

| Prop | Type | Description |
| :--- | :--- | :--- |
| **Spacing** | | |
| `m`, `p` | `SpacingValue` | Margin / Padding (all sides) |
| `mt`, `mb`, `ml`, `mr` | `SpacingValue` | Margin Top, Bottom, Left, Right |
| `mx`, `my` | `SpacingValue` | Margin Horizontal / Vertical |
| `px`, `py` | `SpacingValue` | Padding Horizontal / Vertical |
| **Dimensions** | | |
| `w`, `h` | `number \| string` | Width / Height |
| `minW`, `maxW` | `number \| string` | Min / Max Width |
| `minH`, `maxH` | `number \| string` | Min / Max Height |
| **Visuals** | | |
| `bg` | `string` | Background color |
| `borderRadius`| `number \| string` | Corner rounding |
| `opacity` | `number` | Transparency (0-1) |
| `overflow` | `string` | `visible`, `hidden`, `scroll`, `auto` |
| **Misc** | | |
| `as` | `ElementType` | Render as a different component (e.g., `section`, `nav`) |
| `testID` | `string` | Identifier for testing |

---

### `Flex`
Extends `Box` with full Flexbox capabilities.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `direction` | `row \| column \| ...` | Flex direction (Default: `row`) |
| `justify` | `center \| flex-start \| ...` | Justify content |
| `align` | `center \| flex-start \| ...` | Align items |
| `wrap` | `nowrap \| wrap \| ...` | Flex wrap |
| `grow` | `number \| boolean` | Flex grow (true = 1) |
| `shrink` | `number \| boolean` | Flex shrink (true = 1) |
| `basis` | `number \| string` | Flex basis |
| `gap` | `SpacingValue` | Spacing between items |
| `columnGap` | `SpacingValue` | Horizontal gap only |
| `rowGap` | `SpacingValue` | Vertical gap only |

---

### `Stack`
A higher-level component optimized for vertical or horizontal layouts with uniform spacing.

| Prop | Type | Description |
| :--- | :--- | :--- |
| `direction` | `vertical \| horizontal` | Stack orientation (Default: `vertical`) |
| `gap` | `SpacingValue` | Space between children |
| `align` | `Alignment` | Align children perpendicular to direction |
| `justify` | `Justification` | Distribute children along direction |
| `reverse` | `boolean` | Reverse the order of children |

#### Example:
```tsx
<Stack gap={2} direction="horizontal" align="center">
  <Box bg="red" p={2} />
  <Box bg="blue" p={2} />
</Stack>
```

---

## 3. Responsive System

The responsive system uses a mobile-first approach.

### Default Breakpoints:
- `xs`: 0px
- `sm`: 576px
- `md`: 768px
- `lg`: 992px
- `xl`: 1200px
- `xxl`: 1440px

### `useBreakpoint()`
Provides the current screen state.

**Returns:**
- `breakpoint`: The current active key (e.g., `'md'`)
- `isAbove(bp)`: True if width >= breakpoint.
- `isBelow(bp)`: True if width <= breakpoint.
- `is(bp)`: True if width is exactly within that range.
- `width`, `height`: Current pixel dimensions.
- `orientation`: `'portrait' \| 'landscape'`.

### `useResponsiveValue(values)`
Returns a different value based on the current breakpoint. It searches from the current breakpoint down to `xs` for the nearest defined value.

```tsx
const padding = useResponsiveValue({
  xs: 2, // 8px
  md: 4, // 16px
  xl: 6  // 24px
});
```

---

## 4. Aspect Ratio System

Ensures elements maintain their proportions, vital for images, videos, and complex UI tiles.

### `AspectRatio` Component
Wraps any content to enforce a ratio.

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `ratio` | `number \| string` | `1` | Width / Height (e.g., `16/9`) |
| `maxWidth` | `number \| string` | - | Constrain the container width. |

#### Example:
```tsx
<AspectRatio ratio={16/9}>
  <Image source={{ uri: '...' }} style={{ flex: 1 }} />
</AspectRatio>
```

---

## 🏗 Advanced Usage

### Custom Theming
You can override the entire spacing scale or add custom breakpoint values.

```tsx
const customBreakpoints = {
  xs: 0,
  mobile: 400,
  tablet: 800,
  desktop: 1200
};

<LayoutSpacingProvider responsive={{ breakpoints: customBreakpoints }}>
  {/* App */}
</LayoutSpacingProvider>
```

### SSR Support
For Next.js or other SSR frameworks, you can provide an `initialWidth` to the `ResponsiveProvider` to prevent layout shift during hydration.

```tsx
<LayoutSpacingProvider responsive={{ initialWidth: 1200 }}>
  {/* App */}
</LayoutSpacingProvider>
```

---

## 🥙 Recipes & Examples

### Responsive Grid
```tsx
const columns = useResponsiveValue({ xs: 1, sm: 2, md: 3, lg: 4 });

<Flex wrap gap={3}>
  {items.map(item => (
    <Box key={item.id} style={{ width: `${100 / columns}%` }}>
      <Content />
    </Box>
  ))}
</Flex>
```

### Sticky Sidebar with Fixed Header
```tsx
<Stack h="100vh">
  <Box h={64} bg="white" position="sticky" top={0} zIndex={10}>
    Header
  </Box>
  <Flex grow={1}>
    <Box w={240} bg="gray.100" position="sticky" top={64} h="calc(100vh - 64px)">
      Sidebar
    </Box>
    <Box grow={1} p={4} overflow="auto">
      Main Content
    </Box>
  </Flex>
</Stack>
```

---

## 📊 Full Spacing Scale Table

By default, tokens represent units on an 8pt grid.

| Token | Pixels | Use Case |
| :--- | :--- | :--- |
| `0` | 0px | Reset |
| `0.5` | 2px | Micro dividers |
| `1` | 4px | Tight text spacing |
| `1.5` | 6px | Intermediate |
| `2` | 8px | Standard small gap |
| `3` | 12px | Comfortable list spacing |
| `4` | 16px | Page margins (Mobile) |
| `5` | 20px | - |
| `6` | 24px | Large section gap |
| `8` | 32px | Page margins (Desktop) |
| `10` | 40px | - |
| `12` | 48px | Hero section top padding |
| `16` | 64px | - |
| `24` | 96px | Large layout separation |
| `32` | 128px | Extreme separation |

---

## 💻 Platform Support & Limitations

### Web
- Supports all modern browsers (Chrome, Firefox, Safari, Edge).
- Utilizes `ResizeObserver` for breakpoint detection.
- Supports `rem` units for accessibility.

### React Native / Expo
- Supports iOS and Android.
- Uses `Dimensions` API for screen calculations.
- `as` prop on Box/Flex/Stack can be used to pass `TouchableOpacity`, `ScrollView`, etc.
- **Limitation**: `calc()` strings are not supported in dimensions (except on Web).

---

## 📄 License

MIT © [Anshul Laddha](https://github.com/laddhaanshul)

---

## 🤝 Contributing

Contributions are welcome! Please read our [Contributing Guide](CONTRIBUTING.md) and [Code of Conduct](CODE_OF_CONDUCT.md).

1. Fork the repo.
2. Create a feature branch (`git checkout -b feature/amazing-feature`).
3. Commit your changes (`git commit -m 'Add amazing feature'`).
4. Push to the branch (`git push origin feature/amazing-feature`).
5. Open a Pull Request.

---

### 🏗 Component Deep Dives

### Box Component (`<Box />`)
The `Box` component is the atomic unit of the Layout Spacing system. It serves as a replacement for `div` (Web) or `View` (Native) and provides a declarative way to apply styles.

#### Prop Breakdown & Examples

| Category | Prop | Type | Description | Example |
| :--- | :--- | :--- | :--- | :--- |
| **Spacing** | `m`, `mt`, `mb`, `ml`, `mr`, `mx`, `my` | `SpacingValue` | Margin controls | `<Box m={4} />` (16px) |
| | `p`, `pt`, `pb`, `pl`, `pr`, `px`, `py` | `SpacingValue` | Padding controls | `<Box px={2} />` (8px) |
| **Sizing** | `w`, `h` | `number \| string` | Width/Height | `<Box w="100%" h={200} />` |
| | `minW`, `maxW`, `minH`, `maxH` | `number \| string` | Constraints | `<Box maxW={600} />` |
| **Styling** | `bg` | `string` | Background Color | `<Box bg="#000" />` |
| | `borderRadius` | `number \| string` | Corner Radius | `<Box borderRadius={8} />` |
| | `opacity` | `number` | Transparency | `<Box opacity={0.5} />` |
| **Layout** | `display` | `string` | Display Mode | `<Box display="none" />` |
| | `position` | `string` | Positioning | `<Box position="absolute" />` |
| | `top`, `right`, `bottom`, `left` | `number \| string` | Insets | `<Box top={0} />` |
| | `zIndex` | `number` | Layering | `<Box zIndex={999} />` |
| **Interaction** | `cursor` | `string` | Mouse Cursor (Web) | `<Box cursor="pointer" />` |

#### Advanced Example: Interactive Card
```tsx
<Box 
  as="article"
  p={4} 
  m={2}
  bg="white" 
  borderRadius={16} 
  shadow="lg"
  cursor="pointer"
  style={{ transition: 'transform 0.2s' }}
  onMouseEnter={(e) => e.currentTarget.style.transform = 'scale(1.02)'}
>
  <Text>Hover me!</Text>
</Box>
```

---

### Flex Component (`<Flex />`)
The `Flex` component handles all your directional layout needs. It abstracts the complexities of Flexbox into a readable set of props.

#### Flex-Specific Props

| Prop | Type | Description | Use Case |
| :--- | :--- | :--- | :--- |
| `direction` | `'row' \| 'column' \| ...` | The main axis of the flex container. | Switching layout for mobile/desktop. |
| `justify` | `'center' \| 'space-between' \| ...` | Distribution of items along the main axis. | Centering a logo or spacing out nav links. |
| `align` | `'center' \| 'stretch' \| ...` | Alignment of items along the cross axis. | Vertically centering text next to an icon. |
| `wrap` | `'nowrap' \| 'wrap' \| ...` | Whether items should wrap to a new line. | Creating a tag cloud or responsive gallery. |
| `gap` | `SpacingValue` | Unified spacing between all items. | The simplest way to add space between buttons. |
| `grow` | `number \| boolean` | How much the item should grow relative to others. | Making a main content area fill the screen. |
| `shrink` | `number \| boolean` | How much the item should shrink when space is tight. | Preventing an image from being crushed. |
| `basis` | `number \| string` | The initial size of the item before growth/shrink. | Setting a fixed sidebar width. |

#### Example: Navigation Bar
```tsx
<Flex as="nav" p={3} bg="#1a202c" justify="space-between" align="center">
  <Box color="white" fontWeight="bold">BrandLogo</Box>
  <Flex gap={4}>
    <Box as="a" href="/home" color="gray.300">Home</Box>
    <Box as="a" href="/about" color="gray.300">About</Box>
    <Box as="a" href="/contact" color="gray.300">Contact</Box>
  </Flex>
  <Box bg="blue.500" px={4} py={2} borderRadius={6} color="white">Login</Box>
</Flex>
```

---

### Stack Component (`<Stack />`)
`Stack` is the "magic wand" for vertical and horizontal spacing. It is essentially a `Flex` component pre-configured for stacking.

| Feature | `Stack` (Vertical) | `Stack` (Horizontal) |
| :--- | :--- | :--- |
| `direction` | `vertical` (Default) | `horizontal` |
| Primary Prop | `mb` (handled by `gap`) | `mr` (handled by `gap`) |
| Wrapping | Supported via `wrap` prop | Supported via `wrap` prop |

#### Example: Form Layout
```tsx
<Stack gap={4} p={5} maxWidth={400} mx="auto">
  <Stack gap={1}>
    <label>Email Address</label>
    <input type="email" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
  </Stack>
  <Stack gap={1}>
    <label>Password</label>
    <input type="password" style={{ padding: 12, borderRadius: 8, border: '1px solid #ccc' }} />
  </Stack>
  <Box as="button" bg="blue.600" p={3} borderRadius={8} color="white" fontWeight="600">
    Sign In
  </Box>
</Stack>
```

---

## 🎣 Hooks Deep Dive

### `useSpacing()`
The swiss-army knife for spacing tokens.

#### Methods:
- **`value(token)`**: Useful for non-standard CSS properties like `borderWidth` or `fontSize` if they follow your grid.
- **`margin(dir, token)`**: Returns a style object. `dir` can be `x`, `y`, `all`, `top`, etc.
- **`padding(dir, token)`**: Same as margin but for padding.
- **`gap(token)`**: Returns `{ gap: value }`.

#### Advanced Hook Usage
```tsx
const MyCustomComponent = () => {
  const { value, margin } = useSpacing();
  
  // Dynamic border thickness based on grid
  const borderThickness = value(0.5); 
  
  return (
    <div style={{ 
      border: `${borderThickness}px solid black`,
      ...margin('top', 4) 
    }}>
      Content
    </div>
  );
};
```

---

### `useBreakpoint()`
The source of truth for responsive states.

#### Detailed Result Object:
```ts
{
  breakpoint: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl',
  width: number,      // Current width in px
  height: number,     // Current height in px
  isAbove: (bp) => boolean,
  isBelow: (bp) => boolean,
  is: (bp) => boolean,
  orientation: 'portrait' | 'landscape',
  activeBreakpoints: string[] // e.g. ['xs', 'sm', 'md']
}
```

---

### `useResponsiveValue()`
The most powerful tool for multi-device layouts. It uses a "closest match" algorithm.

#### How it works:
If you are at the `lg` breakpoint and provide:
`{ xs: 10, md: 20 }`
The hook will return `20` because `md` is the closest defined value *below or at* `lg`.

---

## ⚡️ Performance Tips

1.  **Prefer Props Over Hooks**: Whenever possible, use component props (`p={4}`) instead of calling `useSpacing()`. Props are highly optimized and handle platform detection more efficiently.
2.  **Avoid Excessive Providers**: You only need one `LayoutSpacingProvider` at the root. Nesting multiple providers is supported but can lead to complex re-renders if not managed.
3.  **Static Ratios**: For `AspectRatio`, try to use numeric ratios (`16/9`) rather than strings for faster calculations.

---

## 🐛 Troubleshooting

### 1. Invariant Violation (React Native)
**Error**: `View config getter callback for component div must be a function`
**Cause**: You are using `Box`, `Flex`, or `Stack` without a provider, or the build is corrupted.
**Fix**: Ensure your app is wrapped in `LayoutSpacingProvider`.

### 2. Styles Not Applying (Web)
**Cause**: CSS custom properties might be disabled or not supported in your environment.
**Fix**: Check if `generateCSSVars()` is called in your provider config.

### 3. Layout Shift (SSR)
**Cause**: The library detects screen size on the client.
**Fix**: Provide an `initialWidth` in the `responsive` config of your provider to match your primary user base (e.g., 1200 for desktop-first).

---

## 📊 Full API Table (Exhaustive)

### Spacing Utils
| Function | Parameters | Description |
| :--- | :--- | :--- |
| `resolveSpacingToken` | `(token: SpacingValue, config: SpacingConfig)` | Low-level token resolver. |
| `applySpacingStyles` | `(base: Object, type: 'margin'\|'padding', value: SpacingValue, dir: SpacingDirection)` | Mutation helper for style objects. |
| `mergeSpacingStyles` | `(...styles: Object[])` | Deep merges spacing style objects. |
| `spacingStyleString` | `(type, value, dir)` | Generates a CSS style string (Web only). |
| `clampSpacing` | `(value, min, max)` | Constrains a spacing token within a range. |

### Responsive Utils
| Function | Parameters | Description |
| :--- | :--- | :--- |
| `getBreakpointForWidth`| `(width: number, breakpoints: Record<string, number>)` | Finds the active key for a given width. |
| `buildMediaQuery` | `(conditions: MediaQueryCondition)` | Creates a standard CSS media query string. |

### Aspect Ratio Utils
| Function | Parameters | Description |
| :--- | :--- | :--- |
| `parseAspectRatio` | `(ratio: string \| number)` | Normalizes ratio input to a number. |
| `calculateHeight` | `(width, ratio)` | Calculates height for a given width and ratio. |
| `calculateWidth` | `(height, ratio)` | Calculates width for a given height and ratio. |

---

## 🛠 Advanced Pattern: The "Compound" Primitive
You can easily create your own primitives by extending the provided components.

```tsx
import { Flex, FlexProps } from '@laddhaanshul/layout-spacing';

interface CardProps extends FlexProps {
  title: string;
}

const Card: React.FC<CardProps> = ({ title, children, ...props }) => (
  <Flex 
    direction="column" 
    p={4} 
    bg="white" 
    borderRadius={12} 
    shadow="sm"
    {...props} 
  >
    <Box mb={3} fontWeight="bold">{title}</Box>
    <Box>{children}</Box>
  </Flex>
);
```

---

## 🗺 Roadmap
- [ ] Add `Grid` component for CSS Grid support on Web.
- [ ] Add `useTheme` for custom color token integration.
- [ ] VS Code Extension for autocompleting spacing tokens.
- [ ] Integration with Figma for direct design-to-code syncing.

---

## 🎨 Why the 8pt Grid? A Deep Dive into Visual Rhythm

The 8pt grid is a methodology that uses multiples of 8 to define the dimensions, padding, and margin of elements. Why 8? Because 8 is easily divisible (4, 2) and scales perfectly across high-resolution screens (Retina, 4K).

### Benefits of the 8pt Grid:
1.  **Eliminate Decision Fatigue**: Stop wondering if you should use 15px or 17px. Use token `4` (16px).
2.  **Scalability**: Icons are usually 16x16, 24x24, or 32x32. These all fit perfectly into our grid.
3.  **Visual Harmony**: When everything follows the same mathematical rhythm, the UI feels "right" to the user, even if they can't explain why.

---

## ⚔️ Comparison: How We Differ

| Feature | @laddhaanshul/layout-spacing | Tailwind CSS | Styled System |
| :--- | :--- | :--- | :--- |
| **Philosophy** | Layout-first Primitives | Utility-first Classes | Style-props on anything |
| **Runtime** | Zero / Near-Zero | None (PostCSS) | Dependent on Emotion/SC |
| **Native Support** | Native-First | Via NativeWind (Heavy) | Fragmented |
| **API Consistency** | Identical across platforms | Class mappings differ | Mostly Web-focused |

---

## 🏗 Architecture: Under the Hood

### The Resolver Pipeline
When you pass `p={4}` to a `Box`:
1.  **Extraction**: The `Box` component extracts `p` from its props.
2.  **Theming**: It looks up the current `SpacingConfig` from the `SpacingContext`.
3.  **Calculation**: It calls `toCSSValue(4, config)`, which computes `4 * config.baseUnit` (32px).
4.  **Platform Mapping**: 
    - On **Web**, it creates a style object `{ padding: '32px' }`.
    - On **Native**, it creates `{ padding: 32 }`.
5.  **Merging**: It merges this with any other props and the user-provided `style` prop.

### Breakpoint Detection
- **Web**: Uses a single `ResizeObserver` on the `window` to update the `ResponsiveContext`. This is more performant than adding thousands of `matchMedia` listeners.
- **Native**: Uses the `Dimensions` event listener to track orientation and width changes.

---

## 📚 Full TypeScript Definitions

### `SpacingValue`
```ts
export type SpacingToken = 0 | 0.5 | 1 | 1.5 | 2 | 2.5 | 3 | 4 | 5 | 6 | 8 | 10 | 12 | 14 | 16 | 20 | 24 | 28 | 32 | 36 | 40 | 44 | 48 | 56 | 64 | 72 | 80 | 96;

export type SpacingValue = SpacingToken | 'auto' | string;
```

### `BoxProps`
```ts
export interface BoxProps extends BaseStyleProps, SpacingProps {
  children?: React.ReactNode;
  as?: React.ElementType;
  testID?: string;
}
```

### `ResponsiveConfig`
```ts
export interface ResponsiveProviderProps {
  children?: React.ReactNode;
  breakpoints?: Partial<BreakpointsConfig>;
  initialWidth?: number;
  initialHeight?: number;
}
```

---

## 🚀 Advanced Recipes

### Responsive Aspect-Ratio Hero
```tsx
const isDesktop = useBreakpoint().isAbove('md');

<AspectRatio ratio={isDesktop ? 21/9 : 16/9}>
  <Box bg="black">
    <video />
  </Box>
</AspectRatio>
```

### The "Auto-Margin" Navbar
```tsx
<Flex p={4} align="center">
  <Box>Logo</Box>
  <Box ml="auto">
    <Flex gap={2}>
      <Button>Home</Button>
      <Button>Logout</Button>
    </Flex>
  </Box>
</Flex>
```

---

## 📈 Migration Guide

### From Standard CSS
**Before:**
```css
.card {
  padding: 16px;
  margin-bottom: 24px;
  display: flex;
  flex-direction: column;
}
```

**After:**
```tsx
<Stack p={4} mb={6}>
  {children}
</Stack>
```

### From Tailwind
**Before:**
```html
<div class="p-4 mb-6 flex flex-col gap-4">
```

**After:**
```tsx
<Stack p={4} mb={6} gap={4}>
```

---

## 🌐 Community & Support
- **Issues**: [GitHub Issues](https://github.com/laddhaanshul/LayoutSpacing/issues)
- **Discussions**: [GitHub Discussions](https://github.com/laddhaanshul/LayoutSpacing/discussions)
- **Twitter**: [@laddhaanshul](https://twitter.com/laddhaanshul)

---

## 📄 License
MIT © [Anshul Laddha](https://github.com/laddhaanshul)

---

## 📑 Exhaustive Prop Reference (The Big Table)

Below is every single prop supported by the core layout primitives (`Box`, `Flex`, `Stack`).

### Base & Spacing Props (All Components)

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `m` | `SpacingValue` | `undefined` | Margin on all sides. |
| `mt` | `SpacingValue` | `undefined` | Margin top. |
| `mr` | `SpacingValue` | `undefined` | Margin right. |
| `mb` | `SpacingValue` | `undefined` | Margin bottom. |
| `ml` | `SpacingValue` | `undefined` | Margin left. |
| `mx` | `SpacingValue` | `undefined` | Horizontal margin (left + right). |
| `my` | `SpacingValue` | `undefined` | Vertical margin (top + bottom). |
| `p` | `SpacingValue` | `undefined` | Padding on all sides. |
| `pt` | `SpacingValue` | `undefined` | Padding top. |
| `pr` | `SpacingValue` | `undefined` | Padding right. |
| `pb` | `SpacingValue` | `undefined` | Padding bottom. |
| `pl` | `SpacingValue` | `undefined` | Padding left. |
| `px` | `SpacingValue` | `undefined` | Horizontal padding (left + right). |
| `py` | `SpacingValue` | `undefined` | Vertical padding (top + bottom). |
| `w` | `number \| string` | `undefined` | Width (e.g., `200`, `'100%'`, `'50vw'`). |
| `h` | `number \| string` | `undefined` | Height. |
| `minW` | `number \| string` | `undefined` | Minimum width. |
| `maxW` | `number \| string` | `undefined` | Maximum width. |
| `minH` | `number \| string` | `undefined` | Minimum height. |
| `maxH` | `number \| string` | `undefined` | Maximum height. |
| `bg` | `string` | `undefined` | Background color (Hex, RGB, or named). |
| `borderRadius` | `number \| string` | `undefined` | Corner rounding. |
| `opacity` | `number` | `1` | Transparency level (0 to 1). |
| `overflow` | `'visible' \| 'hidden' \| ...` | `'visible'` | Overflow behavior. |
| `position` | `'relative' \| 'absolute' \| ...` | `'relative'` | CSS positioning. |
| `top` | `number \| string` | `undefined` | Vertical offset for positioned elements. |
| `right` | `number \| string` | `undefined` | Horizontal offset. |
| `bottom` | `number \| string` | `undefined` | Vertical offset. |
| `left` | `number \| string` | `undefined` | Horizontal offset. |
| `zIndex` | `number` | `undefined` | Z-axis layering. |
| `cursor` | `string` | `'auto'` | Mouse cursor (Web only). |
| `as` | `React.ElementType` | `'div'` / `'View'` | The underlying component to render. |
| `testID` | `string` | `undefined` | Testing identifier. |

### Flex-Specific Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `direction` | `'row' \| 'column' \| ...` | `'row'` | The direction of the main axis. |
| `justify` | `'center' \| 'flex-start' \| ...` | `'flex-start'` | Main-axis alignment. |
| `align` | `'center' \| 'stretch' \| ...` | `'stretch'` | Cross-axis alignment. |
| `alignSelf` | `'center' \| 'stretch' \| ...` | `'auto'` | Override cross-axis alignment for specific item. |
| `wrap` | `'nowrap' \| 'wrap' \| ...` | `'nowrap'` | Wrapping behavior. |
| `grow` | `number \| boolean` | `0` / `false` | How much space the item should take. |
| `shrink` | `number \| boolean` | `1` / `true` | How much the item can shrink. |
| `basis` | `number \| string` | `'auto'` | The base size of the item. |
| `gap` | `SpacingValue` | `undefined` | Unified gap between items. |
| `columnGap` | `SpacingValue` | `undefined` | Horizontal gap only. |
| `rowGap` | `SpacingValue` | `undefined` | Vertical gap only. |

### Stack-Specific Props

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `direction` | `'vertical' \| 'horizontal'` | `'vertical'` | Primary stack orientation. |
| `gap` | `SpacingValue` | `undefined` | Space between each sibling. |
| `reverse` | `boolean` | `false` | Reverse the visual order. |
| `wrap` | `boolean` | `false` | Whether the stack should wrap. |

---

## 🏗 Why "Zero-Runtime"?

While "Zero-Runtime" is often a marketing term, in `@laddhaanshul/layout-spacing`, it refers to our approach of avoiding complex style re-calculations during the render loop.

1.  **Static Property Mapping**: Most props map directly to CSS/Native properties without intermediate logic.
2.  **Memoized Resolvers**: We use high-performance memoization for token lookups.
3.  **No CSS-in-JS Overhead**: We don't inject `<style>` tags or generate dynamic class names on the fly, which is where most CSS-in-JS libraries lose performance.

---

## 🎨 Best Practices for Maintainability

1.  **Use Semantic Elements**: Always use the `as` prop to maintain accessibility. Use `as="section"`, `as="header"`, etc.
2.  **Token Over Pixels**: Avoid using raw numbers for `p` or `m` props. Use tokens (`2`, `4`, `8`) to ensure you stay on the 8pt grid.
3.  **Responsive Values Sparingly**: Don't define every prop as a responsive object. Use `useResponsiveValue` only where the layout significantly changes.
4.  **Composition Over Inheritance**: Build specialized components (e.g., `Container`, `Card`, `Hero`) by wrapping `Box` or `Flex` rather than using complex global styles.

---

## 🛠 FAQ

### Can I use this with Tailwind?
Yes! You can use `@laddhaanshul/layout-spacing` for your core layout structure and Tailwind for utility-based styling (colors, typography).

### Does it support Dark Mode?
We recommend using standard CSS variables or the `SpacingProvider` to swap out configurations dynamically if you need grid changes for dark mode.

### How do I handle 1px borders?
Since `1` token is 4px, you can use `0.25` if your base unit is 4, or just pass the string `'1px'`.

---

## 📄 License
MIT © [Anshul Laddha](https://github.com/laddhaanshul)

---

## 🤝 Support the Project

If you find `@laddhaanshul/layout-spacing` helpful, please consider:
- Giving the repository a ⭐ on GitHub.
- Sharing the library with your developer friends.
- Contributing to the documentation or the code.

---

## 📄 License
MIT © [Anshul Laddha](https://github.com/laddhaanshul)

---

### Built with ❤️ by Anshul Laddha
Website: [layoutspacing.anshulladdha.in](https://layoutspacing.anshulladdha.in)
GitHub: [github.com/laddhaanshul/LayoutSpacing](https://github.com/laddhaanshul/LayoutSpacing)
