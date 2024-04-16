"use client";

import ForbiddenError from "@ui/error/403_forbidden";
import Link from "next/link";

/**
 * If something goes wrong during the confirmation process,
 * end-users are sent here.
 *
 * @author frigvid
 * @created 2024-04-03
 */
export default function SignUpError() {
	return (
		<main className="flex flex-col justify-center items-center">
			<div className="mb-8">
				<ForbiddenError/>
			</div>
			<Link href="/"
					className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
			>
				Return to Home
			</Link>
		</main>
	);
}
