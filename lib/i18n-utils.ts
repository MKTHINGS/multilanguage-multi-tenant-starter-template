import { createSharedPathnamesNavigation } from 'next-intl/navigation';
import { locales } from '../config/i18n';

/**
 * Create navigation utilities for internationalized routes
 * This provides type-safe navigation functions that maintain the current locale
 */
export const { Link, redirect, usePathname, useRouter } =
  createSharedPathnamesNavigation({ locales });

/**
 * Formats a URL with tenant and locale parameters
 * @param tenant The tenant identifier
 * @param locale The locale code
 * @param path The path after tenant and locale
 * @returns Formatted URL
 */
export function formatLocalizedUrl(tenant: string, locale: string, path: string = '') {
  // Ensure path starts without a slash
  const cleanPath = path.startsWith('/') ? path.substring(1) : path;
  
  // Construct the URL with tenant and locale
  return `/${tenant}/${locale}${cleanPath ? `/${cleanPath}` : ''}`;
}

/**
 * Extracts the current path without tenant and locale segments
 * @param fullPath The full URL path
 * @returns The path without tenant and locale segments
 */
export function extractPathWithoutLocale(fullPath: string): string {
  const segments = fullPath.split('/').filter(Boolean);
  
  // Remove tenant and locale segments (first two non-empty segments)
  if (segments.length >= 2) {
    return '/' + segments.slice(2).join('/');
  }
  
  return '/';
}