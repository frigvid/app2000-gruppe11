import styles from "@/app/ui/login/button.module.css";
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
					<div className="mb-2 pb-1 pt-1 text-center">
						<button type="button" onClick="" className={`${styles.buttonColor} mb-3 inline-block w-full rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal`}>
							Log in
						</button>
						<Link href="/forgot" className="hover:text-blue-800">Forgot password?</Link>
					</div>
				</form>
				<div className="my-4 flex items-center before:mt-0.5 before:flex-1 before:border-t before:border-neutral-300 after:mt-0.5 after:flex-1 after:border-t after:border-neutral-300">
					<p className="mx-4 mb-0 text-center font-semibold">Or</p>
				</div>
				<div className="flex items-center justify-between pb-6">
					<p className="mb-0 mr-2">Don't have an account?</p>
					<Link href="/signup" className={`${styles.buttonColor} inline-block rounded px-6 pb-[6px] pt-2 text-xs font-medium uppercase leading-normal text-danger`}>Register</Link>
				</div>
			</div>
		</main>
	);
}
