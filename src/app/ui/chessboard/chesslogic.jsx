// Chessboard.jsx
import { useState, useRef, useEffect } from 'react';
import Chessboard from 'chessboardjsx';
import Stockfish from 'stockfish';
import Chess from 'chess.js';

const Chessboard = () => {
	const [fen, setFen] = useState('start');
	const [result, setResult] = useState(null);
	const [isGameOver, setIsGameOver] = useState(false);
	const chessRef = useRef(new Chess());
	const stockfishRef = useRef(null);

	useEffect(() => {
		stockfishRef.current = new Worker(Stockfish);

		return () => {
			stockfishRef.current.terminate();
		};
	}, []);

	const handleMove = (move) => {
		if (isGameOver) {
			alert('The game is over. Start a new game.');
			return;
		}

		if (chessRef.current.move(move)) {
			setFen(chessRef.current.fen());
			if (isGameFinished()) {
				handleGameEnd();
			} else {
				makeComputerMove();
			}
		}
	};

	const makeComputerMove = () => {
		stockfishRef.current.onmessage = (event) => {
			const [bestMove] = event.data.split(' ');
			chessRef.current.move(bestMove);
			setFen(chessRef.current.fen());

			if (isGameFinished()) {
				handleGameEnd();
			}
		};

		stockfishRef.current.postMessage(`position fen ${fen}`);
		stockfishRef.current.postMessage('go depth 1');
	};

	const isGameFinished = () =>
		chessRef.current.in_draw() || chessRef.current.in_checkmate();

	const handleGameEnd = () => {
		setIsGameOver(true);
		if (chessRef.current.in_draw()) {
			setResult('Tie! The game ended in a draw.');
		} else if (chessRef.current.in_checkmate()) {
			setResult(`You won! The party is over.`);
		}
	};

	const restartGame = () => {
		chessRef.current.reset();
		setFen(chessRef.current.fen());
		setIsGameOver(false);
		setResult(null);
		makeComputerMove();
	};

	return (
		<div>
			<Chessboard
				position={fen}
				onDrop={(move) => handleMove({ from: move.sourceSquare, to: move.targetSquare, promotion: 'q' })}
				orientation="white"
			/>
			<div style={{ marginTop: '20px' }}>
				{result && <p>{result}</p>}
				<button onClick={restartGame}>Start nytt spill</button>
			</div>
		</div>
	);
};

export default Chessboard;
