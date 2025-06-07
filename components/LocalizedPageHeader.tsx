import { getTranslations } from 'next-intl/server';

interface LocalizedPageHeaderProps {
  title: string;
  description?: string;
  tenant: string;
  welcomeName?: string;
}

/**
 * LocalizedPageHeader - A server component that demonstrates i18n usage
 * 
 * This component renders a page header with localized text using next-intl.
 * It shows how to use the getTranslations function in a server component.
 */
export default async function LocalizedPageHeader({ 
  title, 
  description, 
  tenant,
  welcomeName 
}: LocalizedPageHeaderProps) {
  // Get translations for server component
  const t = await getTranslations();
  
  // Get translations specifically for the dashboard namespace
  const dashboardT = await getTranslations('dashboard');

  return (
    <div className="bg-white shadow">
      <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
        <div className="md:flex md:items-center md:justify-between">
          <div className="flex-1 min-w-0">
            <h1 className="text-3xl font-bold text-gray-900">
              {t(title)} - {tenant}
            </h1>
            
            {description && (
              <p className="mt-1 text-sm text-gray-500">
                {t(description)}
              </p>
            )}
            
            {welcomeName && (
              <p className="mt-3 text-xl text-gray-600">
                {dashboardT('welcome', { name: welcomeName })}
              </p>
            )}
          </div>
          
          <div className="mt-4 flex md:mt-0 md:ml-4">
            <span className="shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-gray-300 text-sm leading-5 font-medium rounded-md text-gray-700 bg-white hover:text-gray-500 focus:outline-none focus:shadow-outline-blue focus:border-blue-300 active:text-gray-800 active:bg-gray-50 transition duration-150 ease-in-out"
              >
                {t('common.edit')}
              </button>
            </span>
            <span className="ml-3 shadow-sm rounded-md">
              <button
                type="button"
                className="inline-flex items-center px-4 py-2 border border-transparent text-sm leading-5 font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-500 focus:outline-none focus:shadow-outline-indigo focus:border-indigo-700 active:bg-indigo-700 transition duration-150 ease-in-out"
              >
                {t('common.create')}
              </button>
            </span>
          </div>
        </div>
      </div>
    </div>
  );
}