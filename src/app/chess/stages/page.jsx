"use client";

import StagesChessboardThumbnail from "@ui/chess/stages/stages-chessboard-thumbnail";
import StagesCreateOpeningModal from "@ui/chess/stages/stages-create-opening-modal";
import ProtectClientContent from "@/app/(auth)/components/protect-client-content";
import Buffering from "@auth/components/fragment/Buffering";
import React, {Suspense, useEffect, useState} from "react";
import StagesModal from "@ui/chess/stages/stages-modal";
import {fetchOpenings} from "@utils/game/get-gamedata";
import {createClient} from "@utils/supabase/client";
import {useTranslation} from "react-i18next";

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
	}, []);
	
	/**
	 * Handles DELETE events occurring in table subscription.
	 *
	 * @author frigvid
	 * @created 2024-04-13
	 * @param payload The row that was deleted.
	 * @see https://supabase.com/docs/guides/realtime
	 */
	const handleOpeningsDeletes = (payload) => {
		setOpening(prevOpenings => prevOpenings.filter(opening => opening.id !== payload.record.id));
	}
	
	/**
	 * Handles INSERT events occurring in table subscription.
	 *
	 * @author frigvid
	 * @created 2024-04-13
	 * @param payload The row that was inserted.
	 * @see https://supabase.com/docs/guides/realtime
	 */
	const handleOpeningsInserts = (payload) => {
		setOpening(prevOpenings => [...prevOpenings, payload.record]);
	}
	
	/**
	 * Subscription to listen to DELETE events.
	 *
	 * @author frigvid, supabase
	 * @created 2024-04-13
	 * @see https://supabase.com/docs/guides/realtime
	 */
	supabase
		.channel('openings')
		.on('postgres_changes', { event: 'DELETE', schema: 'public', table: 'openings' }, handleOpeningsDeletes)
		.subscribe();
	
	/**
	 * Subscription to listen to INSERT events.
	 *
	 * @author frigvid, supabase
	 * @created 2024-04-13
	 * @see https://supabase.com/docs/guides/realtime
	 */
	supabase
		.channel('openings')
		.on('postgres_changes', { event: 'INSERT', schema: 'public', table: 'openings' }, handleOpeningsInserts)
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
