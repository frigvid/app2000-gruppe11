"use server";

import { createClient } from "@lib/supabase/server";
import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { cookies } from "next/headers";

export async function signup(formData: FormData) {
	const cookieStore = cookies()
	const supabase = createClient(cookieStore)
	
	// NOTE: Type-casting is here for convenience.
	// FIXME: Validate inputs.
	const data = {
		email: formData.get('email') as string,
		password: formData.get('password') as string,
	}
	
	const { error } = await supabase.auth.signUp(data)
	
	if (error) {
		redirect('/auth/error')
	}
	
	revalidatePath('/', 'layout')
	redirect('/')
}
