# Multi-tenant Next.js Starter with Internationalization (i18n)

This is a multi-tenant Next.js starter template with built-in internationalization support using next-intl. The template allows you to create applications that can serve multiple tenants (organizations, clients, etc.) with content in multiple languages.

## Features

- **Multi-tenant architecture**: Serve different content based on tenant
- **Internationalization (i18n)**: Support for multiple languages
- **Next.js App Router**: Modern routing with the latest Next.js features
- **TypeScript**: Type safety throughout the application
- **Tailwind CSS**: Utility-first CSS framework for styling

## Supported Languages

The application currently supports the following languages:

- English (en)
- Spanish (es)
- French (fr)
- German (de)
- Italian (it)
- Romanian (ro)

## Directory Structure

```
project/
├── app/                         # Next.js App Router structure
│   ├── [tenant]/                # Tenant-specific routes
│   │   ├── [locale]/            # Locale-specific routes
│   │   │   └── ...              # Various app pages
│   ├── api/                     # API routes
│   └── ...                      # Other app files
├── components/                  # React components
│   ├── EnhancedLanguageSwitcher.tsx  # Language switcher component
│   ├── LanguageSwitcher.tsx     # Basic language switcher
│   ├── LocalizedForm.tsx        # Form with i18n validation
│   ├── LocalizedNavigation.tsx  # Navigation with i18n
│   └── LocalizedPageHeader.tsx  # Page header with i18n
├── config/                      # Configuration files
│   └── i18n.ts                  # i18n configuration
├── locales/                     # Translation files
│   ├── en/                      # English translations
│   ├── es/                      # Spanish translations
│   ├── fr/                      # French translations
│   ├── de/                      # German translations
│   ├── it/                      # Italian translations
│   └── ro/                      # Romanian translations
└── middleware.ts                # Next.js middleware for language detection
```

## Internationalization (i18n) Implementation

### Overview

The i18n implementation in this project uses [next-intl](https://next-intl.dev/), a powerful internationalization library for Next.js. The implementation follows these key principles:

1. **URL-based language selection**: Languages are part of the URL structure (`/[tenant]/[locale]/...`)
2. **Automatic language detection**: The middleware detects the user's preferred language
3. **Translation files**: JSON files containing translations for each supported language
4. **Server and client components**: Support for translations in both server and client components

### How It Works

1. **URL Structure**: The application uses a nested dynamic route structure with `[tenant]` and `[locale]` parameters
2. **Middleware**: The `middleware.ts` file handles language detection and routing
3. **Configuration**: The `config/i18n.ts` file defines supported locales and helper functions
4. **Translations**: JSON files in the `locales/` directory contain translations for each language
5. **Components**: Both server and client components can access translations using hooks or functions

## Using Translations

### In Client Components

To use translations in client components, use the `useTranslations` hook:

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  // Get translations for the default namespace
  const t = useTranslations();
  
  // Or get translations for a specific namespace
  const navT = useTranslations('navigation');
  
  return (
    <div>
      <h1>{t('meta.title')}</h1>
      <nav>
        <a href="/">{navT('home')}</a>
        <a href="/dashboard">{navT('dashboard')}</a>
      </nav>
    </div>
  );
}
```

### In Server Components

For server components, use the `getTranslations` function:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  // Get translations for the default namespace
  const t = await getTranslations();
  
  // Or get translations for a specific namespace
  const navT = await getTranslations('navigation');
  
  return (
    <div>
      <h1>{t('meta.title')}</h1>
      <p>{navT('home')}</p>
    </div>
  );
}
```

### Using Parameters in Translations

You can use parameters in your translations:

```tsx
// In your translation file (e.g., locales/en/messages.json)
{
  "welcome": "Welcome, {name}!"
}

// In your component
const t = useTranslations();
return <p>{t('welcome', { name: 'John' })}</p>;
```

## Language Switcher

The project includes two language switcher components:

1. **LanguageSwitcher**: A basic dropdown for changing languages
2. **EnhancedLanguageSwitcher**: An improved version with flags and better UI

To use the language switcher, include it in your layout or page:

```tsx
import EnhancedLanguageSwitcher from '../components/EnhancedLanguageSwitcher';

export default function MyPage({ params: { tenant, locale } }) {
  return (
    <div>
      <EnhancedLanguageSwitcher currentLocale={locale} tenant={tenant} />
      {/* Rest of your page */}
    </div>
  );
}
```

## Adding a New Language

To add a new language to the application:

1. **Update the i18n configuration**:

```tsx
// config/i18n.ts
export const locales = ['en', 'es', 'fr', 'de', 'it', 'ro', 'new-locale'] as const;

export const localeNames: Record<Locale, string> = {
  en: 'English',
  es: 'Español',
  fr: 'Français',
  de: 'Deutsch',
  it: 'Italiano',
  ro: 'Română',
  'new-locale': 'New Language Name'
};
```

2. **Create a new translation file**:

```
mkdir -p locales/new-locale
cp locales/en/messages.json locales/new-locale/messages.json
```

3. **Translate the content** in the new `messages.json` file

4. **Test the new language** by navigating to a URL with the new locale (e.g., `/your-tenant/new-locale/`)

## Form Validation with i18n

The `LocalizedForm` component demonstrates how to implement form validation with internationalized error messages:

1. **Define validation error messages** in your translation files
2. **Use the translations in your validation logic**
3. **Display localized error messages** to the user

Example:

```tsx
// In your form component
const errorT = useTranslations('errors');

// During validation
if (!email) {
  errors.email = errorT('required', { field: 'Email' });
} else if (!isValidEmail(email)) {
  errors.email = errorT('invalidEmail');
}
```

## Best Practices for Maintaining Translations

1. **Organize translations by feature**: Group related translations together
2. **Use namespaces**: Separate translations into logical namespaces (e.g., 'common', 'navigation')
3. **Be consistent with keys**: Use a consistent naming convention for translation keys
4. **Use parameters**: Instead of creating multiple similar translations, use parameters
5. **Keep translations up to date**: Update all language files when adding new features
6. **Consider using translation management tools**: For larger projects, consider tools like Lokalise or Crowdin
7. **Provide context for translators**: Add comments or descriptions for complex translations

## Example Components

The project includes several example components that demonstrate i18n usage:

1. **LocalizedNavigation**: A client component that shows a navigation menu with translations
2. **LocalizedPageHeader**: A server component that displays a page header with translations
3. **LocalizedForm**: A form component with localized labels and validation messages
4. **EnhancedLanguageSwitcher**: An improved language switcher component

You can see all these components in action on the examples page: `/[tenant]/[locale]/examples`

## Known Limitations and Considerations

1. **SEO**: Consider implementing hreflang tags for better SEO across languages
2. **RTL languages**: Additional styling may be needed for right-to-left languages
3. **Date and number formatting**: Use the Intl API for formatting dates and numbers
4. **Translation workflow**: For larger projects, consider implementing a more robust translation workflow
5. **Performance**: Large translation files can impact bundle size; consider code splitting

## License

This project is licensed under the MIT License - see the LICENSE file for details.