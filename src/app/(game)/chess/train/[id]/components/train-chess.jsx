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
 * @contributor frigvid
 * @created 2024-04-12
 * @param opening parameter that gets an opening and is used to restrict allowed moves 
 * @returns A chessboard with the opening moves and a panel for feedback
 */
export default function TrainChess({pgn, repo, opening, setOpening}) {
	const {t} = useTranslation();
	const [game, setGame] = useState(new Chess());
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [status, setStatus] = useState(t("chess.train_chess.status.start"));
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
			//console.log(pgn[playerTurn]);
			//console.log(move);
			
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
					
					//console.log("pgn: ", pgn[playerTurn]);
					//console.log("move: ", move);
					
					setWrongCounter(wrongCounter + 1);
				}
			} else {
				setStatus(t("chess.train_chess.status.complete"));
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
	 * Executes the next move in the game, updating game state and board position accordingly.
	 *
	 * If the game is over, or a draw, checks the ending and stops further moves.
	 *
	 * @author qwertyfyr
	 * @contributor frigvid
	 * @created 2024-04-12
	 * @return {boolean|null} Returns true if the game is over, and null if an error occurred
	 */
	function followingMove() {
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
				
				//console.log(botTurn);

				setStatus(t("chess.train_chess.status.white_move"));
			} else {
				setStatus(t("chess.train_chess.status.complete"));
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
	 * Resets the Chess game and board position when the pgn parameter is changed
	 */
	useEffect(() => {
		const newGame = new Chess();
		setGame(newGame);
		setBoardPosition(newGame.fen());
		setPlayerTurn(0);
		setBotTurn(1);
		console.log("rerender");
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

		/* illegal move. */
		if (move === null) {
			return false;
		}
		
		setTimeout(followingMove, 500);
		
		return true;
	}

	return (
		<div className="flex justify-center items-center space-x-5">
			<TrainPanel status={status} moveCounter={wrongCounter} pgn={pgn} repo={repo} opening={opening} setOpening={setOpening}/>
			<div className="w-96 h-96">
				<Chessboard position={boardPosition} onPieceDrop={onDrop}/>
			</div>
		</div>
	);
}
