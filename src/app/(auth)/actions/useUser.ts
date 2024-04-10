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
	const [
		user,
		setUser
	] = useState<User | null>(null);
	
	async function getUser() {
		// Get session first, to test against, to avoid logging 401s to the console.
		const {data: {session}} = await supabase.auth.getSession();
		
		if (session) {
			const {data: {user}} = await supabase.auth.getUser();
			if (user) {
				setUser(user);
			}
		}
	}
	
	useEffect(() => {
		// Ignore the warning about the promise being ignored.
		getUser();
	}, []); // Ignore dependency warning. Adding it will cause a small performance drop.
	
	return user;
}
