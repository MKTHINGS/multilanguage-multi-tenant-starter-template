import { getTranslations } from 'next-intl/server';
import LanguageSwitcher from '../../../components/LanguageSwitcher';

// This is a Server Component
export default async function Home({
  params: { tenant, locale }
}: {
  params: { tenant: string; locale: string }
}) {
  // Get translations for server component
  const t = await getTranslations();

  return (
    <div className="flex flex-col min-h-screen">
      <header className="bg-white shadow">
        <div className="max-w-7xl mx-auto py-6 px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-bold text-gray-900">
            {t('meta.title')} - {tenant}
          </h1>
          <p className="mt-1 text-sm text-gray-500">
            {t('meta.description')}
          </p>
          <LanguageSwitcher currentLocale={locale} tenant={tenant} />
        </div>
      </header>
      <main className="flex-grow">
        <div className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          <div className="px-4 py-6 sm:px-0">
            <h2 className="text-2xl font-semibold mb-4">
              {t('dashboard.welcome', { name: 'User' })}
            </h2>
            
            <div className="border-4 border-dashed border-gray-200 rounded-lg p-4 mb-6">
              <h3 className="text-lg font-medium mb-2">{t('dashboard.overview')}</h3>
              <p>{t('dashboard.recentActivity')}</p>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">{t('navigation.projects')}</h3>
                <p>{t('dashboard.noData')}</p>
              </div>
              <div className="bg-white shadow rounded-lg p-4">
                <h3 className="text-lg font-medium mb-2">{t('navigation.teams')}</h3>
                <p>{t('teams.myTeams')}</p>
              </div>
            </div>
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