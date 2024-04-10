"use client";

import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";

/**
 * Component that creates a "thumbnail" of the chessboard.
 *
 * @author frigvid
 * @param {Object} opening The opening to create a thumbnail for.
 * @return
 * @note This is a rather heavy-handed approach to generating "thumbnails" for the openings.
 * 		However, it *does* work. I'm just not sure if it's very performant at scale.
 */
export default function StagesChessboardThumbnail({opening}) {
	const chess = new Chess();
	JSON.parse(opening.pgn).forEach(move => {
		chess.move(move);
	});
	
	return (
		<Chessboard
			allowDragOutsideBoard={false}
			arePiecesDraggable={false}
			boardWidth={128}
			position={chess.fen()}
		/>
	)
}
