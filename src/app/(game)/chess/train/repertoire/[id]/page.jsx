"use client";

import TrainChess from "@/app/(game)/chess/train/[id]/components/train-chess";
import {createClient} from "@shared/utils/supabase/client";
import {useEffect, useState} from "react";

/**
 * Route for training chess.
 *
 * @author frigvid, qwertyfyr
 * @created 2024-01-31
 * @param params The id of the route.
 */
export default function ChessTrainer({params}) {
	const supabase = createClient();
	const {id} = params;
	const [opening, setOpening] = useState(null);
	const [repertoire, setRepertoire] = useState(null);

	/**
	 * Adds opening IDs into repertoire if there's a match.
	 *
	 * @author qwertyfyr
	 * @created 2024-04-18
	 */
	useEffect(() => {
		async function getRepo() {
			const { data, error } = await supabase
				.from("repertoire")
				.select("openings")
				.eq("id", id);

			if (error) {
				console.error("Something went wrong while getting openings!", error);
			} else {
				/**
				 * Array of awaited promises.
				 *
				 * @author qwertyfyr
				 * @created 2024-04-18
				 * @type {Awaited<unknown>[]}
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
	}, [id, supabase]);

	if (opening) {
		return (
			<main className="flex justify-center items-center">
				<TrainChess pgn={opening.pgn} repo={repertoire} opening={opening} setOpening={setOpening}/>
			</main>
		);
	}
}
