"use client";

import {FaChessKnight, FaPlay, FaHistory, FaArrowDown} from "react-icons/fa";
import React, {useState, useEffect} from "react";
import { useTranslation } from "react-i18next";
import Link from "next/link";

/**
 * Homepage route.
 *
 * @author frigvid, KarstenKebba
 * @contributor oldpopcorn, jarle0
 * @created 2024-01-15
 */
export default function Home() {
	const {t, ready} = useTranslation();
	const [loaded, setLoaded] = useState(false);

	// Effect hook to set loaded state once translations are ready.
	useEffect(() => {
		if (ready) {
			setLoaded(true);
		}
	}, [ready]);
	
	// Renders null to match server-side rendered content before translations are loaded.
	if (!loaded) {
		return null;
	}

	return (
		<main className="flex flex-col">
			<div className="flex flex-col items-center justify-center h-screen -mt-24 md:mt-0">
				<div className="space-y-4 md:space-y-0 md:flex md:justify-center md:space-x-6 text-lg mt-2 md:mt-0">
					{/* Train Openings */}
					<div className="text-center">
						<Link
							className="flex justify-center items-center bg-blue-500 text-white rounded h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 hover:bg-blue-600 transition duration-300 ease-in-out"
							href="/chess/stages"
						>
							<FaChessKnight className="text-5xl md:text-6xl"/>
						</Link>
						<p className="mt-2 text-gray-600">{t('train_openings')}</p>
					</div>
					{/* Play Now */}
					<div className="text-center">
						<Link
							href="/chess"
							className="flex justify-center items-center bg-green-500 text-white rounded h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 hover:bg-green-600 transition duration-300 ease-in-out"
						>
							<FaPlay className="text-5xl md:text-6xl"/>
						</Link>
						<p className="mt-2 text-gray-600">{t('play_now')}</p>
					</div>
					{/* Your History */}
					<div className="text-center">
						<Link
							href="/chess/history"
							className="flex justify-center items-center bg-red-500 text-white rounded h-32 w-32 sm:h-40 sm:w-40 md:h-48 md:w-48 hover:bg-red-600 transition duration-300 ease-in-out"
						>
							<FaHistory className="text-5xl md:text-6xl"/>
						</Link>
						<p className="mt-2 text-gray-600">{t('your_history')}</p>
					</div>
				</div>
				<div className="absolute bottom-5 w-full text-center">
					<FaArrowDown className="animate-bounce mx-auto text-2xl"/>
				</div>
			</div>
			<div className="flex flex-col items-center px-4 py-8 mb-20 text-lg">
				<section className="max-w-4xl text-justify space-y-4">
					<h1 className="text-4xl font-bold text-center mb-6">{t('about_chess_buddy')}</h1>
					<p>{t('chess_buddy_description_1')}</p>
					<p>{t('chess_buddy_description_2')}</p>
					<p>{t('chess_buddy_description_3')}</p>
					<p className="text-center pt-4">
						{t('home_link')}
						<Link
							href="/aboutus"
							className="text-xl font-semibold leading-6 hover:underline hover:underline-offset-8"
						>
							{t('about_us_here')}
						</Link>.
					</p>
				</section>
				<section className="max-w-4xl mt-10 text-justify space-y-4">
					<h2 className="text-3xl font-bold text-center mb-6">{t('ch_help_you1')}</h2>
					<ul className="list-disc space-y-2 pl-5">
						<li>{t('ch_help_you2')}</li>
						<li>{t('ch_help_you3')}</li>
						<li>{t('ch_help_you4')}</li>
						<li>{t('ch_help_you5')}</li>
					</ul>
				</section>
			</div>
		</main>
	);
}
