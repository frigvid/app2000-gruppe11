import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useState } from "react";
import { useUser } from "@/app/(auth)/actions/useUser";
import TrainPanel from "./train-panel";

/**
 * @author qwertyfyr
 * @contributor frigvid
 * @param opening parameter that gets an opening and is used to restrict allowed moves 
 * @returns A chessboard with the opening moves and a panel for feedback
 */
export default function TrainChess(opening) {
	const user = useUser();
	const [game, setGame] = useState(new Chess());
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState("Start practicing boi");
	const [playerTurn, setPlayerTurn] = useState(0);
	const [botTurn, setBotTurn] = useState(1);
	const [wrongCounter, setWrongCounter] = useState(0);

	const pgn = opening.pgn;

	/**
	 * 
	 * @param {*} move 
	 * @returns 
	 */
	function makeAMove(move) {
		try {
			console.log(pgn[playerTurn]);
			console.log(move);
			if (playerTurn < pgn.length) {
				if (
					move.from == pgn[playerTurn].from &&
					move.to == pgn[playerTurn].to &&
					move.piece == pgn[playerTurn].piece
				) {
					game.move(move);
					setPlayerTurn(playerTurn + 2);
				} else {
					setStatus("Wrong move");
					console.log("pgn: ", pgn[playerTurn]);
					console.log("move: ", move);
					setWrongCounter(wrongCounter + 1);
				}
			} else {
				setStatus("Opening completed!");
			}
		} catch (e) {
			console.log(e);
			return null;
		}
		setGame(game);
		setBoardPosition(game.fen());
		return true;
	}

	/**
	 * 
	 * @returns 
	 */
	function followingMove() {
		try {
			if (game.isGameOver() || game.isDraw()) {
				checkEnding();
				return;
			}
			if (botTurn < pgn.length) {
				game.move(pgn[botTurn]);
				setGame(game);
				setBoardPosition(game.fen());
				setBotTurn(botTurn + 2);
				console.log(botTurn);

				setStatus("White to move");
			} else {
				setStatus("Opening completed!");
			}
		} catch (e) {
			console.log(e);
			return null;
		}

		setGame(game);
		setBoardPosition(game.fen());
		return true;
	}

/**
 * 
 * @param {*} sourceSquare 
 * @param {*} targetSquare 
 * @param {*} piece 
 * @returns 
 */
	function onDrop(sourceSquare, targetSquare, piece) {
		const move = makeAMove({
			from: sourceSquare,
			to: targetSquare,
			piece: piece[1].toLowerCase(),
		});

		// illegal move
		if (move === null) return false;
		setTimeout(followingMove, 500);
		return true;
	}

	return (
		<div className="flex justify-center items-center space-x-5">
			<TrainPanel status={status} wrongCounter={wrongCounter} />
			<div className="w-96 h-96">
				<Chessboard position={boardPosition} onPieceDrop={onDrop} />
			</div>
		</div>
	);
}
