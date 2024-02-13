"use client";

import signIn from "@/app/auth/actions/sign-in";
import Link from "next/link";

/**
 * Login page.
 *
 * @author frigvid
 */
export default function Login({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={signIn}>
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
						<button
							className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							formAction={signIn}>
							Log in
						</button>
						<Link href="/auth/password/forgot" className="hover:text-blue-800">Forgot password?</Link>
						{searchParams?.message && (
							<div className="mt-4 p-4 bg-red-600 font-bold text-center">
								<p>WARNING!</p>
								<p>{searchParams.message}</p>
							</div>
						)}
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">Or</p>
				</div>
				<div className="flex items-center justify-between pb-6">
					{/* Don't change "Don&#39;t" to "Don't", it will literally cause npm run build to fail. */}
					<p className="mb-0 mr-2">Don&#39;t have an account?</p>
					<Link href="/auth/signup" className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger">Register</Link>
				</div>
			</div>
		</main>
	);
}
