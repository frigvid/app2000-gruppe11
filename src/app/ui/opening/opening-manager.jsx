"use client";

import React, { useState, useEffect } from 'react';
import { Chessboard } from 'react-chessboard';
import { Chess } from 'chess.js';
import {createClient} from "@utils/supabase/client";
import {useUser} from "@/app/(auth)/actions/useUser";
import Buffering from "@/app/(auth)/components/fragment/Buffering";

/**
 * Chess opening react component
 *
 * @author KarstenKebba
 * @contributor frigvid
 */

export function OpeningManager() {
	const [game, setGame] = useState(new Chess());
	const [moves, setMoves] = useState([]);
	const [openingName, setOpeningName] = useState('');
	const [openingDescription, setOpeningDescription] = useState(''); // Definerer tilstanden for åpningens beskrivelse
	const supabase = createClient();
	const user = useUser();
	const [feedbackMsg, setFeedbackMsg] = useState('');
	const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
	const [feedbackType, setFeedbackType] = useState(''); // 'success' eller 'error'
	const [loading, setLoading] = useState(true); // Tilstand for å håndtere lastestatus


	useEffect(() => {
		// Anta at lastingen er ferdig når sjakkbrettet er klar til bruk.
		// Dette er et eksempel, og du må tilpasse dette basert på din faktiske lastingslogikk.
		const timer = setTimeout(() => setLoading(false), 1000); // For eksempel, fjerner loading etter 1 sekund
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Buffering />;
	}

	function onDrop(sourceSquare, targetSquare, piece) {
		// Justerer hvordan et trekk lagres basert på sjakk.js dokumentasjon
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q' // Antar promosjon til dronning som standard
		});

		if (move === null) return false; // Ugyldig trekk

		// Legger til trekket i listen over trekk
		setMoves(previousMoves => [
			...previousMoves,
			{
				from: move.from,
				to: move.to,
				promotion: move.promotion,
				san: move.san // SAN (Standard Algebraic Notation) for trekket, om nødvendig
			}
		]);
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
			setFeedbackMsg('Please enter a name for the opening and make at least one move.');
			setFeedbackType('error');
			setIsFeedbackVisible(true);
			return;
		}

		const {data, error} = await supabase
			.from('openings')
			.insert({id: user.id, name: openingName, desc: openingDescription, pgn: JSON.stringify(moves)});

		if (error) {
			setFeedbackMsg('An error occurred while saving to the database.');
			setFeedbackType('error');
		} else {
			setFeedbackMsg('New opening saved successfully.');
			setFeedbackType('success');
		}

		setIsFeedbackVisible(true);

		// Clears data.
		setOpeningName('');
		setOpeningDescription('');
		setMoves([]);
		setGame(new Chess());

		// Skjuler tilbakemeldingen etter noen sekunder
		setTimeout(() => setIsFeedbackVisible(false), 5000);
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
			<div>
				{isFeedbackVisible && (
					<div
						className={`w-full max-w-md p-2 rounded ${feedbackType === 'error' ? 'bg-red-500' : 'bg-green-500'} text-white text-center`}>
						{feedbackMsg}
					</div>
				)}
			</div>

		</div>
	);
}
