import TrainPanel from "@/app/(game)/chess/train/[id]/components/train-panel";
import {useTranslation} from "react-i18next";
import {Chessboard} from "react-chessboard";
import {useEffect, useState} from "react";
import {Chess} from "chess.js";

/**
 * This component is used for training chess.
 *
 * It takes an opening and restricts the allowed moves to only those in the opening.
 *
 * @author qwertyfyr
 * @contributor frigvid, jarl0
 * @created 2024-04-12
 * @param pgn The PGN of the game
 * @param repo The repertoire of openings
 * @param opening parameter that gets an opening and is used to restrict allowed moves
 * @param setOpening function to set the opening
 * @returns A chessboard with the opening moves and a panel for feedback
 */
export default function TrainChess({
	pgn,
	repo,
	opening,
	setOpening
}) {
	const {t} = useTranslation();
	const [game, setGame] = useState(new Chess());
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState(t("chess.train_chess.status.start"));
	const [highlightedSquares, setHighlightedSquares] = useState({});
	const [playerTurn, setPlayerTurn] = useState(0);
	const [botTurn, setBotTurn] = useState(1);
	const [wrongCounter, setWrongCounter] = useState(0);
	
	/**
	 * This function checks if the game is over and sets the status accordingly.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-04-12
	 * @param move The move that was made
	 * @return {boolean|null} Returns true if the game is over, and null if an error occurred
	 */
	function makeAMove(move) {
		try {
			if (playerTurn < pgn.length) {
				if (
					move.from === pgn[playerTurn].from &&
					move.to === pgn[playerTurn].to &&
					move.piece === pgn[playerTurn].piece
				) {
					game.move(move);
					setPlayerTurn(playerTurn + 2);
				} else {
					setStatus(t("chess.train_chess.status.wrong"));
					setWrongCounter(wrongCounter + 1);
				}
			} else if (pgn[pgn.length - 1].from === move.from && pgn[pgn.length - 1].to === move.to) {
				setStatus(t("chess.train_chess.status.complete"));
			}
		} catch (error) {
			console.error("Something went wrong while trying to make a move!", error);
			return null;
		}
		
		setGame(game);
		setBoardPosition(game.fen());
		
		return true;
	}
	
	/**
	 * Executes the next move in the game, updating game state and board position accordingly.
	 *
	 * If the game is over, or a draw, checks the ending and stops further moves.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-04-12
	 * @return {boolean|null} Returns true if the game is over, and null if an error occurred
	 */
	function followingMove(move) {
		try {
			/**
			 * @note from @frigvid, I don't see any implementation of checkEnding()
			 * 		in the pull request. I'm assuming it's something that will be
			 * 		checked for in the future.
			 */
			if (game.isGameOver() || game.isDraw()) {
				console.log("Game over");
				//checkEnding();
				//return;
			}
			
			if (botTurn < pgn.length) {
				game.move(pgn[botTurn]);
				setGame(game);
				setBoardPosition(game.fen());
				setBotTurn(botTurn + 2);

				setStatus(t("chess.train_chess.status.white_move"));
			} else if (pgn[pgn.length - 1].from === move.from && pgn[pgn.length - 1].to === move.to) {
				setStatus(t("chess.train_chess.status.complete"));
			}
		} catch (error) {
			console.error("Something went wrong when trying to follow through with the next move!", error);
			return null;
		}

		setGame(game);
		setBoardPosition(game.fen());
		
		return true;
	}

	/**
	 * Resets the Chess game and board position when the pgn parameter is changed
	 */
	useEffect(() => {
		const newGame = new Chess();
		setGame(newGame);
		setBoardPosition(newGame.fen());
		setPlayerTurn(0);
		setBotTurn(1);
	}, [pgn])


	/**
	 * Handles the event when a piece is dropped onto a square.
	 *
	 * If the move is illegal, returns false.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-04-12
	 * @param {*} sourceSquare The square the piece was moved from.
	 * @param {*} targetSquare The square the piece was moved to.
	 * @param {*} piece The piece that was moved.
	 * @returns {boolean} Returns true if the move was legal, and false if it was illegal
	 */
	function onDrop(sourceSquare, targetSquare, piece) {
		const move = makeAMove({
			from: sourceSquare,
			to: targetSquare,
			piece: piece[1].toLowerCase(),
		});

		/* Illegal move. */
		if (move === null) {
			return false;
		}
		
		setTimeout(followingMove({
			from: sourceSquare,
			to: targetSquare,
			piece: piece[1].toLowerCase(),
		}), 500);
		
		return true;
	}
	
	/**
	 * Highlights the squares that the piece can move to.
	 *
	 * @author frigvid
	 * @contributor qwertyfyr
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

	return (
		<div className="flex flex-col md:flex-row justify-center items-center relative">
			<div className="md:mr-8 md:order-1 order-2 p-3 px-8 rounded-lg md:mb-0 mb-4 flex flex-col">
				<TrainPanel status={status} setStatus={setStatus} moveCounter={wrongCounter} pgn={pgn} repo={repo} opening={opening} setOpening={setOpening}/>
			</div>
			<div className="w-[23rem] h-[23rem] lg:w-96 lg:h-96 md:order-2 order-1 mt-4 md:mt-0 mb-4 md:mb-0 relative">
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
