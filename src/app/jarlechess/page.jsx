"use client"
import React from 'react';
import Chessboard from '../ui/jarlechessboard/chessboard'; // Update the path based on your project structure

const Page = () => {
	const handleMove = (move) => {
		console.log('Player moved:', move);
	};

	const handleGameEnd = () => {
		console.log('Game over!');
	};

	const handleRestartGame = () => {
		console.log('Restarting game!');
	};

	return (
		<div>
			<h1>Chess Game</h1>
			<Chessboard
				onMove={handleMove}
				onGameEnd={handleGameEnd}
				onRestartGame={handleRestartGame}
			/>
		</div>
	);
};

export default Page;



