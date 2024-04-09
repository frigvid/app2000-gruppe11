"use server";

import UnauthorizedError from "@ui/error/401_unauthorized";
import {createClient} from "@utils/supabase/server";
import {cookies} from "next/headers";
import Link from "next/link";

/**
 * Protects a given page from unauthorized access.
 *
 * Using this is as simple as wrapping the page contents
 * inside the return statement, in a ProtectContent() statement.
 *
 * Example usage:
 * <pre>
 * import ProtectPage from "@auth/components/protect-page";
 *
 * export default function FancyPancyPage() {
 *    return (
 *       ProtectContent(
 *             <main className="flex justify-center items-center">
 *                <p>Fancy Pancy Secret.</p>
 *             </main>
 *          )
 *       )
 *    }
 * </pre>
 *
 * @author frigvid
 * @created 2024-02-17
 * @param Component The page contents to protect.
 * @returns {Promise<*>} The protected page.
 * @note		This is unable to be called during initial render.
 * @warning This is kind of an abomination of a Server Action crossed with
 * 			a Component, so, you know; cognitohazard warning.
 */
export default async function ProtectPage(Component: any): Promise<any> {
	const cookieStore = cookies();
	const supabase = createClient(cookieStore);
	const {data, error} = await supabase.auth.getUser();
	
	// Show 401 if unauthorized or if an error occurred.
	if (error || !data?.user) {
		return (
			<main className="flex flex-col justify-center items-center">
				<div className="mb-8">
					<UnauthorizedError/>
				</div>
				<Link href="/"
						className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
				>
					Return to home
				</Link>
			</main>
		);
	}
	
	// Otherwise, assume it's fine, and return the page.
	return Component;
}
