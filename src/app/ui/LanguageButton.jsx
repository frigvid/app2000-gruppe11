'use client';

import React from 'react';
import { useTranslation } from 'react-i18next';

const LanguageButton = ({ language }) => {
	const { i18n } = useTranslation();

	const changeLanguage = (lng) => {
		i18n.changeLanguage(lng);
	};

	return (
		<button
			className="mx-2 px-4 py-2 bg-white text-main rounded hover:bg-gray-200 transition-colors duration-300"
			onClick={() => changeLanguage(language)}>
			{language.toUpperCase()}
		</button>
	);
};

export default LanguageButton;
