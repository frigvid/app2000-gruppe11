import {createClient} from "@lib/supabase/server";
//import {redirect} from "next/navigation";
import {cookies} from "next/headers";
import Link from "next/link";

/**
 * Authentication error page.
 *
 * For example, this'll appear if you try to use
 * a password reset link that's expired.
 *
 * @author frigvid
 */
export default function ForbiddenError() {
	return (
		<div className="flex items-center justify-center">
			<h1 className="text-3xl font-medium mr-5 p-0">403</h1>
			<span>|</span>
			<h2 className="text-base font-normal m-0 pl-5">Forbidden.</h2>
		</div>
	);
}
