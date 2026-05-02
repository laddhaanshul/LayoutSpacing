# Aspect Ratio

## Overview
A robust component and hooks to maintain consistent aspect ratios for images, videos, and content containers across browsers and mobile screens without layout shifts.

## Preset Ratios
| Name | Value | Ratio |
|------|-------|-------|
| square | 1 | 1:1 |
| video | 1.778 | 16:9 |
| standard | 1.333 | 4:3 |
| cinematic | 2.333 | 21:9 |
| portrait | 0.75 | 3:4 |
| golden | 1.618 | Golden ratio |

## AspectRatio Component
```tsx
import { AspectRatio, ASPECT_RATIOS } from '@laddhaanshul/layout-spacing';

// Using preset
<AspectRatio ratio={ASPECT_RATIOS.video} maxWidth={400}>
  <video src="movie.mp4" />
</AspectRatio>

// Using string notation
<AspectRatio ratio="16:9">
  <img src="image.jpg" />
</AspectRatio>

// Using number
<AspectRatio ratio={4/3}>
  <div>Content</div>
</AspectRatio>
```

## Implementation Details
- Uses native CSS `aspect-ratio` property when available
- Falls back to `padding-bottom` hack for older browsers
- Content is positioned absolutely inside the ratio container
- Child elements receive `width: 100%` and `height: 100%` by default

## Hooks

### useAspectRatio()
```tsx
const { width, height } = useAspectRatio(16/9, { width: 800 });
// width: 800, height: 450
```

### useContainerAspectRatio()
```tsx
const ref = useRef<HTMLDivElement>(null);
const height = useContainerAspectRatio(ref, 16/9);
// Returns computed height based on container width
```

## Cross-Platform
The component works on both Web and React Native using `React.createElement` for rendering. On React Native, it uses computed styles instead of CSS aspect-ratio.

