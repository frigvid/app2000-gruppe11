import Link from "next/link";

/**
 * Stub page for user-application documentation.
 *
 * @author frigvid
 */
export default function App() {
	return (
		<main className="flex justify-center items-center flex-col">
			<p>Docs</p>
			<p>
				<Link
					href="/faq"
					className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					FAQ
				</Link>
			</p>
		</main>
	)
}
