# Internationalization (i18n) Implementation Guide

This guide provides detailed information about the internationalization implementation in the multi-tenant Next.js starter template.

## Table of Contents

1. [Architecture Overview](#architecture-overview)
2. [Configuration](#configuration)
3. [Translation Files](#translation-files)
4. [Server Components](#server-components)
5. [Client Components](#client-components)
6. [Middleware](#middleware)
7. [Language Switching](#language-switching)
8. [Form Validation](#form-validation)
9. [Advanced Usage](#advanced-usage)
10. [Troubleshooting](#troubleshooting)

## Architecture Overview

The i18n implementation in this project follows a URL-based approach with the following structure:

```
/[tenant]/[locale]/[...rest-of-path]
```

This structure allows for:
- Multi-tenant support (different organizations/clients)
- Language-specific content
- Clean and SEO-friendly URLs

The implementation uses [next-intl](https://next-intl.dev/), a powerful internationalization library for Next.js that supports both client and server components in the App Router.

## Configuration

The i18n configuration is defined in `config/i18n.ts`:

```typescript
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
```

The configuration also includes helper functions for:
- Validating locales
- Loading translation messages
- Configuring next-intl

## Translation Files

Translation files are stored in the `locales/` directory with the following structure:

```
locales/
├── en/
│   └── messages.json
├── es/
│   └── messages.json
├── fr/
│   └── messages.json
└── ...
```

Each `messages.json` file contains translations organized by namespaces:

```json
{
  "common": {
    "loading": "Loading...",
    "error": "An error occurred"
  },
  "navigation": {
    "home": "Home",
    "dashboard": "Dashboard"
  }
}
```

## Server Components

In server components, translations are accessed using the `getTranslations` function from next-intl:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function MyServerComponent() {
  // Get translations for the default namespace
  const t = await getTranslations();
  
  // Get translations for a specific namespace
  const navT = await getTranslations('navigation');
  
  return (
    <div>
      <h1>{t('meta.title')}</h1>
      <nav>
        <a href="/">{navT('home')}</a>
      </nav>
    </div>
  );
}
```

### Example: LocalizedPageHeader

The `LocalizedPageHeader` component demonstrates how to use translations in a server component:

```tsx
import { getTranslations } from 'next-intl/server';

export default async function LocalizedPageHeader({ title, description }) {
  const t = await getTranslations();
  
  return (
    <div>
      <h1>{t(title)}</h1>
      {description && <p>{t(description)}</p>}
    </div>
  );
}
```

## Client Components

In client components, translations are accessed using the `useTranslations` hook:

```tsx
'use client';

import { useTranslations } from 'next-intl';

export default function MyClientComponent() {
  const t = useTranslations();
  const navT = useTranslations('navigation');
  
  return (
    <div>
      <h1>{t('meta.title')}</h1>
      <button>{navT('home')}</button>
    </div>
  );
}
```

### Example: LocalizedNavigation

The `LocalizedNavigation` component demonstrates how to use translations in a client component:

```tsx
'use client';

import { useTranslations } from 'next-intl';
import Link from 'next/link';

export default function LocalizedNavigation({ tenant, locale }) {
  const t = useTranslations('navigation');
  
  return (
    <nav>
      <Link href={`/${tenant}/${locale}`}>{t('home')}</Link>
      <Link href={`/${tenant}/${locale}/dashboard`}>{t('dashboard')}</Link>
    </nav>
  );
}
```

## Middleware

The middleware (`middleware.ts`) handles language detection and routing:

```typescript
import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './config/i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  localeDetection: {
    acceptLanguage: true,
    cookie: true,
    url: true,
  },
  localePrefix: 'as-needed',
});

export const config = {
  matcher: ['/((?!api|_next|.*\\..*).*)']
};
```

The middleware:
1. Detects the user's preferred language from:
   - Accept-Language header
   - Cookies
   - URL
2. Redirects to the appropriate locale path if needed
3. Handles 404 errors for unsupported locales

## Language Switching

The project includes two language switcher components:

1. **LanguageSwitcher**: A basic dropdown
2. **EnhancedLanguageSwitcher**: An improved version with flags and better UI

Both components handle language switching by:
1. Extracting the current path
2. Replacing the locale segment
3. Navigating to the new path

```tsx
const handleLanguageChange = (newLocale: string) => {
  const pathSegments = pathname.split('/');
  const remainingPath = pathSegments.slice(3).join('/');
  const newPath = `/${tenant}/${newLocale}${remainingPath ? `/${remainingPath}` : ''}`;
  router.push(newPath);
};
```

## Form Validation

The `LocalizedForm` component demonstrates how to implement form validation with internationalized error messages:

```tsx
const validateForm = (): boolean => {
  const newErrors: FormErrors = {};
  
  if (!formData.email.trim()) {
    newErrors.email = errorT('required', { field: formT('email') });
  } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
    newErrors.email = errorT('invalidEmail');
  }
  
  setErrors(newErrors);
  return Object.keys(newErrors).length === 0;
};
```

Key aspects of form validation with i18n:
1. Use translation keys for error messages
2. Pass dynamic values as parameters
3. Organize validation messages in a dedicated namespace (e.g., 'errors')
4. Use field name translations to keep everything localized

## Advanced Usage

### Pluralization

next-intl supports pluralization using the ICU message format:

```json
{
  "items": "{count, plural, =0 {No items} one {# item} other {# items}}"
}
```

Usage:
```tsx
t('items', { count: 5 }) // "5 items"
```

### Date and Number Formatting

Use the `useFormatter` hook for date and number formatting:

```tsx
const formatter = useFormatter();

// Format date
formatter.dateTime(new Date(), { dateStyle: 'full' });

// Format number
formatter.number(1000, { style: 'currency', currency: 'EUR' });
```

### Rich Text Formatting

For rich text with HTML tags:

```tsx
t('richText', {
  b: (chunks) => <strong>{chunks}</strong>,
  i: (chunks) => <em>{chunks}</em>
});
```

## Troubleshooting

### Common Issues

1. **Missing translations**:
   - Check if the translation key exists in all language files
   - Verify the namespace is correct
   - Use the default locale as a fallback

2. **Language detection not working**:
   - Ensure the middleware is properly configured
   - Check browser language settings
   - Clear cookies and try again

3. **Client component hydration errors**:
   - Ensure the same locale is used during server rendering and client hydration
   - Avoid mixing server and client rendering of the same translated content

### Debugging Tips

1. Add console logs to check loaded translations:
   ```tsx
   console.log('Loaded messages:', messages);
   ```

2. Use the React Developer Tools to inspect component props and state

3. Check network requests to ensure the correct locale files are being loaded

4. Test with different browsers and language settings to verify detection logic