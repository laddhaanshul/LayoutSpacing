import { PresetAspectRatios } from './types';

/**
 * Common aspect ratio presets
 */
export const ASPECT_RATIOS: PresetAspectRatios = {
  /** 1:1 - Square */
  square: 1,
  /** 16:9 - Standard video/widescreen */
  video: 16 / 9,
  /** 4:3 - Standard/legacy display */
  standard: 4 / 3,
  /** 21:9 - Ultra-wide cinematic */
  cinematic: 21 / 9,
  /** 3:4 - Portrait mode */
  portrait: 3 / 4,
  /** 1.618 - Golden ratio */
  golden: 1.618,
};

/**
 * Parse an aspect ratio value to a numeric value
 */
export function parseAspectRatio(value: number | string): number {
  if (typeof value === 'number') return value;

  // Handle string fractions like "16/9" or "16:9"
  const fractionMatch = value.match(/^(\d+(?:\.\d+)?)\s*[/:]\s*(\d+(?:\.\d+)?)$/);
  if (fractionMatch) {
    const numerator = parseFloat(fractionMatch[1]);
    const denominator = parseFloat(fractionMatch[2]);
    if (denominator > 0) return numerator / denominator;
  }

  // Handle plain numbers
  const parsed = parseFloat(value);
  if (!isNaN(parsed) && parsed > 0) return parsed;

  return 1; // Default to square
}

/**
 * Calculate height from width and aspect ratio
 */
export function calculateHeight(width: number, ratio: number): number {
  return width / ratio;
}

/**
 * Calculate width from height and aspect ratio
 */
export function calculateWidth(height: number, ratio: number): number {
  return height * ratio;
}

