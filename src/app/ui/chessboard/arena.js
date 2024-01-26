// Import necessary dependencies from the React library
'use client'
// Import necessary dependencies from the React library
import React, { useState } from 'react';
// Import the Chessboard component
import Chessboard from 'arena'; // Adjust the path based on your project structure


// Define the Arena component
const Arena = () => {
	// State variables to manage move history and game result
	const [moveHistory, setMoveHistory] = useState([]);
	const [gameResult, setGameResult] = useState(null);

	// Function to handle a chess move
	const handleMove = (move) => {
		// Update move history with the new move
		setMoveHistory((prevHistory) => [...prevHistory, move]);
	};

	// Function to handle the end of a chess game
	const handleGameEnd = (result) => {
		// Set the game result (e.g., 'Checkmate', 'Stalemate', etc.)
		setGameResult(result);
	};

	// Function to handle restarting the chess game
	const handleRestartGame = () => {
		// Clear move history and reset game result
		setMoveHistory([]);
		setGameResult(null);
	};

	// Render the Arena component
	return (
		<div>
			{/* Render the Chessboard component, passing event handlers */}
			<Chessboard onMove={handleMove} onGameEnd={handleGameEnd} onRestartGame={handleRestartGame} />
			<div>
				{/* Display move history as an ordered list */}
				<h2>Move History:</h2>
				<ul>
					{moveHistory.map((move, index) => (
						<li key={index}>{`${index + 1}. ${move.from}-${move.to}`}</li>
					))}
				</ul>

				{/* Display the game result if available */}
				{gameResult && <p>{gameResult}</p>}
			</div>
		</div>
	);
};

// Export the Arena component as the default export
export default Arena;


