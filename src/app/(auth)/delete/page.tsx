"use client";

import {deleteUserAccount} from "@/app/(auth)/delete/actions/delete-account-sa";
import ProtectClientContent from "@/app/(auth)/components/protect-client-content";
import {useUser} from "@/app/(auth)/actions/useUser";
import {createClient} from "@utils/supabase/client";
import {redirect, useRouter} from "next/navigation";
import logman from "@utils/logman";
import {useEffect} from "react";
import ForbiddenError from "@ui/error/403_forbidden";
import Link from "next/link";

export default function DeleteAccount() {
	const router = useRouter();
	const supabase = createClient();
	const user = useUser();
	
	async function deleteAccount() {
		if (user) {
			try {
				await deleteUserAccount();
			} catch (error) {
				console.error(error);
				router.push("/delete/error/401")
			}
			
			// Redirect to the Home after deleting account and reloading window.
			router.push("/");
			
			// Reload the page to ensure the header updates.
			router.refresh();
		}
	}
	
	return (
		<main className="flex flex-col justify-center items-center space-y-4">
			<ProtectClientContent showError={true}>
				<>
					<h1 className="text-3xl font-medium mr-5 p-0">You are about to delete your account.</h1>
					<p className="italic">Are you sure?</p>
					<button
						className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
						onClick={deleteAccount}
					>
						Yes, delete my account.
					</button>
				</>
			</ProtectClientContent>
		</main>
)
	;
}
