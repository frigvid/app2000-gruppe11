import {createBrowserClient} from "@supabase/ssr";
import {Database} from "@/app/database.types";

/**
 * Lets you access Supabase from Client Components.
 *
 * See also [documentation at Supabase]{@link https://supabase.com/docs/guides/auth/server-side/nextjs}.
 *
 * @author Supabase, frigvid
 * @created 2024-01-23
 * @warning Do not use this in server-side code. Browser-context only.
 * @hint This uses a singleton pattern, only one instance of the client is created,
 * 		regardless of how many times this function is called.
 * @see https://supabase.com/docs/guides/auth/server-side/nextjs, section 3.
 */
export const createClient = () =>
	createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
