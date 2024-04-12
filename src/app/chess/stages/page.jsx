"use client";

import StagesCreateOpeningModal from "@ui/chess/stages/stages-create-opening-modal";
import ProtectClientContent from "@/app/(auth)/components/protect-client-content";
import StagesChessboardThumbnail from "@ui/chess/stages/stages-chessboard-thumbnail";
import StagesModal from "@ui/chess/stages/stages-modal";
import {fetchOpenings} from "@utils/game/get-gamedata";
import React, {useEffect, useState} from "react";

/**
 * Route for the game's stages.
 *
 * Stages are fetched from the database, and displayed in a grid.
 *
 * @author qwertyfyr
 * @contributor frigvid
 * @return {JSX.Element} The Stages component.
 * @constructor
 */
export default function Stages() {
	const [opening, setOpening] = useState([]);
	
	useEffect(() => {
		async function getOpenings() {
			const fetchedData = await fetchOpenings();
			setOpening(fetchedData);
		}
		
		void getOpenings();
	}, []);
	
	return (
		<>
			<div className='flex justify-center items-center flex-col space-y-16'>
				<ProtectClientContent showError={false} noBuffer={true}>
					<div className="flex flex-col">
						<p className="mb-3">You can also create your own openings.</p>
						<StagesCreateOpeningModal/>
					</div>
				</ProtectClientContent>
				<div className="grid grid-cols-4 gap-4">
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
												<StagesModal title={opening.title} details={opening.description} id={opening.id} pgn={opening.pgn}/>
											</div>
										</div>
									)
								})
							)
					}
				</div>
			</div>
		</>
	)
}
