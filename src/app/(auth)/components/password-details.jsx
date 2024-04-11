import {useTranslation} from "react-i18next";
import React from "react";

/**
 * Re-usable component that describes password
 * requirements for signing up a new user.
 *
 * @author frigvid
 * @created 2024-01-26
 */
export default function PasswordDetails() {
	const { t } = useTranslation();

	return (
		<div className="flex flex-col items-center justify-center">
			<p className="mb-0 mr-2">
				{t('password_requirements')}
			</p>
			<ul className="list-disc -ml-10 mb-0 mr-2 text-left">
				<li>{t('password_uppercase')}</li>
				<li>{t('password_lowercase')}</li>
				<li>{t('password_number')}</li>
				<li>{t('password_symbol')}</li>
				<li>{t('password_length')}</li>
			</ul>
		</div>
	);
}
