import {
  convexAuthNextjsMiddleware,
  createRouteMatcher,
  nextjsMiddlewareRedirect,
} from "@convex-dev/auth/nextjs/server";

// Public pages (only home page)
const isPublicPage = createRouteMatcher(["/"]);

// Optional: sign-in page (if separate)
const isSignInPage = createRouteMatcher(["/signin"]);
const isSignUpPage = createRouteMatcher(["/signup"]);


export default convexAuthNextjsMiddleware(async (request, { convexAuth }) => {
  const isAuthenticated = await convexAuth.isAuthenticated();

  // If authenticated and visiting /signin → redirect to a protected page
  if ((isSignInPage(request) || isSignUpPage(request)) && isAuthenticated) {
    return nextjsMiddlewareRedirect(request, "/notes");
  }

  // If not authenticated and NOT on a public or signin page → redirect to /signin
  if (!isPublicPage(request) && !isSignInPage(request) && !isSignUpPage(request) && !isAuthenticated) {
  return nextjsMiddlewareRedirect(request, "/signin");
  }

  if (isPublicPage(request) && isAuthenticated) {
  return nextjsMiddlewareRedirect(request, "/notes");
}
  // Otherwise, continue normally
});

export const config = {
  // Run middleware on all routes except static assets and Next.js internals
  matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
};
