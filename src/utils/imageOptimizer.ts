/**
 * Image CDN utility for optimizing Shopify product images
 * Uses Cloudinary for image transformation and optimization
 */

interface ImageOptions {
  width?: number;
  height?: number;
  quality?: number;
  format?: 'auto' | 'webp' | 'avif' | 'jpg' | 'png';
  fit?: 'cover' | 'contain' | 'fill' | 'scale-down';
}

// ⚠️ REPLACE 'demo' WITH YOUR CLOUDINARY CLOUD NAME
const CLOUDINARY_CLOUD_NAME = 'dtnziia9i';

/**
 * Optimize image URL using Cloudinary CDN
 * @param originalUrl - Original Shopify image URL
 * @param options - Transformation options (width, height, quality, format, fit)
 * @returns Optimized Cloudinary URL
 */
export function optimizeImage(
  originalUrl: string,
  options: ImageOptions = {}
): string {
  // Default options
  const {
    width,
    height,
    quality = 80,
    format = 'auto',
    fit = 'cover',
  } = options;

  // If no URL provided, return empty string
  if (!originalUrl || originalUrl === '') {
    return '';
  }

  // Build transformation parameters
  const transformations: string[] = [];
  
  if (width) transformations.push(`w_${width}`);
  if (height) transformations.push(`h_${height}`);
  if (quality) transformations.push(`q_${quality}`);
  if (format) transformations.push(`f_${format}`);
  
  // Map fit options to Cloudinary crop modes
  const cropMode = fit === 'cover' ? 'fill' : fit === 'contain' ? 'fit' : 'scale';
  transformations.push(`c_${cropMode}`);

  const transformString = transformations.join(',');
  
  // Encode the original URL
  const encodedUrl = encodeURIComponent(originalUrl);
  
  // Return Cloudinary fetch URL
  return `https://res.cloudinary.com/${CLOUDINARY_CLOUD_NAME}/image/fetch/${transformString}/${encodedUrl}`;
}

/**
 * Generate responsive image srcset for different screen sizes
 * @param originalUrl - Original image URL
 * @param widths - Array of widths to generate (default: [400, 600, 800, 1200])
 * @returns srcset string for responsive images
 */
export function generateSrcSet(
  originalUrl: string,
  widths: number[] = [400, 600, 800, 1200]
): string {
  if (!originalUrl) return '';
  
  return widths
    .map((width) => {
      const optimizedUrl = optimizeImage(originalUrl, { 
        width, 
        format: 'auto',
        quality: 80 
      });
      return `${optimizedUrl} ${width}w`;
    })
    .join(', ');
}

/**
 * Get placeholder image URL with blurred effect (for loading states)
 * @param originalUrl - Original image URL
 * @returns Blurred placeholder URL
 */
export function getPlaceholderImage(originalUrl: string): string {
  if (!originalUrl) return '';
  
  return optimizeImage(originalUrl, {
    width: 50,
    quality: 30,
    format: 'auto',
  }) + ',e_blur:1000'; // Add blur effect
}
