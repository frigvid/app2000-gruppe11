"use client";

import TrainChess from "@ui/chess/training/train-chess";
import {createClient} from "@utils/supabase/client";
import {useEffect, useState} from "react";

/**
 * Route for training chess.
 *
 * @author frigvid, qwertyfyr
 * @created 2024-01-31
 * @param params The id of the route.
 */
export default function ChessTrainer({params}) {
	const supabase = createClient();
	const [opening, setOpening] = useState(null);
	const {id} = params;
	
	/**
	 * Fetches the opening from the database.
	 *
	 * @author frigvid
	 * @contributor qwertyfyr
	 * @created 2024-04-12
	 */
	useEffect(() => {
		const fetch = async () => {
			const {data, error} = await supabase.rpc("opening_get", {opn_id: id});
			
			if (error) {
				console.error("Error getting opening: ", error);
			} else {
				setOpening(data[0]);
			}
		};
		
		void fetch();
	}, [id, supabase]);
	
	/*
	const checkOpening = Object.keys(opening[turn]).every((key) => {
		return move[key] === opening[turn][key];
	});
	*/
	
	/**
	 * Ensure there is an opening before trying to render the component,
	 * to avoid `opening` being `null` errors.
	 */
	if (opening) {
		return (
			<main className="flex justify-center items-center">
				<TrainChess pgn={opening.pgn}/>
			</main>
		);
	}
}
