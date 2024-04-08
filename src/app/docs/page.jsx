'use client';

import { useTranslation } from 'react-i18next';

export default function App() {
	const { t } = useTranslation();

	return (
		<main className="flex justify-center items-center flex-col p-5">
			<h1 className="text-2xl font-bold mb-4">{t('faq_title')}</h1>
			<div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-5 gap-4">
				<div className="p-4 border rounded-lg shadow">
					<p>{t('faq1_question')}</p>
					<p>{t('faq1_answer')}</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>{t('faq1_question')}</p>
					<p>{t('faq1_answer')}</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>{t('faq1_question')}</p>
					<p>{t('faq1_answer')}</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>{t('faq1_question')}</p>
					<p>{t('faq1_answer')}</p>
				</div>
				<div className="p-4 border rounded-lg shadow">
					<p>{t('faq2_question')}</p>
					<p>{t('faq2_answer')}</p>
				</div>
				{/* Repeat for other FAQ entries */}
			</div>
		</main>
	);
}
