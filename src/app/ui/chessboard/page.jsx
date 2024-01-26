import React from 'react';
import Chessboard from './Chessboard'; // Replace './Chessboard' with the correct path to your Chessboard component

const Page = () => {
	const handleMove = (move) => {
		// Handle player moves
		console.log('Player moved:', move);
	};

	const handleGameEnd = () => {
		// Handle game end
		console.log('Game over!');
	};

	const handleRestartGame = () => {
		// Handle game restart
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
