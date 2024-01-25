// Import necessary dependencies
import React, { useState, useRef, useEffect } from 'react';
import Chessboard from 'chessboard.jsx'; // Adjust the path accordingly
import Chess from 'chess.js'; // Import the Chess class
import Stockfish from 'stockfish.js';

// ChessGame Component represents a chess game with a computer opponent
const ChessGame = ({ onMove, onGameEnd, onRestartGame }) => {
	// State variables to manage the game state
	const [fen, setFen] = useState('start'); // FEN notation representing the current game state
	const [result, setResult] = useState(null); // Result of the game (win, lose, draw)
	const [isGameOver, setIsGameOver] = useState(false); // Flag indicating if the game is over
	const [gameMessage, setGameMessage] = useState(''); // Message to display on the UI
	const chessRef = useRef(new Chess()); // Reference to the Chess.js instance to manage the game logic
	const stockfishRef = useRef(null); // Reference to the Stockfish engine for computer moves

	// useEffect hook to initialize the Stockfish engine and make the first computer move
	useEffect(() => {
		stockfishRef.current = new Worker(Stockfish);
		makeComputerMove();

		// Cleanup function to terminate the Stockfish engine when the component unmounts
		return () => {
			stockfishRef.current.terminate();
		};
	}, []);

	// Function to handle player moves
	const handleMove = (move) => {
		// Check if the game is over
		if (isGameOver) {
			setGameMessage('The game is over. Start a new game.'); // Display a message on the UI
			return;
		}

		// Attempt to make the player's move
		if (chessRef.current.move(move)) {
			setFen(chessRef.current.fen()); // Update the FEN notation after the move

			// Check if the game is finished after the player's move
			if (isGameFinished()) {
				handleGameEnd();
			} else {
				makeComputerMove(); // Make the computer's move after the player's move
			}

			onMove(move); // Notify the parent component (Arena) of the player's move
		}
	};

	// Function to make the computer's move using the Stockfish engine
	const makeComputerMove = () => {
		// Set up the onmessage handler to receive the best move from Stockfish
		stockfishRef.current.onmessage = (event) => {
			const [bestMove] = event.data.split(' ');
			chessRef.current.move(bestMove); // Make the computer's move
			setFen(chessRef.current.fen()); // Update the FEN notation after the computer's move

			// Check if the game is finished after the computer's move
			if (isGameFinished()) {
				handleGameEnd();
			}
		};

		// Send commands to Stockfish to set up the position and make a move
		stockfishRef.current.postMessage(`position fen ${fen}`);
		stockfishRef.current.postMessage('go depth 1');
	};

	// Function to check if the game is finished (either in a draw or checkmate)
	const isGameFinished = () => chessRef.current.in_draw() || chessRef.current.in_checkmate();

	// Function to handle the end of the game, update the result, and notify the parent component
	const handleGameEnd = () => {
		setIsGameOver(true);

		// Update the result based on the game outcome
		if (chessRef.current.in_draw()) {
			setResult('Tie! The game ended in a draw.');
		} else if (chessRef.current.in_checkmate()) {
			setResult(`You won! The game is over.`);
		}

		onGameEnd(result); // Notify the parent component (Arena) of the game end
	};

	// Function to restart the game by resetting the Chess.js instance and initiating a new game
	const restartGame = () => {
		chessRef.current.reset();
		setFen(chessRef.current.fen());
		setIsGameOver(false);
		setResult(null);
		makeComputerMove(); // Make the computer's move to start the new game
		onRestartGame(); // Notify the parent component (Arena) to restart the game
	};

	// Render the Chessboard and game result UI
	return (
		<div>
			<Chessboard
				position={fen}
				onDrop={(move) =>
					handleMove({
						from: move.sourceSquare,
						to: move.targetSquare,
						promotion: 'q',
					})
				}
				orientation="white"
			/>
			<div style={{ marginTop: '20px' }}>
				{gameMessage && <p>{gameMessage}</p>}
				{result && <p>{result}</p>}
				<button onClick={restartGame}>Start a new game</button>
			</div>
		</div>
	);
};

// Export the ChessGame component as the default export
export default ChessGame;

