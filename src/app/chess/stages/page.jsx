"use client";

import StagesChessboardThumbnail from "@ui/chess/stages/stages-chessboard-thumbnail";
import StagesCreateOpeningModal from "@ui/chess/stages/stages-create-opening-modal";
import ProtectClientContent from "@/app/(auth)/components/protect-client-content";
import StagesModal from "@ui/chess/stages/stages-modal";
import {fetchOpenings} from "@utils/game/get-gamedata";
import React, {Suspense, useEffect, useState} from "react";
import {useTranslation} from "react-i18next";
import Buffering from "@auth/components/fragment/Buffering";
import {createClient} from "@utils/supabase/client";

/**
 * Route for the game's stages.
 *
 * Stages are fetched from the database, and displayed in a grid.
 *
 * @author qwertyfyr
 * @contributor frigvid
 * @created 2024-04-02
 * @return {JSX.Element} The Stages component.
 */
export default function Stages() {
	const [opening, setOpening] = useState([]);
	const {t} = useTranslation();
	const supabase = createClient();
	
	useEffect(() => {
		async function getOpenings() {
			const fetchedData = await fetchOpenings();
			setOpening(fetchedData);
		}
		
		void getOpenings();
	}, [opening]);
	
	// Create a function to handle DELETEs.
	const handleDeletes = (payload) => {
		console.log('Change received!', payload);
		setOpening(prevOpenings => prevOpenings.filter(opening => opening.id !== payload.record.id));
	}
	
	// Create a function to handle INSERTs.
	const handleInserts = (payload) => {
		console.log('Insert received!', payload);
		setOpening(prevOpenings => [...prevOpenings, payload.record]);
	}
	
	// Listen to DELETEs.
	supabase
		.channel('openings')
		.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'openings' }, handleDeletes)
		.subscribe();
	
	// Listen to INSERTs.
	supabase
		.channel('openings')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'openings' }, handleInserts)
		.subscribe();
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className='flex justify-center items-center flex-col space-y-16'>
					<ProtectClientContent showError={false} noBuffer={true}>
						<div className="flex flex-col">
							<p className="mb-3">{t("chess.create_opening.label")}</p>
							<StagesCreateOpeningModal/>
						</div>
					</ProtectClientContent>
						<div id="openingList" className="grid grid-cols-4 gap-4">
							{
								(opening === null)
									? <p></p>
									: (
										opening.map((opening) => {
											return (
												<div
													key={(opening.title + opening.description + opening.id)}
													className='p-4 bg-[#976646] rounded-md w-64 h-64 flex flex-col justify-between items-center text-white'
												>
													<h2 className='font-semibold'>{opening.title}</h2>
													<div>
														<StagesChessboardThumbnail pgn={opening.pgn}/>
													</div>
													<div>
														<StagesModal created_by={opening.created_by} title={opening.title} details={opening.description} id={opening.id} pgn={opening.pgn}/>
													</div>
												</div>
											)
										})
									)
							}
						</div>
				</div>
			</Suspense>
		</>
	)
}
