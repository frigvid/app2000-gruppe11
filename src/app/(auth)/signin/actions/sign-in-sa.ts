"use server";

import {createClient} from "@shared/utils/supabase/server";
import {revalidatePath} from "next/cache";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";

/**
 * Server action for signing in the user.
 *
 * @param formData The sign-in form data.
 * @author frigvid
 * @created 2024-02-13
 */
export async function signInSA(formData: FormData) {
	const supabase = createClient(cookies());
	
	// NOTE: Type-casting is here for convenience.
	// FIXME: Supabase already validates inputs, but for safety's sake, we should validate inputs even more.
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}
	
	const {error} = await supabase.auth.signInWithPassword(data);
	
	if (error) {
		console.error(error);
		redirect('/signin/error');
	}
	
	/* Purge cached data. */
	revalidatePath('/', 'layout');
	
	/* Redirect to Home. */
	redirect("/");
}
