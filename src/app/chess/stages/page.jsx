"use client";

import {fetchOpenings} from "@utils/game/get-gamedata";
import MyModal from "@ui/chess/stages/MyModal";
import {useEffect, useState} from "react";

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
	console.log(opening);
	
	useEffect(() => {
		async function getOpenings() {
			const fetchedData = await fetchOpenings();
			setOpening(fetchedData);
		}
		
		void getOpenings();
	}, []);
	
	return (
		<>
			<div className='flex justify-center items-center'>
				<div className='grid grid-cols-4 gap-4'>
					{opening.map((opening) => {
						return (
							<div key={(opening.name + opening.desc + opening.id)} className='p-4 bg-red-400 rounded-md max-h-32'>
								<h2>{opening.name}</h2>
								<MyModal title={opening.name} details={opening.desc} id={opening.id}/>
							</div>
						)
					})}
				</div>
			</div>
		</>
	)
}
