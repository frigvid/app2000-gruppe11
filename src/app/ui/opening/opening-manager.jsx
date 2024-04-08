"use client";

import React, { useState } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import {createClient} from "@utils/supabase/client";
import {useUser} from "@/app/(auth)/actions/useUser";


/**
 * bana
 *
 * @example
 *
 * @author
 * @param onSave
 * @returns {Element}
 * @constructor
 */
export function OpeningManager() {
	const [game, setGame] = useState(new Chess());
	const [moves, setMoves] = useState([]);
	const [openingName, setOpeningName] = useState('');
	const [openingDescription, setOpeningDescription] = useState(''); // Definerer tilstanden for åpningens beskrivelse
	const supabase = createClient();
	const user = useUser();

	function onDrop(sourceSquare, targetSquare, piece) {
		const move = {from: sourceSquare, to: targetSquare, promotion: piece[1].toLowerCase() ?? 'q'};
		const result = game.move(move);
		if (result === null) return false;
		setMoves([...moves, result.san]);
		return true;
	}

	/**
	 async function deleteOpening(name) {
		const {data, error} = await supabase
			.from('openings')
			.delete()
			.eq('id', user.id)
			.eq('name', name);

		if (error) {
			console.log(error);
		}
	}**/

	/**
	 *
	 * @returns {Promise<void>}
	 */
	async function saveOpening() {
		if (!openingName.trim() || moves.length === 0) {
			console.error('Please enter a name for the opening and make at least one move.');
			return;
		}

		const {data, error} = await supabase
			.from('openings')
			.insert({id: user.id, name: openingName, desc: openingDescription, pgn: JSON.stringify(moves)});

		if (error) {
			console.error('An error occurred while saving to the database:', error);
		} else {
			console.log('New opening saved:', data);
		}

		// Clears data.
		setOpeningName('');
		setOpeningDescription('');
		setMoves([]);
		setGame(new Chess());
	}

	return (
		<div
			className="flex flex-col items-center space-y-4"> {/* Sentrerer elementene vertikalt og legger til mellomrom mellom dem */}
			<div
				className="flex flex-col w-full max-w-md space-y-2"> {/* Begrenser bredden og legger til mellomrom mellom input-feltene */}
				<input
					type="text"
					value={openingName}
					onChange={(e) => setOpeningName(e.target.value)}
					placeholder="Name of the opening"
					className="border border-gray-300 p-2 rounded" // Legger til litt grunnleggende styling for input-feltet
				/>
				<textarea
					value={openingDescription} // Antatt at du har en tilstand kalt `openingDescription`
					onChange={(e) => setOpeningDescription(e.target.value)}
					placeholder="Description of the opening"
					className="border border-gray-300 p-2 rounded h-24" // Tilpasset høyde for textarea
				/>
			</div>
			<div>
			<button onClick={saveOpening}
					  className="w-full bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">Save
				Opening
			</button>
			<Chessboard
				position={game.fen()}
				onPieceDrop={onDrop}
				boardWidth={400}
			/>
			</div>

		</div>
	);
}
