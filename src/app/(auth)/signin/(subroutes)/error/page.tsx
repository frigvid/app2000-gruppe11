"use client";

import InternalServerError from "@ui/error/500_internal-server";
import Link from "next/link";

/**
 * If something goes wrong during the sign-in process,
 * end-users are sent here.
 *
 * @author frigvid
 * @created 2024-02-20
 */
export default function SignUpError() {
	return (
		<main className="flex flex-col justify-center items-center">
			<div className="mb-8">
				<InternalServerError/>
			</div>
			<Link href="/signup"
					className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
			>
				Return to login
			</Link>
		</main>
	);
}
