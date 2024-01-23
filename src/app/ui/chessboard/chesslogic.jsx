import { useState, useRef, useEffect } from 'react';
import Chess from 'chess.js'; // Import the Chess class
import Chessboard from 'chessboardjsx';
import Stockfish from 'stockfish';

const ChessGame = () => {
	// State to manage the current FEN (Forsyth-Edwards Notation) position
	const [fen, setFen] = useState('start');
	// State to store the result of the game (win, draw, etc.)
	const [result, setResult] = useState(null);
	// State to track whether the game is over
	const [isGameOver, setIsGameOver] = useState(false);
	// Reference to the Chess.js instance
	const chessRef = useRef(new Chess());
	// Reference to the Stockfish worker
	const stockfishRef = useRef(null);

	useEffect(() => {
		// Initialize Stockfish worker when the component mounts
		stockfishRef.current = new Worker(Stockfish);
		// Make the computer's move after the initialization
		makeComputerMove();

		// Cleanup function to terminate the Stockfish worker when the component unmounts
		return () => {
			stockfishRef.current.terminate();
		};
	}, []);

	// Function to handle player moves
	const handleMove = (move) => {
		// Check if the game is already over
		if (isGameOver) {
			alert('The game is over. Start a new game.');
			return;
		}

		// Attempt to make the player's move using Chess.js
		if (chessRef.current.move(move)) {
			// Update the FEN position after the move
			setFen(chessRef.current.fen());
			// Check if the game is finished after the player's move
			if (isGameFinished()) {
				handleGameEnd();
			} else {
				// If the game is not finished, make the computer's move
				makeComputerMove();
			}
		}
	};

	// Function to make the computer's move using Stockfish
	const makeComputerMove = () => {
		// Define the callback for the Stockfish worker's messages
		stockfishRef.current.onmessage = (event) => {
			// Extract the best move from Stockfish's response
			const [bestMove] = event.data.split(' ');
			// Make the computer's move using Chess.js
			chessRef.current.move(bestMove);
			// Update the FEN position after the computer's move
			setFen(chessRef.current.fen());

			// Check if the game is finished after the computer's move
			if (isGameFinished()) {
				handleGameEnd();
			}
		};

		// Send the current FEN position to Stockfish
		stockfishRef.current.postMessage(`position fen ${fen}`);
		// Instruct Stockfish to calculate the best move with a depth of 1
		stockfishRef.current.postMessage('go depth 1');
	};

	// Function to check if the game is finished
	const isGameFinished = () =>
		chessRef.current.in_draw() || chessRef.current.in_checkmate();

	// Function to handle the end of the game
	const handleGameEnd = () => {
		// Set the game over flag to true
		setIsGameOver(true);
		// Determine the result of the game and update the result state
		if (chessRef.current.in_draw()) {
			setResult('Tie! The game ended in a draw.');
		} else if (chessRef.current.in_checkmate()) {
			setResult(`You won! The game is over.`);
		}
	};

	// Function to restart the game
	const restartGame = () => {
		// Reset the Chess.js instance
		chessRef.current.reset();
		// Set the initial FEN position
		setFen(chessRef.current.fen());
		// Reset game-related states
		setIsGameOver(false);
		setResult(null);
		// Make the computer's move to start the game
		makeComputerMove();
	};

	return (
		<div>
			{/* Render the chessboard component */}
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
				{/* Display the game result if available */}
				{result && <p>{result}</p>}
				{/* Button to restart the game */}
				<button onClick={restartGame}>Start a new game</button>
			</div>
		</div>
	);
};

export default ChessGame;

