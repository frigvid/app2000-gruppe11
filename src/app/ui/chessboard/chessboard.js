import React, { useState, useEffect } from 'react';
import Chess from 'chess.js';
import stockfish from 'stockfish';

const Chessboard = ({ onMove, onGameEnd, onRestartGame }) => {
	const [board, setBoard] = useState(new Chess());

	useEffect(() => {
		const initChessboard = () => {
			const newBoard = new Chess();
			setBoard(newBoard);
		};

		initChessboard();
	}, []);

	const renderChessboard = () => {
		const squares = [];

		for (let row = 0; row < 8; row++) {
			for (let col = 0; col < 8; col++) {
				const squareColor = (row + col) % 2 === 0 ? 'brown' : 'tan';
				const piece = board.get(row * 8 + col);

				squares.push(
					<div
						key={`${row}-${col}`}
						style={{
							width: '50px',
							height: '50px',
							backgroundColor: squareColor,
							display: 'flex',
							justifyContent: 'center',
							alignItems: 'center',
							border: '1px solid #333',
							position: 'relative',
						}}
					>
						{piece ? (
							<img
								src={`image.jsx/${piece.type}_${piece.color}.png`}
								alt={`${piece.color}_${piece.type}`}
								style={{ width: '40px', height: '40px' }}
							/>
						) : null}
					</div>
				);
			}
		}

		return squares;
	};

	const handleMove = (from, to) => {
		const move = board.move({ from, to, promotion: 'q' });
		if (move) {
			setBoard(new Chess(board.fen()));
			onMove({ from, to });
		}
	};

	const handleStockfishMove = () => {
		const position = board.fen();
		stockfish.postMessage(`position fen ${position}`);
		stockfish.postMessage('go depth 15');
	};

	stockfish.onmessage = (event) => {
		const match = event.data.match(/^bestmove ([a-h][1-8])([a-h][1-8])/);
		if (match) {
			const [_, from, to] = match;
			handleMove(from, to);
		}
	};

	return (
		<div style={{ display: 'flex', flexWrap: 'wrap', width: '400px', margin: '20px' }}>
			{renderChessboard()}
		</div>
	);
};

export default Chessboard;



