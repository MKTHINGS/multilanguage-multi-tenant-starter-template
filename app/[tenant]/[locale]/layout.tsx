import { NextIntlClientProvider } from 'next-intl';
import { getMessages, locales } from '../../../config/i18n';
import { notFound } from 'next/navigation';

export function generateStaticParams() {
  return locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale, tenant }
}: {
  children: React.ReactNode;
  params: { locale: string; tenant: string };
}) {
  // Validate that the locale is supported
  if (!locales.includes(locale as any)) {
    notFound();
  }

  // Get messages for the current locale
  const messages = await getMessages(locale as any);

  // If messages couldn't be loaded, show 404
  if (!messages) {
    notFound();
  }

  return (
    <NextIntlClientProvider locale={locale} messages={messages}>
      {children}
    </NextIntlClientProvider>
  );
}