import { clerkMiddleware, createRouteMatcher } from '@clerk/nextjs/server';

const isPublicRoute = createRouteMatcher(['/sign-in(.*)', '/settings(.*)']);

// Log the secretKey to verify it's being loaded
console.log('Clerk secretKey:', process.env.CLERK_SECRET_KEY);

export default clerkMiddleware(async (auth, request) => {
  try {
    if (!isPublicRoute(request)) {
      await auth.protect();
    }
  } catch (error) {
    console.error('Middleware error:', error);
    // Optionally, redirect to an error page or return a custom response
    return new Response('Authentication failed', { status: 401 });
  }
});

export const config = {
  matcher: [
    '/((?!_next|[^?]*\\.(?:html?|css|js(?!on)|jpe?g|webp|png|gif|svg|ttf|woff2?|ico|csv|docx?|xlsx?|zip|webmanifest)).*)',
    '/(api|trpc)(.*)',
  ],
};