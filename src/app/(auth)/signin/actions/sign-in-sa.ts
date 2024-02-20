"use server";

import { createClient } from "@utils/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";
import logman from "@utils/logman";

/**
 * Server action for signing in the user.
 *
 * @param formData The sign-in form data.
 * @author frigvid
 * @created 2024-02-13
 */
export async function SignInSA(formData: FormData) {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	
	// NOTE: Type-casting is here for convenience.
	// FIXME: Validate inputs.
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}
	
	const { error } = await supabase.auth.signInWithPassword(data);
	
	if (error) {
		logman(error);
		redirect('/error/500');
	}
	
	revalidatePath('/', 'layout');
	redirect('/');
}
