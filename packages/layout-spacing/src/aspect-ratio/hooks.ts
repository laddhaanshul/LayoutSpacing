import { useState, useEffect } from 'react';
import { parseAspectRatio } from './tokens';

/**
 * Hook to calculate dimensions based on an aspect ratio
 *
 * @example
 * const { width, height } = useAspectRatio(16 / 9, { width: 800 });
 * // width: 800, height: 450
 */
export function useAspectRatio(
  ratio: number | string,
  options: { width?: number; height?: number } = {}
): { width: number | undefined; height: number | undefined } {
  const { width, height } = options;
  const numericRatio = parseAspectRatio(ratio);

  if (width !== undefined && numericRatio > 0) {
    return { width, height: width / numericRatio };
  }

  if (height !== undefined && numericRatio > 0) {
    return { width: height * numericRatio, height };
  }

  return { width: undefined, height: undefined };
}

/**
 * Hook to observe a container's width and compute height from aspect ratio
 *
 * @example
 * const containerRef = useRef<HTMLDivElement>(null);
 * const computedHeight = useContainerAspectRatio(containerRef, 16 / 9);
 */
export function useContainerAspectRatio(
  containerRef: React.RefObject<HTMLElement | null>,
  ratio: number | string = 1
): number {
  const [height, setHeight] = useState(0);
  const numericRatio = parseAspectRatio(ratio);

  useEffect(() => {
    const element = containerRef.current;
    if (!element) return;

    const observer = new ResizeObserver((entries: ResizeObserverEntry[]) => {
      for (const entry of entries) {
        const newWidth = entry.contentRect.width;
        setHeight(newWidth / numericRatio);
      }
    });

    observer.observe(element);
    return () => observer.disconnect();
  }, [containerRef, numericRatio]);

  return height;
}

