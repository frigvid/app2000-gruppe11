import {createServerClient, type CookieOptions} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'
import {redirect} from "next/navigation";

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
	const {error} = await supabase.auth.getUser()
	// Ensure logout and cookie deletion to avoid 400.
	if (error) {
		redirect("/signout");
	}
	
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
