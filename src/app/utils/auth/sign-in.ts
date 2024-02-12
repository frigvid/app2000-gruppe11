"use server";

import {createClient} from "@lib/supabase/server";
import {redirect} from "next/navigation";
import {cookies} from "next/headers";


/**
 * Extracted login functionality from auth/login.
 *
 * Currently, it just parses the form data, uses it
 * together supabase/server client, and then signs
 * you in.
 *
 * @param formData
 * @author frigvid
 */
const signIn = async (formData: FormData) => {
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {error} = await supabase.auth.signInWithPassword({
		email,
		password,
	});

	if (error) {
		return redirect("/auth/signin?message=Could not authenticate user");
	}

	// Redirect to root when logged in.
	return redirect("/");
};

export default signIn;
