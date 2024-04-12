"use client";

import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";

/**
 * Component that creates a "thumbnail" of the chessboard.
 *
 * @author frigvid
 * @created 2024-04-10
 * @param {Object} opening The opening to create a thumbnail for.
 * @return {JSX.Element} The StagesChessboardThumbnail component.
 * @note This is a rather heavy-handed approach to generating "thumbnails" for the openings.
 * 		However, it *does* work. I'm just not sure if it's very performant at scale.
 */
export default function StagesChessboardThumbnail({pgn, width = 128}) {
	const chess = new Chess();
	JSON.parse(pgn).forEach(move => {
		chess.move(move);
	});
	
	return (
		<>
			<picture className="pointer-events-none">
				<Chessboard
					id={self.crypto.randomUUID()}
					allowDragOutsideBoard={false}
					arePiecesDraggable={false}
					boardWidth={width}
					position={chess.fen()}
				/>
			</picture>
			{() => {chess.reset(); chess.clear();}}
		</>
	)
}
