// // proxy.ts
// import {
//   convexAuthNextjsMiddleware,
//   createRouteMatcher,
//   nextjsMiddlewareRedirect,
// } from "@convex-dev/auth/nextjs/server";
// import { NextRequest } from "next/server";

// const isSignInPage = createRouteMatcher(["/signin"]);
// const isProtectedRoute = createRouteMatcher(["/notes(.*)"]);

// export async function proxy(
//   request: NextRequest,
//   { convexAuth }: { convexAuth: { isAuthenticated(): Promise<boolean> } }
// ) {
//   if (isSignInPage(request) && (await convexAuth.isAuthenticated())) {
//     return nextjsMiddlewareRedirect(request, "/notes");
//   }

//   if (isProtectedRoute(request) && !(await convexAuth.isAuthenticated())) {
//     return nextjsMiddlewareRedirect(request, "/signin");
//   }
// }

// export default convexAuthNextjsMiddleware(proxy, {
//   cookieConfig: { maxAge: 60 * 60 * 24 * 30 },
// });

// export const config = {
//   // The following matcher runs middleware on all routes
//   // except static assets.
//   matcher: ["/((?!.*\\..*|_next).*)", "/", "/(api|trpc)(.*)"],
// };