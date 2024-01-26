// arena.jsx
import React from 'react';
import { Chessboard } from "react-chessboard";

export default function Arena({ position, onPieceDrop }) {
	return (
		<div className="flex justify-center items-center h-full">
			{/* Wrapper som beholder aspektforholdet */}
			<div className="w-96 h-96" style={{ maxWidth: '80vw', maxHeight: '80vh', aspectRatio: '1 / 1' }}>
				<Chessboard
					position={position}
					onPieceDrop={onPieceDrop}
				/>
			</div>
		</div>
	);
}

