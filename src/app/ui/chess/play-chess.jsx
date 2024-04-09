import { addGamedata } from "@utils/game/add-gamedata";
import { useUser } from "@/app/(auth)/actions/useUser";
import { Chessboard } from "react-chessboard";
import { useState, useEffect } from "react";
import { Chess } from "chess.js";

/**
 * @author qwertyfyr, jarle0, KarstenKebba, oldpopcorn, frigvid
 */
export default function PlayChess() {
	const user = useUser();
	const [game, setGame] = useState(new Chess());
	const [score, setScore] = useState({ wins: 0, losses: 0 });
	const [boardPosition, setBoardPosition] = useState(game.fen());
	const [mode, setMode] = useState(""); //Decides whether it's a mode for practice or playing a full game

	const [status, setStatus] = useState("Game ongoing");
	const [turn, setTurn] = useState(0);

	const opening = [{from: "e2", to: "e4", promotion: "p"}, {from: "e7" ,to:"e5", promotion: "p"}, {} ];



	// 1. Check if move is in opening. 2.make opponent use its assigned move from the opening array.


	//code is an altered version from react-chessboard example with added error handling
	function makeAMove(move) {
		try {
			//if (move == opening[turn]) {
				game.move(move);
				const checkOpening = Object.keys(opening[turn]).every((key) => {
					return move[key] === opening[turn][key]
					}
				  )
			//} else 
			console.log(checkOpening);
			//console.log(opening[turn].from == move.from && opening[turn].to == move.to && opening[turn].piece == move.promotion); // :( .all returns undefined
			setTurn(turn + 1);
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
			}

			//adds loss to user history
		} else {
			//adds win to user history
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
			promotion: piece[1].toLowerCase() ?? "q",
		});

		// illegal move
		if (move === null) return false;
		setTimeout(makeRandomMove, 500);
		return true;
	}

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
			//Todo: check if its blacks turn after undo, so u dont swap sides
			//if(game.turn === "b") makeRandomMove(); // here it'll undo and play new move simultanously
		}
	}

	return (
		//Container
		<div className="flex justify-center items-center">
			<div className="flex flex-col mr-8 p-3 px-8 max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-md">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
					Game Status
				</h5>
				<p>{status}</p>
				<p>Wins: {score.wins}</p>
				<p>Losses: {score.losses}</p>
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						resetBoard();
					}}
				>
					Reset
				</button>
				<button
					className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
					onClick={() => {
						undoTurn();
						setGame(game);
						setBoardPosition(game.fen());
					}}
				>
					Undo
				</button>
				{
					// Only show this button if you're logged in.
					user ? <DeleteData /> : null
				}
			</div>
			<div className="w-96 h-96">
				<Chessboard position={boardPosition} onPieceDrop={onDrop} />
			</div>
		</div>
	);
}
