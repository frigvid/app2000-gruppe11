/**
 * Footer component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 */
import React from 'react';
import LanguageButton from '@ui/LanguageButton.jsx';

export default function Footer() {
	return (
		<footer className="bg-main p-4">
			<div className="flex justify-end flex-1">
				<LanguageButton language="en" />
				<LanguageButton language="no" />
			</div>
				<div className="text-center">
					<p className="text-white mb-4">© 2024 Chess Buddy. All rights reserved.</p>
				</div>
		</footer>
);
}
