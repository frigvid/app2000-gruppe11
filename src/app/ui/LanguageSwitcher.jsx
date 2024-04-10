'use client';

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
/**
Author:oldpopcorn /Ro
 */
/**
 * A list of languages supported by the application.
 */
const languages = [
	{ code: 'en', name: 'English' },
	{ code: 'no', name: 'Norsk' }
];

/**
 * LanguageSwitcher component that allows users to switch languages.
 * It displays a button that, when clicked, shows a drop-up menu with the available languages.
 * Selecting a language changes the application's current language and closes the menu.
 *
 * Utilizes the `useTranslation` hook from `react-i18next` for language switching functionality.
 *
 * @returns {React.Component} The LanguageSwitcher component.
 */
const LanguageSwitcher = () => {
	const { i18n } = useTranslation();
	const [showDropUp, setShowDropUp] = useState(false);

	/**
	 * Changes the application's current language and closes the language selection menu.
	 *
	 * @param {string} lng - The code of the language to switch to.
	 */
	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
		setShowDropUp(false); // Close menu after selection
	};

	return (
		<div className="relative">
			<button
				className="mx-2 px-4 py-2 bg-white text-main rounded hover:bg-gray-200 transition-colors duration-300"
				onClick={() => setShowDropUp(!showDropUp)}
			>
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
