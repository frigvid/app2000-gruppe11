"use client";

import PlayChess from "@ui/chess/play-chess";

/**
 * Route for training chess.
 *
 * @author frigvid
 * @created 2024-01-31
 * @note Currently somewhat of a stub, it's being expanded upon.
 */
export default function TrainChess({params}) {
	return (
		<main className="flex justify-center items-center">
			<PlayChess id={params.id} ></PlayChess>
		</main>
	)
}
