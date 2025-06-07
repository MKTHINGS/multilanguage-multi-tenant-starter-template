'use client';

import { useTranslations } from 'next-intl';
import { usePathname, useRouter } from 'next/navigation';
import { locales, localeNames, Locale } from '../config/i18n';

interface LanguageSwitcherProps {
  currentLocale: string;
  tenant: string;
}

export default function LanguageSwitcher({ currentLocale, tenant }: LanguageSwitcherProps) {
  const t = useTranslations();
  const pathname = usePathname();
  const router = useRouter();

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
  };

  return (
    <div className="mt-4">
      <label htmlFor="language-select" className="block text-sm font-medium text-gray-700">
        {t('common.language')}
      </label>
      <select
        id="language-select"
        className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        value={currentLocale}
        onChange={(e) => handleLanguageChange(e.target.value)}
      >
        {locales.map((locale) => (
          <option key={locale} value={locale}>
            {localeNames[locale as Locale]}
          </option>
        ))}
      </select>
    </div>
  );
}