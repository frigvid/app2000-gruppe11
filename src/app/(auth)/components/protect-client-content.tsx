import Buffering from "@auth/components/fragment/Buffering";
import UnauthorizedError from '@ui/error/401_unauthorized';
import { createClient } from '@utils/supabase/client';
import React, {useEffect, useState} from 'react';
import Link from 'next/link';

/**
 * Interface to explicitly define the prop's datatype.
 */
interface ProtectClientContentProps {
	showError: boolean;
	children: React.ReactElement | null;
}

/**
 * Protects or hides a given content from unauthorized access.
 *
 * Using this is as simple as wrapping the content inside the
 * return statement, in a ProtectClientContent component.
 *
 * Note that if you'd like to protect more than one element, you
 * can simply wrap them in a React.Fragment (<pre><></></pre>).
 *
 * @example
 * import ProtectOrHideContent from "@app/(auth)/components/protect-client-content";
 *
 * export default function FancyPancyPage() {
 *		return (
 *			<main className="flex justify-center items-center">
 *				<ProtectClientContent showError={true}>
 *					<p>Fancy Pancy Secret.</p>
 *				</ProtectClientContent>
 *			</main>
 *		)
 * }
 *
 * @author frigvid
 * @created 2024-04-04
 * @param {boolean} showError If true, show a 401 error when unauthorized. If false, just hide the content.
 * @param children The content to protect or hide.
 * @returns {React.ReactElement} The protected or hidden content.
 */
export default function ProtectClientContent({ showError, children }: ProtectClientContentProps): React.ReactElement {
	const supabase = createClient();
	const [authorized, setAuthorized] = useState(false);
	const [loading, setLoading] = useState(true);
	
	useEffect(() => {
		const checkAuth = async () => {
			const { data, error } = await supabase.auth.getUser();
			
			if (error || !data?.user) {
				setAuthorized(false);
			} else {
				setAuthorized(true);
			}
			
			setLoading(false);
		};
		
		checkAuth().then(r => console.log("Content protected."));
	}, [supabase.auth]);
	
	if (loading) {
		return <Buffering/>;
	}
	
	if (!authorized) {
		if (showError) {
			return (
				<main className="flex flex-col justify-center items-center">
					<div className="mb-8">
						<UnauthorizedError/>
					</div>
					<Link href="/"
							className="bg-buttoncolor inline-block rounded px-6 pb-2 pt-2.5 text-xs font-medium uppercase leading-normal"
					>
						Return to Home
					</Link>
				</main>
			);
		} else {
			return null;
		}
	}
	
	return <>{children}</>;
}
