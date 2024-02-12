import {createServerClient, type CookieOptions} from '@supabase/ssr'
import {NextResponse, type NextRequest} from 'next/server'

/**
 * Next.js middleware code, currently primarily
 * used for supporting Supabase's authentication
 * process. But can and likely will be used for
 * defining protected routes in the future.
 *
 * @author Supabase, frigvid
 */
export const createClient = (request: NextRequest) => {
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
					response.cookies.set({
						name,
						value,
						...options,
					})
				},
				
				remove(name: string, options: CookieOptions) {
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
					response.cookies.set({
						name,
						value: '',
						...options,
					})
				},
			},
		}
	)
	
	//await supabase.auth.getUser()
	
	return {supabase, response};
}
