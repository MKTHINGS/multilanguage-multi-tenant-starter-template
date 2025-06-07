import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

// Create the middleware with next-intl
export default createMiddleware({
  // Define the supported locales
  locales: locales,
  
  // Set the default locale
  defaultLocale,
  
  // Configure locale detection strategy
  localeDetection: {
    // Enable detection from Accept-Language header
    acceptLanguage: true,
    
    // Enable detection from cookies
    cookie: true,
    
    // Enable detection from URL
    url: true,
  },
  
  // Configure locale prefix strategy
  localePrefix: 'as-needed',
});

// Configure the middleware to match specific paths
export const config = {
  // Match all pathnames except for:
  // - API routes (/api/*)
  // - Static files (/_next/*)
  // - Public files (/public/*)
  // - Static assets (*.ico, *.jpg, etc.)
  matcher: ['/((?!api|_next|.*\\..*).*)']
};