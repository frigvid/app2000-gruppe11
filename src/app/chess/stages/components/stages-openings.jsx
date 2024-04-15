"use client";

import StagesChessboardThumbnail from "@ui/chess/stages/stages-chessboard-thumbnail";
import Buffering from "@auth/components/fragment/Buffering";
import React, {Suspense, useEffect, useState} from "react";
import StagesModal from "@ui/chess/stages/stages-modal";
import {createClient} from "@utils/supabase/client";
import Tooltip from "@mui/material/Tooltip";

/**
 * Route for the game stages' openings list.
 *
 * Openings are fetched from the database, and displayed in a grid.
 *
 * @author qwertyfyr, frigvid
 * @created 2024-04-15
 * @return The StagesOpenings component.
 */
export default function StagesOpenings({
	isCreatingRepertoire,
	selectedOpenings,
	handleSelection
}) {
	const supabase = createClient();
	const [opening, setOpening] = useState([]);
	
	useEffect(() => {
		/**
		 * Fetches all openings from the database.
		 *
		 * @author qwertyfyr
		 * @contributor frigvid
		 * @created 2024-04-09
		 * @return {Promise<void>} returns all data for all fetched openings.
		 */
		async function getOpenings() {
			const {data, error} = await supabase
				.from('openings')
				.select('id, created_by, title, description, pgn');
			
			if (error) {
				console.error("Something went wrong while getting openings!", error);
			} else {
				setOpening(data);
			}
		}
		
		void getOpenings();
	}, [supabase]);
	
	/**
	 * This useEffect handles realtime INSERTs and DELETEs
	 * from the public.openings table.
	 *
	 * Originally based off on the link in the @see statement,
	 * and albeit it did work, it somehow seems to have changed.
	 * After debugging, it seems they've changed the object names
	 * for what is returned. This new code is more flexible, and
	 * also fixed.
	 *
	 * @author frigvid
	 * @created 2024-04-15
	 * @see https://supabase.com/docs/guides/realtime
	 */
	useEffect(() => {
		const openings = supabase
			.channel('openings')
			.on('postgres_changes', {
				event: '*',
				schema: 'public',
				table: 'openings'
			}, (payload) => {
				if (payload.eventType === 'INSERT') {
					setOpening(prevOpenings => [...prevOpenings, payload.new]);
				} else if (payload.eventType === 'DELETE') {
					setOpening(prevOpenings => prevOpenings.filter(opening => opening.id !== payload.old.id));
				}
			}).subscribe();
		
		return () => {
			void supabase.removeChannel(openings);
		}
	}, [supabase, opening]);
	
	return (
		<>
			<Suspense fallback={<Buffering/>}>
				<div className='flex justify-center items-center flex-col space-y-16'>
					<div className="flex flex-col justify-center space-y-10">
						<div className="space-y-4">
							<h2 className="text-center font-semibold text-3xl">Openings</h2>
							<section id="openingList" className="grid grid-cols-4 gap-4">
								{
									(opening === null)
										? <p></p>
										: (
											opening.map((opening) => {
												return (
													<div
														key={(opening.title + opening.description + opening.id)}
														className="p-4 bg-[#976646] rounded-md w-64 h-64 flex flex-col justify-between items-center text-white relative"
													>
														<div className="absolute top-0 right-0 mr-3 mt-2">
															<Tooltip title="Add opening to repertoire?">
																<>
																	{isCreatingRepertoire && (
																		<input
																			type="checkbox"
																			checked={selectedOpenings.includes(opening.id)}
																			onChange={() => handleSelection(opening.id)}
																		/>
																	)}
																</>
															</Tooltip>
														</div>
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
							</section>
						</div>
					</div>
				</div>
			</Suspense>
		</>
	)
}
