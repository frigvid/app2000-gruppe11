"use server";

import { createClient } from "@utils/supabase/server";
import { cookies } from "next/headers";

/**
 * Deletes the authenticated user's account, and data, from the database.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export const deleteUserAccount = async () => {
	const supabase = createClient(cookies());
	
	try {
		// Get the user manually, since useUser is purposefully meant to be a client action.
		const { data: {user} } = await supabase.auth.getUser();
		
		if (user) {
			/**
			 * This causes the error TS2345 if it is not suppressed. It isn't
			 * actually an issue, and works perfectly fine.
			 *
			 * Do note that this *must* have the database function before
			 * it'll work.
			 *
			 * Full error: "TS2345: Argument of type `string` is not assignable to parameter of type `never`"
			 */
			// @ts-ignore
			await supabase.rpc("user_delete");
		}
	} catch (error) {
		throw error;
	}
};
