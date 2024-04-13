"use client";

import PasswordDetails from "@/app/(auth)/components/password-details";
import signUpSA from "@/app/(auth)/signup/actions/sign-up-sa";
import withI18next from "@ui/lang/with-i18next";
import {useTranslation} from "react-i18next";
import Link from "next/link";

/**
 * Sign up page.
 *
 * @author frigvid
 * @created 2024-01-23
 */
function SignUp() {
	const {t} = useTranslation();
	
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={signUpSA}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							{t("generic.email.label")}
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="email"
							name="email"
							placeholder={t("generic.email.placeholder")}
							required
						/>
					</div>
					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							{t("generic.password.label")}
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
							formAction={signUpSA}
						>
							{t("signup.button.register")}
						</button>
						<PasswordDetails/>
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">{t("or")}</p>
				</div>
				<div className="pb-1 pt-1 text-center">
					<Link href="/signin" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						{t("signup.button.return")}
					</Link>
				</div>
			</div>
		</main>
	);
}

export default withI18next(SignUp);
