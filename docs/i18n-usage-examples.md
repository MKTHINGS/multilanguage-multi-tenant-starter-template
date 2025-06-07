# Internationalization (i18n) Usage Examples

This document provides practical code examples for common internationalization scenarios in the multi-tenant Next.js starter template.

## Table of Contents

1. [Basic Translation Usage](#basic-translation-usage)
2. [Working with Namespaces](#working-with-namespaces)
3. [Dynamic Values and Parameters](#dynamic-values-and-parameters)
4. [Pluralization](#pluralization)
5. [Date and Number Formatting](#date-and-number-formatting)
6. [Handling Rich Text](#handling-rich-text)
7. [Conditional Translations](#conditional-translations)
8. [Language Detection and Switching](#language-detection-and-switching)
9. [Form Validation](#form-validation)
10. [SEO Considerations](#seo-considerations)

## Basic Translation Usage

### In Server Components

```tsx
// app/[tenant]/[locale]/example/page.tsx
import { getTranslations } from 'next-intl/server';

export default async function ExamplePage() {
  const t = await getTranslations();
  
  return (
    <div>
      <h1>{t('meta.title')}</h1>
      <p>{t('meta.description')}</p>
    </div>
  );
}
```

### In Client Components

```tsx
// components/ExampleClientComponent.tsx
'use client';

import { useTranslations } from 'next-intl';

export default function ExampleClientComponent() {
  const t = useTranslations();
  
  return (
    <div>
      <h1>{t('meta.title')}</h1>
      <button>{t('common.submit')}</button>
    </div>
  );
}
```

## Working with Namespaces

Namespaces help organize translations into logical groups.

### Translation File Structure

```json
{
  "common": {
    "submit": "Submit",
    "cancel": "Cancel"
  },
  "navigation": {
    "home": "Home",
    "about": "About"
  },
  "auth": {
    "login": "Log In",
    "register": "Register"
  }
}
```

### Using Specific Namespaces

```tsx
// In client components
const commonT = useTranslations('common');
const navT = useTranslations('navigation');

return (
  <div>
    <nav>
      <a href="/">{navT('home')}</a>
      <a href="/about">{navT('about')}</a>
    </nav>
    <button>{commonT('submit')}</button>
  </div>
);

// In server components
const commonT = await getTranslations('common');
const navT = await getTranslations('navigation');

return (
  <div>
    <nav>
      <a href="/">{navT('home')}</a>
      <a href="/about">{navT('about')}</a>
    </nav>
    <button>{commonT('submit')}</button>
  </div>
);
```

## Dynamic Values and Parameters

### Translation File

```json
{
  "welcome": "Welcome, {name}!",
  "itemCount": "You have {count} items in your cart",
  "price": "Price: {amount} {currency}"
}
```

### Usage

```tsx
// Simple parameter
t('welcome', { name: 'John' }); // "Welcome, John!"

// Multiple parameters
t('price', { amount: 29.99, currency: 'USD' }); // "Price: 29.99 USD"

// With variables
const userName = 'Alice';
t('welcome', { name: userName }); // "Welcome, Alice!"
```

## Pluralization

### Translation File

```json
{
  "items": "{count, plural, =0 {No items} one {# item} other {# items}}",
  "messages": "{count, plural, =0 {No new messages} =1 {One new message} other {# new messages}}"
}
```

### Usage

```tsx
t('items', { count: 0 }); // "No items"
t('items', { count: 1 }); // "1 item"
t('items', { count: 5 }); // "5 items"

t('messages', { count: 0 }); // "No new messages"
t('messages', { count: 1 }); // "One new message"
t('messages', { count: 3 }); // "3 new messages"
```

## Date and Number Formatting

### Using the Formatter

```tsx
'use client';

import { useFormatter } from 'next-intl';

export default function FormattingExample() {
  const formatter = useFormatter();
  const now = new Date();
  const price = 1234.56;
  
  return (
    <div>
      {/* Date formatting */}
      <p>Short date: {formatter.dateTime(now, { dateStyle: 'short' })}</p>
      <p>Long date: {formatter.dateTime(now, { dateStyle: 'full' })}</p>
      <p>Time only: {formatter.dateTime(now, { timeStyle: 'medium' })}</p>
      
      {/* Number formatting */}
      <p>Number: {formatter.number(price)}</p>
      <p>Currency (USD): {formatter.number(price, { style: 'currency', currency: 'USD' })}</p>
      <p>Currency (EUR): {formatter.number(price, { style: 'currency', currency: 'EUR' })}</p>
      <p>Percentage: {formatter.number(0.3456, { style: 'percent' })}</p>
    </div>
  );
}
```

### Server-side Formatting

```tsx
import { getFormatter } from 'next-intl/server';

export default async function ServerFormattingExample({ params: { locale } }) {
  const formatter = await getFormatter({ locale });
  const now = new Date();
  
  return (
    <div>
      <p>Formatted date: {formatter.dateTime(now, { dateStyle: 'full' })}</p>
    </div>
  );
}
```

## Handling Rich Text

### Translation File

```json
{
  "richText": "Please <b>read</b> the <link>terms and conditions</link>",
  "htmlContent": "This product is <b>currently unavailable</b>"
}
```

### Usage

```tsx
// With component interpolation
t('richText', {
  b: (chunks) => <strong>{chunks}</strong>,
  link: (chunks) => <a href="/terms">{chunks}</a>
});

// For simple HTML (client-side only)
<div dangerouslySetInnerHTML={{ __html: t('htmlContent') }} />
```

## Conditional Translations

### Based on User Properties

```tsx
function UserGreeting({ user }) {
  const t = useTranslations();
  
  return (
    <p>
      {user.isLoggedIn 
        ? t('greetings.loggedIn', { name: user.name })
        : t('greetings.guest')}
    </p>
  );
}
```

### Based on Time of Day

```tsx
function TimeBasedGreeting() {
  const t = useTranslations();
  const hour = new Date().getHours();
  
  let greeting;
  if (hour < 12) {
    greeting = t('greetings.morning');
  } else if (hour < 18) {
    greeting = t('greetings.afternoon');
  } else {
    greeting = t('greetings.evening');
  }
  
  return <p>{greeting}</p>;
}
```

## Language Detection and Switching

### Custom Language Switcher

```tsx
'use client';

import { useRouter, usePathname } from 'next/navigation';
import { useLocale } from 'next-intl';
import { locales } from '../config/i18n';

export default function SimpleLanguageSwitcher({ tenant }) {
  const router = useRouter();
  const pathname = usePathname();
  const currentLocale = useLocale();
  
  const handleLanguageChange = (e) => {
    const newLocale = e.target.value;
    
    // Extract path after tenant and locale
    const pathSegments = pathname.split('/');
    const remainingPath = pathSegments.slice(3).join('/');
    
    // Create new path with selected locale
    const newPath = `/${tenant}/${newLocale}${remainingPath ? `/${remainingPath}` : ''}`;
    
    router.push(newPath);
  };
  
  return (
    <select value={currentLocale} onChange={handleLanguageChange}>
      {locales.map((locale) => (
        <option key={locale} value={locale}>
          {locale.toUpperCase()}
        </option>
      ))}
    </select>
  );
}
```

## Form Validation

### Translation File

```json
{
  "errors": {
    "required": "{field} is required",
    "email": "Please enter a valid email address",
    "minLength": "{field} must be at least {length} characters",
    "passwordMatch": "Passwords do not match"
  }
}
```

### Form Component with Validation

```tsx
'use client';

import { useTranslations } from 'next-intl';
import { useState } from 'react';

export default function ValidationExample() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState({});
  
  const t = useTranslations();
  const errorT = useTranslations('errors');
  
  const validate = () => {
    const newErrors = {};
    
    if (!email) {
      newErrors.email = errorT('required', { field: t('auth.email') });
    } else if (!/\S+@\S+\.\S+/.test(email)) {
      newErrors.email = errorT('email');
    }
    
    if (!password) {
      newErrors.password = errorT('required', { field: t('auth.password') });
    } else if (password.length < 8) {
      newErrors.password = errorT('minLength', { field: t('auth.password'), length: 8 });
    }
    
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };
  
  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      // Submit form
    }
  };
  
  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label>{t('auth.email')}</label>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        {errors.email && <p className="error">{errors.email}</p>}
      </div>
      
      <div>
        <label>{t('auth.password')}</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        {errors.password && <p className="error">{errors.password}</p>}
      </div>
      
      <button type="submit">{t('common.submit')}</button>
    </form>
  );
}
```

## SEO Considerations

### Adding Hreflang Tags

```tsx
// app/[tenant]/[locale]/layout.tsx
import { locales } from '../../../config/i18n';

export default function LocaleLayout({
  children,
  params: { tenant, locale }
}) {
  // Generate alternate URLs for each supported locale
  const alternateUrls = locales.map(lang => ({
    hrefLang: lang,
    href: `https://yourdomain.com/${tenant}/${lang}`
  }));
  
  return (
    <html lang={locale}>
      <head>
        {/* Add hreflang tags for SEO */}
        {alternateUrls.map(({ hrefLang, href }) => (
          <link
            key={hrefLang}
            rel="alternate"
            hrefLang={hrefLang}
            href={href}
          />
        ))}
      </head>
      <body>{children}</body>
    </html>
  );
}
```

### Localized Metadata

```tsx
// app/[tenant]/[locale]/page.tsx
import { getTranslations } from 'next-intl/server';
import { Metadata } from 'next';

// Generate metadata with translations
export async function generateMetadata({ 
  params: { locale } 
}): Promise<Metadata> {
  const t = await getTranslations();
  
  return {
    title: t('meta.title'),
    description: t('meta.description'),
    openGraph: {
      title: t('meta.ogTitle'),
      description: t('meta.ogDescription')
    }
  };
}

export default function Page() {
  // Page content
}
```