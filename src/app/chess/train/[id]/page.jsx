"use client"

import TrainChess from "@ui/chess/training/train-chess";
import {fetchPgn} from "@utils/game/get-opening";
import {useEffect, useState} from "react";

/**
 * Route for training chess.
 *
 * @author frigvid, qwertyfyr
 * @created 2024-01-31
 */
export default function App({params}) {
	const [pgn, setPgn] = useState(null);
	const {id} = params;
	
	useEffect(() => {
		const fetch = async () => {
			try {
				const data = await fetchPgn(id);
				
				setPgn(data.pop());
			} catch (error) {
				console.error("Something went wrong!", error);
			}
		};
		
		void fetch();
	}, [id]);
	
	/*
	const checkOpening = Object.keys(opening[turn]).every((key) => {
		return move[key] === opening[turn][key];
	});
	*/


	return (
		<main className="flex justify-center items-center">
			<TrainChess opening={pgn}/>
		</main>
	);
}
