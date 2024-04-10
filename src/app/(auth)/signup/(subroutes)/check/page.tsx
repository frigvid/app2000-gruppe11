"use client";

import Link from "next/link";

/**
 * If all goes well, the user will be sent here,
 * and prompted to check their email.
 *
 * @author frigvid
 * @created 2024-02-20
 */
export default function SignUpCheckEmail() {
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<div className="pb-1 pt-1 text-center">
					<p>Check email to continue the sign up process.</p>
					<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
					<Link href="/" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						Back to home
					</Link>
				</div>
			</div>
		</main>
	);
}
