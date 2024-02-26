"use client";

import {createClient} from "@utils/supabase/client";
import {User} from "@supabase/supabase-js";
import {useEffect, useState} from "react";

/**
 * Gets the logged-in user, and is usable in non-async
 * contexts.
 *
 * @warning This will cause a 401 error to be logged in the console,
 * 			but otherwise doesn't do anything.
 */
export function useUser() {
	const supabase = createClient();
	const [
		user,
		setUser
	] = useState<User | null>(null);
	
	async function getUser() {
		const {data} = await supabase.auth.getUser();
		if (data.user) {
			setUser(data.user);
		} else {
			console.log("Error getting user.");
		}
	}
	
	useEffect(() => {
		// Ignore the warning about the promise being ignored.
		getUser();
	}, []); // Ignore dependency warning. Adding it will cause a small performance drop.
	
	return user;
}
