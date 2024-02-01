import { createClient } from "@lib/supabase/server";
import { NextResponse } from "next/server";
import { cookies } from "next/headers";

// Specifies that this is an Edge Function, for use in an edge runtime environment
//export const runtime = 'edge';

/**
 * API route for signing up.
 *
 * @author Supabase, frigvid
 */
export async function POST(request) {
	const requestUrl = new URL(request.url);
	const formData = await request.formData();
	const email = formData.get('email');
	const password = formData.get('password');
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);

	console.log(requestUrl.origin);

	await supabase.auth.signUp({
		email,
		password,
		options: {
			emailRedirectTo: `${requestUrl.origin}/auth/callback`,
		},
	})

	return NextResponse.redirect(requestUrl.origin, {
		status: 301,
	})
}
