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
 * @returns The user object.
 */
export function useUser() {
	const supabase = createClient();
	const [user, setUser] = useState<User | null>(null);
	
	useEffect(() => {
		const getUser = async () => {
			/* Get session first, to test against, to avoid logging 401s to the console. */
			const {data: {session}} = await supabase.auth.getSession();
			
			if (session) {
				const {data: {user}} = await supabase.auth.getUser();
				if (user) {
					setUser(user);
				}
			}
		}
		
		/* Ignore the warning about the promise being ignored. */
		void getUser();
	}, [supabase.auth]);
	
	/**
	 * This will hopefully make it easier to avoid errors
	 * where there isn't a user.
	 */
	if (user) {
		return user;
	} else {
		return null;
	}
}
