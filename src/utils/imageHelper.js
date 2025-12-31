/**
 * Image Helper Utilities
 * Handle Google Drive URLs and image optimization
 */

/**
 * Convert Google Drive URL to direct image URL
 * @param {string} url - Original URL from database
 * @returns {string} - Direct image URL
 */
export const getDirectImageUrl = (url) => {
  if (!url || url === 'null' || url === 'undefined') return null;

  // Already a direct URL (non-Google Drive)
  if (url.startsWith('http') && !url.includes('drive.google.com')) {
    return url;
  }

  // Local path (relative)
  if (url.startsWith('./') || url.startsWith('/')) {
    return url;
  }

  // Google Drive URL patterns
  const drivePatterns = [
    // Pattern 1: https://drive.google.com/file/d/FILE_ID/view
    /drive\.google\.com\/file\/d\/([a-zA-Z0-9_-]+)/,
    
    // Pattern 2: https://drive.google.com/open?id=FILE_ID
    /drive\.google\.com\/open\?id=([a-zA-Z0-9_-]+)/,
    
    // Pattern 3: Already direct format (uc?export=view&id=FILE_ID)
    /drive\.google\.com\/uc\?.*id=([a-zA-Z0-9_-]+)/,
    
    // Pattern 4: Thumbnail format
    /drive\.google\.com\/thumbnail\?.*id=([a-zA-Z0-9_-]+)/,
  ];

  for (const pattern of drivePatterns) {
    const match = url.match(pattern);
    if (match && match[1]) {
      const fileId = match[1];
      // Return optimized thumbnail (800x800 max, maintains aspect ratio)
      return `https://drive.google.com/thumbnail?id=${fileId}&sz=w800`;
    }
  }

  // If no pattern matches, return original
  return url;
};

/**
 * Get optimized image URL with fallback
 * @param {string} url - Original URL
 * @param {string} fallback - Fallback placeholder
 * @returns {string}
 */
export const getOptimizedImageUrl = (url, fallback = null) => {
  const directUrl = getDirectImageUrl(url);
  
  if (!directUrl) {
    return fallback || 'https://via.placeholder.com/600x400/1a1a1a/00d4aa?text=No+Image';
  }

  return directUrl;
};

/**
 * Preload image for better UX
 * @param {string} url - Image URL to preload
 * @returns {Promise<string>} - Resolves with URL when loaded
 */
export const preloadImage = (url) => {
  return new Promise((resolve, reject) => {
    const img = new Image();
    img.onload = () => resolve(url);
    img.onerror = reject;
    img.src = url;
  });
};
