"use client";

import PasswordDetails from "@auth/components/fragment/password-details";
import {FC, FormEvent, useEffect, useState} from "react";
import {createClient} from "@utils/supabase/client";
import withI18next from "@ui/lang/with-i18next";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

/**
 * Password change page, and related code to
 * perform a password change using Supabase.
 *
 * @author frigvid
 * @created 2024-01-26
 */
const PasswordUpdateForm: FC = () => {
	const [newPassword, setNewPassword] = useState<string>('');
	const [confirmPassword, setConfirmPassword] = useState<string>('');
	const [error, setError] = useState<string>('');
	const [success, setSuccess] = useState<string>('');
	const supabase = createClient();
	const {t} = useTranslation();
	const router = useRouter();
	
	/**
	 * Redirects the user to the home page after a successful password change.
	 *
	 * @author frigvid
	 * @created 2024-01-26
	 */
	useEffect(() => {
		if (success) {
			const timer = setTimeout(() => {
				router.push('/');
			}, 5000);
			
			return () => clearTimeout(timer);
		}
	}, [router, success]);
	
	/**
	 * Changes the user's password.
	 *
	 * @author frigvid
	 * @created 2024-01-26
	 * @param event The form event.
	 */
	const changePassword = async (event: FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		
		if (newPassword !== confirmPassword) {
			setError('Passwords do not match');
			return;
		}
		
		const {error} = await supabase.auth.updateUser({
			password: newPassword
		});
		
		if (error) {
			setError(error.message);
		} else {
			setSuccess('Password updated successfully.');
			setError('');
			/* NOTE: Here's where to put a redirect timer. */
		}
	}
	
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form onSubmit={changePassword}>
					<div className="mb-4">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="newPassword"
						>
							{t("password_change.title2")}
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="newPassword"
							name="newPassword"
							type="password"
							value={newPassword}
							onChange={(e) => setNewPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
					</div>
					<div className="mb-2">
						<label
							className="block text-gray-700 text-sm font-bold mb-2"
							htmlFor="confirmPassword"
						>
							{t("password_change.title1")}
						</label>
						<input
							className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"
							id="confirmPassword"
							name="confirmPassword"
							type="password"
							value={confirmPassword}
							onChange={(e) => setConfirmPassword(e.target.value)}
							placeholder="••••••••"
							required
						/>
						{/* FIXME: This should be handled better to avoid making the page reflow when status returns. */}
						{error && (
							<p color="error">
								{error}
							</p>
						)}
						{success && (
							<p color="primary">
								{success}
							</p>
						)}
					</div>
					<div className="mb-2 pb-1 pt-1 text-center">
						<button
							className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
							type="submit"
						>
							{t("password_change.button")}
						</button>
					</div>
				</form>
				{/* NOTE: Password rules are defined in Supabase. */}
				<PasswordDetails/>
			</div>
		</main>
	);
};

/**
 * Export the component with extra i18next support,
 * to avoid hydration errors.
 */
export default withI18next(PasswordUpdateForm);
