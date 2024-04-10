/**
 * Footer component.
 *
 * Only used in root-layout.
 *
 * @author frigvid
 */


/**
 * It contains a language switcher component for changing the application's language.
 * Author:oldpopcorn / Ro
 */
import React from 'react';
import LanguageSwitcher from '@ui/LanguageSwitcher';

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
