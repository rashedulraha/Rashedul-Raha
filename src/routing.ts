import {defineRouting} from 'next-intl/routing';
import {createNavigation} from 'next-intl/navigation';

export const routing = defineRouting({
  // A list of all locales that are supported
  locales: ['en', 'bn', 'ja', 'de', 'es', 'fr', 'it'],

  // Used when no locale matches
  defaultLocale: 'en',
  
  // You can set this to 'as-needed' to hide the default locale in the URL
  localePrefix: 'always'
});

// Lightweight wrappers around Next.js' navigation APIs
// that will consider the routing configuration
export const {Link, redirect, usePathname, useRouter, getPathname} =
  createNavigation(routing);
