import { useEffect } from 'react';

/**
 * useContentProtection — Global content protection hook.
 * Prevents right-click saving on images, drag-and-drop of images,
 * and blocks Ctrl+S (Save Page) / Ctrl+U (View Source) shortcuts.
 *
 * Call once in App.jsx to protect all images and branded content globally.
 *
 * Note: Client-side protection deters casual copying but is not foolproof.
 * For truly sensitive assets, use server-side watermarking.
 */
export function useContentProtection() {
  useEffect(() => {
    // Disable right-click context menu on images and protected containers
    const handleContextMenu = (e) => {
      if (
        e.target.tagName === 'IMG' ||
        e.target.closest('.protected-content') ||
        e.target.closest('.image-shield')
      ) {
        e.preventDefault();
        return false;
      }
    };

    // Disable drag on images (prevents drag-to-desktop save)
    const handleDragStart = (e) => {
      if (e.target.tagName === 'IMG') {
        e.preventDefault();
        return false;
      }
    };

    // Block Ctrl+S (Save Page) and Ctrl+U (View Source) keyboard shortcuts
    const handleKeyDown = (e) => {
      if ((e.ctrlKey || e.metaKey) && (e.key === 's' || e.key === 'u')) {
        e.preventDefault();
        return false;
      }
    };

    document.addEventListener('contextmenu', handleContextMenu);
    document.addEventListener('dragstart', handleDragStart);
    document.addEventListener('keydown', handleKeyDown);

    return () => {
      document.removeEventListener('contextmenu', handleContextMenu);
      document.removeEventListener('dragstart', handleDragStart);
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, []);
}

export default useContentProtection;
