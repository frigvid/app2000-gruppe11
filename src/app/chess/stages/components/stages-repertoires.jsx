"use client";

import Buffering from "@auth/components/fragment/Buffering";
import React, {Suspense, useEffect, useState} from "react";
import {createClient} from "@utils/supabase/client";
import {useTranslation} from "react-i18next";

/**
 * Route for the game stages' repertoires list.
 *
 * Repertoires are fetched from the database, and displayed in a grid.
 *
 * @author frigvid
 * @created 2024-04-15
 * @return The StagesRepertoires component.
 */
export default function StagesRepertoires() {
	const supabase = createClient();
	const {t} = useTranslation();
	const [repertoires, setRepertoires] = useState([]);
	
	useEffect(() => {
		const fetchRepertoires = async () => {
			const {data, error} = await supabase
				.from('repertoire')
				.select('id, timestamp, usr, openings');
			
			if (error) {
				console.error("Something went wrong while getting repertoires!", error);
			} else {
				setRepertoires(data);
			}
		};
		
		void fetchRepertoires();
	}, [supabase]);
	
	/**
	 * Handles DELETE events occurring in table subscription.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 * @param payload The row that was deleted.
	 * @see https://supabase.com/docs/guides/realtime
	 */
	const handleDeletes = (payload) => {
		setRepertoires(prevRepertoires => prevRepertoires.filter(opening => opening.id !== payload.record.id));
	}
	
	/**
	 * Handles INSERT events occurring in table subscription.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 * @param payload The row that was inserted.
	 * @see https://supabase.com/docs/guides/realtime
	 */
	const handleInserts = (payload) => {
		setRepertoires(prevRepertoires => [...prevRepertoires, payload.record]);
	}
	
	/**
	 * Subscription to listen to DELETE events.
	 *
	 * @author supabase
	 * @contributor frigvid
	 * @created 2024-04-15
	 * @see https://supabase.com/docs/guides/realtime
	 */
	supabase
		.channel('openings')
		.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'repertoire' }, handleDeletes)
		.subscribe();
	
	/**
	 * Subscription to listen to INSERT events.
	 *
	 * @author supabase
	 * @contributor frigvid
	 * @created 2024-04-15
	 * @see https://supabase.com/docs/guides/realtime
	 */
	supabase
		.channel('openings')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'repertoire' }, handleInserts)
		.subscribe();
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className="space-y-4">
					<h2 className="text-center font-semibold text-3xl">Your repertoires</h2>
					<section id="repertoireList">
						{
							(repertoires === null)
								? <p></p>
								: (
									repertoires.map((repertoire) => {
										return (
											<div
												key={(repertoire.title + repertoire.description + repertoire.id)}
												className='p-4 bg-[#976646] rounded-md w-64 h-64 flex flex-col justify-between items-center text-white'
											>
												<h2 className='font-semibold'>{repertoire.title}</h2>
												{/*
												<div>
													<StagesChessboardThumbnail pgn={repertoire.pgn}/>
												</div>
												<div>
													<StagesModal created_by={repertoire.created_by} title={repertoire.title} details={repertoire.description} id={repertoire.id} pgn={repertoire.pgn}/>
												</div>
												*/}
											</div>
										)
									})
								)
						}
					</section>
				</div>
			</Suspense>
		</>
	)
}
