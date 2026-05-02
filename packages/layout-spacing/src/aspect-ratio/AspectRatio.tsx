import React, { useMemo } from 'react';
import { AspectRatioProps } from './types';
import { parseAspectRatio } from './tokens';

/**
 * AspectRatio component - Maintains consistent aspect ratios for content
 * across browsers and mobile screens without layout shifts.
 *
 * Works on both Web (using CSS aspect-ratio with fallback) and React Native
 * (using calculated padding-bottom technique).
 *
 * @example
 * // Using preset ratio
 * <AspectRatio ratio={16/9}>
 *   <img src="video-thumbnail.jpg" />
 * </AspectRatio>
 *
 * // Using string ratio
 * <AspectRatio ratio="4:3" maxWidth={600}>
 *   <img src="image.jpg" />
 * </AspectRatio>
 *
 * // Square container
 * <AspectRatio ratio="square">
 *   <View />
 * </AspectRatio>
 */
export function AspectRatio({
  ratio = 1,
  maxWidth,
  maxHeight,
  children,
  style,
  as: Component = 'div',
  testID,
  className,
}: AspectRatioProps): React.ReactElement {
  const numericRatio = useMemo(() => parseAspectRatio(ratio), [ratio]);
  const paddingBottom = useMemo(() => `${(1 / numericRatio) * 100}%`, [numericRatio]);

  const containerStyle: React.CSSProperties = {
    position: 'relative',
    maxWidth: maxWidth,
    maxHeight: maxHeight,
    overflow: 'hidden',
    ...style,
  };

  const aspectRatioStyle: React.CSSProperties = {
    // Modern CSS approach
    aspectRatio: `${numericRatio}`,
    // Fallback for browsers that don't support aspect-ratio
    // Using the padding-bottom hack
    height: 0,
    paddingBottom: paddingBottom,
    width: '100%',
  };

  const contentWrapperStyle: React.CSSProperties = {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'stretch',
    justifyContent: 'stretch',
  };

  // Ensure children fill the container
  const childStyle: React.CSSProperties = {
    width: '100%',
    height: '100%',
    objectFit: 'cover',
  };

  return React.createElement(
    Component,
    {
      'data-testid': testID || 'aspect-ratio',
      className,
      style: containerStyle,
    },
    React.createElement(
      'div',
      { style: aspectRatioStyle },
      React.createElement(
        'div',
        { style: contentWrapperStyle },
        React.Children.map(children, (child) => {
          if (React.isValidElement(child)) {
            // If child is an element, clone it with additional styles
            return React.cloneElement(child as React.ReactElement<any>, {
              style: {
                ...childStyle,
                ...(child.props as any)?.style,
              },
            });
          }
          return child;
        })
      )
    )
  );
}

AspectRatio.displayName = 'AspectRatio';

