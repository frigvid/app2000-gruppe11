"use client";

import NavigateBeforeIcon from "@mui/icons-material/NavigateBefore";
import NavigateNextIcon from "@mui/icons-material/NavigateNext";
import FirstPageIcon from "@mui/icons-material/FirstPage";
import LastPageIcon from "@mui/icons-material/LastPage";
import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";
import {useState} from "react";

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
export default function StagesChessboardThumbnail({interactive = false, pgn, width = 128}) {
	const [currentMoveIndex, setCurrentMoveIndex] = useState(pgn.length - 1);
	const chess = new Chess();
	/**
	 * Move the "thumbnail" to its final position.
	 *
	 * @author frigvid
	 * @created 2024-04-10
	 */
	for (let i = 0; i <= currentMoveIndex; i++) {
		chess.move(pgn[i]);
	}
	
	/**
	 * Redo the last move.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	const redo = () => {
		if (currentMoveIndex < pgn.length - 1) {
			setCurrentMoveIndex(currentMoveIndex + 1);
		}
	}
	
	/**
	 * Undo the last move.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	const undo = () => {
		if (currentMoveIndex >= 0) {
			setCurrentMoveIndex(currentMoveIndex - 1);
		}
	}
	
	/**
	 * Redo all moves.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	const redoAll = () => {
		setCurrentMoveIndex(pgn.length - 1);
	}
	
	/**
	 * Undo all moves.
	 *
	 * @author frigvid
	 * @created 2024-04-19
	 */
	const undoAll = () => {
		setCurrentMoveIndex(-1);
	}
	
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
			{
				interactive && (
					<div className="flex flex-row justify-between mt-2">
						<div className="space-x-2">
							<button
								className="inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] disabled:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								onClick={undoAll}
								disabled={currentMoveIndex < 0}
							>
								<FirstPageIcon/>
							</button>
							<button
								className="inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] disabled:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								onClick={undo}
								disabled={currentMoveIndex < 0}
							>
								<NavigateBeforeIcon/>
							</button>
						</div>
						<div className="space-x-2">
							<button
								className="inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] disabled:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								onClick={redo}
								disabled={currentMoveIndex === pgn.length - 1}
							>
								<NavigateNextIcon/>
							</button>
							<button
								className="inline-flex justify-center rounded-md border border-transparent bg-buttoncolor px-4 py-2 text-sm font-medium text-black hover:text-white hover:bg-[#9c8064] disabled:bg-[#9c8064] focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 focus-visible:ring-offset-2"
								onClick={redoAll}
								disabled={currentMoveIndex === pgn.length - 1}
							>
								<LastPageIcon/>
							</button>
						</div>
					</div>
				)
			}
		</>
	)
}
