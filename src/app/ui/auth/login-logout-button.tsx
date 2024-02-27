import {createClient} from "@utils/supabase/server";
import {cookies} from "next/headers";
import Link from "next/link";

/**
 * Re-usable component for the header component,
 * that changes the "login" button to a status
 * message containing the user's email address.
 *
 * @author frigvid
 */
export default async function LoginLogoutButton() {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	
	const {
		data: {user},
	} = await supabase.auth.getUser();
	
	return user ? (
		<div className="flex items-center gap-4">
			Hey, {user.email}!
			<form action="/signout">
				<button className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8">
					Logout
				</button>
			</form>
		</div>
	) : (
		<Link
			className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
			href="/signin"
		>
			Log in <span aria-hidden="true">&rarr;</span>
		</Link>
	);
}
