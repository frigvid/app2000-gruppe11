"use client"

import TrainChess from "@ui/chess/training/train-chess";
import { fetchPgn } from "@utils/game/get-opening";

/**
 * Route for training chess.
 *
 * @author frigvid, qwertyfyr
 * @created 2024-01-31
 * @note Currently somewhat of a stub, it's being expanded upon.
 */
export default async function App({params}) {
	const {id} = params;

	const data = await fetchPgn(id);




	/*const checkOpening = Object.keys(opening[turn]).every((key) => {
		return move[key] === opening[turn][key];
  });
  */


	return (
		<>
			<main className="flex justify-center items-center">
				<TrainChess opening = {data}></TrainChess>
			</main>
		</>
	);
}
