"use client";

import {useTranslation} from "react-i18next";
import React from "react";

/**
 * About us page.
 *
 * @author KarstenKebba
 * @contributor frigvid
 */
export default function AboutUs() {
	const { t } = useTranslation();

	return (
		<main className="flex flex-col items-center text-center px-4 py-8">
			<section className="max-w-4xl text-justify space-y-4 space-x-12 text-lg">
				<h1 className="text-4xl text-center font-bold mb-6">{t('welcome_title')}</h1>
				<p>
					{t('welcome_paragraph_1')}
				</p>
				<p>
					{t('welcome_paragraph_2')}
				</p>
				<p>
					{t('welcome_paragraph_3')}
				</p>
			</section>
			<section className="max-w-4xl mt-10 text-justify space-y-4 space-x-12">
				<h2 className="text-3xl text-center font-bold mb-6">{t('our_vision_title')}</h2>
				<p className="text-lg">
					{t('our_vision_paragraph')}
				</p>
			</section>
		</main>
	);
}
