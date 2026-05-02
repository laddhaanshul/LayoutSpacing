/** Aspect ratio values */
export type AspectRatioValue = number | string;

/** Props for the AspectRatio component */
export interface AspectRatioProps {
  /** The aspect ratio (width / height). Common values: 16/9, 4/3, 1, 21/9, etc. Default: 1 */
  ratio?: AspectRatioValue;
  /** Maximum width */
  maxWidth?: string | number;
  /** Maximum height */
  maxHeight?: string | number;
  /** Content to render inside the aspect ratio container */
  children?: React.ReactNode;
  /** Custom inline styles */
  style?: React.CSSProperties;
  /** HTML element or component to render as (default: 'div') */
  as?: React.ElementType;
  /** Test ID */
  testID?: string;
  /** Additional CSS class (Web only) */
  className?: string;
}

/** Predefined common aspect ratios */
export interface PresetAspectRatios {
  square: number;
  video: number;
  standard: number;
  cinematic: number;
  portrait: number;
  golden: number;
}

