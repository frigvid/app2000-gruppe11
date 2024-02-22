import {createClient} from "@utils/supabase/server";
import {cookies} from "next/headers";
import Link from "next/link";

/**
 * Forgotten password page, and related logic.
 *
 * Currently, sends an email to the user, containing
 * relevant tokens. However, without protected routes
 * this means, while you'll be sent to the /change route,
 * you can also do so manually.
 *
 * FIXME: Opening the password reset link also logs you in,
 * 		 and lets you essentially use it as an email-login.
 * 		 This should be changed.
 *
 * @author frigvid
 */
export default function Forgot() {
	const resetPasswordEmail = async (formData: FormData) => {
		"use server";
		
		const email = formData.get("email") as string;
		const cookieStore = cookies();
		const supabase = createClient(cookieStore);
		
		const {data, error} = await supabase.auth
			.resetPasswordForEmail(email)
		
		if (error) {
			/* See note below. */
			//return redirect("/forgot?message=Something went wrong");
		}
		
		/* While it /could/ be nice to have a success message, the problem is as
		 * always security. Doing this, you could theoretically find users if you
		 * brute-force the process by simply trying different emails.
		 *
		 * There are ways to minimize these things, such as rules that only allow
		 * a certain amount of tries per IP and increasing timeouts. But it's just
		 * a countermeasure. Automating that process would make this trivial, if
		 * very slow, to do.
		 *
		 * Though that's no guarantee for a success, I feel I might as well leave
		 * no message unless something went wrong. /However/, that means another
		 * avenue through which to guess which emails /are/ in the database,
		 * because it'll only return an error on a miss. Thus, both are disabled.
		 */
		//return redirect("/forgot?message=Check email to continue sign in process");
	};
	
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={resetPasswordEmail}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							Email Address
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							id="email"
							type="text"
							name="email"
							required
						/>
					</div>
					<div className="mb-2 pb-1 pt-1 text-center">
						<button
							className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							type="submit"
						>
							Reset Password
						</button>
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">Or</p>
				</div>
				<div className="pb-1 pt-1 text-center">
					<Link
						className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
						href="/signin"
					>
						Back to log in
					</Link>
				</div>
			</div>
		</main>
	);
}
