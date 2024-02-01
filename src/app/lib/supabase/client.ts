import {createBrowserClient} from '@supabase/ssr';

/**
 * Supabase's client, loading environment secrets,
 * to support the authentication process.
 *
 * @author Supabase, frigvid
 */
export const createClient = () =>
	createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
