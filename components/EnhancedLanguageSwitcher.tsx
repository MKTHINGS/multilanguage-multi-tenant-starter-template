'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { useState } from 'react';
import { locales, localeNames, Locale } from '../config/i18n';

interface EnhancedLanguageSwitcherProps {
  currentLocale: string;
  tenant: string;
}

/**
 * EnhancedLanguageSwitcher - An improved language switcher component
 * 
 * This component provides a more visually appealing and user-friendly way
 * to switch between languages. It shows language names in their native form
 * and uses a dropdown menu for selection.
 */
export default function EnhancedLanguageSwitcher({ 
  currentLocale, 
  tenant 
}: EnhancedLanguageSwitcherProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();
  const [isOpen, setIsOpen] = useState(false);

  // Function to change the language
  const handleLanguageChange = (newLocale: string) => {
    // Get the path after the tenant and locale segments
    const pathSegments = pathname.split('/');
    // Remove the first empty segment, tenant, and locale segments
    const remainingPath = pathSegments.slice(3).join('/');
    
    // Construct the new path with the new locale
    const newPath = `/${tenant}/${newLocale}${remainingPath ? `/${remainingPath}` : ''}`;
    
    // Navigate to the new path
    router.push(newPath);
    setIsOpen(false);
  };

  // Get the current locale display name
  const currentLocaleName = localeNames[currentLocale as Locale];

  return (
    <div className="relative inline-block text-left">
      <div>
        <button
          type="button"
          className="inline-flex justify-center w-full rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          id="language-menu"
          aria-expanded="true"
          aria-haspopup="true"
          onClick={() => setIsOpen(!isOpen)}
        >
          {t('common.language')}: {currentLocaleName}
          <svg
            className="-mr-1 ml-2 h-5 w-5"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 20 20"
            fill="currentColor"
            aria-hidden="true"
          >
            <path
              fillRule="evenodd"
              d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>
      </div>

      {isOpen && (
        <div
          className="origin-top-right absolute right-0 mt-2 w-56 rounded-md shadow-lg bg-white ring-1 ring-black ring-opacity-5 divide-y divide-gray-100 focus:outline-none z-10"
          role="menu"
          aria-orientation="vertical"
          aria-labelledby="language-menu"
        >
          <div className="py-1" role="none">
            {locales.map((locale) => (
              <button
                key={locale}
                className={`${
                  locale === currentLocale
                    ? 'bg-gray-100 text-gray-900'
                    : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900'
                } group flex items-center w-full px-4 py-2 text-sm`}
                role="menuitem"
                onClick={() => handleLanguageChange(locale)}
              >
                <span className="mr-3 h-5 w-5 text-center">
                  {locale === 'en' ? '🇬🇧' :
                   locale === 'es' ? '🇪🇸' :
                   locale === 'fr' ? '🇫🇷' :
                   locale === 'de' ? '🇩🇪' :
                   locale === 'it' ? '🇮🇹' :
                   locale === 'ro' ? '🇷🇴' : ''}
                </span>
                {localeNames[locale as Locale]}
                {locale === currentLocale && (
                  <span className="ml-auto">
                    <svg
                      className="h-5 w-5"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 20 20"
                      fill="currentColor"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z"
                        clipRule="evenodd"
                      />
                    </svg>
                  </span>
                )}
              </button>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}