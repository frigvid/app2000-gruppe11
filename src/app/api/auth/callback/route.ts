import {createClient} from "@/app/lib/supabase/server";
import {NextResponse} from "next/server";
import {cookies} from "next/headers";

/**
 * @author Supabase, frigvid
 */
export async function GET(request: Request) {
	/* The `/auth/callback` route is required for the server-side auth flow implemented
	 * by the Auth Helpers package[1]. It exchanges an auth code for the user's session.
	 * https://supabase.com/docs/guides/auth/auth-helpers/nextjs#managing-sign-in-with-code-exchange
	 *
	 * [1]: Note that auth-helpers is no longer recommended, and the package actually in use is SSR. */
	const requestUrl = new URL(request.url);
	const code = requestUrl.searchParams.get("code");

	if (code) {
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		await supabase.auth.exchangeCodeForSession(code);
	}

	// URL to redirect to after sign in process completes
	return NextResponse.redirect(requestUrl.origin);
}
