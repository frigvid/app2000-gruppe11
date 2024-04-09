"use server";

import {createClient} from "@utils/supabase/server";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";

/**
 *	Signs up the user.
 *
 * @param formData The sign-up form data.
 * @author frigvid
 * @created 2024-02-13
 * @note This was originally created earlier. It has been extracted to as an action,
 *			instead of embedding it into the page.
 */
const signUpSA = async (formData: FormData) => {
	const origin = headers().get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	
	// Additional metadata can be added to `options`.
	// NOTE: Type-casting is here for convenience.
	// FIXME: Validate inputs.
	const {error} = await supabase.auth.signUp({
		email,
		password,
		options: {
			//emailRedirectTo: `${origin}/auth/callback`,
			data: {
				elo_rank: 400
			}
		},
	});
	
	// NOTE: A more elegant solution should probably be cooked up for these two returns, eventually.
	if (error) {
		// Even though it only logs locally, and not in the browser,
		// at least you can see the error in a development environment.
		console.log(error);
		return redirect("/signup/error");
	}
	
	return redirect("/signup/check");
};

export default signUpSA;
