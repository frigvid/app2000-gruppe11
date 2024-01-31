import {createBrowserClient} from '@supabase/ssr';

/**
 * @author Supabase, frigvid
 */
export const createClient = () =>
	createBrowserClient(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
