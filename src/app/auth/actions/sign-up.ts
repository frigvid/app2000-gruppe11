"use server";

import {createClient} from "@lib/supabase/server";
import {cookies, headers} from "next/headers";
import {redirect} from "next/navigation";

const signUp = async (formData: FormData) => {
	const origin = headers().get("origin");
	const email = formData.get("email") as string;
	const password = formData.get("password") as string;
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	const {error} = await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${origin}/auth/callback`,
		},
	});

	if (error) {
		return redirect("/auth/signup?message=Something went wrong");
	}

	return redirect("/auth/signup?message=Check email to continue sign in process");
};

export default signUp;
