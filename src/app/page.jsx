import Link from "next/link";

/**
 * Homepage for the application.
 *
 * @author frigvid
 */
export default function Home() {
	return (
		<main className="flex justify-center items-center">
			<div className="flex flex-col space-y-4">
				<Link
					className="block bg-blue-500 text-white text-center py-4 px-8 rounded"
					href="/chess/train"
				>
					Tren*
				</Link>
				<Link
					className="block bg-green-500 text-white text-center py-4 px-8 rounded"
					href="/chess"
				>
					Spill
				</Link>
				<Link
					className="block bg-red-500 text-white text-center py-4 px-8 rounded"
					href="/chess/history"
				>
					Historikk*
				</Link>
			</div>
		</main>
	)
}
