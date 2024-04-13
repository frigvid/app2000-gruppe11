"use client";

import UnauthorizedError from "@ui/error/401_unauthorized";
import {createClient} from "@utils/supabase/client";
import {useEffect, useState} from "react";
import Link from "next/link";

/**
 * Stub page for the administrator dashboard.
 *
 * @author frigvid
 * @created 2024-04-11
 */
export default function AdministratorDashboard() {
	const [isAdmin, setIsAdmin] = useState(null);
	
	useEffect(() => {
		const fetchData = async () => {
			const supabase = createClient();
			const {data, error} = await supabase.rpc("admin_is_admin");
			
			if (error) {
				console.error("Supabase RPC error: " + error);
			} else {
				setIsAdmin(data);
			}
		};
		
		void fetchData();
	}, []);
	
	/**
	 * Only return the administrator dashboard for administrator users.
	 *
	 * Since this is using a database function, we're guaranteed to only
	 * grant access to authenticated users, and specifically those which
	 * are administrators.
	 */
	if (isAdmin) {
		return (
			<main className="flex flex-col justify-center items-center">
				<h1 className="text-6xl">Administrator Dashboard</h1>
				<p>Currently a stub, but will let admins delete users, promote them to administrator, etc.</p>
			</main>
		)
	} else {
		return (
			<main className="flex flex-col justify-center items-center">
				<div className="mb-8">
					<UnauthorizedError/>
				</div>
				<Link
					href="/"
					className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					Return to home
				</Link>
			</main>
		)
	}
}
