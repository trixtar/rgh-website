import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

export const config = {
  // Matches all pathnames except:
  // - paths starting with /api, /trpc, /_next, /_vercel
  // - paths containing a dot (e.g. favicon.ico)
  matcher: '/((?!api|trpc|_next|_vercel|.*\\..*).*)',
};

export default createMiddleware(routing);