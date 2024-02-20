import {createServerClient, type CookieOptions} from "@supabase/ssr";
import {Database} from "@/app/database.types";
import {cookies} from "next/headers";

/**
 * Lets you access Supabase from Server Components,
 * Server Actions and Route Handlers.
 *
 * See also [documentation at Supabase]{@link https://supabase.com/docs/guides/auth/server-side/nextjs}.
 *
 * @author Supabase, frigvid
 * @warning Do not use this in client-side code. Server-context only.
 * @hint This essentially configures a `fetch` call. You can, and should, create a new client for every route.
 */
export const createClient = (cookieStore: ReturnType<typeof cookies>) => {
	return createServerClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
		{
			/**
			 * This is [yoinked from the docs @2024-02-12]{@link https://supabase.com/docs/guides/auth/server-side/nextjs}.
			 *
			 * > The cookies object lets the Supabase client know how to access the cookies,
			 * > so it can read and write the user session data. To make @supabase/ssr framework-agnostic,
			 * > the cookies methods aren't hard-coded.
			 * > These utility functions adapt @supabase/ssr's cookie handling for Next.js.
			 * >
			 * > The set and remove methods for the server client need error handlers,
			 * > because Next.js throws an error if cookies are set from Server Components.
			 */
			cookies: {
				get(name: string) {
					return cookieStore.get(name)?.value;
				},
				
				set(name: string, value: string, options: CookieOptions) {
					try {
						cookieStore.set({name, value, ...options});
					} catch (error) {
						// The `set` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
				
				remove(name: string, options: CookieOptions) {
					try {
						cookieStore.set({name, value: "", ...options});
					} catch (error) {
						// The `delete` method was called from a Server Component.
						// This can be ignored if you have middleware refreshing
						// user sessions.
					}
				},
			},
		},
	);
};
