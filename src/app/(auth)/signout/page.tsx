"use client";

import {signOutSA} from "@auth/signout/actions/sign-out-sa";
import {createClient} from "@utils/supabase/client";
import {useRouter} from "next/navigation";
import {useEffect} from "react";

import logman from "@utils/logman";

/**
 * Logout page.
 *
 * This logs out the user in a browser-context,
 * *and* in a server-context using the `signOutSA` server action.
 *
 * TODO: Make this a protected route to avoid unnecessary errors in the log.
 *
 * @author frigvid
 * @created 2024-02-13
 */
export default function SignOut() {
	const router = useRouter();
	const supabase = createClient();
	
	useEffect(() => {
		const signOut = async () => {
			try {
				/**
				 * Checks if the user is signed in.
				 *
				 * Since this is in a browser-context, `getSession()` *should* be trustworthy.
				 * It does work, and so does `getUser()`. However, I've opted for `getUser()`
				 * here because this way it's guaranteed to revalidate the Auth token. This
				 * should handle cases wherein the user has been signed out from another
				 * device, or if the token has expired.
				 *
				 * Given that `getSession()` doesn't have that guarantee in a server-context,
				 * and that users are unlikely to spam logout requests, I've opted for `getUser()`.
				 *
				 * For why `getSession()` should be used in other situations, see:
				 * - [Browser-context client]{@link @utils/supabase/client.ts}.
				 * - [Server-context client]{@link @utils/supabase/server.ts}.
				 * - [Middleware]{@link @/app/middleware.ts}.
				 *
				 * @added 2024-02-13
				 * @note This currently only grabs error data, but does not grab the user data object.
				 * 		Given my limited understanding of the exact process, due to lacking documentation,
				 * 		I'm not sure if this will cause issues with guaranteeing that the Auth token is
				 * 		revalidated. I don't see why it should, since it wasn't in use, and logging out
				 * 		works just fine. However, this should be kept in mind should issues occur.
				 */
				const {error: sessionError} = await supabase.auth.getUser();
				
				if (sessionError) {
					logman("A session error occurred: " + sessionError);
					// FIXME: Exception is caught locally.
					throw sessionError;
					// TODO: redirect("/error/401");
				}
				
				await signOutSA();
				
				// Sign out of the browser-context (client).
				const {error: signOutError} = await supabase.auth.signOut();
				
				// Catch potential sign out errors.
				if (signOutError) {
					logman("A sign out error occurred: " + signOutError);
					// FIXME: Exception is caught locally.
					throw signOutError;
					// TODO: redirect("/error/401");
				}
			} catch (error) {
				/* If it has some kind of error, logging it for the user to see is probably better.
				 * At least in the sense that it'll help with bug-fixing.
				 *
				 * Otherwise, logman could've been used.
				 */
				console.error(error);
			}
			
			/* TODO: Should have a toast for when the user has been signed out.
			 * 		You can see you are by using the header, but something like
			 * 		that could be nice.
			 *
			 * It can be added here:
			 */
			
			// Redirect to the index after logging out.
			router.push("/");
		}
		
		signOut().then(() => logman("User has signed out."));
	}, [router, supabase.auth])
	
	/* This will display a message for a brief moment.
	 *
	 * It's kind of jagged, and the transition is really quick. It might be
	 * worth to consider removing it all together. Though, the end-user *must*
	 * have some kind of feedback that they're being signed out.
	 */
	return (
		<div className="flex items-center justify-center">
			<h1 className="text-3xl font-medium mr-5 p-0">Signing out.</h1>
		</div>
	);
}
