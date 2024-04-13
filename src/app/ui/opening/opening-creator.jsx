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
	
	/**
	 * Sets a timeout to simulate loading.
	 *
	 * This is to avoid "popping" of elements when the page loads.
	 */
	useEffect(() => {
		const timer = setTimeout(() => setLoading(false), 1000);
		return () => clearTimeout(timer);
	}, []);

	if (loading) {
		return <Buffering />;
	}
	
	/**
	 * Handles the drop event on the chessboard.
	 *
	 * @param sourceSquare The square you're moving from.
	 * @param targetSquare The square you're moving to.
	 * @return {boolean} Whether the move was successful or not.
	 */
	function onDrop(sourceSquare, targetSquare, piece) {
		const move = game.move({
			from: sourceSquare,
			to: targetSquare,
			promotion: "q",
		});

		if (move === null) return false;

		setMoves(previousMoves => [
			...previousMoves,
			{
				from: move.from,
				to: move.to,
				piece: move.piece
			}
		]);
		
		console.log(move);
		return true;
	}
	
	/**
	 * Uses the data from the input, textarea and chessboard,
	 * and saves it to the database.
	 *
	 * @author KarstenKebba
	 * @contributor frigvid
	 * @return {Promise<void>} The result of the save operation.
	 */
	async function saveOpening() {
		if (!openingName.trim() || moves.length === 0) {
			setFeedbackMsg('Missing name, description or move');
			setFeedbackType('error');
			setIsFeedbackVisible(true);
			setTimeout(() => setIsFeedbackVisible(false), 2500);
			return;
		}

		// Insert data to database.
		// TODO: Switch it out for an RPC call using a database function instead.
		const {data, error} = await supabase
			.from('openings')
			.insert({
				created_by: user.id,
				title: openingName,
				description: openingDescription,
				pgn: moves
			});
		
		if (error) {
			setFeedbackMsg('An error occurred while saving to the database');
			setFeedbackType('error');
			setTimeout(() => setIsFeedbackVisible(false), 2500);
		} else {
			setFeedbackMsg('New opening saved successfully');
			setFeedbackType('success');
			setTimeout(() => setIsFeedbackVisible(false), 2000);
		}

		setIsFeedbackVisible(true);

		// Clears data.
		setOpeningName('');
		setOpeningDescription('');
		setMoves([]);
		setGame(new Chess());
	}
	
	return (
		<div className="flex flex-col items-center space-y-4">
			<div className="flex flex-col w-full max-w-[400px] space-y-2">
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
				{isFeedbackVisible ?
					<div
						className={`w-full mb-3 max-w-md px-6 pb-2 pt-2.5 rounded ${feedbackType === 'error' ? 'bg-red-500' : 'bg-green-500'} text-xs font-medium text-white text-center uppercase leading-normal`}
					>
						{feedbackMsg}
					</div>
					:
					<button
						onClick={saveOpening}
						className="w-full bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
					>
						Save Opening
					</button>
				}
				<Chessboard
					id={self.crypto.randomUUID()}
					position={game.fen()}
					onPieceDrop={onDrop}
					boardWidth={400}
				/>
			</div>
		</div>
	);
}
