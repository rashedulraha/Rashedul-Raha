import createMiddleware from 'next-intl/middleware';
import {routing} from './routing';

export const proxy = createMiddleware(routing);

export const config = {
  // Match only internationalized pathnames
  matcher: ['/', '/(de|en|bn|ja|es|fr|it)/:path*']
};
