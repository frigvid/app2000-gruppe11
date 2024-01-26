// page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Chess } from "chess.js";
import Arena from "../ui/chessboard/arena";

const openings = {
	"Italian Game (play as black)": ["e4", "e5", "Nf3", "Nc6", "Bc4"],
	"Sicilian Defense": ["e4", "c5"],
	"French Defense": ["e4", "e6"],
	"Ruy Lopez (play as black)": ["e4", "e5", "Nf3", "Nc6", "Bb5"],
	// Legg til flere åpninger her
};

export default function Page() {
	const [game, setGame] = useState(new Chess());
	const [position, setPosition] = useState('start');
	const [selectedOpening, setSelectedOpening] = useState("");
	const [playAsBlack, setPlayAsBlack] = useState(false);
	const [gameStatus, setGameStatus] = useState("");
	const [score, setScore] = useState({ wins: 0, losses: 0 });

	useEffect(() => {
		const newGame = new Chess();
		if (selectedOpening && openings[selectedOpening] && !playAsBlack) {
			openings[selectedOpening].forEach(move => {
				newGame.move(move);
			});
		}
		setGame(newGame);
		setPosition(newGame.fen());
		setGameStatus("");

		if (playAsBlack) {
			makeRandomMove(newGame);
		}
	}, [selectedOpening, playAsBlack]);

	useEffect(() => {
		if (game.isGameOver()) {
			if (game.isCheckmate()) {
				const winner = game.turn() === 'w' ? 'Black' : 'White';
				setGameStatus(winner + " wins by checkmate");
				updateScore(winner);
			} else if (game.isDraw()) {
				setGameStatus("Game drawn");
			} else if (game.isCheck()) {
				const playerInCheck = game.turn() === 'w' ? 'White' : 'Black';
				setGameStatus(playerInCheck + " is in check");
			} else {
				setGameStatus("");
			}
		}
	}, [game, position]);

	const updateScore = (winner) => {
		if (winner === 'Black') {
			setScore(prevScore => ({ ...prevScore, losses: prevScore.losses + 1 }));
		} else {
			setScore(prevScore => ({ ...prevScore, wins: prevScore.wins + 1 }));
		}
	};

	const makeRandomMove = (chessInstance = game) => {
		let possibleMoves = chessInstance.moves();
		if (possibleMoves.length === 0) return;

		let randomIndex = Math.floor(Math.random() * possibleMoves.length);
		chessInstance.move(possibleMoves[randomIndex]);
		setPosition(chessInstance.fen());
	};

	const onDrop = (sourceSquare, targetSquare) => {
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q'
		});

		if (move === null) return 'snapback';

		setPosition(game.fen());
		setTimeout(() => makeRandomMove(), 250);
	};

	const resetGame = () => {
		setGame(new Chess());
		setPosition('start');
		setGameStatus("");
		setSelectedOpening("");
		setPlayAsBlack(false);
	};

	return (
		<div className="flex flex-col h-screen">
			<main className="flex-grow flex justify-center items-center">
				<div className="mr-4 p-3 max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-md">
					<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">Game Status</h5>
					<p className="font-normal text-gray-700">{gameStatus || "No current alerts"}</p>
					<button onClick={resetGame} className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
						Reset Game
					</button>
					<div className="mt-4">
						<label htmlFor="playAsBlack" className="mr-2">Play as Black:</label>
						<input
							type="checkbox"
							id="playAsBlack"
							checked={playAsBlack}
							onChange={() => setPlayAsBlack(!playAsBlack)}
						/>
					</div>
				</div>
				<div className="flex flex-col items-center">
					<div className="flex justify-between p-4 items-center w-full">
						<div>
							<label htmlFor="opening-select">Velg en åpning: </label>
							<select
								id="opening-select"
								value={selectedOpening}
								onChange={e => setSelectedOpening(e.target.value)}
								className="ml-2"
								disabled={playAsBlack} // Deaktiver valg av åpninger når du spiller som svart
							>
								<option value="">--Velg--</option>
								{Object.keys(openings).map(opening => (
									<option key={opening} value={opening}>{opening}</option>
								))}
							</select>
						</div>
						<div>
							<p>Wins: {score.wins} | Losses: {score.losses}</p>
						</div>
					</div>
					<Arena position={position} onPieceDrop={onDrop} />
				</div>
			</main>
		</div>
	);
}
/**
 * kilde chatgpt
 */

