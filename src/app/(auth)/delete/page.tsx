"use client";

import ProtectClientContent from "@auth/components/protect-client-content";
import {deleteUserAccount} from "@auth/delete/actions/delete-account-sa";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";
import {useRouter} from "next/navigation";

/**
 * Route for deleting a user's account.
 *
 * @author frigvid
 * @created 2024-04-03
 * @note Doing this as a route, instead of directly in the
 * 		user's settings, is a bit wierd. But this is a
 * 		product of technical debt. Had I more time, I
 * 		would have changed this.
 */
export default function DeleteAccount() {
	const {t} = useTranslation();
	const router = useRouter();
	const user = useUser();
	
	/**
	 * Asynchronous function calling the server action
	 * responsible for actually deleting the user's
	 * account.
	 *
	 * @author frigvid
	 * @created 2024-04-03
	 */
	async function deleteAccount() {
		if (user) {
			try {
				await deleteUserAccount();
			} catch (error) {
				console.error(error);
				router.push("/delete/error/401")
			}
			
			/* Redirect to the Home after deleting account and reloading window. */
			router.push("/");
			
			/* Reload the page to ensure the header updates. */
			router.refresh();
		}
	}
	
	return (
		<main className="flex flex-col justify-center items-center space-y-4">
			<ProtectClientContent showError={true} noBuffer={false}>
				<>
					<h1 className="lg:text-3xl font-medium">{t("delete_account.label")}</h1>
					<p className="italic">{t("delete_account.notice")}</p>
					<button
						className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
						onClick={deleteAccount}
					>
						{t("delete_account.button")}
					</button>
				</>
			</ProtectClientContent>
		</main>
	);
}
