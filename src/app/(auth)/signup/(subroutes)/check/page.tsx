"use client";

import withI18next from "@/app/shared/components/lang/with-i18next";
import {useTranslation} from "react-i18next";
import Link from "next/link";

/**
 * If all goes well, the user will be sent here,
 * and prompted to check their email.
 *
 * @author frigvid
 * @created 2024-02-20
 */
function SignUpCheckEmail() {
	const {t} = useTranslation();
	
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<div className="pb-1 pt-1 text-center">
					<p>{t("signup.check.message")}</p>
					<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300"></div>
					<Link href="/" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						{t("signup.check.return")}
					</Link>
				</div>
			</div>
		</main>
	);
}

/**
 * Exported with extra i18next support,
 * to avoid hydration errors.
 */
export default withI18next(SignUpCheckEmail);
