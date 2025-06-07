import { getTranslations } from 'next-intl/server';
import LocalizedPageHeader from '../../../../components/LocalizedPageHeader';
import LocalizedNavigation from '../../../../components/LocalizedNavigation';
import LocalizedForm from '../../../../components/LocalizedForm';
import EnhancedLanguageSwitcher from '../../../../components/EnhancedLanguageSwitcher';

/**
 * ExamplesPage - A page that demonstrates the use of all i18n components
 * 
 * This page showcases the different i18n components we've created:
 * - LocalizedPageHeader (server component)
 * - LocalizedNavigation (client component)
 * - LocalizedForm (client component with validation)
 * - EnhancedLanguageSwitcher (improved language switcher)
 */
export default async function ExamplesPage({
  params: { tenant, locale }
}: {
  params: { tenant: string; locale: string }
}) {
  // Get translations for server component
  const t = await getTranslations();

  return (
    <div className="flex flex-col min-h-screen">
      {/* Navigation (Client Component) */}
      <LocalizedNavigation tenant={tenant} locale={locale} />
      
      {/* Page Header (Server Component) */}
      <LocalizedPageHeader 
        title="meta.title" 
        description="meta.description" 
        tenant={tenant}
        welcomeName="Developer" 
      />
      
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {/* Language Switcher Section */}
          <div className="px-4 py-6 sm:px-0 mb-8">
            <h2 className="text-2xl font-semibold mb-4">
              Language Switcher Example
            </h2>
            <div className="bg-white shadow rounded-lg p-6">
              <p className="mb-4">
                Current locale: <strong>{locale}</strong>
              </p>
              <EnhancedLanguageSwitcher currentLocale={locale} tenant={tenant} />
            </div>
          </div>
          
          {/* Form Section */}
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold mb-4">
              Localized Form Example
            </h2>
            <LocalizedForm />
          </div>
        </div>
      </main>
      
      <footer className="bg-white">
        <div className="max-w-7xl mx-auto py-4 px-4 sm:px-6 lg:px-8">
          <p className="text-center text-sm text-gray-500">
            &copy; 2025 {t('meta.title')}
          </p>
        </div>
      </footer>
    </div>
  );
}