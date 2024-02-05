import {createBrowserClient} from '@supabase/ssr';
import {Database} from "@/app/database.types";

/**
 * Supabase's client, loading environment secrets,
 * to support the authentication process.
 *
 * @author Supabase, frigvid
 */
export const createClient = () =>
	createBrowserClient<Database>(
		process.env.NEXT_PUBLIC_SUPABASE_URL!,
		process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!
	);
