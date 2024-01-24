// page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Chess } from "chess.js";
import Arena from "../ui/chessboard/arena";

const openings = {
	"Italian Game": ["e4", "e5", "Nf3", "Nc6", "Bc4"],
	"Sicilian Defense": ["e4", "c5"],
	// Flere åpninger kan legges til her
};

export default function Page() {
	const [game, setGame] = useState(new Chess());
	const [position, setPosition] = useState('start');
	const [selectedOpening, setSelectedOpening] = useState("");

	useEffect(() => {
		const newGame = new Chess();
		if (selectedOpening && openings[selectedOpening]) {
			openings[selectedOpening].forEach(move => {
				newGame.move(move);
			});
		}
		setGame(newGame);
		setPosition(newGame.fen());
	}, [selectedOpening]);

	const onDrop = (sourceSquare, targetSquare) => {
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q'
		});

		if (move === null) return false;

		setGame(new Chess(game.fen()));
		setPosition(game.fen());
	};

	return (
		<div className="flex flex-col h-screen">
			<main className="flex-grow">
				<div className="p-4">
					<label htmlFor="opening-select">Velg en åpning: </label>
					<select
						id="opening-select"
						value={selectedOpening}
						onChange={e => setSelectedOpening(e.target.value)}
						className="ml-2"
					>
						<option value="">--Velg--</option>
						{Object.keys(openings).map(opening => (
							<option key={opening} value={opening}>{opening}</option>
						))}
					</select>
				</div>
				<Arena position={position} onPieceDrop={onDrop} />
			</main>
		</div>
	);
}
