"use client";

import React, {useState, useEffect} from "react";
import {useTranslation} from "react-i18next";

/**
 * LanguageSwitcher component allows users to switch languages.
 *
 * Displays a button that, when clicked, shows a drop-up menu with the available languages.
 * Selecting a language changes the application's current language and closes the menu.
 *
 * Utilizes the `useTranslation` hook from `react-i18next` for language switching functionality.
 * Delays rendering until after the client-side hydration to prevent hydration errors.
 *
 * @returns {React.Component} The LanguageSwitcher component.
 * @author oldpopcorn
 * @created 2024-04-09
 */
const LanguageSwitcher = () => {
	const {i18n} = useTranslation();
	const [showDropUp, setShowDropUp] = useState(false);
	// New state to track if the component has mounted on the client.
	const [isClient, setIsClient] = useState(false);

	// Define the languages array inside the component to ensure it's in scope
	const languages = [
		{code: "en", name: "English"},
		{code: "no", name: "Norsk"}
	];

	/**
	 * Changes the application's current language and closes the language selection menu.
	 *
	 * @param {string} lng The code of the language to switch to.
	 */
	const changeLanguage = (lng) => {
		void i18n.changeLanguage(lng);
		// Close menu after selection.
		setShowDropUp(false);
	};

	// useEffect hook to set isClient to true after the component mounts.
	useEffect(() => {
		setIsClient(true);
	}, []);

	// Render null if not yet client-side.
	if (!isClient) {
		return null;
	}

	return (
		<div className="relative">
			<button
				className="mx-2 px-4 py-2 bg-white text-main rounded hover:bg-gray-200 transition-colors duration-300"
				onClick={() => setShowDropUp(!showDropUp)}
			>
				{i18n.language.toUpperCase()}
			</button>
			{
				showDropUp && (
					<ul className="absolute right-0 bottom-full mb-2 bg-white border rounded shadow py-1">
						{
							languages.map((lng) => (
								<li key={lng.code} className="px-4 py-2 hover:bg-gray-100 cursor-pointer" onClick={() => changeLanguage(lng.code)}>
									{lng.name}
								</li>
							))
						}
					</ul>
				)
			}
		</div>
	);
};

export default LanguageSwitcher;
