import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Public route(s)
const isPublicPage = createRouteMatcher(["/"]);

// Your auth route
const isAuthPage = createRouteMatcher(["/auth"]);

export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();

  // ✅ Authenticated users visiting /auth → redirect to /notes
  if (isAuthPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/notes");
  }

  // ✅ Unauthenticated users visiting non-public, non-auth routes → redirect to /auth
  if (!isPublicPage(request) && !isAuthPage(request) && !isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/auth");
  }

  // ✅ Authenticated users visiting the public home page → redirect to /notes
  if (isPublicPage(request) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/notes");
  }

  // Otherwise, continue normally
  return;
});

export const config = {
  // Run middleware on all routes except static assets and Next.js internals
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
