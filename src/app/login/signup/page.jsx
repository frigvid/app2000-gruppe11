import Link from "next/link";

export default function Page() {
	return (
		<main className="flex justify-center items-center">
			<div className="bg-white p-4 rounded shadow-lg">
				<form>
					<div className="mb-4">
						<label htmlFor="username" className="block text-gray-700 text-sm font-bold mb-2">Username</label>
						<input id="username" type="text" name="username" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"/>
					</div>
					<div className="mb-2">
						<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Password</label>
						<input id="password" type="password" name="password" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
					</div>
					<div className="mb-2">
						<label htmlFor="password" className="block text-gray-700 text-sm font-bold mb-2">Confirm Password</label>
						<input id="passwordVerify" type="password" name="password" required className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 mb-3 leading-tight focus:outline-none focus:shadow-outline"/>
					</div>
					<div className="mb-2 pb-1 pt-1 text-center">
						<button type="button" onClick="" className="bg-buttoncolor mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
							Sign up
						</button>
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">Or</p>
				</div>
				<div className="pb-1 pt-1 text-center">
					<Link href="/login" className="bg-buttoncolor mb-3 inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal">
						Back to log in
					</Link>
				</div>
			</div>
		</main>
	);
}