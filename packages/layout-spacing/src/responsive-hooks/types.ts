/** Named breakpoint keys */
export type BreakpointKey = 'xs' | 'sm' | 'md' | 'lg' | 'xl' | 'xxl';

/** Breakpoint configuration mapping keys to pixel widths */
export type BreakpointsConfig = Record<BreakpointKey, number>;

/** Responsive context value */
export interface ResponsiveContextValue {
  breakpoints: BreakpointsConfig;
  currentBreakpoint: BreakpointKey;
  windowWidth: number;
  windowHeight: number;
  orientation: 'portrait' | 'landscape';
}

/** Props for ResponsiveProvider */
export interface ResponsiveProviderProps {
  children?: React.ReactNode;
  breakpoints?: Partial<BreakpointsConfig>;
  /** Initial width for SSR */
  initialWidth?: number;
  /** Initial height for SSR */
  initialHeight?: number;
}

/** Return type of useBreakpoint hook */
export interface BreakpointResult {
  /** Current active breakpoint key */
  breakpoint: BreakpointKey;
  /** Whether the screen is at or above the given breakpoint */
  isAbove: (bp: BreakpointKey) => boolean;
  /** Whether the screen is at or below the given breakpoint */
  isBelow: (bp: BreakpointKey) => boolean;
  /** Whether the screen is exactly at the given breakpoint range */
  is: (bp: BreakpointKey) => boolean;
  /** Current window width in pixels */
  width: number;
  /** Current window height in pixels */
  height: number;
  /** Current orientation */
  orientation: 'portrait' | 'landscape';
  /** Array of currently active breakpoints (from xs up to current) */
  activeBreakpoints: BreakpointKey[];
}

/** Media query condition type */
export type MediaQueryCondition = {
  minWidth?: number;
  maxWidth?: number;
  minHeight?: number;
  maxHeight?: number;
  orientation?: 'portrait' | 'landscape';
};

