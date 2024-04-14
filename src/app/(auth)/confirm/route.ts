import {type NextRequest, NextResponse} from "next/server";
import {type EmailOtpType} from "@supabase/supabase-js";
import {createClient} from "@utils/supabase/server";
import {cookies} from "next/headers";

/**
 * Used for when a user clicks their confirmation email link.
 * It exchanges their secure code for an Auth token.
 *
 * @param request
 * @author frigvid
 * @created 2024-02-13
 * @warning Since this is a Route Handler, a server Supabase client is needed.
 */
export async function GET(request: NextRequest) {
	const {searchParams} = new URL(request.url);
	const token_hash = searchParams.get('token_hash');
	const type = searchParams.get('type') as EmailOtpType | null;
	const next = searchParams.get('next') ?? '/';
	
	const redirectTo = request.nextUrl.clone();
	redirectTo.pathname = next;
	redirectTo.searchParams.delete('token_hash');
	redirectTo.searchParams.delete('type');
	
	if (token_hash && type) {
		const supabase = createClient(cookies());
		
		const {error} = await supabase.auth.verifyOtp({
			type,
			token_hash,
		});
		
		if (!error) {
			redirectTo.searchParams.delete('next');
			return NextResponse.redirect(redirectTo);
		}
	}
	
	// return the user to an error page with some instructions
	redirectTo.pathname = 'confirm/error/403';
	return NextResponse.redirect(redirectTo);
}
