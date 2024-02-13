"use server";

import {createClient} from "@lib/supabase/server";
import {cookies} from "next/headers";

/**
 * Signs out the user from the server.
 *
 * This means it'll invalidate *all* session tokens,
 * since it happens on a global scale.
 *
 * @author frigvid
 * @created 2024-02-13
 * @note SA stands for "Server Action".
 */
export const signOutSA = async () => {
	const supabase = createClient(cookies());
	
	/**
	 * See [Supabase documentation for logging out users](https://supabase.com/docs/reference/javascript/auth-signout).
	 */
	const {error} = await supabase.auth.signOut();
	
	// Return the error, so it's available for the logout page.
	if (error) {
		return {error};
	}
	
	return {
		data: {
			success: true,
		},
	}
};
