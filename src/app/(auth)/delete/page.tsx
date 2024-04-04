"use client";

import {deleteUserAccount} from "@/app/(auth)/delete/actions/delete-account-sa";
import {useUser} from "@/app/(auth)/actions/useUser";
import {createClient} from "@utils/supabase/client";
import {useRouter} from "next/navigation";
import logman from "@utils/logman";
import {useEffect} from "react";

export default function DeleteAccount() {
	const router = useRouter();
	const supabase = createClient();
	const user = useUser();
	
	
	useEffect(() => {
		// If the user is not logged in, do nothing.
		if (!user) {
			return;
		}
		
		const deleteAccount = async () => {
			try {
				const {error: sessionError} = await supabase.auth.getUser();
				
				if (sessionError) {
					logman("A session error occurred: " + sessionError);
					throw sessionError;
				}
				
				await deleteUserAccount();
			} catch (error) {
				// FIXME: Exception is caught locally.
				console.error(error);
				router.push("/delete/error/401")
			}
			
			window.location.reload();
			
			// Redirect to the Home after deleting account and reloading window.
			router.push("/");
		}
		
		deleteAccount().then(() => logman("User has been deleted."));
	}, [router, supabase.auth])
	
	return (
		<div className="flex items-center justify-center">
			<h1 className="text-3xl font-medium mr-5 p-0">Deleting your account...</h1>
		</div>
	);
}
