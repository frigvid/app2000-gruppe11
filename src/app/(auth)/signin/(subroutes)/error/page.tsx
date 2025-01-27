"use client";

import InternalServerError from "@shared/components/error/500_internal-server";
import {useTranslation} from "react-i18next";
import Link from "next/link";

/**
 * If something goes wrong during the sign-in process,
 * end-users are sent here.
 *
 * @author frigvid
 * @created 2024-02-20
 */
export default function SignUpError() {
	const {t} = useTranslation();
	
	return (
		<main className="flex flex-col justify-center items-center">
			<div className="mb-8">
				<InternalServerError/>
			</div>
			<Link href="/signin"
					className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
			>
				{t("signin.error.button")}
			</Link>
		</main>
	);
}
