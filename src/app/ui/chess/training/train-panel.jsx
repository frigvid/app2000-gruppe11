import Link from "next/link";

/**
 * Panel to display information about the practice status.
 *
 * @author qwertyfyr
 * @contributor frigvid
 * @created 2024-04-12
 * @param status The status message of the practice.
 * @param moveCounter The number of moves made.
 * @param pgn The PGN of the practice session.
 * @returns returns the panel with information about the practice status
 */
export default function TrainPanel({status, moveCounter, pgn}) {
	return (
		<section className="flex flex-col justify-center mr-8 p-3 px-8 max-w-md bg-gray-200 rounded-lg border border-gray-200 shadow-md text-center space-y-4">
			<h2 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
				Game Status
			</h2>
			<div className="italic">
				{
					(status === "Wrong move!")
						? <p className="bg-red-500 p-2">{status}</p>
						: (status === "Opening completed!")
							? <p className="bg-green-500 p-2">{status}</p>
							: <p className="p-2">{status}</p>
				}
			</div>
			<p className="max-w-[14rem]">You have moved {moveCounter} times, and the amount of moves in the opening is {pgn.length}</p>
			<Link
				href="/chess/stages"
				className="bg-buttoncolor inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger mt-4 hover:bg-[#976646] py-2"
			>
				Back to stage selection
			</Link>
		</section>
	);
}
