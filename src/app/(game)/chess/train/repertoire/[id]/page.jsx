"use client";

import TrainChess from "@/app/(game)/chess/train/[id]/components/train-chess";
import { createClient } from "@shared/utils/supabase/client";
import { useEffect, useState } from "react";


/**
 * Route for training chess.
 *
 * @author frigvid, qwertyfyr
 * @created 2024-01-31
 * @param params The id of the route.
 */
export default function ChessTrainer({ params }) {
	const supabase = createClient();
	const [opening, setOpening] = useState(null);
	const { id } = params;
	const [repertoire, setRepertoire] = useState(null);

	//adds opening ids into reportoire const if there's a match
	useEffect(() => {
		async function getRepo() {
			const { data, error } = await supabase
				.from("repertoire")
				.select("openings")
				.eq("id", id);

			if (error) {
				console.error(
					"Something went wrong while getting openings!",
					error
				);
			} else {
				/**
				 * looping over array, and we got multiple asyncs so we gotta wait for all promises to be returned
				 */
				const openings = await Promise.all(
					data[0].openings.map(async (openingId) => {
						const { data, error } = await supabase
							.from("openings")
							.select("pgn, title, description, id")
							.eq("id", openingId);
						return data[0];
					})
				);
				setRepertoire(openings);
				setOpening(openings[0]);
			}
		}
		void getRepo();
	}, [supabase]);

	console.log("Opening: ", opening);
	if (opening) {
		return (
			<main className="flex justify-center items-center">
				<TrainChess pgn={opening.pgn} repo={repertoire} opening={opening} setOpening={setOpening} />
			</main>
		);
	}
}
