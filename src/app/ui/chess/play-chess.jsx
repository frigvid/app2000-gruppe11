import {addGamedata} from "@utils/game/add-gamedata";
import {useUser} from "@/app/(auth)/actions/useUser";
import {updateElo} from "@utils/game/update-elo";
import DeleteData from "@ui/chess/delete-data";
import {Chessboard} from "react-chessboard";
import {useState} from "react";
import {Chess} from "chess.js";

/**
 * Component for playing chess.
 *
 * @author qwertyfyr, jarle0, KarstenKebba, oldpopcorn
 * @contributor frigvid
 * @created 2024-01-30
 */
export default function PlayChess() {
	// Fetches user data from authentication context
	const user = useUser();

	// State variables for game, score, and status
	const [game, setGame] = useState(new Chess());
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState("Game ongoing");
	const [turn, setTurn] = useState(0);
	const [fenList, setFenList] = useState();

	/**
	 * Makes a move in the game.
	 * 
	 * @param {Object} move The move object containing source, target, and promotion.
	 * @returns {boolean|null} True if move is valid, null if move is invalid.
	 */
	function makeAMove(move) {
		try {
			game.move(move);
			setTurn(turn + 1);
			console.log("Turn:", turn);
		} catch (e) {
			console.log(e);
			return null;
		}
		setGame(game);
		setBoardPosition(game.fen());
		return true; // null if the move was illegal, the move object if the move was legal
	}

	//function where "Bot" does a random legal move after player has played a move.
	//code is an altered version from the react-chessboard example that works with current version of chess.js
	function makeRandomMove() {
		// we need to update the state after the previous move has happened all in the same render

		const possibleMoves = game.moves();

		const randomIndex = Math.floor(Math.random() * possibleMoves.length);
		if (game.isGameOver() || game.isDraw() || possibleMoves.length === 0) {
			checkEnding();
			return;
		}
		game.move(possibleMoves[randomIndex]);
		setGame(game);
		setBoardPosition(game.fen());
	}

	// Logic for checking how the game ended.
	function checkEnding() {
		if (game.isCheckmate()) {
			const winner = game.turn() === "w" ? "Black" : "White";
			setStatus(winner + " wins by checkmate");
			updateScore(winner);
			//metode(uuid);
		} else if (game.isDraw()) {
			setStatus("Game drawn");
		} else if (game.isCheck()) {
			const playerInCheck = game.turn() === "w" ? "White" : "Black";
			setStatus(playerInCheck + " is in check");
		} else {
			setStatus("");
		}
	}

	//checks if w or b won and updates scoreboard & user history
	const updateScore = (winner) => {
		if (winner === "Black") {
			setScore({ ...score, losses: score.losses + 1 });
			if (user) {
				addGamedata(user.id, false).then((r) =>
					console.log("Added data to database.")
				);
				updateElo(user.id, false);
			}

			//adds loss to user history
		} else {
			//adds win to user history
			setScore({ ...score, wins: score.wins + 1 });
			if (user) {
				addGamedata(user.id, true).then((r) =>
					console.log("Added data to database.")
				);
				updateElo(user.id, true);
			}
		}
	};

	/**
	 * Handles the drop of a chess piece on the board.
	 * 
	 * @param {string} sourceSquare The source square of the piece.
	 * @param {string} targetSquare The target square for the piece.
	 * @param {string[]} piece The piece being moved.
	 * @returns {boolean} True if the move is valid, false otherwise.
	 */
	function onDrop(sourceSquare, targetSquare, piece) {
		const move = makeAMove({
			from: sourceSquare,
			to: targetSquare,
			promotion: piece[1]?.toLowerCase() ?? "q",
		});

		// illegal move
		if (move === null) {
			return false;
		};
		
		setTimeout(makeRandomMove, 500);
		
		return true;
	}

	/**
	 * Resets the game board to its initial state.
	 */
	function resetBoard() {
		game.reset();
		setBoardPosition(game.fen());
		setStatus("Game ongoing");
	}

	function undoTurn() {
		if (game.isGameOver())
			alert("Can't undo. game has already been completed.");
		else {
			game.undo();
			game.undo();
			// TODO: check if its blacks turn after undo, so you don't swap sides.
			// if(game.turn === "b") makeRandomMove(); // Here it'll undo and play new move simultaneously.
			// Quick fix: Just activates undo() function twice to make sure you're still playing as white.
		}
	}

	return (
		<div className="flex flex-col md:flex-row justify-center items-center relative">
			<div className="md:mr-8 md:order-1 order-2 p-3 px-8 md:max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-md md:mb-0 mb-4 flex flex-col">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
					Game Status
				</h5>
				<div>
					<p>{status}</p>
					<p>Wins: {score.wins}</p>
					<p>Losses: {score.losses}</p>
				</div>
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={resetBoard}
				>
					Reset board
				</button>
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						undoTurn();
						setGame(game);
						setBoardPosition(game.fen());
					}}
				>
					Undo move
				</button>
				{
					// Only show this button if you're logged in.
					user ? <DeleteData/> : null
				}
			</div>
			<div className="w-full md:w-96 md:order-2 order-1 mt-4 md:mt-0 mb-4 md:mb-0 relative">
				<Chessboard position={boardPosition} onPieceDrop={onDrop}/>
			</div>
		</div>
	);
}





















