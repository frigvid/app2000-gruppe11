import {createServerClient, type CookieOptions} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'
import logman from "@utils/logman";

/**
 * Responsibilities:
 * - Refreshing Auth tokens by calling `supabase.auth.getUser`.
 * - Passing the refreshed token to the Server Components, so they don't attempt to refresh the token on their own.
 *   This is done using `request.cookies.set`.
 * - Passing the refreshed Auth token to the browser, so it replaces the old token.
 *   This is done using `response.cookies.set`.
 *
 * @param request
 * @author frigvid, supabase
 * @note Since Server Components can't write cookies,
 * 		middleware is needed to refresh expired auth tokens and store them.
 */
export async function middleware(request: NextRequest) {
	let response = NextResponse.next({
		request: {
			headers: request.headers,
		},
	})
	
	const supabase = createServerClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			cookies: {
				get(name: string) {
					return request.cookies.get(name)?.value
				},
				set(name: string, value: string, options: CookieOptions) {
					// Pass Auth token to server-context.
					request.cookies.set({
						name,
						value,
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					// Pass Auth token to browser-context.
					response.cookies.set({
						name,
						value,
						...options,
					})
				},
				remove(name: string, options: CookieOptions) {
					// Pass Auth token to server-context.
					request.cookies.set({
						name,
						value: '',
						...options,
					})
					response = NextResponse.next({
						request: {
							headers: request.headers,
						},
					})
					// Pass Auth token to browser-context.
					response.cookies.set({
						name,
						value: '',
						...options,
					})
				},
			},
		}
	)
	
	// Refresh Auth token.
	await supabase.auth.getUser()
	
	return response
}

/**
 * This matcher is used to filter Middleware to run on specific paths.
 *
 * See also [Next's Matcher documentation]{@link https://nextjs.org/docs/app/building-your-application/routing/middleware#matching-paths}.
 *
 * @author frigvid, supabase
 * @warning Do not match routes here that *don't* access Supabase.
 *	@warning Do not over-use `supabase.auth.getUser()` for the reasons discussed below.
 * @note Always use `supabase.auth.getUser()` to protect pages and user-data.
 * 		*Never* trust `supabase.auth.getSession()` inside server code such as middleware.
 *			It's not guaranteed to revalidate the Auth token. `getUser()` sends a request to the Supabase Auth server
 *			every time to revalidate the token.
 */
export const config = {
	matcher: [
		/*
		 * Match all request paths except for the ones starting with:
		 * - _next/static (static files)
		 * - _next/image (image optimization files)
		 * - favicon.ico (favicon file)
		 * Feel free to modify this pattern to include more paths.
		 */
		'/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)',
	],
}

// TEMPORARY:
///**
// * Any route added to this list will require an authenticated
// * user-session to access.
// *
// * @type {string[]}
// * @author frigvid
// * */
//const protectedRoutes: string[] = [
//	"/auth/user/profile", // Should protect both profile and settings.
//];
//
///**
// * Matcher for protected routes.
// *
// * @type {{matcher: string[]}}
// * @author frigvid
// */
//export const config: { matcher: string[]; } = {
//	matcher: [
//		'/api/:path*', // Matches all API routes. (You must be authenticated to access these routes.)
//		'/testing/:path*',
//		'/auth/user/profile'
//	]
//}
//
///**
// * Checks if a route is protected.
// *
// * @param path
// * @type {boolean}
// * @author frigvid
// */
//function isProtectedRoute(path: string): boolean {
//	return protectedRoutes.some((route) => path.startsWith(route));
//}
//
///**
// * Checks if a route is an API route.
// *
// * @param path
// * @author frigvid
// */
//function isApiRoute(path: string): boolean {
//	return path.startsWith('/api');
//}
//
///**
// * Redirects unauthenticated clients to the login page.
// *
// * @param request
// * @author frigvid
// */
//function handleUnauthenticatedClient(request: NextRequest) {
//	// Redirect to login page.
//	//return {
//	//	status: 302,
//	//	headers: {
//	//		Location: '/auth/login',
//	//	},
//	//};
//
//	// Alternative method. Needs testing before this is changed.
//	const url = request.nextUrl.clone();
//	url.pathname = '/auth/signin';
//	return NextResponse.rewrite(url);
//}
//
///**
// * Handles unauthenticated API requests.
// *
// * @type {NextResponse}
// * @return {NextResponse} A response with a 401 status code and a message.
// * @author frigvid
// */
//function handleUnauthenticatedApi(): NextResponse {
//	return new NextResponse(
//		JSON.stringify({
//			success: false,
//			message: 'authentication failed'
//		}),
//		{
//			status: 401,
//			headers: { 'content-type': 'application/json' }
//		},
//	)
//}
//
///**
// * This is the primary middleware, where handling of protected routes
// * occur.
// *
// * See also Supabase middleware {@link @lib/supabase/middleware}
// *
// * @author frigvid
// * */
//export async function middleware(req: NextRequest) {
//	const res = NextResponse.next();
//	const {supabase} = createMiddlewareClient<Database>({req, res});
//
//	logman("Loading middleware");
//
//	try {
//		//const {supabase} = createClient(req);
//		const {data: sessionData, error: sessionError} = await supabase.auth.getSession();
//		const isApiRoute = req.nextUrl.pathname.startsWith('/api');
//
//		if (isProtectedRoute(req.nextUrl.pathname) && (!sessionData?.session || sessionError)) {
//			logman("Middleware isProtectedRoute? " + req.nextUrl.pathname);
//			return handleUnauthenticatedClient(req);
//		}
//
//		if (isApiRoute && !sessionData?.session) {
//			let headAllowedSession: string = "user-allowed-session";
//			// Reset session header to prevent spoofing.
//			logman("Middleware isProtectedRoute? " + headAllowedSession);
//			req.headers.set(headAllowedSession, '');
//		}
//
//		return NextResponse.next();
//	} catch (e) {
//		// Handles errors like failing to create a Supabase client.
//		return NextResponse.next();
//	}
//}
