// page.jsx
'use client';
import React, { useState, useEffect } from 'react';
import { Chess } from "chess.js";
import Arena from "../ui/karstenchessboard/arena";

export default function Page() {
	const [game, setGame] = useState(new Chess());
	const [position, setPosition] = useState('start');

	useEffect(() => {
		setPosition(game.fen());
	}, [game]);

	const onDrop = (sourceSquare, targetSquare) => {
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q'
		});

		if (move === null) return false;

		setGame(new Chess(game.fen()));
		setTimeout(() => makeRandomMove(), 250);
	};

	const makeRandomMove = () => {
		const possibleMoves = game.moves();
		if (possibleMoves.length === 0) return;

		const randomIdx = Math.floor(Math.random() * possibleMoves.length);
		game.move(possibleMoves[randomIdx]);
		setGame(new Chess(game.fen()));
	};

	return (
		<Arena position={position} onPieceDrop={onDrop} />
	);
}

