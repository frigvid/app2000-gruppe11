"use client";

import Buffering from "@/app/(auth)/components/fragment/Buffering";
import {useUser} from "@/app/(auth)/actions/useUser";
import {createClient} from "@utils/supabase/client";
import React, {useState, useEffect} from "react";
import {Chessboard} from "react-chessboard";
import {Chess} from "chess.js";

/**
 * This component provides a way for end-users to register custom chess openings.
 *
 * Created openings are stored in the database, and attached to the user's user id.
 *
 * @example
 * import OpeningManager from "@ui/opening/opening-manager";
 *
 * export function OpeningManager() {
 * 	return (
 * 			<OpeningManager />
 * 	);
 * }
 *
 * @author KarstenKebba
 * @contributor frigvid
 * @returns {React.Element} The opening manager component.
 */
export default function OpeningCreator() {
	const [game, setGame] = useState(new Chess());
	const [moves, setMoves] = useState([]);
	const [openingName, setOpeningName] = useState('');
	const [openingDescription, setOpeningDescription] = useState('');
	const [feedbackMsg, setFeedbackMsg] = useState('');
	const [isFeedbackVisible, setIsFeedbackVisible] = useState(false);
	const [feedbackType, setFeedbackType] = useState('');
	const [loading, setLoading] = useState(true);
	const supabase = createClient();
	const user = useUser();


	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Buffering />;
	}

	function onDrop(sourceSquare, targetSquare, piece) {
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: 'q'
		});

		if (move === null) return false;

		setMoves(previousMoves => [
			...previousMoves,
			{
				from: move.from,
				to: move.to,
				promotion: move.promotion,
				san: move.san
			}
		]);
		return true;
	}

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

		setTimeout(() => setIsFeedbackVisible(false), 5000);
	}
	
	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="flex flex-col w-full max-w-md space-y-2">
				<input
					type="text"
					value={openingName}
					onChange={(e) => setOpeningName(e.target.value)}
					placeholder="Name of the opening"
					className="border border-gray-300 p-2 rounded"
				/>
				<textarea
					value={openingDescription}
					onChange={(e) => setOpeningDescription(e.target.value)}
					placeholder="Description of the opening"
					className="border border-gray-300 p-2 rounded h-24"
				/>
			</div>
			<div>
				<button
					onClick={saveOpening}
					className="w-full bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					Save Opening
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
