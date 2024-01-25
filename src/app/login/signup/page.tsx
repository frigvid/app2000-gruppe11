import Link from "next/link";
import {cookies, headers} from "next/headers";
import {createClient} from "@/app/lib/supabase/server";
import {redirect} from "next/navigation";

export default function Signup({
	searchParams,
}: {
	searchParams: { message: string };
}) {

	const signUp = async (formData: FormData) => {
		"use server";

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
			return redirect("/login/signup?message=Could not authenticate user");
		}

		return redirect("/login/signup?message=Check email to continue sign in process");
	};

	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={signUp}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email">
							Username
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="email"
							name="email"
							placeholder="you@example.com"
							required
						/>
					</div>
					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password">
							Password
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							type="password"
							name="password"
							placeholder="••••••••"
							required
						/>
					</div>
					<div className="mb-2 pb-1 pt-1 text-center">
						{/*
							TODO: Investigate "AuthApiError: invalid request: both auth code and code verifier should be non-empty" when
									opening the sign-up verification link sent to the users email in Firefox. Google Chrome seems to handle
									it perfectly fine, but while the Firefox one /does/ sign you up still, it does not redirect back to the
									root path as it should.
						*/}
						<button
							className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							formAction={signUp}>
							Sign up
						</button>
						{searchParams?.message && (
							<p className="mt-4 p-4 text-center">
								{searchParams.message}
							</p>
						)}
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">Or</p>
				</div>
				<div className="pb-1 pt-1 text-center">
					<Link href="/login" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						Back to log in
					</Link>
				</div>
			</div>
		</main>
	);
}
