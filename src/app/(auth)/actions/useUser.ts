"use client";

import {createClient} from "@utils/supabase/client";
import {User} from "@supabase/supabase-js";
import {useEffect, useState} from "react";

/**
 * Gets the logged-in user, and is usable in non-async
 * contexts.
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
			console.log("Cannot get user. No user logged in.");
		}
	}
	
	useEffect(() => {
		// Ignore the warning about the promise being ignored.
		getUser();
	}, []); // Ignore dependency warning. Adding it will cause a small performance drop.
	
	return user;
}
