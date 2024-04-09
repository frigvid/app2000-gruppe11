"use client";

import PasswordDetails from "@auth/components/fragment/password-details";
import signUpSA from "@auth/signup/actions/sign-up-sa";
import WordDivider from "@ui/word-divider";
import Link from "next/link";
import React from "react";

/**
 * Sign up page.
 *
 * @author frigvid
 */
export default function SignUp() {
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={signUpSA}>
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
							placeholder=""
							required
						/>
					</div>
					<div className="mb-2 pb-1 pt-1 text-center">
						<button
							className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							formAction={signUpSA}>
							Sign up
						</button>
						<PasswordDetails/>
					</div>
				</form>
				<WordDivider/>
				<div className="pb-1 pt-1 text-center">
					<Link href="/signin" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						Back to login
					</Link>
				</div>
			</div>
		</main>
	);
}
