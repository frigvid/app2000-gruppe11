import Link from "next/link";

export default function Page() {
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg w-72">
				<h2 className="mb-4 text-2xl font-bold text-center">Password Reset Sent</h2>
				<p className="mb-4 text-center">A link to reset your password has been sent to your email address.</p>
				<p className="mb-4 text-center">Please check your email and follow the instructions to reset your password.</p>
				<div className="pb-1 pt-1 text-center">
					<Link href="/login" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						Back to log in
					</Link>
				</div>
			</div>
		</main>
	);
}
