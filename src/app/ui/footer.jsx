/**
 * Footer component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 */
import React from 'react';
import LanguageSwitcher from '@ui/LanguageSwitcher'; // Make sure the path is correct

export default function Footer() {
	return (
		<footer className="bg-main p-4 flex items-center justify-between">
			<div className="flex-grow text-center">
				<p className="text-white mb-4">© 2024 Chess Buddy. All rights reserved.</p>
			</div>
			<div>
				<LanguageSwitcher />
			</div>
		</footer>
	);
}
