// Chessboard.js
import React, { useState } from 'react';

const Chessboard = () => {
	const [board, setBoard] = useState(initializeBoard());

	function initializeBoard() {
		// This function initializes the chessboard with pieces in their starting positions.
		// You can customize it based on your requirements.
		// For simplicity, I'm representing pieces as a string, like 'wK' for white king.

		const initialBoard = Array(8).fill(Array(8).fill(null));

		const startingPieces = [
			'wR', 'wN', 'wB', 'wQ', 'wK', 'wB', 'wN', 'wR',
			'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP', 'wP',
			null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null,
			null, null, null, null, null, null, null, null,
			'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP', 'bP',
			'bR', 'bN', 'bB', 'bQ', 'bK', 'bB', 'bN', 'bR',
		];

		const mappedBoard = initialBoard.map((row, rowIndex) =>
			row.map((_, colIndex) => startingPieces[rowIndex * 8 + colIndex])
		);

		return mappedBoard;
	}

	return (
		<div className="flex flex-wrap w-64">
			{board.map((row, rowIndex) => (
				<div key={rowIndex} className="flex">
					{row.map((piece, colIndex) => (
						<div
							key={colIndex}
							className={`w-8 h-8 ${rowIndex % 2 === colIndex % 2 ? 'bg-gray-300' : 'bg-white'} flex items-center justify-center`}
						>
							{piece && (
								<span className={`text-${piece.charAt(0).toLowerCase() === 'w' ? 'white' : 'black'}`}>
                  {getPieceSymbol(piece.charAt(1))}
                </span>
							)}
						</div>
					))}
				</div>
			))}
		</div>
	);
};

function getPieceSymbol(piece) {
	// This function returns the Unicode symbol for the chess pieces.
	switch (piece) {
		case 'K':
			return '♔';
		case 'Q':
			return '♕';
		case 'R':
			return '♖';
		case 'B':
			return '♗';
		case 'N':
			return '♘';
		case 'P':
			return '♙';
		default:
			return '';
	}
}

export default Chessboard;
