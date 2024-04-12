import Link from "next/link";

export default function TrainPanel({ status, wrongCounter }) {
	return (
		<>
			<div className="flex flex-col mr-8 p-3 px-8 max-w-sm bg-gray-200 rounded-lg border border-gray-200 shadow-md">
				<h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900">
					Game Status
				</h5>
				<p>{status}</p>
				<h6>Wrongdoings:</h6>
				<p>{wrongCounter}</p>

				<Link href="/chess/stages" className="mt-4 bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded">
					Back to stage selection
				</Link>
			</div>
		</>
	);
}
