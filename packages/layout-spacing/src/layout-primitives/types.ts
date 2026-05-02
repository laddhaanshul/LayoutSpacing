import { SpacingValue } from '../spacing-system/types';

/** Common style props for all layout primitives */
export interface BaseStyleProps {
  /** Width */
  w?: string | number;
  /** Height */
  h?: string | number;
  /** Min width */
  minW?: string | number;
  /** Min height */
  minH?: string | number;
  /** Max width */
  maxW?: string | number;
  /** Max height */
  maxH?: string | number;
  /** Background color */
  bg?: string;
  /** Border radius */
  borderRadius?: string | number;
  /** Overflow */
  overflow?: 'visible' | 'hidden' | 'scroll' | 'auto';
  /** Opacity */
  opacity?: number;
  /** Position */
  position?: 'static' | 'relative' | 'absolute' | 'fixed' | 'sticky';
  /** Top offset */
  top?: string | number;
  /** Right offset */
  right?: string | number;
  /** Bottom offset */
  bottom?: string | number;
  /** Left offset */
  left?: string | number;
  /** Z-index */
  zIndex?: number;
  /** Cursor */
  cursor?: string;
  /** Custom CSS class name (Web only) */
  className?: string;
  /** Custom inline styles */
  style?: React.CSSProperties;
}

/** Spacing props for layout primitives */
export interface SpacingProps {
  /** Margin - all directions */
  m?: SpacingValue;
  /** Margin top */
  mt?: SpacingValue;
  /** Margin right */
  mr?: SpacingValue;
  /** Margin bottom */
  mb?: SpacingValue;
  /** Margin left */
  ml?: SpacingValue;
  /** Margin horizontal (left + right) */
  mx?: SpacingValue;
  /** Margin vertical (top + bottom) */
  my?: SpacingValue;
  /** Padding - all directions */
  p?: SpacingValue;
  /** Padding top */
  pt?: SpacingValue;
  /** Padding right */
  pr?: SpacingValue;
  /** Padding bottom */
  pb?: SpacingValue;
  /** Padding left */
  pl?: SpacingValue;
  /** Padding horizontal (left + right) */
  px?: SpacingValue;
  /** Padding vertical (top + bottom) */
  py?: SpacingValue;
}

/** Flex-specific props */
export interface FlexProps extends BaseStyleProps, SpacingProps {
  /** Content to render */
  children?: React.ReactNode;
  /** Flex direction */
  direction?: 'row' | 'column' | 'row-reverse' | 'column-reverse';
  /** Justify content */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /** Align items */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Align self */
  alignSelf?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Flex wrap */
  wrap?: 'nowrap' | 'wrap' | 'wrap-reverse';
  /** Flex grow */
  grow?: number | boolean;
  /** Flex shrink */
  shrink?: number | boolean;
  /** Flex basis */
  basis?: string | number;
  /** Gap between flex items */
  gap?: SpacingValue;
  /** Column gap */
  columnGap?: SpacingValue;
  /** Row gap */
  rowGap?: SpacingValue;
  /** HTML element or component to render */
  as?: React.ElementType;
  /** Test ID */
  testID?: string;
}

/** Box component props */
export interface BoxProps extends BaseStyleProps, SpacingProps {
  /** Content to render */
  children?: React.ReactNode;
  /** HTML element or component to render */
  as?: React.ElementType;
  /** Test ID */
  testID?: string;
}

/** Stack component props */
export interface StackProps extends BaseStyleProps, SpacingProps {
  /** Content to render */
  children?: React.ReactNode;
  /** Stack direction */
  direction?: 'vertical' | 'horizontal';
  /** Gap between stack items */
  gap?: SpacingValue;
  /** Alignment */
  align?: 'flex-start' | 'flex-end' | 'center' | 'stretch' | 'baseline';
  /** Justify content */
  justify?: 'flex-start' | 'flex-end' | 'center' | 'space-between' | 'space-around' | 'space-evenly';
  /** Whether stack should wrap */
  wrap?: boolean;
  /** Reverse the stack order */
  reverse?: boolean;
  /** HTML element or component to render */
  as?: React.ElementType;
  /** Test ID */
  testID?: string;
}

