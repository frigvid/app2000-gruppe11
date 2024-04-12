import { Chessboard } from "react-chessboard";
import { Chess } from "chess.js";
import { useEffect, useState } from "react";
import { useUser } from "@/app/(auth)/actions/useUser";

export default function TrainChess(opening) {
	const user = useUser();
	const [game, setGame] = useState(new Chess());
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState("Game ongoing");
	const [playerTurn, setPlayerTurn] = useState(0);
	const [botTurn, setBotTurn] = useState(1);

	const pgn = opening.opening[0].pgn;


	function makeAMove(move) {
		try {
			console.log(pgn[playerTurn]);
			console.log(move);
			if(playerTurn < pgn.length) {
				if((move.from == pgn[playerTurn].from) && (move.to == pgn[playerTurn].to) && (move.piece == pgn[playerTurn].piece)) {
					game.move(move);
					setPlayerTurn(playerTurn + 2);
				} else {
					alert("wrong move");
					console.log('pgn: ',pgn[playerTurn]);
					console.log('move: ',move);
				}
			} else {
				console.log("player turn is equal or greater than pgn length")
				return null;
			}


		} catch (e) {
			console.log(e);
			return null;
		}
		setGame(game);
		setBoardPosition(game.fen());
		return true;
	}


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
				} else {
					console.log('bot turn is equals or greater than pgn length')
				}
		} catch (e) {
			console.log(e);
			return null;
		}
		setGame(game);
		setBoardPosition(game.fen());
		return true;
		}

	function onDrop(sourceSquare, targetSquare, piece) {
		const move = makeAMove({
			from: sourceSquare,
			to: targetSquare,
			piece: piece[1].toLowerCase()
		});

		// illegal move
		if (move === null) return false;
		setTimeout(followingMove, 500);
		return true;
	}

	return (
		<div className="flex justify-center items-center w-96 h-96">
			<Chessboard
				position={boardPosition}
				onPieceDrop={onDrop}
			></Chessboard>
		</div>
	);
}
