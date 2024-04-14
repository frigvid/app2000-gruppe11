"use client";

import {createClient} from "@utils/supabase/client";
import {User} from "@supabase/supabase-js";
import {useEffect, useState} from "react";

/**
 * Gets the logged-in user, and is usable in non-async
 * contexts.
 *
 * Example usage:
 * <pre>
 *    const user = useUser();
 *
 *    if (user) {
 *       console.log("User is logged in.");
 *    }
 * </pre>
 *
 * @author frigvid
 * @created 2024-02-26
 */
export function useUser() {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	
	useEffect(() => {
		const getUser = async () => {
			// Get session first, to test against, to avoid logging 401s to the console.
			const {data: {session}} = await supabase.auth.getSession();
			
			if (session) {
				const {data: {user}} = await supabase.auth.getUser();
				if (user) {
					setUser(user);
				}
			}
		}
		
		// Ignore the warning about the promise being ignored.
		void getUser();
	}, [supabase.auth]); // Ignore dependency warning. Adding it will cause a small performance drop.
	
	return user;
}

/**
 * Gets the user's metadata, if it exists.
 *
 * TODO: Investigate why getting the user's metadata returns `null` the first few times, despite it being there
 * 		and being updatable through the API.
 */
export const useMetadata = () => {
	const user = useUser();

	if (user && user.user_metadata) {
		return user.user_metadata;
	}

	return null;
}
