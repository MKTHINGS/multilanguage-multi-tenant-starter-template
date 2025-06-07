import {notFound} from 'next/navigation';
import {getRequestConfig} from 'next-intl/server';

// Define supported locales
export const locales = ['en', 'es', 'fr', 'de', 'it', 'ro'] as const;
export type Locale = (typeof locales)[number];

// Default locale
export const defaultLocale: Locale = 'en';

// Locale display names for UI
export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ro: 'Română'
};

// Helper function to check if a locale is supported
export function isValidLocale(locale: string): locale is Locale {
  return locales.includes(locale as Locale);
}

// Get messages for a specific locale
export async function getMessages(locale: Locale) {
  try {
    return (await import(`../locales/${locale}/messages.json`)).default;
  } catch (error) {
    console.error(`Could not load messages for locale: ${locale}`, error);
    return null;
  }
}

// Configuration for next-intl
export default getRequestConfig(async ({locale}) => {
  // Validate that the locale is supported
  if (!isValidLocale(locale)) {
    notFound();
  }

  const messages = await getMessages(locale);
  
  // If messages couldn't be loaded, fall back to the default locale
  if (!messages) {
    if (locale === defaultLocale) {
      throw new Error(`Could not load messages for default locale: ${defaultLocale}`);
    }
    
    // Try to load messages for the default locale as a fallback
    const defaultMessages = await getMessages(defaultLocale);
    if (!defaultMessages) {
      throw new Error(`Could not load messages for default locale: ${defaultLocale}`);
    }
    
    return {
      locale: defaultLocale,
      messages: defaultMessages,
      timeZone: 'UTC'
    };
  }

  return {
    locale,
    messages,
    timeZone: 'UTC'
  };
});