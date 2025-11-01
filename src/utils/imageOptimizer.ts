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

// Cloudinary cloud name
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

/**
 * Optimize hero/banner images with higher quality settings
 * @param originalUrl - Original image URL
 * @returns Optimized hero image URL
 */
export function optimizeHeroImage(originalUrl: string): string {
  if (!originalUrl) return '';
  
  return optimizeImage(originalUrl, {
    width: 1920,
    height: 800,
    quality: 90, // Higher quality for hero images
    format: 'auto',
    fit: 'cover'
  });
}

/**
 * Preload critical hero image for faster LCP (Largest Contentful Paint)
 * Call this in useEffect for above-the-fold hero images
 * @param url - Original image URL to preload
 */
export function preloadHeroImage(url: string): void {
  if (!url || typeof window === 'undefined') return;
  
  const optimizedUrl = optimizeHeroImage(url);
  
  // Check if already preloaded
  const existingLink = document.querySelector(`link[href="${optimizedUrl}"]`);
  if (existingLink) return;
  
  // Create preload link
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = 'image';
  link.href = optimizedUrl;
  link.fetchPriority = 'high'; // Tell browser this is critical
  
  // Add to document head
  document.head.appendChild(link);
}

/**
 * Optimize thumbnail images (small size, lower quality)
 * Perfect for grid views, lists, or preview cards
 * @param originalUrl - Original image URL
 * @returns Optimized thumbnail URL
 */
export function optimizeThumbnail(originalUrl: string): string {
  if (!originalUrl) return '';
  
  return optimizeImage(originalUrl, {
    width: 300,
    height: 300,
    quality: 75,
    format: 'auto',
    fit: 'cover'
  });
}

/**
 * Optimize product card images (medium size)
 * Balanced quality/size for product listings
 * @param originalUrl - Original image URL
 * @returns Optimized product card URL
 */
export function optimizeProductCard(originalUrl: string): string {
  if (!originalUrl) return '';
  
  return optimizeImage(originalUrl, {
    width: 600,
    height: 450,
    quality: 85,
    format: 'auto',
    fit: 'cover'
  });
}

/**
 * Generate sizes attribute for responsive images
 * Helps browser select the right image from srcset
 * @param breakpoints - Custom breakpoints (optional)
 * @returns sizes string for img tag
 */
export function generateSizes(
  breakpoints: { maxWidth: string; size: string }[] = []
): string {
  // Default responsive breakpoints
  const defaultBreakpoints = [
    { maxWidth: '640px', size: '100vw' },   // Mobile: full width
    { maxWidth: '1024px', size: '50vw' },   // Tablet: half width
    { maxWidth: '1536px', size: '33vw' }    // Desktop: third width
  ];
  
  const sizes = breakpoints.length > 0 ? breakpoints : defaultBreakpoints;
  
  return sizes
    .map(bp => `(max-width: ${bp.maxWidth}) ${bp.size}`)
    .join(', ') + ', 33vw'; // Default fallback
}
