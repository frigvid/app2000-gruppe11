"use client";

import AccountMenu from "@auth/components/account-menu";
import {useTranslation} from "react-i18next";
import logoIcon from "/public/logo.svg";
import Image from "next/image";
import Link from "next/link";

/**
 * Header component.
 *
 * FIXME: You can translate the header, however, it doesn't
 * 		 look that good even if you do. It's a CSS issue,
 * 		 mostly, but given the lack of time remaining, it's
 * 		 just being kept to English.
 *
 * @author frigvid
 * @contributor jarle0
 * @created 2024-01-18
 * @warning There's a known issue of including this in the root layout, as it rarely re-draws, which makes the
 * 			{@link #AccountMenu} slow to update.
 */
export default function Header() {
	const {t} = useTranslation();
	
	return (
		<header className="bg-main lg:h-auto h-24 lg:py-2 py-4 md:py-0">
			<nav className="mx-auto flex flex-col lg:flex-row max-w-7xl items-center justify-between lg:p-2 lg:px-8 lg:justify-start">
				<div className="flex lg:flex-1">
					<Link href={'/'} className="hidden lg:block">
						<Image className="h-16" src={logoIcon} alt={"Chess Buddy logo image."} priority={true}/>
					</Link>
				</div>
				{/* FIXME: On viewports like the iPhone SE, it appears the Link elements stop being clickable. */}
				<div className="lg:flex lg:gap-x-12 lg:mt-0 md:mt-4">
					<div className="flex space-x-4 lg:space-x-12 lg:space-y-0">
						<Link
							className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
							href="/"
						>
							{t("header.home")}
						</Link>
						<span className="text-navseparator text-xl font-semibold leading-6">|</span>
						<Link
							className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
							href="/news"
						>
							{t("header.news")}*
						</Link>
						<span className="text-navseparator text-xl font-semibold leading-6">|</span>
						<Link
							className="text-xl font-semibold leading-6 text-white hover:underline hover:underline-offset-8"
							href="/docs"
						>
							{t("header.docs")}*
						</Link>
					</div>
				</div>
				<div className="lg:flex lg:flex-1 lg:justify-end">
					<div className="mt-4 lg:mt-0 lg:inline-block">
						<AccountMenu/>
					</div>
				</div>
			</nav>
		</header>
	)
}
