import Link from "next/link";

export default function Home() {
	return (
		<main className="flex justify-center items-center">
			<div className="flex flex-col space-y-4">
				{/* TODO: When implemented, change bg-gray-500 to bg-blue-500. */}
				<Link
					className="block bg-gray-500 text-white text-center py-4 px-8 rounded"
					href="/tren"
				>
					Tren (Not implemented)
				</Link>
				<Link
					className="block bg-green-500 text-white text-center py-4 px-8 rounded"
					href="/chess"
				>
					Spill
				</Link>
				{/* TODO: When implemented, change bg-gray-500 to bg-red-500. */}
				<Link
					className="block bg-gray-500 text-white text-center py-4 px-8 rounded"
					href="/historikk"
				>
					Historikk (Not implemented)
				</Link>
			</div>
		</main>
	)
}
