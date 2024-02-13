"use client";

import PasswordDetails from "@/app/auth/components/password-details";
import signUp from "@/app/auth/actions/sign-up";
import Link from "next/link";
import {login} from "@/app/auth/actions/login";
import {signup} from "@/app/auth/actions/signup";

/**
 * Sign up page.
 *
 * @author frigvid
 */
export default function SignupTest({
	searchParams,
}: {
	searchParams: { message: string };
}) {
	return (
		<main className="flex justify-center items-center">
			<form>
				<label htmlFor="email">Email:</label>
				<input id="email" name="email" type="email" required/>
				<label htmlFor="password">Password:</label>
				<input id="password" name="password" type="password" required/>
				<button formAction={login}>Log in</button>
				<button formAction={signup}>Sign up</button>
			</form>
		</main>
	);
}
