import React from 'react';
import { SpacingProviderProps } from '../spacing-system/types';
import { ResponsiveProviderProps } from '../responsive-hooks/types';
import { SpacingProvider } from '../spacing-system/context';
import { ResponsiveProvider } from '../responsive-hooks/context';

/**
 * Props for the combined LayoutSpacingProvider
 */
export interface LayoutSpacingProviderProps {
  children?: React.ReactNode;
  /** Spacing configuration */
  spacing?: Partial<SpacingProviderProps['config']>;
  /** Responsive configuration */
  responsive?: Partial<ResponsiveProviderProps>;
}

/**
 * A combined provider that wraps both SpacingProvider and ResponsiveProvider.
 * This is the recommended way to set up @laddhaanshul/layout-spacing at the root of your app.
 *
 * @example
 * import { LayoutSpacingProvider, Box, useBreakpoint } from '@laddhaanshul/layout-spacing';
 *
 * function App() {
 *   return (
 *     <LayoutSpacingProvider
 *       spacing={{ baseUnit: 8, useRem: true }}
 *       responsive={{ breakpoints: { md: 768, lg: 1024 } }}
 *     >
 *       <MyApp />
 *     </LayoutSpacingProvider>
 *   );
 * }
 */
export function LayoutSpacingProvider({
  children,
  spacing,
  responsive,
}: LayoutSpacingProviderProps): React.ReactElement {
  return (
    <ResponsiveProvider
      breakpoints={responsive?.breakpoints}
      initialWidth={responsive?.initialWidth}
      initialHeight={responsive?.initialHeight}
    >
      <SpacingProvider config={spacing}>
        {children}
      </SpacingProvider>
    </ResponsiveProvider>
  );
}

LayoutSpacingProvider.displayName = 'LayoutSpacingProvider';

