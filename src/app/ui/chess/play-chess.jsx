import { addGamedata } from "@utils/game/add-gamedata";
import { useUser } from "@/app/(auth)/actions/useUser";
import DeleteData from "@ui/chess/delete-data";
import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";

export default function PlayChess() {
	const user = useUser();
	const [game, setGame] = useState(new Chess());
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [status, setStatus] = useState("Game ongoing");
	const [isGameStatusOpen, setGameStatusOpen] = useState(false);

	function makeAMove(move) {
		const gameCopy = new Chess(game.fen());
		try {
			gameCopy.move(move);
		} catch (e) {
			return null;
		}
		setGame(gameCopy);
		return true;
	}

	function makeRandomMove() {
		setGame((currentGame) => {
			const possibleMoves = currentGame.moves();
			const randomIndex = Math.floor(Math.random() * possibleMoves.length);
			const newGame = new Chess(currentGame.fen());
			if (
				currentGame.isGameOver() ||
				currentGame.isDraw() ||
				possibleMoves.length === 0
			) {
				return currentGame;
			}
			newGame.move(possibleMoves[randomIndex]);
			return newGame;
		});
	}

	useEffect(() => {
		if (game.isGameOver()) {
			if (game.isCheckmate()) {
				const winner = game.turn() === "w" ? "Black" : "White";
				setStatus(winner + " wins by checkmate");
				updateScore(winner);
			} else if (game.isDraw()) {
				setStatus("Game drawn");
			} else if (game.isCheck()) {
				const playerInCheck = game.turn() === "w" ? "White" : "Black";
				setStatus(playerInCheck + " is in check");
			} else {
				setStatus("");
			}
		}
	}, [game]);

	const updateScore = (winner) => {
		if (winner === "Black") {
			setScore({ ...score, losses: score.losses + 1 });
			if (user) {
				addGamedata(user.id, false).then((r) =>
					console.log("Added data to database.")
				);
			}
		} else {
			setScore({ ...score, wins: score.wins + 1 });
			if (user) {
				addGamedata(user.id, true).then((r) =>
					console.log("Added data to database.")
				);
			}
		}
	};

	function onDrop(sourceSquare, targetSquare, piece) {
		const move = makeAMove({
			from: sourceSquare,
			to: targetSquare,
			promotion: piece[1]?.toLowerCase() ?? "q",
		});

		if (move === null) return false;

		setTimeout(makeRandomMove, 200);
		return true;
	}

	function resetBoard() {
		setGame(new Chess());
		setStatus("Game ongoing");
	}

	return (
		<div className="flex flex-col md:flex-row justify-center items-center relative">
			<div className="md:mr-8 md:order-1 order-2 p-3 px-8 md:max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-md md:mb-0 mb-4">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
					Game Status
				</h5>
				{isGameStatusOpen && (
					<div>
						<p>{status}</p>
						<p>Wins: {score.wins}</p>
						<p>Losses: {score.losses}</p>
						<button
							className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
							onClick={resetBoard}
						>
							Reset
						</button>
						{user && <DeleteData />}
					</div>
				)}
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => setGameStatusOpen(!isGameStatusOpen)}
				>
					{isGameStatusOpen ? "Hide Game Status" : "Show Game Status"}
				</button>
			</div>
			<div className="w-full md:w-96 md:order-2 order-1 mt-4 md:mt-0 mb-4 md:mb-0 relative">
				<Chessboard position={game.fen()} onPieceDrop={onDrop} />
			</div>
		</div>
	);
}



















