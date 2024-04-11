"use client";

import {SignInSA} from "@/app/(auth)/signin/actions/sign-in-sa";
import withI18next from "@ui/lang/with-i18next";
import {useTranslation} from "react-i18next";
import Link from "next/link";

/**
 * Login page.
 *
 * @author frigvid
 */
function SignIn() {
	const {t} = useTranslation();

	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={SignInSA}>
					<div className="mb-4">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
							{t('email_label')}
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline" type="email" name="email" placeholder={t('email_placeholder')} required />
					</div>
					<div className="mb-2">
						<label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
							{t('password_label')}
						</label>
						<input className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline" type="password" name="password" placeholder="••••••••" required />
					</div>
					<div className="mb-2 pb-1 pt-1 text-center">
						<button className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal" formAction={SignInSA}>
							{t('log_in_button')}
						</button>
						<Link href="/password/forgot" className="hover:text-blue-800">{t('forgot_password')}</Link>
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">{t('or')}</p>
				</div>
				<div className="flex items-center justify-between pb-6">
					<p className="mb-0 mr-2">{t('do_not_have_account')}</p>
					<Link href="/signup" className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger">{t('register_button')}</Link>
				</div>
			</div>
		</main>
	);
}

export default withI18next(SignIn);
