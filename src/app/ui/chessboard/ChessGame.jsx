import { useState } from "react";
import { Chess } from "chess.js";
import { Chessboard } from "react-chessboard";

export default function ChessGame() {
	const [game, setGame] = useState(new Chess());

	function makeAMove(move) {
		const gameCopy = new Chess(game.fen());
		try {
			gameCopy.move(move);
		} catch (e) {
			return null;
		}
		setGame(gameCopy);
		return true; // null if the move was illegal, the move object if the move was legal
	}

	function makeRandomMove() {
		// we need to update the state after the previous move has happened all in the same render
		setGame((currentGame) => {
			const possibleMoves = currentGame.moves();

			const randomIndex = Math.floor(Math.random() * possibleMoves.length);
			const newGame = new Chess(currentGame.fen());
      if (currentGame.isGameOver() || currentGame.isDraw() || possibleMoves.length === 0) {
        alert("Winner winner chicken dinner")
        return currentGame

      }
			newGame.move(possibleMoves[randomIndex]);

			return newGame;
		});
	}


	function onDrop(sourceSquare, targetSquare) {
		const move = makeAMove({
			from: sourceSquare,
			to: targetSquare,
			promotion: "q", // always promote to a queen for example simplicity
		});

		// illegal move
		if (move === null) return false;

		setTimeout(makeRandomMove, 200);
		return true;
	}

	return <Chessboard position={game.fen()} onPieceDrop={onDrop} />;
}
