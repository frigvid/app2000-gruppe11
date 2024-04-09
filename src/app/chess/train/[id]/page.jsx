"use client";
import PlayChess from "@ui/chess/play-chess";

/**
 * Stub page for user-training.
 *
 * @author frigvid
 */
export default function App({params}) {
	return (
		<main className="flex justify-center items-center">
			<p>Tren</p>
			<PlayChess id={params.id} ></PlayChess>
		</main>
	)
}
