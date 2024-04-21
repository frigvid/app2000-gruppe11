"use server";

import {createClient} from "@shared/utils/supabase/server";
import {cookies} from "next/headers";

/**
 * Deletes the authenticated user's account, and data, from the database.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export const deleteUserAccount = async () => {
	const supabase = createClient(cookies());
	
	try {
		/* Get the user manually, since useUser is purposefully meant to be a client action. */
		const { data: {user} } = await supabase.auth.getUser();
		
		if (user) {
			void await supabase.rpc("user_delete");
		}
	} catch (error) {
		throw error;
	}
};
