'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';

const languages = [
	{ code: 'en', name: 'English' },
	{ code: 'no', name: 'Norsk' }
	// ...add more languages if necessary
];

const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const [showDropUp, setShowDropUp] = useState(false);

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setShowDropUp(false); // Close menu after selection
	};

	return (
		<div className="relative">
			<button
				className="mx-2 px-4 py-2 bg-white text-main rounded hover:bg-gray-200 transition-colors duration-300"
				onClick={() => setShowDropUp(!showDropUp)}>
				{i18n.language.toUpperCase()}
			</button>
			{showDropUp && (
				<ul className="absolute right-0 bottom-full mb-2 bg-white border rounded shadow py-1">
					{languages.map((lng) => (
						<li key={lng.code} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => changeLanguage(lng.code)}>
							{lng.name}
						</li>
					))}
				</ul>
			)}
		</div>
	);
};

export default LanguageSwitcher;
