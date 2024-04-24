import ProtectClientContent from "@auth/components/protect-client-content";
import removeGamedata from "@/app/(game)/chess/utils/remove-gamedata";
import {addGamedata} from "@/app/(game)/chess/utils/add-gamedata";
import withI18next from "@shared/components/lang/with-i18next";
import {updateElo} from "@/app/(game)/chess/utils/update-elo";
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
	
	/* Fetches user data from authentication context. */
	const user = useUser();

	/* State variables for game, score, and status. */
	const [game, setGame] = useState(new Chess());
	const [score, setScore] = useState({wins: 0, losses: 0});
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState(t("chess.full_game.status.ongoing"));
	const [highlightedSquares, setHighlightedSquares] = useState({});
	const [turn, setTurn] = useState(0);
	const [fenList, setFenList] = useState();

	/**
	 * Makes a move in the game.
	 *
	 * @author qwertyfyr
	 * @contributor jarle0
	 * @created 2024-04-12
	 * @param {Object} move The move object containing source, target, and promotion.
	 * @returns {boolean|null} True if move is valid, null if move is invalid.
	 */
	function makeAMove(move) {
		try {
			game.move(move);
			setTurn(turn + 1);
		} catch (error) {
			console.error("Something went wrong while making a move!", error);
			return null;
		}
		
		setGame(game);
		setBoardPosition(game.fen());
		
		/* Null if the move was illegal, the move object if the move was legal. */
		return true;
	}

	/**
	 * Function where "Bot" does a random legal move after
	 * player has played a move.
	 *
	 * The code is an altered version from the react-chessboard
	 * example that works with current version of chess.js
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-01-30
	 */
	function makeRandomMove() {
		/* we need to update the state after the previous move has happened all in the same render. */
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

	/**
	 * Checks if the game has ended and updates the status.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-01-30
	 */
	function checkEnding() {
		if (game.isCheckmate()) {
			const winner = game.turn() === "w" ? "Black" : "White";
			setStatus(winner + " " + t("chess.full_game.status.fragments.winner"));
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

	/**
	 * Updates the score based on the winner of the game.
	 *
	 * Essentially checks if `w` or `b` won.
	 *
	 * @author qwertyfyr
	 * @created 2024-01-30
	 * @param winner
	 */
	const updateScore = (winner) => {
		if (winner === "Black") {
			setScore({ ...score, losses: score.losses + 1 });
			if (user) {
				void addGamedata(user.id, false);
				updateElo(user.id, false);
			}

			/* Adds loss to user history. */
		} else {
			/* Adds win to user history. */
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
	 * @author qwertyfyr
	 * @contributor jarle0
	 * @created 2024-01-30
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

		/* Illegal move. */
		if (move === null) {
			return false;
		}
		
		setTimeout(makeRandomMove, 500);
		
		return true;
	}
	
	/**
	 * Highlights the squares that the piece can move to.
	 *
	 * @author frigvid, qwertyfyr
	 * @created 2024-04-24
	 * @param {string} piece The piece being dragged.
	 * @param {string} sourceSquare The square of the piece.
	 * @see The code for the "Click To Move" example [on react-chessboard's documentation]{@link https://react-chessboard.vercel.app/?path=/docs/example-chessboard--configurable-board}
	 * 	  for inspiration on how to implement piece highlighting.
	 */
	function onPieceDragBegin(piece, sourceSquare) {
		/* Calculate the possible moves for this piece. */
		const moves = game.moves({
			square: sourceSquare,
			verbose: true
		});
		
		/* Highlight the squares for the possible moves. */
		const newSquares = {};
		moves.forEach((move) => {
			newSquares[move.to] = {
				background: "radial-gradient(circle, rgba(0,0,0,.1) 65%, transparent 65%)",
				borderRadius: "50%",
			};
		});
		
		setHighlightedSquares(newSquares);
	}
	
	/**
	 * Clears the highlighted squares when the piece drag ends.
	 *
	 * @author frigvid
	 * @created 2024-04-24
	 * @param {string} piece The piece that was dragged.
	 * @param {string} sourceSquare The square of the piece.
	 */
	function onPieceDragEnd(piece, sourceSquare) {
		setHighlightedSquares({});
	}

	/**
	 * Resets the game board to its initial state.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-01-30
	 */
	function resetBoard() {
		game.reset();
		setBoardPosition(game.fen());
		setStatus(t("chess.full_game.status.ongoing"));
	}
	
	/**
	 * Undoes the last move made.
	 *
	 * If the game is over, an alert is shown.
	 *
	 * @author qwertyfyr
	 * @created 2024-04-06
	 */
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
					/**
					 * Only show this button if you're logged in.
					 *
					 * Switched the old method out for using ProtectClientContent instead.
					 * However, this is still scheduled for removal/refactor. Due to the
					 * changes coming.
					 *
					 * NOTE: Current implementation will become obsolete soon, when game
					 * 		data is calculated relative to their total game history
					 * 		instead.
					 *
					 * @author frigvid
					 * @created 2024-04-18
					 * @note Originally created 2024-02-05
					 */
				}
				<ProtectClientContent showError={false} noBuffer={true}>
					<button
						className="bg-buttoncolor w-full inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger mt-4 hover:bg-[#976646] py-2"
						onClick={async () => {
							void removeGamedata(user.id);
						}}
					>
						{t("chess.generics.delete_data")}
					</button>
				</ProtectClientContent>
			</div>
			<div className="w-full md:w-96 md:order-2 order-1 mt-4 md:mt-0 mb-4 md:mb-0 relative">
				<Chessboard
					position={boardPosition}
					onPieceDrop={onDrop}
					onPieceDragBegin={onPieceDragBegin}
					onPieceDragEnd={onPieceDragEnd}
					customSquareStyles={highlightedSquares}
				/>
			</div>
		</div>
	);
}

/**
 * Export with extra i18next support,
 * to avoid hydration erros.
 *
 * @author frigvid
 * @created 2024-04-13
 */
export default withI18next(PlayChess);
