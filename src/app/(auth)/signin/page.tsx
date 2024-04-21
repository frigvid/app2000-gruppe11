"use client";

import WordDivider from "@shared/components/misc/word-divider";
import withI18next from "@shared/components/lang/with-i18next";
import {signInSA} from "@auth/signin/actions/sign-in-sa";
import {useTranslation} from "react-i18next";
import Link from "next/link";
import React from "react";

/**
 * Login page.
 *
 * @author frigvid
 * @created 2024-01-23
 */
function SignIn() {
	const {t} = useTranslation();

	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form action={signInSA}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="email"
						>
							{t('generic.email.label')}
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
							type="email"
							name="email"
							placeholder={t('generic.email.placeholder')}
							required
						/>
					</div>
					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="password"
						>
							{t('generic.password.label')}
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
							formAction={signInSA}
						>
							{t('log_in_button')}
						</button>
						<Link
							href="/password/forgot"
							className="hover:text-blue-800"
						>
							{t('forgot_password')}
						</Link>
					</div>
				</form>
				<WordDivider/>
				<div className="flex items-center justify-between pb-6">
					<p className="mb-0 mr-2">{t('do_not_have_account')}</p>
					<Link
						href="/signup"
						className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger"
					>
						{t('register_button')}
					</Link>
				</div>
			</div>
		</main>
	);
}

export default withI18next(SignIn);
