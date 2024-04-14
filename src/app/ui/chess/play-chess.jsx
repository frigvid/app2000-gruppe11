import {addGamedata} from "@utils/game/add-gamedata";
import {updateElo} from "@utils/game/update-elo";
import withI18next from "@ui/lang/with-i18next";
import DeleteData from "@ui/chess/delete-data";
import {useUser} from "@auth/actions/useUser";
import {useTranslation} from "react-i18next";
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
function PlayChess() {
	const {t} = useTranslation();
	
	// Fetches user data from authentication context.
	const user = useUser();

	// State variables for game, score, and status
	const [game, setGame] = useState(new Chess());
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState(t("chess.full_game.status.ongoing"));
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
			setStatus(winner + " " + t("chess.full_game.fragments.winner"));
			updateScore(winner);
			//metode(uuid);
		} else if (game.isDraw()) {
			setStatus(t("chess.full_game.status.drawn"));
		} else if (game.isCheck()) {
			const playerInCheck = game.turn() === "w" ? "White" : "Black";
			setStatus(playerInCheck + " " + t("chess.full_game.status.fragments.check"));
		} else {
			setStatus("");
		}
	}

	//checks if w or b won and updates scoreboard & user history
	const updateScore = (winner) => {
		if (winner === "Black") {
			setScore({ ...score, losses: score.losses + 1 });
			if (user) {
				void addGamedata(user.id, false);
				updateElo(user.id, false);
			}

			//adds loss to user history
		} else {
			//adds win to user history
			setScore({ ...score, wins: score.wins + 1 });
			if (user) {
				void addGamedata(user.id, true);
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
		setStatus(t("chess.full_game.status.ongoing"));
	}

	function undoTurn() {
		if (game.isGameOver())
			alert(t("chess.full_game.alert"));
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
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 text-center">
					{t("chess.full_game.panel.label")}
				</h5>
				<div>
					<p>{status}</p>
					<p>{t("chess.full_game.status.fragments.wins")}: {score.wins}</p>
					<p>{t("chess.full_game.status.fragments.losses")}: {score.losses}</p>
					<p>{t("chess.full_game.status.fragments.draws")}: {score.draws}</p>
				</div>
				<button
					className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger mt-4 hover:bg-[#976646] py-2"
					onClick={resetBoard}
				>
					{t("chess.full_game.panel.reset")}
				</button>
				<button
					className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger mt-4 hover:bg-[#976646] py-2"
					onClick={() => {
						undoTurn();
						setGame(game);
						setBoardPosition(game.fen());
					}}
				>
					{t("chess.full_game.panel.undo")}
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

export default withI18next(PlayChess);
