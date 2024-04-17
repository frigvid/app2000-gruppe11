"use client";

import LanguageSwitcher from "@shared/components/lang/language-switcher";
import {useTranslation} from "react-i18next";
import React from "react";

/**
 * Footer component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 * @created 2024-01-31
 */
export default function Footer() {
	const {t} = useTranslation();
	
	return (
		<footer className="bg-main p-4 flex items-center justify-between">
			<div className="flex-grow text-center">
				<p className="text-white mb-4">© 2024 Chess Buddy. {t("footer.notice")}</p>
			</div>
			<div>
				<LanguageSwitcher/>
			</div>
		</footer>
	);
}
