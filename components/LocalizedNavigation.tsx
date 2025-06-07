'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';
import { usePathname } from 'next/navigation';

interface LocalizedNavigationProps {
  tenant: string;
  locale: string;
}

/**
 * LocalizedNavigation - A client component that demonstrates i18n usage
 * 
 * This component renders a navigation menu with localized text using next-intl.
 * It shows how to use the useTranslations hook in a client component.
 */
export default function LocalizedNavigation({ tenant, locale }: LocalizedNavigationProps) {
  const t = useTranslations('navigation');
  const pathname = usePathname();
  
  // Helper function to generate localized links
  const createLocalizedLink = (path: string) => `/${tenant}/${locale}${path}`;
  
  // Navigation items with their paths
  const navItems = [
    { key: 'home', path: '' },
    { key: 'dashboard', path: '/dashboard' },
    { key: 'projects', path: '/projects' },
    { key: 'teams', path: '/teams' },
    { key: 'settings', path: '/settings' }
  ];

  return (
    <nav className="bg-gray-800 text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center">
            <div className="flex-shrink-0">
              <span className="text-xl font-bold">
                {tenant.charAt(0).toUpperCase() + tenant.slice(1)}
              </span>
            </div>
            <div className="hidden md:block">
              <div className="ml-10 flex items-baseline space-x-4">
                {navItems.map((item) => {
                  const fullPath = createLocalizedLink(item.path);
                  const isActive = pathname === fullPath || 
                    (item.path !== '' && pathname.startsWith(fullPath));
                  
                  return (
                    <Link
                      key={item.key}
                      href={fullPath}
                      className={`px-3 py-2 rounded-md text-sm font-medium ${
                        isActive
                          ? 'bg-gray-900 text-white'
                          : 'text-gray-300 hover:bg-gray-700 hover:text-white'
                      }`}
                    >
                      {t(item.key)}
                    </Link>
                  );
                })}
              </div>
            </div>
          </div>
          <div className="hidden md:block">
            <div className="ml-4 flex items-center md:ml-6">
              <Link
                href={createLocalizedLink('/profile')}
                className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium"
              >
                {t('profile')}
              </Link>
              <button className="text-gray-300 hover:bg-gray-700 hover:text-white px-3 py-2 rounded-md text-sm font-medium">
                {t('logout')}
              </button>
            </div>
          </div>
        </div>
      </div>
      
      {/* Mobile menu, show/hide based on menu state */}
      <div className="md:hidden">
        <div className="px-2 pt-2 pb-3 space-y-1 sm:px-3">
          {navItems.map((item) => (
            <Link
              key={item.key}
              href={createLocalizedLink(item.path)}
              className="block px-3 py-2 rounded-md text-base font-medium text-gray-300 hover:bg-gray-700 hover:text-white"
            >
              {t(item.key)}
            </Link>
          ))}
        </div>
      </div>
    </nav>
  );
}