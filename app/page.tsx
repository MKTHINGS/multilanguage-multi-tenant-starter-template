import { redirect } from 'next/navigation';
import { defaultLocale } from '../config/i18n';

// Default tenant - in a real application, this might be determined dynamically
const defaultTenant = 'default';

export default function RootPage() {
  // Redirect to the default tenant and locale
  redirect(`/${defaultTenant}/${defaultLocale}`);
  
  // This return is never reached due to the redirect
  return null;
}