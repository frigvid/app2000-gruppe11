import {NextRequest, NextResponse} from "next/server";
import {createClient} from "@lib/supabase/middleware";
import logman from "@utils/logman";
import {createMiddlewareClient} from "@supabase/ssr";

/**
 * Any route added to this list will require an authenticated
 * user-session to access.
 *
 * @type {string[]}
 * @author frigvid
 * */
const protectedRoutes: string[] = [
	"/auth/account/profile", // Should protect both profile and settings.
];

/**
 * Matcher for protected routes.
 *
 * @type {{matcher: string[]}}
 * @author frigvid
 */
export const config: { matcher: string[]; } = {
	matcher: [
		'/api/:path*', // Matches all API routes. (You must be authenticated to access these routes.)
		'/testing/:path*',
		'/auth/account/profile'
	]
}

/**
 * Checks if a route is protected.
 *
 * @param path
 * @type {boolean}
 * @author frigvid
 */
function isProtectedRoute(path: string): boolean {
	return protectedRoutes.some((route) => path.startsWith(route));
}

/**
 * Checks if a route is an API route.
 *
 * @param path
 * @author frigvid
 */
function isApiRoute(path: string): boolean {
	return path.startsWith('/api');
}

/**
 * Redirects unauthenticated clients to the login page.
 *
 * @param request
 * @author frigvid
 */
function handleUnauthenticatedClient(request: NextRequest) {
	// Redirect to login page.
	//return {
	//	status: 302,
	//	headers: {
	//		Location: '/auth/login',
	//	},
	//};
	
	// Alternative method. Needs testing before this is changed.
	const url = request.nextUrl.clone();
	url.pathname = '/auth/signin';
	return NextResponse.rewrite(url);
}

/**
 * Handles unauthenticated API requests.
 *
 * @type {NextResponse}
 * @return {NextResponse} A response with a 401 status code and a message.
 * @author frigvid
 */
function handleUnauthenticatedApi(): NextResponse {
	return new NextResponse(
		JSON.stringify({
			success: false,
			message: 'authentication failed'
		}),
		{
			status: 401,
			headers: { 'content-type': 'application/json' }
		},
	)
}

/**
 * This is the primary middleware, where handling of protected routes
 * occur.
 *
 * See also Supabase middleware {@link @lib/supabase/middleware}
 *
 * @author frigvid
 * */
export async function middleware(req: NextRequest) {
	const res = NextResponse.next();
	const {supabase} = createMiddlewareClient<Database>({req, res});
	
	logman("Loading middleware");
	
	try {
		//const {supabase} = createClient(req);
		const {data: sessionData, error: sessionError} = await supabase.auth.getSession();
		const isApiRoute = req.nextUrl.pathname.startsWith('/api');
		
		if (isProtectedRoute(req.nextUrl.pathname) && (!sessionData?.session || sessionError)) {
			logman("Middleware isProtectedRoute? " + req.nextUrl.pathname);
			return handleUnauthenticatedClient(req);
		}
		
		if (isApiRoute && !sessionData?.session) {
			let headAllowedSession: string = "user-allowed-session";
			// Reset session header to prevent spoofing.
			logman("Middleware isProtectedRoute? " + headAllowedSession);
			req.headers.set(headAllowedSession, '');
		}
		
		return NextResponse.next();
	} catch (e) {
		// Handles errors like failing to create a Supabase client.
		return NextResponse.next();
	}
}
